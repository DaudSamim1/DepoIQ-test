import * as TopicMutation from "./topic.mutation"
import * as TagMutation from "./tag.mutation"

export const Mutation = {
  ...TopicMutation,
  ...TagMutation
}
