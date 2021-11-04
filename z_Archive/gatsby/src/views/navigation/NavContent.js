import React from 'react';
import PropTypes from 'prop-types';
import { RichtextResolver } from '../..';

export default function NavContent({ navigation = {}, settings = '' }) {
	return (
		<nav>
			<RichtextResolver {...navigation } />
		</nav>
	);
};

NavContent.propTypes = {
	navigation: PropTypes.object.isRequired,
	settings: PropTypes.string
};
