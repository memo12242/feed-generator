export type DatabaseSchema = {
  post: Post
  sub_state: SubState
  filtered_post_swift_ja: Post
  filtered_post_llm_ja: Post
}

export type Post = {
  uri: string
  cid: string
  text: string
  indexedAt: string
}

export type SubState = {
  service: string
  cursor: number
}