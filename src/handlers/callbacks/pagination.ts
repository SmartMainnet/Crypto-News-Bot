import { editSubscriptionsInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { ContextType } from '../../types/index.js'

export const paginationCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const user = callback.from!
    const page = callback.data!.split(' ')[1]

    await ctx.editMessageReplyMarkup({
      reply_markup: await editSubscriptionsInlineKeyboard(user.id, Number(page)),
    })
  } catch (e) {
    console.log(e)
  }
}
