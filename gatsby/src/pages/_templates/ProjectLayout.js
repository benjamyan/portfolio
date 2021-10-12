import React from 'react';
import PropTypes from 'prop-types';
import DOMContentWrapper from '.';

export default function ProjectLayout({ pageContext }) {
	console.log("ProjectLayout");
	return (
		<>
			<DOMContentWrapper
				pageContext={ pageContext }
				pageType={ 'project' }
				location={ pageContext.location }
			/>
		</>
	);
}

ProjectLayout.propTypes = {
  pageContext: PropTypes.object,
};
