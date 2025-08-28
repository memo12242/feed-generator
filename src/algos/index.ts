import { AppContext } from '../config'
import {
  QueryParams,
  OutputSchema as AlgoOutput,
} from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import * as swiftJa from './swiftJa'
import * as japanese from './japanese'
type AlgoHandler = (ctx: AppContext, params: QueryParams) => Promise<AlgoOutput>

const algos: Record<string, AlgoHandler> = {
  [swiftJa.shortname]: swiftJa.handler,
  [japanese.shortname]: japanese.handler,
}

export default algos