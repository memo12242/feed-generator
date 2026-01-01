export type DatabaseSchema = {
  post: Post
  sub_state: SubState
  filtered_post_swift_ja: Post
  filtered_post_llm_ja: Post
}

export type BasePost = {
  uri: string
  cid: string
  text: string
  indexedAt: string
}

export type Post = BasePost & {
  author: string | null
}

export type SubState = {
  service: string
  cursor: number
}
