import { NextFunction, Request, Response } from "express"
import { TagService } from "../services"

export const createTag = async (req: Request, res: Response, next: NextFunction) => {
  const { title, color } = req.body

  if (!title || !color) {
    return res.status(400).json({ error: "Title and Color are required" })
  }

  try {
    const newTag = await TagService.createTag({ title, color })
    res.status(201).json({
      status: "success",
      message: "Tag created successfully",
      data: newTag
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

export const getAllTags = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await TagService.getAllTags()
    res.status(200).json({
      status: "success",
      message: "Tags fetched successfully",
      data: tags
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

export const getTagById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const tag = await TagService.getTagById(id)
    res.status(200).json({
      status: "success",
      message: "Tag fetched successfully",
      data: tag
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

export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { title, color } = req.body

  try {
    const tag = await TagService.updateTag(id, { title, color })
    res.status(200).json({
      status: "success",
      message: "Tag updated successfully",
      data: tag
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

export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  try {
    const tag = await TagService.deleteTag(id)
    res.status(200).json({
      status: "success",
      message: "Tag deleted successfully",
      data: tag
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
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
}
