import { ContextType } from '../../types/index.js'

export const helpCommand = async (ctx: ContextType) => {
  try {
    await ctx.reply(ctx.t('help'))
  } catch (e) {
    console.log(e)
  }
}