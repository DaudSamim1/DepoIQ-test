import { GraphQLError } from "graphql"
import { TagInput } from "../../../types"
import { TagService } from "../../../services"

export const createTag = async (_: any, args: { input: TagInput }, context: any) => {
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
    const tag = await TagService.createTag(args.input)
    if (!tag) {
      throw new GraphQLError("Failed to create tag", {
        extensions: {
          code: "TAG_CREATION_FAILED",
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

export const updateTag = async (_: any, args: { id: string; input: TagInput }, context: any) => {
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
    const tag = await TagService.updateTag(args.id, args.input)
    if (!tag) {
      throw new GraphQLError("Failed to update tag", {
        extensions: {
          code: "TAG_UPDATE_FAILED",
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

export const deleteTag = async (_: any, args: { id: string }, context: any) => {
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
    const tag = await TagService.deleteTag(args.id)
    if (!tag) {
      throw new GraphQLError("Failed to delete tag", {
        extensions: {
          code: "TAG_DELETE_FAILED",
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
