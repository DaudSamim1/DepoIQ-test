import { Request } from "express"

export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string
    sessionId: string
  }
}

export interface TopicInput {
  title: string
  content: string
  tags: string[]
}

export interface TagInput {
  title: string
  color: string
}
