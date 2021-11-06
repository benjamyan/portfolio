import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichtextResolver, settingsResolver } from '../..';
import { 
	defaultContainerStyling,
	floatingBox, 
	bigHeadline,
	contentList,
	defaultItem
} from './magicTextStyles';

const MagicContainer = styled.div`
	&&& {
		position: absolute;
		padding: 0;
		pointer-events: none;
		* {
			pointer-events: all;
		}
		${ defaultContainerStyling }
		${ (props) => props.magicType === 'floating' && `
			min-height: 350px;
			min-width: 400px;
			max-width: 600px;
			display: flex;
			flex-direction: column;
			padding: 35px;
			border: 2px solid #333;
			background-color: rgba(255,255,255,0.5);
			&[data-keyname='business-card'] > div {
				padding: 50px;
			}
		`}
		${ (props) => props.magicType === 'list' && `
			position: relative;
		`}
		${ (props) => props.cssSettings }
	}
`;
const RichtextWrapper = styled.div`
	${ props => props.contentStyles }
`;

export default function MagicText({ ...props }) {
	try {
		const { 
			magicText, 
			magicSettings, 
			magicType, 
			htmlAttrs = {}
		} = props;
		const cssSettings = settingsResolver(magicSettings);
		const richtextStyle = function () {
			switch (magicType) {
				case 'floating':
					return floatingBox;
				case 'headline':
					return bigHeadline;
				case 'list':
					return contentList;
				default:
					return defaultItem;
			}
		}();
		return (
			<MagicContainer
				{...htmlAttrs}
				className={'magic-text'}
				data-magictext={magicType}
				magicType={magicType}
				cssSettings={cssSettings}>
					<RichtextWrapper contentStyles={richtextStyle}>
						{RichtextResolver(magicText)}
					</RichtextWrapper>
			</MagicContainer>
		);
	} catch (err) {
		console.log(err);
		return <></>;
	}
};

MagicText.propTypes = {
	magicText: PropTypes.object.isRequired,
	magicSettings: PropTypes.string,
	magicType: PropTypes.string,
	htmlAttrs: PropTypes.object
};
