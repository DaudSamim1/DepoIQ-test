import { GraphQLError } from "graphql"
import { TagService } from "../../../services"

export const getTag = async (_: any, args: { id: string }, context: any) => {
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
    const tag = await TagService.getTagById(args.id)
    if (!tag) {
      throw new GraphQLError("Failed to get tag", {
        extensions: {
          code: "TAG_GET_FAILED",
          http: { status: 500 }
        }
      })
    }
    return tag
  } catch (error) {
    if (error instanceof GraphQLError) throw error
    else return null
  }
}

export const getTags = async (_: any, _args: any, context: any) => {
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
    const tags = await TagService.getAllTags()
    if (!tags) {
      throw new GraphQLError("Failed to get tags", {
        extensions: {
          code: "TAGS_GET_FAILED",
          http: { status: 500 }
        }
      })
    }
    return tags
  } catch (error) {
    if (error instanceof GraphQLError) throw error
    else return null
  }
}
