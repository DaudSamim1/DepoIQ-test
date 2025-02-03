import { gql } from "@apollo/client"

export const GET_ALL_TOPICS = gql`
  query GetTopics {
    getTopics {
      id
      title
      content
      tags {
        id
        title
        color
      }
    }
  }
`

export const GET_TOPIC_BY_ID = gql`
  query GetTopic($id: ID!) {
    getTopic(id: $id) {
      id
      title
      content
      tags {
        id
        title
        color
      }
    }
  }
`
