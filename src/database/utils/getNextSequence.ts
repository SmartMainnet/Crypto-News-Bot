import { CounterModel } from '../models/index.js'

export const getNextSequence = async (name: string) => {
  const counter = await CounterModel.findByIdAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
  return counter.seq
}
