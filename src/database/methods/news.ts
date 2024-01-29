import { LastNewsModel } from '../models/index.js'
import { INews } from '../../types/index.js'

export const newLastNews = async (news: INews) => {
  await LastNewsModel.findByIdAndUpdate('65a2d14f3cf0415406c6ce61', {
    last_news: news,
  })
}

export const getLastNews = async () => {
  const LastNews = await LastNewsModel.findById('65a2d14f3cf0415406c6ce61')

  if (!LastNews?.last_news) {
    throw new Error('No Last News found')
  }

  return LastNews.last_news
}
