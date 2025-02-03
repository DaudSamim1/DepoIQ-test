import { GraphQLError } from "graphql"
import { TopicService } from "../../../services"

export const getTopic = async (_: any, args: { id: string }, context: any) => {
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
    const topic = await TopicService.getTopicById(args.id)
    if (!topic) {
      throw new GraphQLError("Failed to get topic", {
        extensions: {
          code: "TOPIC_GET_FAILED",
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

export const getTopics = async (_: any, _args: any, context: any) => {
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
    const topics = await TopicService.getAllTopics()
    if (!topics) {
      throw new GraphQLError("Failed to get topics", {
        extensions: {
          code: "TOPICS_GET_FAILED",
          http: { status: 500 }
        }
      })
    }
    return topics
  } catch (error) {
    if (error instanceof GraphQLError) throw error
    else return null
  }
}
