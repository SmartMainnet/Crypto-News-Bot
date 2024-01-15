import 'dotenv/config'
import { Bot } from 'grammy'

import { connectMongoose } from './database/connect/index.js'
import { i18nMiddleware, limitMiddleware } from './middlewares/plugins/index.js'
// import { checkMember } from './middlewares/checks/index.js'
import { helpCommand, infoCommand, mysubscriptionsCommand, startCommand } from './handlers/commands/index.js'
// import { textMessage } from './handlers/messages/index.js'
import { subscribeCallback, subscriptionsCallback, unsubscribeCallback } from './handlers/callbacks/index.js'
import { ContextType } from './types/index.js'
import { tagKeys } from './utils/tags.js'

await connectMongoose()

const { BOT_TOKEN } = process.env

const bot = new Bot<ContextType>(BOT_TOKEN!)

// set commands
await bot.api.setMyCommands([
  { command: "mysubscriptions", description: "Show my subscriptions" },
  { command: "help", description: "Show help text" },
])

// plugins
bot.use(i18nMiddleware)
bot.use(limitMiddleware)

// commands
bot.command('start', startCommand)
bot.command('mysubscriptions', mysubscriptionsCommand)
// bot.command('info', infoCommand)
bot.command('help', helpCommand)

// messages
// bot.hears(/.*/, textMessage)

// callbacks
bot.callbackQuery(tagKeys.map(e => `subscribe ${e}`), subscribeCallback)
bot.callbackQuery(tagKeys.map(e => `unsubscribe ${e}`), unsubscribeCallback)
bot.callbackQuery(['editSubscriptions', 'unsubscribeAll', 'backToSubscriptions'], subscriptionsCallback)

bot.start()