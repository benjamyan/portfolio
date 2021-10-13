import React, {Fragment} from 'react';
import { Link } from "gatsby"
import PropTypes from 'prop-types';
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
					<li key={utils.getRandomString()}>{RichtextResolver(item) }</li>
				);
			case 'hard_break':
				return <br key={utils.getRandomString()} />;
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
				if (isLink.linktype && isLink.linktype === 'story') {
					console.log(isLink.href)
					return (
						<Link
							to={isLink.href}
							key={utils.getRandomString()}>
								{item.text}
						</Link>
					);
				};
				return (
					<a 
						href={isLink.href}
						target={isLink.target}
						key={utils.getRandomString()}>
							{item.text}
					</a>
				);
			} else if (isCode) {
				return item.text;
			};
			return <Fragment key={utils.getRandomString()}>{item.text}</Fragment>;
		}();
		const textOptions = {};
		if (isCode) {
			textOptions.dangerouslySetInnerHTML = { __html: textContent };
		} else {
			textOptions.children = [
				<Fragment key={utils.getRandomString()}>{textContent}</Fragment>
			];
		};
		return (
			<MarkedText
				{...textOptions}
				styles={ markStyle.join('') }
				key={ utils.getRandomString() }
			/>
		);
	}
};

const StyledTextTag = styled.div`
	${(props) => props.styles}
`;
const MarkedText = styled.span`
	${(props) => props.styles}
`;
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
				<Fragment key={utils.getRandomString()}>{contentStr}</Fragment>
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
					<hr key={utils.getRandomString()}></hr>
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
						as={elementTextTag}
						key={utils.getRandomString()}
						styles={parentStyles}>
							{resolvedContent}
					</StyledTextTag>
				);
		};
	} catch (err) {
		console.log(err)
		return <Fragment key={ utils.getRandomString() }></Fragment>;
	}
};
function RichtextResolver({ content }) {
	try {
		const isValidContent = function () {
			if (content === undefined) {
				return false;
			};
			if (Array.isArray(content) && !!content[0].content) {
				return true;
			};
			return false;
		}();
		if (isValidContent) {
			if (Array.isArray(content)) {
				return content.map(
					(item) => <ResolvedContentBlock key={utils.getRandomString()} {...item} />
				);
			};
			return <ResolvedContentBlock {...content} key={utils.getRandomString()} />
		};
		return <Fragment key={utils.getRandomString()}></Fragment>;
	} catch (err) {
		console.log(err);
		return <Fragment key={utils.getRandomString()}></Fragment>;
	};
};
export default RichtextResolver;

ResolvedContentBlock.propTypes = {
	content: PropTypes.array,
	type: PropTypes.string
};