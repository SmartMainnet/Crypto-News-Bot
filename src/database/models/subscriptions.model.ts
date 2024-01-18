import mongoose from 'mongoose'

const { Schema } = mongoose

const Subscriptions = new Schema({
  user_id: {
    type: Number,
    required: true
  },
  tags: [{
    key: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
})

Subscriptions.index({ user_id: 1 }, { unique: true })

export const SubscriptionsModel = mongoose.model('Subscriptions', Subscriptions)