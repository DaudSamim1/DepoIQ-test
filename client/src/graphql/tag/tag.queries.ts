import { gql } from "@apollo/client"

export const GET_ALL_TAGS = gql`
  query GetTags {
    getTags {
      id
      title
      color
    }
  }
`
export const GET_TAG_BY_ID = gql`
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      title
      color
    }
  }
`
