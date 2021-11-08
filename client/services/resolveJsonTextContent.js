const isTextBlock = (block)=> {
	if (typeof block == 'object') {
		return (
			block.h1 || block.h2 || block.h3 || block.h4 || block.h5 || block.p
		);
	} else {
		return (
			block !== 'h1' || block !== 'h2' || block !== 'h3' || block !== 'h4' || block !== 'h5' || block !== 'p'
		)
	}
}

const resolveJsonTextContent = (jsonContent)=> {
	const finalJsonContent = {};
	for (const block in jsonContent) {
		if (isTextBlock(jsonContent[block])) {
			finalJsonContent[block] = (`<${block}>${jsonContent[block]}</${block}>`).trim()
		} else {
			finalJsonContent[block] = jsonContent[block]
		}
	}
	return finalJsonContent
}

function instanciateResolver(jsonContentBlock) {
	let finalContent = {};
	if (isTextBlock(jsonContentBlock)) {
		finalContent = resolveJsonTextContent(jsonContentBlock);
	} else {
		for (const content in jsonContentBlock) {
			if (typeof jsonContentBlock[content] == 'string') {
				finalContent[content] = jsonContentBlock[content];
			} else {
				finalContent[content] = instanciateResolver(jsonContentBlock[content])
			}
		}
	}
	return finalContent
}

module.exports = instanciateResolver