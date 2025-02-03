export interface GetTopicsQuery {
  getTopics: Topic[]
}

export interface Topic {
  id: string
  title: string
  content: string
  tags: TagType[]
}

export interface TagType {
  id: string
  title: string
  color: string
}

export interface GetTagsQuery {
  getTags: TagType[]
}
