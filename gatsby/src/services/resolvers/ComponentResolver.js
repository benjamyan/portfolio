/*
The purpose of this file is to act a central junction for building our DOM objects recursively
*/
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import SbEditable from 'storyblok-react';
import { dictionary, utils } from '../..';

const filterSingleComponent = (componentProps)=> {
	const {
		component,
		editable = true,
		keyname='',
		id=''
	} = componentProps;
	const Component = dictionary[component];
	const componentAttrs = {};
	if (keyname.length > 1) {
		componentAttrs['data-keyname'] = keyname;
	};
	if (id.length > 0) {
		componentAttrs['id'] = id;
	};
	componentProps.htmlAttrs = componentAttrs;
	if (component.indexOf('global') > -1 || !editable) {
		return (
			<Component {...componentProps} />
		);
	};
	return (
		<SbEditable content={ componentProps }>
			<Component {...componentProps} />
		</SbEditable>
	);
};
const resolveGlobalComponent = ({ reference })=> {
	return reference.map(
		({slug, content})=> {
			const GlobalComponent = dictionary[slug];
			return (
				<GlobalComponent { ...content } key={ utils.getRandomString() } />
			)
		}
	);
};

export default function ComponentResolver({ componentProps = [] }) {
	try {
		const { component } = componentProps;
		if (!!component && utils.doesComponentExist(component)) {
			if (component === 'global_components') {
				return resolveGlobalComponent(componentProps);
			};
			return filterSingleComponent(componentProps);
		};
		return (
			<utils.DevDialogue
				message={`This component has not been created yet. ---- ${JSON.stringify(componentProps)}`}
				{...componentProps}
			/>
		);
	} catch (err) {
		console.log(err);
		return <></>;
	};
};

ComponentResolver.propTypes = {
	componentProps: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
		PropTypes.array
	])
};
