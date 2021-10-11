import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichtextResolver, settingsResolver } from '../..';
import { 
	defaultTextStyling,
	floatingBox, 
	bigHeadline,
	contentList
} from './magicTextStyles';

const MagicContainer = styled.div`
	&&& {
		position: absolute;
		padding: 0;
		pointer-events: none;
		* {
			pointer-events: all;
		}
		${ defaultTextStyling }
		${ (props) => props.magicType === 'floating' && `
			padding: 35px;
			border: 2px solid #333;
			background-color: rgba(255,255,255,0.5);
		`}
		${ (props) => props.magicType === 'list' && `
			position: relative;
		`}
		${ (props) => props.cssSettings }
	}
`;
const ContentWrapper = (magicType)=> {
	let StyledMainContent;
	switch (magicType) {
		case 'floating':
			StyledMainContent = styled.div`
				${ floatingBox }
			`;
			break;
		case 'headline':
			StyledMainContent = styled.div`
				${ bigHeadline }
			`;
			break;
		case 'list':
			StyledMainContent = styled.div`
				${ contentList }
			`;
			break;
		default :
			StyledMainContent = styled.div`
				position: relative;
				width: 100%;
				height: 100%;
			`;
	}
	return StyledMainContent;
};

export default function MagicText({ magicText, magicSettings, magicType }) {
	const RichtextWrapper = ContentWrapper(magicType);
	const cssSettings = settingsResolver(magicSettings);
	return (
		<MagicContainer magicType={magicType} cssSettings={cssSettings} data-magictext={magicType}>
			<RichtextWrapper>
				{ RichtextResolver(magicText) }
			</RichtextWrapper>
		</MagicContainer>
	);
};

MagicText.propTypes = {
	magicText: PropTypes.object.isRequired,
	magicSettings: PropTypes.string,
	magicType: PropTypes.string
};
