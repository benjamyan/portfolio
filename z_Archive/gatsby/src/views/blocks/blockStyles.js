// import styled from 'styled-components';

const contentBlockCardView = `
	position: relative;
	width: 45%;
	height: 500px;
	margin: 25px auto 150px;
	padding: 50px;
	border: 2px solid #333;
	background: rgba(255,255,255, 0.5);
	&:last-child {
		padding-bottom: 50px;
	}
	.text_content {
		// position: absolute;
		// width: 75%;
		// top: 15%;
		// right: 0;
		// left: 0;
		// margin: 0 auto;
		h1, h2, h3, h4, h5, p {
			width: 100%;
			color: black;
			display: inline-block;
			* {
				color: black;
				display: inline-block;
			}
		}
		p {
			width: 75%;
			float: right;
			&:first-of-type {
				padding-top: 15px;
			}
		}
	}
	// .media_content {
	// 	position: relative;
	// 	overflow: hidden;
	// 	border: 2px solid #333;
	// 	padding: 0;
	// 	&::before {
	// 		content: ' ';
	// 		position: absolute;
	// 		width: 100%;
	// 		height: 100%;
	// 		top: 0;
	// 		left: 0;
	// 		background: rgba(255,255,255, 0.75);
	// 	}
	// }
`;

export {
	contentBlockCardView
}