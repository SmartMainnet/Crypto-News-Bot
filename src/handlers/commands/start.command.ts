import { createUser } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'
import { editSubscriptionsInlineKeyboard } from '../../keyboards/inline_keyboard/tags.inline_keyboard.js'

export const startCommand = async (ctx: ContextType) => {
  try {
    const user = ctx.update.message!.from

    await ctx.reply(ctx.t('start', { bot_name: ctx.me.first_name }))
    await ctx.reply(ctx.t('editSubscriptions'), { reply_markup: await editSubscriptionsInlineKeyboard(user.id) })

    await createUser(user)
  } catch (e) {
    console.log(e)
  }
}