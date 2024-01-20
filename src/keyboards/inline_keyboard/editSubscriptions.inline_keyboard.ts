import { InlineKeyboard } from 'grammy'

import { getChunks } from '../../utils/index.js'
import { getSubscriptions, getTags } from '../../database/methods/index.js'
import { ITag } from '../../types/index.js'

export const editSubscriptionsInlineKeyboard = async (user_id: number, page = 0) => {
  const tags: any = await getTags(page)
  const subscriptions = await getSubscriptions(user_id)
  const buttonRow = tags.tags.map((tag: ITag) => subscriptions.includes(tag.key)
    ? InlineKeyboard.text(`✅ ${tag.name}`, `unsubscribe ${tag.key}`)
    : InlineKeyboard.text(tag.name, `subscribe ${tag.key}`)
  )
  const filteredButtonRow = [...getChunks(buttonRow, 2)]
  const paginationButtonRow = [
    page === 0 ? InlineKeyboard.text(`${page + 1} / ${tags.max_page}`, 'disabledButton') : InlineKeyboard.text('<', `subscriptionsPage ${tags.page - 1}`),
    page === tags.max_page - 1 ? InlineKeyboard.text(`${page + 1} / ${tags.max_page}`, 'disabledButton') : InlineKeyboard.text('>', `subscriptionsPage ${tags.page + 1}`)
  ]
  const unsubscribeAllButton = filteredButtonRow.every(subArray => subArray.length === 0) ? [] : [InlineKeyboard.text('Отписаться от всего', 'unsubscribeAll')]
  const backButton = [InlineKeyboard.text('« Назад', 'backToSubscriptions')]
  
  return InlineKeyboard.from([...filteredButtonRow, paginationButtonRow, unsubscribeAllButton, backButton])
}