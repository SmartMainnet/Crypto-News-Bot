import winston from 'winston'
import chalk from 'chalk'
import { nanoid } from 'nanoid'
import lodash from 'lodash'
const { omit } = lodash

import { LogsModel } from '../database/models/logs.js'

let transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf((info) => {
        const message = typeof info.message === 'string' ? info.message : JSON.stringify(info.message)
        let s = `${info.timestamp}`
        s += ` ${chalk.bold(info.level)}`
        if (info.reqId) {
          s += ` ${chalk.bold.yellow(info.reqId.slice(0, 6))}`
        }
        if (info.scene) {
          s += ` ${chalk.bold.green(info.scene)}`
        }
        if (info.userId) {
          s += ` ${chalk.bold.cyan(info.userId)}`
        }
        if (info.user) {
          s += ` ${chalk.magenta(info.user)}`
        }
        s += ': '
        s += info.stack ? `${message}\n${info.stack}` : message
        if (info.duration !== undefined) {
          s += ` - ${info.duration} ms`
        }
        const extra = omit(info, [
          'message', 'level', 'timestamp', // built-in
          'service', // global
          'traceId', 'reqId', 'scene', 'userId', 'user', 'stack', 'duration', // locally handled
        ])
        if (Object.keys(extra).length > 0) {
          s += ' ['
          s += Object.entries(extra).map(([k, v]) => {
            let formattedV
            try {
              formattedV = JSON.stringify(v, null, 2)
            } catch (error) {
              formattedV = v.toString()
            }
            return `${k}: ${formattedV}`
          }).join(', ')
          s += ']'
        }
        return s
      }),
    ),
  }),
]

let eventsTransports = [new winston.transports.Console({ silent: true })]

const logger: any = winston.createLogger({
  transports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
  ),
})

const eventsFormatter = winston.format((info) => {
  info.ev = true
  return info
})

logger.events = winston.createLogger({
  transports: eventsTransports,
  format: winston.format.combine(
    winston.format.timestamp(),
    eventsFormatter(),
  ),
})

logger.telegram = {}

const notifyChannels = process.env.TELEGRAM_LOGS
  ? process.env.TELEGRAM_LOGS.split(',').reduce((acc: any, curr) => {
      const [key, value] = curr.split(':')
      acc[key] = value
      return acc
    }, {})
  : {}

logger.telegram = new Proxy({}, {
  get: (target, prop) => {
    const name = prop
    if (process.env.TELEGRAM_LOGS === '0') return () => {}
    if (!notifyChannels[name]) {
      logger.warn('unknown telegram log target', { name })
      return async () => {}
    }
    return async (text: string) => {
      const logID = nanoid()
      await LogsModel.create({
        log_id: logID,
        to: name,
        data: { text },
      }).catch((error: any) => logger.error(`failed to send log to ${String(name)}`, error))
    }
  }
})

export const log = logger