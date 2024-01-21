import mongoose from 'mongoose'

const { Schema } = mongoose

const Subscriptions = new Schema({
  user_id: {
    type: Number,
    required: true
  },
  tags: [{
    name: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  blocked_sources: [{
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  notifications: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
})

Subscriptions.index({ user_id: 1 }, { unique: true })

export const SubscriptionsModel = mongoose.model('Subscriptions', Subscriptions)