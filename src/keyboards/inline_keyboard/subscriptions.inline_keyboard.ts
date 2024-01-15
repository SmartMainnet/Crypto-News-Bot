import { InlineKeyboard } from 'grammy'

export const subscriptionsInlineKeyboard = () => {
  return new InlineKeyboard()
    .text(
      'Редактировать',
      'subscribe'
    )
}