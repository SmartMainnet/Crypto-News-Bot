import { editSubscriptionsInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { newSubscribe } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const subscribeCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const user = callback.from!
    const key = callback.data!.split(' ')[1]

    await newSubscribe(user.id, key)
    await ctx.editMessageReplyMarkup({
      reply_markup: await editSubscriptionsInlineKeyboard(user.id),
    })
  } catch (e) {
    console.log(e)
  }
}
