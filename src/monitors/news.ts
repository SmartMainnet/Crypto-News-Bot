import 'dotenv/config'
import axios from 'axios'
import { Bot } from 'grammy'

import { log } from '../utils/index.js'
import { connectMongoose } from '../database/connect/index.js'
import { ContextType, INews, ITag } from '../types/index.js'
import { getTagsByKeys, getUsersBySubscriptions, incrementTagNewsCount, newTags } from '../database/methods/index.js'
import { postInlineKeyboard } from '../keyboards/inline_keyboard/post.js'
import { getLastNews, newLastNews } from '../database/methods/news.js'

const { BOT_TOKEN, CHAT_ID, API } = process.env

const bot = new Bot<ContextType>(BOT_TOKEN!)

const cryptoNews = axios.create({
  baseURL: API,
})

let lastNews: INews

const shorten = (str: string, maxLen: number, separator = ' ') => {
  if (str.length <= maxLen) return str
  return str.substr(0, str.lastIndexOf(separator, maxLen))
}

const createPost = (news: INews, hashtags: string, description: string) => {
  return (
    `*${news.title}*\n\n` +
    `${description}\n` +
    `[Источник](${news.url})\n\n` +
    `${hashtags}`
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

    const news: INews = res.data.data[0]
    const tagKeys = news.tags.map((tag: ITag) => tag.key)
    const hashtags = news.tags.map((tag: ITag) => `#${tag.key.replace('-', '')}`).join(' ')

    if (news.title !== lastNews.title) {
      log.info('New news')
      await newLastNews(news)
      lastNews = news

      const description = shorten(news.description, 1024 - createPost(news, hashtags, '').length, '\n').replace(/\n+/g, '\n\n')
      const content = createPost(news, hashtags, description)

      const tags = await getTagsByKeys(tagKeys)
      const users = await getUsersBySubscriptions(tagKeys)

      await newTags(news.tags)
      await incrementTagNewsCount(news.tags.map((tag: ITag) => tag.key))

      const imageUrl = news.imageUrl || news.fallbackImageUrl

      await bot.api.sendPhoto(CHAT_ID!, imageUrl, {
        parse_mode: 'Markdown',
        caption: content,
        reply_markup: postInlineKeyboard(tags)
      })
      log.info('News sent to the channel')

      if (users.length) {
        for (const user of users) {
          const checkSources = user.blocked_sources.map(source => source.name).includes(news.source.name)

          if (!checkSources) {
            await bot.api.sendPhoto(user.user_id, imageUrl, {
              parse_mode: 'Markdown',
              caption: content,
              disable_notification: user.notifications
            })
          }
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

  lastNews = await getLastNews()

  setInterval(run, 5000)
})()

// shutdown
process.on('SIGINT', () => {
  log.info('SIGINT signal received')
  process.exit(0)
})