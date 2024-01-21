import { InlineKeyboard } from 'grammy'

export const profileInlineKeyboard = () => {
  return new InlineKeyboard()
    .text(
      'Редактировать',
      'editSubscriptions'
    )
    .row()
    .text(
      'Настройки',
      'settings'
    )
}