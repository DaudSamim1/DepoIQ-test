import { gql } from "@apollo/client"

export const CREATE_TOPIC = gql`
  mutation CreateTopic($input: TopicInput!) {
    createTopic(input: $input) {
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

export const UPDATE_TOPIC = gql`
  mutation UpdateTopic($id: ID!, $input: TopicInput!) {
    updateTopic(id: $id, input: $input) {
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
export const DELETE_TOPIC = gql`
  mutation DeleteTopic($id: ID!) {
    deleteTopic(id: $id) {
      id
      title
    }
  }
`
