import redis from "../config/redis.config"
import { Topic } from "../models"

const createTopic = async (data: { title: string; content: string; tags: string[] }) => {
  const { title, content, tags } = data

  try {
    const newTopic = await (await Topic.create({ title, content, tags })).populate("tags")

    await redis.del("topics")
    return newTopic
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

const getAllTopics = async () => {
  try {
    const cachedTopics = await redis.get("topics")
    if (cachedTopics) return JSON.parse(cachedTopics)

    const topics = await Topic.find().populate("tags").sort({ createdAt: -1 })
    await redis.set("topics", JSON.stringify(topics), "EX", 3600)

    return topics
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

const getTopicById = async (id: string) => {
  try {
    const catchedTopic = await redis.get(`topic-${id}`)
    if (catchedTopic) return JSON.parse(catchedTopic)

    const topic = await Topic.findById(id).populate("tags")
    if (!topic) throw new Error("Topic not found")

    await redis.set(`topic-${id}`, JSON.stringify(topic), "EX", 3600)
    return topic
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

const updateTopic = async (id: string, data: { title?: string; content?: string; tags: string[] }) => {
  try {
    const topic = await Topic.findById<any>(id)
    if (!topic) {
      throw new Error("Topic not found")
    }

    if (data.title) topic.title = data.title
    if (data.content) topic.content = data.content
    if (data.tags) topic.tags = data.tags

    const updatedTopic = await (await topic.save()).populate("tags")

    await redis.del(`topic-${id}`)
    await redis.del("topics")

    return updatedTopic
  } catch (error) {
    throw new Error("Error updating topic: " + (error as Error).message)
  }
}

const deleteTopic = async (id: string) => {
  try {
    const topic = await Topic.findByIdAndDelete(id)

    if (!topic) throw new Error("Topic not found")

    await redis.del(`topic-${id}`)
    await redis.del("topics")

    return topic
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

const addTagToTopic = async (topicId: string, tagId: string) => {
  try {
    const topic = await getTopicById(topicId)

    if (!topic.tags.includes(tagId)) {
      topic.tags.push(tagId)
      await topic.save()

      await redis.del(`topic-${topicId}`)
      await redis.del("topics")
    }

    return topic
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

const removeTagFromTopic = async (topicId: string, tagId: string) => {
  try {
    const topic = await getTopicById(topicId)

    if (topic.tags.includes(tagId)) {
      topic.tags = topic.tags.filter((tag: string) => tag !== tagId)
      await topic.save()

      await redis.del(`topic-${topicId}`)
      await redis.del("topics")
    }

    return topic
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export default {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
  addTagToTopic,
  removeTagFromTopic
}
