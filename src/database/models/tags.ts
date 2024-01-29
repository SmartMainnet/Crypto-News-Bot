import mongoose from 'mongoose'

import { getNextSequence } from '../utils/index.js'

const { Schema } = mongoose

const Tags = new Schema(
  {
    id: Number,
    key: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    news_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

Tags.index({ id: 1 }, { unique: true })
Tags.index({ key: 1 }, { unique: true })

Tags.pre('save', async function (next) {
  if (this.isNew) {
    this.id = await getNextSequence('tags')
  }
  next()
})

export const TagsModel = mongoose.model('Tags', Tags)
