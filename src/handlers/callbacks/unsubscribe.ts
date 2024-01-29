import { editSubscriptionsInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { newUnsubscribe } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const unsubscribeCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const data = callback.data!.split(' ')[1]
    const user = callback.from!

    await newUnsubscribe(user.id, data)
    await ctx.editMessageReplyMarkup({
      reply_markup: await editSubscriptionsInlineKeyboard(user.id),
    })
  } catch (e) {
    console.log(e)
  }
}
