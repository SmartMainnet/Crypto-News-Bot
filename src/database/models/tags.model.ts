import mongoose from 'mongoose'

import { getNextSequence } from '../utils/getNextSequence.js'

const { Schema } = mongoose

const Tags = new Schema({
  id: Number,
  key: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

Tags.index({ id: 1 }, { unique: true })
Tags.index({ key: 1 }, { unique: true })

Tags.pre('save', async function(next) {
  if (this.isNew) {
    this.id = await getNextSequence('tags')
  }
  next()
})

export const TagsModel = mongoose.model('Tags', Tags)