import {
  settingsInlineKeyboard,
  notificationsInlineKeyboard,
  editSourcesInlineKeyboard,
} from '../../keyboards/inline_keyboard/index.js'
import { toggleNotifications } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const settingsCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const data = callback.data!
    const user = callback.from!

    if (data === 'editSources') {
      const keyboard = await editSourcesInlineKeyboard(user.id)
      await ctx.editMessageText(ctx.t('editSources'), { reply_markup: keyboard })
    }

    if (data === 'editNotifications') {
      await ctx.editMessageText(ctx.t('notifications'), {
        reply_markup: await notificationsInlineKeyboard(user.id),
      })
    }

    if (data === 'toggleNotifications') {
      await toggleNotifications(user.id)
      await ctx.editMessageReplyMarkup({
        reply_markup: await notificationsInlineKeyboard(user.id),
      })
    }

    if (data === 'backToSettings') {
      await ctx.editMessageText(ctx.t('settings'), {
        reply_markup: settingsInlineKeyboard(),
      })
    }
  } catch (e) {
    console.log(e)
  }
}
