import React from 'react'

export default function Page({
	params,
}: // searchParams,
{
	params: { streamer: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	return <h1>{params.streamer}</h1>
}

/**
   * 
   *export async function generateStaticParams() {
	const posts = await getPosts()

	return posts.map((post) => ({
		slug: post.slug,
	}))
}
   */

// DonatePageContent
