import { InlineKeyboard } from 'grammy'

export const settingsInlineKeyboard = () => {
  return new InlineKeyboard()
    .text('Источники', 'editSources')
    .text('Уведомления', 'editNotifications')
    .row()
    .text('« Назад', 'backToProfile')
}
