import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../_static/GlobalStyles';
import indexStyles from '../_styles/index';
import { atomic, styles  } from '../..';
import DirectionalNavigation from '../../views/navigation/DirectionalNavigation';
import HeaderNavigation from '../../views/navigation/HeaderNavigation';
import CatalogNavigation from '../../views/navigation/CatalogNavigation';

const { TextContent } = atomic;
const { colors } = styles;

const MainContent = styled.main`${indexStyles}`;
const Section = styled.section`
	position: relative;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	text-align: center;
`;
const Modal = styled.article`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	margin: 0 auto; 
	width: 100%;
	height: 100vh;
	padding: 50px;
	z-index: 10;
	background: rgba(0,0,0,0.5);
	> div {
		width: 100%;
		height: 100%;
		overflow: hidden scroll;
		background: white;
	}
`;
const MagicBox = styled.div`
	position: absolute;
	width: 0;
	height: 0;
	opacity: 1;
	background-color: rgb(${colors.yellow});
`;
const Headline = styled(TextContent)`
	&& {
		position: absolute;
		bottom: 25px;
		left: 75px;
		width: 90%;
		display: inline-block;
		margin: 0 auto;
		text-align: left;
		z-index: 1;
		h1 {
			margin: 0 0 50px 10px;
			line-height: 0.75;
		}
		h1, h2, h3, h4, h5 {
			width: auto;
			display: inline-block;
			text-align: left;
		}
	}
`;
const Placard = styled.aside`
	position: absolute;
	top: 50px;
	right: 50px;
	width: 35vw;
	min-width: 450px;
	max-width: 550px;
	padding: 25px;
	z-index: 3;
	border: 5px solid rgb(${colors.offBlack});
    background: rgba(255,255,255,0.75);
	> div {
		height: auto;
		min-height: 275px;
		display: flex;
		flex-flow: column;
		justify-content: center;
		padding: 25px 50px 25px 35px;
		background-color: rgb(${colors.yellow});
		h4, h5, p {
			text-align: left;
		}
		.standard_button {
			background-color: rgb(${colors.yellowWhite});
		}
	}
`;
const PlacardText = styled(TextContent)`
	margin-bottom: 20px;
`;

export default function Index({ pageContext }) {
	const { placard, headline } = pageContext.content.initial;
	return (
		<>
			<GlobalStyles />
			<HeaderNavigation data-navigation="explicit" />
			<MainContent id="main" data-page="initial">
				<Section>
					<Placard id="placard" className={'placard'}>
						<div>
							<PlacardText text={placard} />
							{ placard.btn &&
								<atomic.StandardButton { ...placard.btn} />
							}
						</div>
					</Placard>
					<CatalogNavigation data-navigation="explicit" />
					<Headline id="headline" className={'headline'} text={ headline } />
					<MagicBox id="magicbox" className={'magicbox'}>
						<div className={'magicbox_overlay'} />
						<img className={'magicbox_image-active'} />
						<img className={'magicbox_image-next'} />
						<Modal id="modal" style={{ opacity: '0', display: 'none' }}>
							<div></div>
						</Modal>
					</MagicBox>
				</Section>
			</MainContent>
			<DirectionalNavigation data-navigation="implicit" />
		</>
	)
}
