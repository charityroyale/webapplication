'use client' // Error components must be Client Components

import React, { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div>
			<h2>Do hots wos!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Rerender
			</button>
		</div>
	)
}
