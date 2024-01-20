import 'dotenv/config'
import axios from 'axios'
import { Bot } from 'grammy'

import { log } from "../utils/index.js"
import { connectMongoose } from "../database/connect/index.js"
import { ContextType, ITag } from "../types/index.js"
import { LastNewsModel, SubscriptionsModel } from '../database/models/index.js'
import { getTagsByKeys, incrementTagNewsCount, newTags } from '../database/methods/index.js'
import { postInlineKeyboard } from '../keyboards/inline_keyboard/post.inline_keyboard.js'

const { BOT_TOKEN, CHAT_ID } = process.env

const bot = new Bot<ContextType>(BOT_TOKEN!)

const cryptoNews = axios.create({
  baseURL: 'https://api.cryptorank.io/v0',
})

let lastNews: any = {}

const shorten = (str: string, maxLen: number, separator = ' ') => {
  if (str.length <= maxLen) return str
  return str.substr(0, str.lastIndexOf(separator, maxLen))
}

const createPost = (news: any, tags: any, description: string) => {
  return (
    `*${news.title}*\n\n` +
    `${description}\n` +
    `[Источник](${news.url})\n\n` +
    `${tags}`
  )
}

const checkNews = async () => {
  try {
    const res = await cryptoNews.get('/news', {
      params: {
        lang: 'ru',
        withFullContent: 'false',
        limit: '1',
      },
    })

    const news = res.data.data[0]
    const hashtags = news.tags.map((tag: ITag) => `#${tag.key.replace('-', '')}`).join(' ')

    if (news.title !== lastNews.last_news.title) {
      log.info('New news')
      await LastNewsModel.findByIdAndUpdate('65a2d14f3cf0415406c6ce61', {
        last_news: news
      })
      lastNews = await LastNewsModel.findById('65a2d14f3cf0415406c6ce61')

      const description = shorten(news.description, 1024 - createPost(news, hashtags, '').length, '\n').replace(/\n+/g, '\n\n')
      const content = createPost(news, hashtags, description)

      const users = await SubscriptionsModel.find({
        "tags": {
          $elemMatch: {
            "key": {
              $in: news.tags.map((tag: ITag) => tag.key).filter((key: string) => !key.includes('-')).join(' ')
            }
          }
        }
      })

      await newTags(news.tags)
      await incrementTagNewsCount(news.tags.map((tag: ITag) => tag.key))

      const tags = await getTagsByKeys(news.tags.map((tag: ITag) => tag.key))

      await bot.api.sendPhoto(CHAT_ID!, news.imageUrl, {
        parse_mode: 'Markdown',
        caption: content,
        reply_markup: postInlineKeyboard(tags)
      })
      log.info('News sent to the channel')

      if (users.length) {
        for (const user of users) {
          await bot.api.sendPhoto(user.user_id, news.imageUrl, { parse_mode: 'Markdown', caption: content })
        }
      }
      log.info(`News sent to ${users.length} users`)
    }
  } catch (err) {
    console.error(err)
  }
}

const run = async () => {
  // log.info('News worker started')
  await checkNews()
}

void (async () => {
  await connectMongoose()

  lastNews = await LastNewsModel.findById('65a2d14f3cf0415406c6ce61')

  setInterval(run, 5000)
})()

// shutdown
process.on('SIGINT', () => {
  log.info('SIGINT signal received')
  process.exit(0)
})