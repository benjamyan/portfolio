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
	'text-left': 'text-align: left;',
	'text-center': 'text-align: center;',
	'text-right': 'text-align:right; float:right;'
};
*/
const RichtextStyleClasses = function({ attrs }) {
	switch (attrs.class) {
		case 'text-center':
			return `text-align: center;`;
		case 'text-right':
			return `text-align:right;`;
		case 'text-justify':
			return `text-align: justify;`;
		case 'text-left':
			return `text-align: left;`;
		default:
			return `text-align: left;`;
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
		console.log(item)
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
				default:
					console.log("No case")
					console.log(MARKS[i])
			};
		}
		const Mark = styled.span`${markStyle.join('')}`;
		if (isLink !== false) {
			console.log(isLink)
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

const getTextContent = (item) => {
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
	switch (type) {
		case ('heading'): 
			return `h${attrs.level}`;
		default: return 'p';
	};
};

function Tempname1({ content, type, ...props }) {
  try {
		if (type === 'blok') {
			return (
				<ComponentResolver 
					componentProps={props.attrs.body} 
					key={utils.getRandomString()} 
				/>
			)
		} else if (type === 'horizontal_rule') {
			return <hr></hr>;
		} else {
			const FoundTag = getElementTagname({ type, ...props });
			let StyledFoundTag = styled(FoundTag)``;
			const textContent = content.map(
				(item) => {
					const { 
						contentStr, 
						parentStyle 
					} = getTextContent(item);
					StyledFoundTag = styled(StyledFoundTag)`
						${parentStyle}
					`;
					return (
						<React.Fragment key={utils.getRandomString()}>
							{contentStr}
						</React.Fragment>
					)
				}
			);
			return (
				<StyledFoundTag key={utils.getRandomString()}>
					{textContent}
				</StyledFoundTag>
			);
		};
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
