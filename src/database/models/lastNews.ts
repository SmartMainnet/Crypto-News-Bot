import mongoose from 'mongoose'

import { RequiredBoolean, RequiredNumber, RequiredString } from '../utils/types.js'

const { Schema } = mongoose

const LastNews = new Schema({
  last_news: {
    id: RequiredNumber,
    date: RequiredNumber,
    url: RequiredString,
    relatedCoins: [{
      key: RequiredString,
      symbol: RequiredString,
      name: RequiredString
    }],
    urlId: RequiredString,
    description: RequiredString,
    readingTimeMinutes: RequiredNumber,
    title: RequiredString,
    imageUrl: RequiredString,
    fallbackImageUrl: RequiredString,
    tags: [{
      id: RequiredNumber,
      key: RequiredString,
      name: RequiredString,
      news_count: RequiredNumber
    }],
    source: {
      type: {
        name: RequiredString,
        lang: RequiredString
      },
      required: true
    },
    isAdvertisement: RequiredBoolean
  }
}, {
  timestamps: {
    createdAt: false,
    updatedAt: 'updated_at',
  }
})

export const LastNewsModel = mongoose.model('LastNews', LastNews)