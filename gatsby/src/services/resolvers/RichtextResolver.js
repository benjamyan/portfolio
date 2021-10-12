import React from 'react';
import styled from 'styled-components';
import { ComponentResolver, utils } from '../..';

/*
const rtTagnames = {
	'heading': function(attrs) {
		return `h${attrs.level}`
	},
	'horizontal_rule': 'hr',
	'bullet_list': 'ul',
	'list_item': 'li',
	_default: 'p'
};
const rtTypes = {
	'hard_break': <br />,
	_default: function(item) {
		return item.text
	}
};
const rtMarks = {
	'underline': 'text-decoration: underline;',
	'bold': 'font-weight: 700;',
	'italic': 'font-style: italic',
	_default: ''
};
const rtClasses = {
	'text-left': `text-align: left;`,
	'text-center': `text-align: center;`,
	'text-right': `text-align: right;`,
	'text-justify': `
		text-align: justify; 
		text-align-last: justify;
	`
};
*/

// const StyledTextTag = styled((props) => !!props.tagName ? props.tagName : 'p')`
const StyledTextTag = styled(
		({ tag, children, ...props })=> React.createElement(tag, props, children)
	)`
		${({ tagStyles = '' }) => tagStyles}
	`;
const MarkedText = styled.span`
	${({ tagStyles = '' }) => tagStyles}
`;
const RichtextStyleClasses = function ({ attrs }) {
	switch (attrs.class) {
		case 'text-center':
			return `text-align:center;`;
		case 'text-right':
			return `text-align:right;`;
		case 'text-left':
			return `text-align:left;`;
		case 'text-justify':
			return `text-align:justify; text-align-last:justify;`;
		default:
			return `text-align:left;`;
	}
};
const RT = {
	type(item) {
		switch (item.type) {
			case 'list_item':
				return (
					<li>{RichtextResolver(item) }</li>
				);
			case 'hard_break':
				return <br />;
			default:
				return item.text;
		}
	},
	mark(item) {
		const MARKS = item.marks;
		const markStyle = ['display: inline;'];
		let isLink = false,
			isCode = false;
		for (let i = 0; i < MARKS.length; i++) {
			switch (MARKS[i].type) {
				case 'underline':
					markStyle.push(
						'text-decoration: underline;',
					);
					break;
				case 'bold':
					markStyle.push(
						'font-weight: 700;',
					);
					break;
				case 'italic':
					markStyle.push(
						'font-style: italic;',
					);
					break;
				case 'strike':
					markStyle.push(
						`&&&&{ -webkit-text-stroke-width: 2px; color: rgba(0,0,0,0) }`,
					);
					break;
				case 'link':
					isLink = MARKS[i].attrs;
					break;
				case 'styled':
					break;
				case 'code':
					isCode = true;
					break;
				default:
					console.log("No case")
					console.log(MARKS[i])
			};
		};
		const textContent = function() {
			if (!!isLink) {
				return (
					<a href={isLink.href} target={isLink.target}>{item.text}</a>
				);
			} else if (isCode) {
				return JSON.stringify(item.text);
			};
			return item.text;
		}();
		return (
			<MarkedText
				tagStyles={ markStyle.join('') }
				key={utils.getRandomString()}
				dangerouslySetInnerHTML={ isCode ? { __html: item.text } : null }>
					{ !isCode ? textContent: false }
			</MarkedText>
		);
		/*
		if (!!isLink) {
			return (
				<MarkedText 
					tagStyles={ markStyle.join('') }
					key={utils.getRandomString()}>
						<a href={ isLink.href} target={ isLink.target }>{ item.text }</a>
				</MarkedText>
			);
		};
		if (isCode) {
			return (
				<MarkedText
					tagStyles={markStyle.join('')}
					key={utils.getRandomString()}
					dangerouslySetInnerHTML={{ __html: item.text }}
				/>
			);
		};
		return (
			<MarkedText 
				tagStyles={markStyle.join('')}
				key={utils.getRandomString()}>
					{item.text}
			</MarkedText>
		);
		*/
	}
};

const processSoloTextContent = (item) => {
	let contentStr = item.text,
		parentStyle = [];
	if (item.type) {
		contentStr = RT.type(item);
	};
	if (item.marks) {
		const itemStyle = item.marks.find(m => m.type === 'styled') || false;
		if (!!itemStyle) {
			parentStyle = RichtextStyleClasses(itemStyle);
		};
		contentStr = RT.mark(item);
	};
	return {
		contentStr, parentStyle
	}
};
const getElementTagname = ({ type, attrs }) => {
	let tagname = '';
	switch (type) {
		case ('heading'):
			tagname = `h${attrs.level}`;
			break;
		case 'bullet_list':
			tagname = `ul`;
			break;
		default: 
			tagname = 'p';
	};
	return tagname;
};
const resolvedRichtextContent = (content)=> {
	const parentStyles = [];
	const resolvedContent = content.map(
		(item) => {
			const {
				contentStr,
				parentStyle = false
			} = processSoloTextContent(item);
			if (parentStyle) {
				parentStyles.push(parentStyle);
			};
			return (
				<React.Fragment key={utils.getRandomString()}>
					{contentStr}
				</React.Fragment>
			);
		}
	);
	return {
		parentStyles,
		resolvedContent
	};
};

function ResolvedContentBlock({ content, type, ...props }) {
	try {
		switch (type) {
			case 'horizontal_rule': 
				return (
					<hr></hr>
				);
			case 'blok':
				return props.attrs.body.map(
					(component)=> (
						<ComponentResolver 
							componentProps={component} 
							key={ utils.getRandomString() }
						/>
					)
				);
			default:
				const elementTextTag = getElementTagname({ type, ...props });
				const {
					parentStyles = [],
					resolvedContent = []
				} = resolvedRichtextContent(content);
				return (
					<StyledTextTag
						tag={elementTextTag}
						tagName={elementTextTag}
						tagStyles={parentStyles}
						key={utils.getRandomString()}>
							{resolvedContent}
					</StyledTextTag>
				);
		};
	} catch (err) {
		console.log(err)
		return <></>;
	}
};
function RichtextResolver({ content }) {
	try {
		const isValidContent = function () {
			if (content === undefined) {
				return false
			};
			if (Array.isArray(content) && !!content[0].content) {
				return true
			};
			return false;
		}();
		if (isValidContent) {
			if (Array.isArray(content)) {
				return content.map(
					(item) => <ResolvedContentBlock key={utils.getRandomString()} {...item} />
				);
			};
			return <ResolvedContentBlock {...content} />
		};
		return <></>;
	} catch (err) {
		console.log(err);
		return <></>;
	};
};
export default RichtextResolver;
