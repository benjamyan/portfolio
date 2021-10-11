import React from 'react';
import PropTypes from 'prop-types';
import { RichtextResolver } from '../..';

export default function NavBlock({ navigation = {} }) {
	return (
		<nav>
			<RichtextResolver {...navigation } />
		</nav>
	);
};

NavBlock.propTypes = {
	navigation: PropTypes.object.isRequired
};
