import { subscriptionsInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { getSubscriptions } from '../../database/methods/subscriptions.js'
import { ContextType } from '../../types/index.js'

export const mysubscriptionsCommand = async (ctx: ContextType) => {
  try {
    const user = ctx.update.message!.from!

    const subscriptions = await getSubscriptions(user.id)
    const subscriptionsString = subscriptions.map(e => `✅ ${e}`).join('\n')
    
    await ctx.reply(
      ctx.t('mysubscriptions', { subscriptions: subscriptionsString }),
      { reply_markup: subscriptionsInlineKeyboard() }
    )
  } catch (e) {
    console.log(e)
  }
}