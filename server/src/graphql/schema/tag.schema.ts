import { gql } from "apollo-server-express"

export const TagTypeDef = gql`
  type Tag {
    id: ID!
    title: String!
    color: String!
  }

  input TagInput {
    title: String!
    color: String!
  }

  type Query {
    getTag(id: ID!): Tag
    getTags: [Tag]
  }

  type Mutation {
    createTag(input: TagInput): Tag
    updateTag(id: ID!, input: TagInput): Tag
    deleteTag(id: ID!): Tag
  }
`
