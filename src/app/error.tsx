'use client'

import React, { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div>
			<h2>Do hots wos!</h2>
			<button onClick={() => reset()}>Rerender</button>
		</div>
	)
}
