import {
  createUser,
  getTagByID,
  newSubscribe,
} from '../../database/methods/index.js'
import { editSubscriptionsInlineKeyboard } from '../../keyboards/inline_keyboard/editSubscriptions.js'
import { ContextType } from '../../types/index.js'

export const startCommand = async (ctx: ContextType) => {
  try {
    const user = ctx.update.message!.from
    const item = ctx.match

    if (item) {
      const tag = await getTagByID(Number(item))

      if (tag) {
        const subscribe = await newSubscribe(user.id, tag.key)

        if (subscribe === 'already subscribed') {
          await ctx.reply(`❎ Вы уже подписаны на ${tag.name}`)
        }

        if (subscribe === 'successfully subscribed') {
          await ctx.reply(`✅ Вы подписались на ${tag.name}`)
        }
      }
    } else {
      await ctx.reply(ctx.t('start', { bot_name: ctx.me.first_name }))
      await ctx.reply(ctx.t('editSubscriptions'), {
        reply_markup: await editSubscriptionsInlineKeyboard(user.id),
      })

      await createUser(user)
    }
  } catch (e) {
    console.log(e)
  }
}
