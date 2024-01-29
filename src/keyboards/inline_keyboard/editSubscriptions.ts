import { InlineKeyboard } from 'grammy'

import { getChunks } from '../../utils/index.js'
import { getSubscriptions, getTags } from '../../database/methods/index.js'
import { ITag } from '../../types/index.js'

export const editSubscriptionsInlineKeyboard = async (user_id: number, page = 0) => {
  const tags = await getTags(page)
  const subscriptions = await getSubscriptions(user_id)

  const buttonRow = tags.tags.map((tag: ITag) =>
    subscriptions.includes(tag.key)
      ? InlineKeyboard.text(`✅ ${tag.name}`, `unsubscribe ${tag.key}`)
      : InlineKeyboard.text(tag.name, `subscribe ${tag.key}`)
  )

  const pagePosition = `${page + 1} / ${tags.max_page}`

  const paginationButtonRow = [
    page === 0
      ? InlineKeyboard.text(pagePosition, 'disabledButton')
      : InlineKeyboard.text('<', `subscriptionsPage ${tags.page - 1}`),
    page === tags.max_page - 1
      ? InlineKeyboard.text(pagePosition, 'disabledButton')
      : InlineKeyboard.text('>', `subscriptionsPage ${tags.page + 1}`),
  ]

  const buttonRowChunks = getChunks(buttonRow, 2)
  const checkSubscriptions = buttonRowChunks.every(buttons => buttons.length === 0)

  const unsubscribeAllButton = checkSubscriptions
    ? []
    : [InlineKeyboard.text('Отписаться от всего', 'unsubscribeAll')]
  const backButton = [InlineKeyboard.text('« Назад', 'backToProfile')]

  return InlineKeyboard.from([
    ...buttonRowChunks,
    paginationButtonRow,
    unsubscribeAllButton,
    backButton,
  ])
}
