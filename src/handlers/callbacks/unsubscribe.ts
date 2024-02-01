import { editSubscriptionsInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { getTagsPageByKey, newUnsubscribe } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const unsubscribeCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const user = callback.from!
    const key = callback.data!.split(' ')[1]
    const page = await getTagsPageByKey(key)

    await newUnsubscribe(user.id, key)
    await ctx.editMessageReplyMarkup({
      reply_markup: await editSubscriptionsInlineKeyboard(user.id, page),
    })
  } catch (e) {
    console.log(e)
  }
}
