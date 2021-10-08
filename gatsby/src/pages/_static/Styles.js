import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { styles } from '../../';

export default function Styles() {
	const StyleFoundation = createGlobalStyle`
		${styles.foundation}
		${styles.textFoundation}
	`;
	return <StyleFoundation />
}
