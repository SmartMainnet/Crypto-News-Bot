import { editSourcesInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { unblockSource } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const unblockCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const user = callback.from!
    const name = callback.data!.replace('unblock ', '')

    await unblockSource(user.id, name)
    await ctx.editMessageReplyMarkup({
      reply_markup: await editSourcesInlineKeyboard(user.id),
    })
  } catch (e) {
    console.log(e)
  }
}
