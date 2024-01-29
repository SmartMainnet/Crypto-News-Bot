import { TagsModel } from '../models/index.js'
import { ITag } from '../../types/index.js'

export const newTags = async (tags: ITag[]) => {
  try {
    const keys = tags.map((tag: ITag) => tag.key)
    const tagsByDB = await TagsModel.find({ key: { $in: keys } })

    const existingKeys = tagsByDB.map((tag: ITag) => tag.key)
    const newTags = tags.filter((tag: ITag) => !existingKeys.includes(tag.key))

    if (newTags.length > 0) {
      for (const tag of newTags) {
        await TagsModel.findOneAndUpdate(tag)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export const incrementTagNewsCount = async (keys: string[]) => {
  await TagsModel.updateMany(
    { key: { $in: keys } },
    {
      $inc: { news_count: 1 },
    }
  )
}

export const getTags = async (page = 0, limit = 20) => {
  const tags = await TagsModel.find()
    .sort({ news_count: -1 })
    .limit(limit)
    .skip(page * limit)
  const total = await TagsModel.countDocuments()

  return {
    total,
    limit,
    page,
    max_page: Math.ceil(total / limit),
    tags: tags.map(tag => ({
      id: tag.id,
      key: tag.key,
      name: tag.name,
      news_count: tag.news_count,
    })),
  }
}

export const getTagsByKeys = async (keys: string[]) => {
  const tags = await TagsModel.find({ key: { $in: keys } })

  return tags.map(tag => ({
    id: tag.id,
    key: tag.key,
    name: tag.name,
    news_count: tag.news_count,
  }))
}

export const getTagByID = async (id: number) => {
  const tag = await TagsModel.findOne({ id })

  if (tag) {
    return {
      id: tag.id,
      key: tag.key,
      name: tag.name,
      news_count: tag.news_count,
    }
  }
}
