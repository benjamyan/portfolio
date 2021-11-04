import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { styles } from '../..';

export default function GlobalStyles({ theme }) {
	const StyleFoundation = createGlobalStyle`
		:root {
			--main-color: ${theme};
		}
		${styles.global}
		${styles.textFoundation}
	`;
	return <StyleFoundation />
}
