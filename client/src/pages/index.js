import React from 'react';
import { graphql } from "gatsby";
import styled from 'styled-components';

const StyledContent = styled.div`
  width: 100%:
  height: 100vh;
  margin: 0 auto;
`;

export default function Index({ data }) {
	console.log("index page")
	const { markdownRemark } = data;
	return (
		<StyledContent dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
	);
	// console.log(props)
	// return <></>
};

export const indexQuery = graphql`
	query IndexQuery {
		markdownRemark(frontmatter: {slug: {eq: "/"}}) {
			html
			frontmatter {
				description
				image
				name
				slug
				template
				theme
				title
			}
		}
	}
`;
