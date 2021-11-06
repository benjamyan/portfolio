const visit = require("unist-util-visit");

const regexp = {
	tag: /(?<=<)(.*?)(?=>)/gis,
	space: /\s/g
}
const custom = {
	close: '/::/',
	seperator: '::'
}

const getHtmlTagFromValue = (parsedValue)=> {
	const tagRegexp = parsedValue.match(regexp.tag);
	if (tagRegexp[0].length > 0) {
		return tagRegexp[0]
	}
	return false;
};

async function TransformHeaderToHtml(headerValue) {
	const transformedNodeParams = {
		type: 'html',
		children: undefined
	}
	let tempValue;
	if (headerValue.indexOf(custom.close) == -1) {
		const parsedValue =
			headerValue
				.split(regexp.space)
				.map(
					(valueSet)=> valueSet.split(custom.seperator).join('=')
				)
				.join(' ');
		const htmlTag = getHtmlTagFromValue(parsedValue);
		if (htmlTag) {
			tempValue = `<${htmlTag} ${parsedValue.replace('<'+htmlTag+'>', '')}>`;
		} else {
			tempValue = `<div ${parsedValue.replace('<>', '') }>`;
		};
	} else {
		const htmlTag = getHtmlTagFromValue(headerValue);
		if (htmlTag) {
			tempValue = `</${htmlTag}>`;
		} else {
			tempValue = `</div>`;
		}
	}
	return {
		...transformedNodeParams,
		value: tempValue || 'ERR! gatsby-remark-custom-markup'
	}
}

module.exports = async ({ markdownAST }) => {
	try {
		visit(markdownAST, "heading", async (node) => {
			if (node.depth == 1) {
				const isHtmlNode = node.children.some(
					child => child.value.indexOf(custom.seperator) > -1
				);
				if (isHtmlNode) {
					const concatNodeValues = node.children.map(
						child=> child.value
					).join(' ');
					const newMarkdown = await TransformHeaderToHtml(concatNodeValues);
					for (const key in newMarkdown) {
						node[key] = newMarkdown[key]
					}
				}
			}
		})
		return markdownAST
	} catch (err) {
		console.log(err)
		return markdownAST
	}
}