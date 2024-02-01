import { profileInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { getSubscriptionsString } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const profileCommand = async (ctx: ContextType) => {
  try {
    const user = ctx.update.message!.from!

    const subscriptionsString = await getSubscriptionsString(user.id)

    await ctx.reply(ctx.t('profile', { subscriptions: subscriptionsString }), {
      parse_mode: 'Markdown',
      reply_markup: profileInlineKeyboard(),
    })
  } catch (e) {
    console.log(e)
  }
}
