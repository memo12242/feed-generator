import { QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import { AppContext } from '../config'

// max 15 chars
export const shortname = 'swiftJa'

export const handler = async (ctx: AppContext, params: QueryParams) => {
	let builder = ctx.db
	.selectFrom('filtered_post_swift_ja')
	.selectAll()
	.orderBy('indexedAt', 'desc')
	.orderBy('cid', 'desc')
	.limit(params.limit)

	if (params.cursor) {
		const timeStr = new Date(parseInt(params.cursor, 10)).toISOString()
		builder = builder.where('filtered_post_swift_ja.indexedAt', '<', timeStr)
	}
	const res = await builder.execute()

	const feed = res.map((row) => ({
		post: row.uri,
	}))

	let cursor: string | undefined
	const last = res.at(-1)
	if (last) {
		cursor = new Date(last.indexedAt).getTime().toString(10)
	}

	return {
		cursor,
		feed,
	}
}