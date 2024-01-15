import mongoose from 'mongoose'

const { Schema } = mongoose

const LastNews = new Schema({
  last_news: Object
})

export const LastNewsModel = mongoose.model('LastNews', LastNews)