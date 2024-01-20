import mongoose from 'mongoose'

const { Schema } = mongoose

const Counter = new Schema({
  _id: String,
  seq: {
    type: Number,
    default: 0
  }
})

export const CounterModel = mongoose.model('Counter', Counter)