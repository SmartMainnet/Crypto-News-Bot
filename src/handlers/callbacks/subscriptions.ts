import { unsubscribeAll } from '../../database/methods/subscriptions.js'
import { editSubscriptionsInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { ContextType } from '../../types/index.js'

export const subscriptionsCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const data = callback.data!
    const user = callback.from!

    if (data === 'unsubscribeAll') {
      await unsubscribeAll(user.id)

      await ctx.editMessageReplyMarkup({
        reply_markup: await editSubscriptionsInlineKeyboard(user.id),
      })
    }

    if (data === 'disabledButton') {
      await ctx.answerCallbackQuery('Вы нажали на неактивную кнопку!')
    }
  } catch (e) {
    console.log(e)
  }
}
