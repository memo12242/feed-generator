import { AppContext } from '../config'
import {
  QueryParams,
  OutputSchema as AlgoOutput,
} from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import * as swiftJa from './swiftJa'
import * as japanese from './japanese'
import * as llmJa from './llmJa'
type AlgoHandler = (ctx: AppContext, params: QueryParams) => Promise<AlgoOutput>

const algos: Record<string, AlgoHandler> = {
  [swiftJa.shortname]: swiftJa.handler,
  [japanese.shortname]: japanese.handler,
  [llmJa.shortname]: llmJa.handler,
}

export default algos