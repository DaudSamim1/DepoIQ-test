import { gql } from "apollo-server-express"

export const TopicTypeDef = gql`
  type Topic {
    id: ID!
    title: String!
    content: String!
    tags: [Tag]
  }

  input TopicInput {
    title: String!
    content: String!
    tags: [ID]!
  }

  type Query {
    getTopic(id: ID!): Topic
    getTopics: [Topic]
  }

  type Mutation {
    createTopic(input: TopicInput): Topic
    updateTopic(id: ID!, input: TopicInput): Topic
    deleteTopic(id: ID!): Topic
  }
`
