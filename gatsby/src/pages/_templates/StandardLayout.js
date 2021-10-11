import React from 'react';
import PropTypes from 'prop-types';
import DOMContentWrapper from './';

export default function StandardLayout({ pageContext }) {
	// console.log("StandardLayout")
	return (
		<>
			<DOMContentWrapper
				pageContext={pageContext}
				location={pageContext.location}
			/>
		</>
	);
}

StandardLayout.propTypes = {
  pageContext: PropTypes.object,
};
