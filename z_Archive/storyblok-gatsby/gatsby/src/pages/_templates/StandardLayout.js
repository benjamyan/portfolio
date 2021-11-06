import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DOMContentWrapper from './';
import styles from '../_styles/homepage';

const StdWrapper = styled.div`
	${ props=> props.pageStyling}
`;

export default function StandardLayout({ pageContext }) {
	// console.log("StandardLayout");
	return (
		<StdWrapper pageStyling={ styles }>
			<DOMContentWrapper
				pageContext={pageContext}
				pageType={'standard'}
				// restrictRender={ 'none' }
				location={pageContext.location}
			/>
		</StdWrapper>
	);
}

StandardLayout.propTypes = {
  pageContext: PropTypes.object,
};
