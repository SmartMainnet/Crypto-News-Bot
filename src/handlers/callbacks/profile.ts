import {
  profileInlineKeyboard,
  editSubscriptionsInlineKeyboard,
  settingsInlineKeyboard,
} from '../../keyboards/inline_keyboard/index.js'
import { getSubscriptionsString } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const profileCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const data = callback.data!
    const user = callback.from!

    if (data === 'editSubscriptions') {
      const keyboard = await editSubscriptionsInlineKeyboard(user.id)
      await ctx.editMessageText(ctx.t('editSubscriptions'), {
        reply_markup: keyboard,
      })
    }

    if (data === 'settings') {
      await ctx.editMessageText(ctx.t('settings'), {
        reply_markup: settingsInlineKeyboard(),
      })
    }

    if (data === 'backToProfile') {
      const subscriptionsString = await getSubscriptionsString(user.id)

      await ctx.editMessageText(
        ctx.t('profile', { subscriptions: subscriptionsString }),
        {
          parse_mode: 'Markdown',
          reply_markup: profileInlineKeyboard(),
        }
      )
    }
  } catch (e) {
    console.log(e)
  }
}
