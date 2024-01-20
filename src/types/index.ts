import { Context, Api } from 'grammy'
import { I18nFlavor } from '@grammyjs/i18n'

export interface ITag {
  id?: number,
  key: string,
  name: string,
  news_count?: number
}

interface Config {
  [key: string]: any
}

export type ContextType = Context & Config & I18nFlavor

export type BotApiType = { api: Api }