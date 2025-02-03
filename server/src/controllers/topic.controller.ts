import { NextFunction, Request, Response } from "express"
import { TopicService } from "../services"

export const createTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, tags } = req.body

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" })
  }

  try {
    const newTopic = await TopicService.createTopic({ title, content, tags })
    res.status(201).json({
      status: "success",
      message: "Topic created successfully",
      data: newTopic
    })
  } catch (error) {
    next({
      status: 500,
      message: (error as Error).message,
      code: "INTERNAL_SERVER_ERROR",
      data: null
    })
  }
}

export const getAllTopics = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await TopicService.getAllTopics()
    res.status(200).json({
      status: "success",
      message: "Topics fetched successfully",
      data: topics
    })
  } catch (error) {
    next({
      status: 500,
      message: (error as Error).message,
      code: "INTERNAL_SERVER_ERROR",
      data: null
    })
  }
}

export const getTopicById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const topic = await TopicService.getTopicById(id)
    res.status(200).json({
      status: "success",
      message: "Topic fetched successfully",
      data: topic
    })
  } catch (error) {
    next({
      status: 500,
      message: (error as Error).message,
      code: "INTERNAL_SERVER_ERROR",
      data: null
    })
  }
}

export const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { title, content, tags } = req.body

  try {
    const updatedTopic = await TopicService.updateTopic(id, { title, content, tags })
    res.status(200).json({
      status: "success",
      message: "Topic updated successfully",
      data: updatedTopic
    })
  } catch (error) {
    next({
      status: 500,
      message: (error as Error).message,
      code: "INTERNAL_SERVER_ERROR",
      data: null
    })
  }
}

export const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const deletedTopic = await TopicService.deleteTopic(id)
    res.status(200).json({
      status: "success",
      message: "Topic deleted successfully",
      data: deletedTopic
    })
  } catch (error) {
    next({
      status: 500,
      message: (error as Error).message,
      code: "INTERNAL_SERVER_ERROR",
      data: null
    })
  }
}

export const addTagToTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { topicId, tagId } = req.params

  try {
    const topic = await TopicService.addTagToTopic(topicId, tagId)
    res.status(200).json({
      status: "success",
      message: "Tag added to topic successfully",
      data: topic
    })
  } catch (error) {
    next({
      status: 500,
      message: (error as Error).message,
      code: "INTERNAL_SERVER_ERROR",
      data: null
    })
  }
}

export const removeTagFromTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { topicId, tagId } = req.params

  try {
    const topic = await TopicService.removeTagFromTopic(topicId, tagId)
    res.status(200).json({
      status: "success",
      message: "Tag removed from topic successfully",
      data: topic
    })
  } catch (error) {
    next({
      status: 500,
      message: (error as Error).message,
      code: "INTERNAL_SERVER_ERROR",
      data: null
    })
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
