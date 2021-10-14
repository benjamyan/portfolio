import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DOMContentWrapper from './';
import { homepage } from './pageStyles';

const StdWrapper = styled.div`
	${ props=> props.pageStyling}
`;

export default function StandardLayout({ pageContext }) {
	// console.log("StandardLayout");
	const pageStyle = function() {
		return homepage
		// switch (pageContext.slug) {
		// 	case '/':
		// 		return homepage;
		// 	default:
		// 		return '';
		// }
	}();
	return (
		<StdWrapper pageStyling={ pageStyle }>
			<DOMContentWrapper
				pageContext={pageContext}
				pageType={'standard'}
				location={pageContext.location}
			/>
		</StdWrapper>
	);
}

StandardLayout.propTypes = {
  pageContext: PropTypes.object,
};
