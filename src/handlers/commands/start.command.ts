import { InputFile } from 'grammy'

import { createUser, getSubscriptions } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'
import { subscribeTagsInlineKeyboard } from '../../keyboards/inline_keyboard/tags.inline_keyboard.js'

export const startCommand = async (ctx: ContextType) => {
  try {
    const user = ctx.update.message!.from

    await ctx.reply(ctx.t('start', { bot_name: ctx.me.first_name }))
    await ctx.reply(ctx.t('subscribe'), { reply_markup: await subscribeTagsInlineKeyboard(user.id, true) })

    // await ctx.reply(
    //   ctx.t('info'),
    //   { disable_web_page_preview: true }
    // )

    // await ctx.replyWithPhoto(
    //   new InputFile('./src/images/Example.png'),
    //   {
    //     caption: ctx.t('help'),
    //     parse_mode: 'Markdown'
    //   }
    // )

    createUser(user)
  } catch (e) {
    console.log(e)
  }
}