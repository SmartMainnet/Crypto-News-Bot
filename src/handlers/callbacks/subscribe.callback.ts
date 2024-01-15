import { newSubscribe } from '../../database/methods/subscriptions.js'
import { subscribeTagsInlineKeyboard } from '../../keyboards/inline_keyboard/tags.inline_keyboard.js'
import { ContextType } from '../../types/index.js'

export const subscribeCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const data = callback.data!.split(' ')[1]
    const user = callback.from!

    await newSubscribe(user.id, data)
    await ctx.editMessageReplyMarkup({ reply_markup: await subscribeTagsInlineKeyboard(user.id) })
  } catch (e) {
    console.log(e)
  }
}