import { getSubscriptions, unsubscribeAll } from '../../database/methods/subscriptions.js'
import { subscriptionsInlineKeyboard, editSubscriptionsInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { ContextType } from '../../types/index.js'

export const subscriptionsCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const data = callback.data!
    const user = callback.from!

    if (data === 'editSubscriptions') {
      await ctx.editMessageText(ctx.t('editSubscriptions'), { reply_markup: await editSubscriptionsInlineKeyboard(user.id) })
    }

    if (data === 'unsubscribeAll') {
      await unsubscribeAll(user.id)

      await ctx.editMessageReplyMarkup({ reply_markup: await editSubscriptionsInlineKeyboard(user.id) })
    }

    if (data === 'backToSubscriptions') {
      const subscriptions = await getSubscriptions(user.id)
      const subscriptionsString = subscriptions.map(e => `✅ ${e}`).join('\n')
      
      await ctx.editMessageText(
        ctx.t('mysubscriptions', { subscriptions: subscriptionsString }),
        {
          parse_mode: 'Markdown',
          reply_markup: subscriptionsInlineKeyboard()
        }
      )
    }
  } catch (e) {
    console.log(e)
  }
}