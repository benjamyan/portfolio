import React from 'react';
import PropTypes from 'prop-types';
import { MainContent } from '.';
// import DOMContentWrapper, { MainContent } from '.';

export default function ProjectLayout({ pageContext, restrictRender = '' }) {
	// console.log("ProjectLayout");
	// if (restrictRender === 'main') {
		return (
			<MainContent 
				pageContext={pageContext}
				location={pageContext.location} 
			/>
		)
	// };
	// return (
	// 	<DOMContentWrapper
	// 		pageContext={pageContext}
	// 		pageType={'project'}
	// 		location={pageContext.location}
	// 	/>
	// );
}

ProjectLayout.propTypes = {
  pageContext: PropTypes.object,
};
