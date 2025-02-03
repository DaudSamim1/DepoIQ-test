import { GraphQLError } from "graphql"
import { TopicInput } from "../../../types"
import { TopicService } from "../../../services"

export const createTopic = async (_: any, args: { input: TopicInput }, context: any) => {
  const { userId } = context
  if (!userId) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 }
      }
    })
  }

  try {
    const topic = await TopicService.createTopic(args.input)
    if (!topic) {
      throw new GraphQLError("Failed to create topic", {
        extensions: {
          code: "TOPIC_CREATION_FAILED",
          http: { status: 500 }
        }
      })
    }
    return topic
  } catch (error) {
    if (error instanceof GraphQLError) throw error
    else return null
  }
}

export const updateTopic = async (_: any, args: { id: string; input: TopicInput }, context: any) => {
  const { userId } = context
  if (!userId) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 }
      }
    })
  }

  try {
    const topic = await TopicService.updateTopic(args.id, args.input)
    if (!topic) {
      throw new GraphQLError("Failed to update topic", {
        extensions: {
          code: "TOPIC_UPDATE_FAILED",
          http: { status: 500 }
        }
      })
    }
    return topic
  } catch (error) {
    if (error instanceof GraphQLError) throw error
    else return null
  }
}

export const deleteTopic = async (_: any, args: { id: string }, context: any) => {
  const { userId } = context
  if (!userId) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 401 }
      }
    })
  }

  try {
    const topic = await TopicService.deleteTopic(args.id)
    if (!topic) {
      throw new GraphQLError("Failed to delete topic", {
        extensions: {
          code: "TOPIC_DELETION_FAILED",
          http: { status: 500 }
        }
      })
    }
    return topic
  } catch (error) {
    if (error instanceof GraphQLError) {
      throw error
    } else {
      return null
    }
  }
}
