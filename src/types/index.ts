import { Context, Api } from 'grammy'
import { I18nFlavor } from '@grammyjs/i18n'

export interface ITag {
  id?: number,
  key: string,
  name: string,
  news_count?: number
}

export interface ISource {
  id: number,
  name: string,
  url: string,
  lang: string,
  isSelectedByDefault: boolean
}

export interface INews {
  id: number,
  date: number,
  url: string,
  relatedCoins: {
    key: string,
    symbol: string,
    name: string
  }[],
  urlId: string,
  description: string,
  readingTimeMinutes: number,
  title: string,
  imageUrl: string,
  fallbackImageUrl: string,
  tags: {
    id: number,
    key: string,
    name: string,
    news_count: number,
  }[],
  source: {
    name: string,
    lang: string
  },
  isAdvertisement: boolean
}

interface Config {
  [key: string]: any
}

export type ContextType = Context & Config & I18nFlavor

export type BotApiType = { api: Api }