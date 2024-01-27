import { SubscriptionsModel } from '../models/index.js'

export const blockSource = async (user_id: number, name: string) => {
  try {
    let subscriptions = await SubscriptionsModel.findOne({ user_id })

    if (!subscriptions) {
      subscriptions = await SubscriptionsModel.create({
        user_id,
        blocked_sources: []
      })
    }
  
    const checkBlocked = subscriptions.blocked_sources.some(e => e.name === name)
  
    if (checkBlocked) {
      return 'already blocked'
    } else {
      await SubscriptionsModel.findOneAndUpdate(
        { user_id },
        {
          $push: {
            blocked_sources: {
              name
            }
          }
        }
      )

      return 'successfully blocked'
    }
  } catch (e) {
    console.log(e)
  }
}

export const unblockSource = async (user_id: number, name: string) => {
  try {
    let subscriptions = await SubscriptionsModel.findOne({ user_id })

    if (!subscriptions) {
      subscriptions = await SubscriptionsModel.create({
        user_id,
        blocked_sources: []
      })
    }
  
    const checkBlocked = subscriptions.blocked_sources.some(e => e.name === name)
  
    if (!checkBlocked) {
      return 'already unblocked'
    } else {
      await SubscriptionsModel.findOneAndUpdate(
        { user_id },
        {
          $pull: {
            blocked_sources: {
              name
            }
          }
        }
      )

      return 'successfully unblocked'
    }
  } catch (e) {
    console.log(e)
  }
}

export const getBlockedSources = async (user_id: number) => {
  const subscriptions = await SubscriptionsModel.findOne({ user_id })

  if (!subscriptions?.blocked_sources) {
    return []
  }

  if (subscriptions.blocked_sources.length > 0) {
    return subscriptions.blocked_sources.map(source => source.name)
  }
}

export const getNotifications = async (user_id: number) => {
  const subscriptions = await SubscriptionsModel.findOne({ user_id })

  if (!subscriptions) {
    return []
  }

  return subscriptions.notifications
}

export const changeNotifications = async (user_id: number) => {
  await SubscriptionsModel.findOneAndUpdate(
    { user_id },
    [{
      $set: {
        notifications: {
          $not: '$notifications'
        }
      }
    }]
  )
}