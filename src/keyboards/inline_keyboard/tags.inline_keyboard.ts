import { InlineKeyboard } from 'grammy'

import { tags } from '../../utils/tags.js'
import { getChunks } from '../../utils/getChunks.js'
import { getSubscriptions } from '../../database/methods/subscriptions.js'

export const editSubscriptionsInlineKeyboard = async (user_id: number) => {
  const subscriptions = await getSubscriptions(user_id)
  const buttonRow = tags.map(tag => subscriptions.includes(tag.key)
    ? InlineKeyboard.text(`✅ ${tag.name}`, `unsubscribe ${tag.key}`)
    : InlineKeyboard.text(tag.name, `subscribe ${tag.key}`)
  )
  const filteredButtonRow = [...getChunks(buttonRow, 2)]
  const unsubscribeAllButton = filteredButtonRow.every(subArray => subArray.length === 0) ? [] : [InlineKeyboard.text('Отписаться от всего', 'unsubscribeAll')]
  const backButton = [InlineKeyboard.text('« Назад', 'backToSubscriptions')]
  
  return InlineKeyboard.from([...filteredButtonRow, unsubscribeAllButton, backButton])
}