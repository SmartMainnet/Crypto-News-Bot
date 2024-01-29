import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

export const connectMongoose = (options: any = {}) => {
  if (!MONGODB_URI) {
    throw new Error('MONGO_URL is missing')
  }
  if (options?.debug) {
    mongoose.set('debug', true)
  }
  const connect = mongoose.connect(MONGODB_URI)
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
  return connect
}
