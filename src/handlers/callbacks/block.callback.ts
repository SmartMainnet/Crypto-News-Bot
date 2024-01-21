import { editSourcesInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { blockSource } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const blockCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const user = callback.from!
    const url = callback.data!.split(' ')[1]

    await blockSource(user.id, url)
    await ctx.editMessageReplyMarkup({ reply_markup: await editSourcesInlineKeyboard(user.id) })
  } catch (e) {
    console.log(e)
  }
}