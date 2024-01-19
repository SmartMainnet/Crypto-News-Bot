import mongoose from 'mongoose'

const { Schema } = mongoose

const LastNews = new Schema({
  last_news: Object
}, {
  timestamps: {
    createdAt: false,
    updatedAt: 'updated_at',
  }
})

export const LastNewsModel = mongoose.model('LastNews', LastNews)