import React from 'react';

export default function RawContent(content ) {
	console.log(content)
	return (
		<script id={ content.component }>
			{ JSON.stringify(content) }
		</script>
	)
}
