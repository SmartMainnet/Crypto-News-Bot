import { SubscriptionsModel } from '../models/index.js'

export const newSubscribe = async (user_id: number, key: string) => {
  try {
    let subscriptions = await SubscriptionsModel.findOne({ user_id })

    if (!subscriptions) {
      subscriptions = await SubscriptionsModel.create({
        user_id,
        tags: []
      })
    }
  
    const checkTag = subscriptions.tags.some(e => e.key === key)
  
    if (checkTag) {
      return 'already subscribed'
    } else {
      await SubscriptionsModel.findOneAndUpdate(
        { user_id },
        {
          $push: {
            tags: {
              key
            }
          }
        }
      )

      return 'successfully subscribed'
    }
  } catch (e) {
    console.log(e)
  }
}

export const newUnsubscribe = async (user_id: number, key: string) => {
  try {
    let subscriptions = await SubscriptionsModel.findOne({ user_id })

    if (!subscriptions) {
      subscriptions = await SubscriptionsModel.create({
        user_id,
        tags: []
      })
    }
  
    const checkTag = subscriptions.tags.some(e => e.key === key)
  
    if (!checkTag) {
      return 'already unsubscribed'
    } else {
      await SubscriptionsModel.findOneAndUpdate(
        { user_id },
        {
          $pull: {
            tags: {
              key
            }
          }
        }
      )

      return 'successfully unsubscribed'
    }
  } catch (e) {
    console.log(e)
  }
}

export const getSubscriptions = async (user_id: number) => {
  const subscriptions = await SubscriptionsModel.findOne({ user_id })

  if (!subscriptions) {
    return []
  }

  if (subscriptions.tags.length === 0) {
    return ['Вы еще ни на что не подписаны!']
  }

  return subscriptions.tags.map(tag => tag.key)
}

export const unsubscribeAll = async (user_id: number) => {
  try {
    await SubscriptionsModel.findOneAndUpdate(
      { user_id },
      {
        $set: {
          tags: []
        }
      }
    )
  } catch (e) {
    console.log(e)
  }
}