import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { styles } from '../../';

export default function Styles({ theme }) {
	const StyleFoundation = createGlobalStyle`
		:root {
			--main-color: ${theme};
		}
		${styles.foundation}
		${styles.textFoundation}
	`;
	return <StyleFoundation />
}
