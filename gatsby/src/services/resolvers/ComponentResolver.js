/*
The purpose of this file is to act a central junction for building our DOM objects recursively
*/

import React from 'react';
import PropTypes from 'prop-types';
import SbEditable from 'storyblok-react';
import { dictionary, utils } from '../..';

const filterSingleComponent = (componentProps)=> {
	const {
		component,
		editable = true
	} = componentProps;
	const Component = dictionary[component];
	const isEditable = componentProps.hasOwnProperty('editable') && !editable;
	if (component.indexOf('global') > -1 || isEditable) {
		return (
			<Component { ...componentProps } />
		);
	};
	return (
		<SbEditable content={ componentProps }>
			<Component {...componentProps} />
		</SbEditable>
	);
};

function ResolvedContent({ ...componentProps }) {
	const { component } = componentProps;
	if (!!component && utils.doesComponentExist(component)) {
		return filterSingleComponent(componentProps)
	};
	return (
		<utils.DevDialogue
			message={'The component has not been created yet.'}
			{...componentProps}
		/>
	);
}

export default function Content({ componentProps }) {
	try {
		if (Array.isArray(componentProps)) {
			return componentProps.map(
				(component)=> <ResolvedContent {...component} key={ utils.getRandomString() } />
			);
		};
		return (
			<ResolvedContent { ...componentProps } />
		);
	} catch (err) {
		console.log(err);
		return <></>;
	};
}

Content.propTypes = {
	componentProps: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	])
};
