import mongoose from 'mongoose'

const { Schema } = mongoose

const Logs = new Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

export const LogsModel = mongoose.model('Logs', Logs)
