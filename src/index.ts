import 'dotenv/config'
import { Bot } from 'grammy'

import { connectMongoose } from './database/connect/index.js'
import { i18nMiddleware, limitMiddleware } from './middlewares/plugins/index.js'
import { checkMember } from './middlewares/checks/index.js'
import {
  helpCommand,
  profileCommand,
  startCommand,
} from './handlers/commands/index.js'
import {
  blockCallback,
  paginationCallback,
  profileCallback,
  settingsCallback,
  subscribeCallback,
  subscriptionsCallback,
  unblockCallback,
  unsubscribeCallback,
} from './handlers/callbacks/index.js'
import { ContextType } from './types/index.js'

await connectMongoose()

const { BOT_TOKEN } = process.env

const bot = new Bot<ContextType>(BOT_TOKEN!)

// set commands
await bot.api.setMyCommands([
  { command: 'profile', description: 'Открыть профиль' },
  { command: 'help', description: 'Помощь' },
])

// plugins
bot.use(i18nMiddleware)
bot.use(limitMiddleware)

// commands
bot.command('start', startCommand)
bot.command('profile', profileCommand)
bot.command('help', helpCommand)

// profile callbacks
bot.callbackQuery(
  ['editSubscriptions', 'settings', 'backToProfile'],
  profileCallback
)

// subscriptions callbacks
bot.callbackQuery(/^subscribe .+/, subscribeCallback)
bot.callbackQuery(/^unsubscribe .+/, unsubscribeCallback)
bot.callbackQuery(/^subscriptionsPage [0-9]+/, paginationCallback)
bot.callbackQuery(['unsubscribeAll', 'disabledButton'], subscriptionsCallback)

// settings callbacks
bot.callbackQuery(/^block .+/, blockCallback)
bot.callbackQuery(/^unblock .+/, unblockCallback)
bot.callbackQuery(
  ['editSources', 'editNotifications', 'toggleNotifications', 'backToSettings'],
  settingsCallback
)

await bot.start()
