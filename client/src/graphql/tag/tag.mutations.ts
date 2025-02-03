import { gql } from "@apollo/client"

export const CREATE_TAG = gql`
  mutation CreateTag($input: TagInput!) {
    createTag(input: $input) {
      id
      title
      color
    }
  }
`

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: ID!, $input: TagInput!) {
    updateTag(id: $id, input: $input) {
      id
      title
      color
    }
  }
`
export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      id
      title
    }
  }
`
