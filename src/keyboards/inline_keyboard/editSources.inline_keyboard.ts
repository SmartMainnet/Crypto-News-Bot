import { InlineKeyboard } from 'grammy'

import { getChunks, getSources } from '../../utils/index.js'
import { getBlockedSources } from '../../database/methods/index.js'

export const editSourcesInlineKeyboard = async (user_id: number) => {
  const sources = await getSources()
  const blocked_sources = await getBlockedSources(user_id)
  const buttonRow = sources.map((source: any) => !blocked_sources?.includes(source.url)
    ? InlineKeyboard.text(`✅ ${source.name}`, `block ${source.url}`)
    : InlineKeyboard.text(`❌ ${source.name}`, `unlock ${source.url}`)
  )
  const backButton = [InlineKeyboard.text('« Назад', 'backToSettings')]
  
  return InlineKeyboard.from([...getChunks(buttonRow, 1), backButton])
}