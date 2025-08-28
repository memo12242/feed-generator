import { QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton'
import { AppContext } from '../config'

// max 15 chars
export const shortname = 'swiftJa'

export const handler = async (ctx: AppContext, params: QueryParams) => {
	let builder = ctx.db
	.selectFrom('post')
	.selectAll()
	.where((eb) => eb.or([
		// 言語
		eb('text', 'like', '%swift%'),
		// フレームワーク
		eb('text', 'like', '%swiftui%'),
		eb('text', 'like', '%uikit%'),
		eb('text', 'like', '%appkit%'),
		eb('text', 'like', '%coredata%'),
		eb('text', 'like', '%swiftdata%'),
		eb('text', 'like', '%coredata%'),
		eb('text', 'like', '%spritekit%'),
		eb('text', 'like', '%arkit%'),
		eb('text', 'like', '%avfoundation%'),
		eb('text', 'like', '%storekit%'),
		// 開発
		eb('text', 'like', '%iosdev%'),
		eb('text', 'like', '%ios開発%'),
		eb('text', 'like', '%iosアプリ開発%'),
		eb('text', 'like', '%iosアプリの開発%'),
		eb('text', 'like', '%macdev%'),
		eb('text', 'like', '%iOS%ビルド%'),
		// コード
		eb('text', 'like', '%@MainActor%'),
		eb('text', 'like', '%appdelegate%'),
		// SwiftUI コード
		eb('text', 'like', '%AppStorage%'),
		// UIKit コード
		eb('text', 'like', '%UserDefaults%'),
		// 開発ツール
		eb('text', 'like', '%xcode%'),
		eb('text', 'like', '%cocoapods%'),
		eb('text', 'like', '%appstore connect%'),
		eb('text', 'like', '%appstore審査%'),
		eb('text', 'like', '%testflight%'),
		// イベント
		eb('text', 'like', '%wwdc%'),
		eb('text', 'like', '%iosdc%'),
		// URL
		eb('text', 'like', '%https://developer.apple.com/%'),
		// OS
		//eb('text', 'like', '%iOS%+%'),
		//eb('text', 'like', '%macOS%+%'),
		//eb('text', 'like', '%watchOS%+%'),
		//eb('text', 'like', '%tvOS%+%'),
		//eb('text', 'like', '%visionOS%+%'),
		// 機能
		eb('text', 'like', '%liquid%glass%'),
	]))
	.where('text', 'not like', '%microsoft%')
	.where('text', 'not like', '%taylor%')
	.where('text', 'not like', '%キーボード%')
	.where('text', 'not like', '%自動運転%')
	.where('text', 'not like', '%music%')
	.where('text', 'not like', '%youtube%')
	.where('text', 'not like', '%金融%')
	.where('text', 'not like', '%swifties%')
	.where('text', 'not like', '%atmarkit%')
	.where('text', 'not like', '%honest_swift%')
	.where('text', 'not like', '%TSwiftNewsJP%')
	.orderBy('indexedAt', 'desc')
	.orderBy('cid', 'desc')
	.limit(params.limit)

	if (params.cursor) {
		const timeStr = new Date(parseInt(params.cursor, 10)).toISOString()
		builder = builder.where('post.indexedAt', '<', timeStr)
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