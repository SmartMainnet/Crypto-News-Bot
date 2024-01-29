import { InlineKeyboard } from 'grammy'

import { ITag } from '../../types/index.js'
import { getChunks } from '../../utils/index.js'

export const postInlineKeyboard = (tags: ITag[]) => {
  const buttonRow = tags.map(tag =>
    InlineKeyboard.url(
      `Подписаться на ${tag.name}`,
      `https://t.me/test_sm1_bot?start=${tag.id}`
    )
  )

  const DiscussButton = InlineKeyboard.url(
    '💬 Обсудить',
    'https://t.me/xCryptoMediaChat'
  )
  const BoostChannelButton = InlineKeyboard.url(
    '🔥 Забустить канал',
    'https://t.me/xCryptoMedia?boost'
  )

  const buttonRowChunks = getChunks(buttonRow, 2)

  return InlineKeyboard.from([
    [DiscussButton, BoostChannelButton],
    ...buttonRowChunks,
  ])
}
