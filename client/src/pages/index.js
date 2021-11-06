import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './_static/GlobalStyles';
import { atomic, styles  } from '../';
import DirectionalNavigation from '../views/navigation/DirectionalNavigation';
import HeaderNavigation from '../views/navigation/HeaderNavigation';

const { TextContent } = atomic;
const { colors } = styles;

const MainContent = styled.main`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
`;
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
	width: 400px;
	height: 350px;
	z-index: -1;
	background-color: rgb(${colors.yellow});
`;
const Headline = styled.div`
	position: absolute;
	bottom: 5%;
	left: 5%;
	width: 90%;
	display: inline-block;
	margin: 0 auto;
	text-align: left;
	h1 {
		margin-left: 10px;
		line-height: 1;
	}
	h1, h2, h3, h4, h5 {
		width: auto;
		display: inline-block;
		text-align: left;
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

const ContentBlock = ({ headline, placard })=> {
	return (
		<Section>
			<Placard id="placard" className={'placard'}>
				<div>
					<TextContent text={ placard } />
				</div>
			</Placard>
			<Headline id="headline" className={'headline'}>
				<h1>{ headline.h1 }</h1>
				<h3>
					<span className={'super'}>{ headline.h3.super } </span>
					<span className={'minor'}>{ headline.h3.minor } </span>
				</h3>
			</Headline>
			<MagicBox />
		</Section>
	)
};

export default function Index({ pageContext }) {
	return (
		<>
			<GlobalStyles />
			<HeaderNavigation data-navigation="explicit" />
			<MainContent id="main">
				<Modal id="contentModal" style={{ opacity: '0', display: 'none' }}>
					<div></div>
				</Modal>
				<ContentBlock { ...pageContext.content.body.initial } />
			</MainContent>
			<DirectionalNavigation data-navigation="implicit" />
		</>
	)
}
