import redis from "../config/redis.config"
import { Tag } from "../models"

const createTag = async (data: { title: string; color: string }) => {
  const { title, color } = data

  try {
    const newTag = new Tag({ title, color })
    await newTag.save()

    await redis.del("tags")
    return newTag
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

const getAllTags = async () => {
  try {
    const cachedTags = await redis.get("tags")
    if (cachedTags) return JSON.parse(cachedTags)

    const tags = await Tag.find()
    await redis.set("tags", JSON.stringify(tags), "EX", 3600)

    return tags
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

const getTagById = async (id: string) => {
  try {
    const catchedTag = await redis.get(`tag-${id}`)
    if (catchedTag) return JSON.parse(catchedTag)

    const tag = await Tag.findById(id).populate("tags")
    if (!tag) throw new Error("Tag not found")

    await redis.set(`tag-${id}`, JSON.stringify(tag), "EX", 3600)
    return tag
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

const updateTag = async (id: string, data: { title?: string; color?: string }) => {
  try {
    const tag = await Tag.findById<any>(id)
    if (!tag) {
      throw new Error("Tag not found")
    }

    if (data.title) tag.title = data.title
    if (data.color) tag.color = data.color

    const updatedTag = await tag.save()

    await redis.del(`tag-${id}`)
    await redis.del("tags")

    return updatedTag
  } catch (error) {
    throw new Error("Error updating tag: " + (error as Error).message)
  }
}

const deleteTag = async (id: string) => {
  try {
    const tag = await Tag.findByIdAndDelete(id)

    if (!tag) throw new Error("Tag not found")

    await redis.del(`tag-${id}`)
    await redis.del("tags")

    return tag
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export default {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
}
