import { InlineKeyboard } from 'grammy'
import { getNotifications } from '../../database/methods/index.js'

export const notificationsInlineKeyboard = async (user_id: number) => {
  const notifications = await getNotifications(user_id)
  return new InlineKeyboard()
    .text(
      notifications ? 'Выключить уведомления' : 'Включить уведомления',
      'changeNotifications'
    )
    .row()
    .text(
      '« Назад',
      'backToSettings'
    )
}