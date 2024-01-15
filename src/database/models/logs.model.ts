import mongoose from 'mongoose'

const { Schema } = mongoose

/*
 indexes

 log_id unique
 {status: 1}
 */

const Logs = new Schema({
  // unique to block send duplicate logs when bot is up after down
  log_id: {
    type: String,
    required: true,
  },

  to: {
    type: String,
    required: true,
  },

  data: {
    text: {
      type: String,
      required: true,
    },
  },

  status: {
    type: String,
    enum: ['created', 'sent'],
    default: 'created',
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: false,
  }
})

export const LogsModel = mongoose.model('Logs', Logs)