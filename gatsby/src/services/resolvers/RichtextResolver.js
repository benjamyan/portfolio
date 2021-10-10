import React from 'react';
import styled from 'styled-components';
import { ComponentResolver, utils } from '../..';
//
// instead of all the nonsense below, use this as a central object, and do a key name lookup
/*
const rtTagnames = {
	'heading': `h${attrs.level}`,
	'horizontal_rule': 'hr',
	_default: 'p'
};
const rtTypes = {
	'hard_break': <br />,
	_default: item.text
};
const rtMarks = {
	'underline': 'text-decoration: underline;',
	'bold': 'font-weight: 700;',
	'italic': 'font-style: italic',
	_default: ''
};
const rtClasses = {
	'text-left': `text-align:left;`,
	'text-center': `text-align:center;`,
	'text-right': `text-align:right;`,
	'text-justify': `text-align:justify; text-align-last:justify;`
};
*/
const RichtextStyleClasses = function({ attrs }) {
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
			case ('hard_break'):
				return <br />;
			default:
				return item.text;
		}
	},
	mark(item) {
		const MARKS = item.marks;
		// const markStyle = ['display: inline-block;'];
		const markStyle = ['display: inline;'];
		let isLink = false;
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
				default:
					console.log("No case")
					console.log(MARKS[i])
			};
		}
		const Mark = styled.span`${markStyle.join('')}`;
		if (isLink !== false) {
			return (
				<Mark key={utils.getRandomString()}>
					<a href={ isLink.href} target={ isLink.target }>{ item.text }</a>
				</Mark>
			);
		};
		return (
			<Mark key={utils.getRandomString()}>{ item.text }</Mark>
		);
	},
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
const getRichtextContent = (content)=> {
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
	}
};
const getElementTagname = ({ type, attrs }) => {
	switch (type) {
		case ('heading'):
			return `h${attrs.level}`;
		default: return 'p';
	};
};

function Tempname1({ content, type, ...props }) {
	try {
		switch (type) {
			case 'horizontal_rule': 
				return (
					<hr></hr>
				);
			case 'blok':
				return (
					<ComponentResolver componentProps={props.attrs.body} />
				);
			default:
				console.log('default');
		};
		const {
			parentStyles = [],
			resolvedContent = []
		} = getRichtextContent(content);
		if (parentStyles.length > 0) {
			const tagName = getElementTagname({ type, ...props });
			const StyledTag = styled(tagName)`
				${ parentStyles }
			`;
			return (
				<StyledTag key={utils.getRandomString()}>
					{ resolvedContent }
				</StyledTag>
			);
		};
		const TextTag = getElementTagname({ type, ...props });
		return (
			<TextTag key={utils.getRandomString()}>
				{resolvedContent}
			</TextTag>
		);
	} catch (err) {
		console.log(err)
		return <></>;
	}
};

export default function RichtextResolver({ content }) {
	try {
		const isValidContent = function() {
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
					(item) => <Tempname1 key={utils.getRandomString()} {...item} />
				);
			};
			return <Tempname1 {...content} />
		};
		return <></>;
	} catch (err) {
		console.log(err);
		return <></>;
	};
};
