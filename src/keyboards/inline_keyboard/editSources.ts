import { InlineKeyboard } from 'grammy'

import { getChunks, getSources } from '../../utils/index.js'
import { getBlockedSources } from '../../database/methods/index.js'
import { ISource } from '../../types/index.js'

export const editSourcesInlineKeyboard = async (user_id: number) => {
  const sources = await getSources()
  const blocked_sources = await getBlockedSources(user_id)

  const buttonRow = sources.map((source: ISource) =>
    !blocked_sources?.includes(source.name)
      ? InlineKeyboard.text(`✅ ${source.name}`, `block ${source.name}`)
      : InlineKeyboard.text(`❌ ${source.name}`, `unblock ${source.name}`)
  )

  const buttonRowChunks = getChunks(buttonRow, 1)
  const backButton = [InlineKeyboard.text('« Назад', 'backToSettings')]

  return InlineKeyboard.from([...buttonRowChunks, backButton])
}
