import mongoose from 'mongoose'

const { Schema } = mongoose

// Схема для счетчика
const Counter = new Schema({
  _id: String, // Имя коллекции
  seq: { type: Number, default: 0 }, // Текущее значение счетчика
})

export const CounterModel = mongoose.model('Counter', Counter)