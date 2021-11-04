/*
The purpose of this file is to act a central junction for building our DOM objects recursively
*/
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import SbEditable from 'storyblok-react';
import { dictionary, utils } from '../..';

const processDatasetAttrib = (datasets)=> {
	const attribsToReturn = {};
	const getSingleDataset = (dataset) => {
		const dataSplit = dataset.split('=');
		if (!dataSplit[0].startsWith('data-')) {
			dataSplit[0] = 'data-' + dataSplit[0];
		};
		return (
			attribsToReturn[dataSplit[0].trim()] = dataSplit[1].trim()
		);
	}
	if (datasets.indexOf(' ') > -1) {
		datasets.split(' ').forEach(
			dataset => getSingleDataset(dataset)
		);
	} else {
		getSingleDataset(datasets)
	};
	return attribsToReturn;
}
const buildHtmlAttrsObj = (componentProps)=> {
	const {
		id = '',
		keyname = '',
		sbHtmlAttrs = {}
	} = componentProps;
	const attribsToReturn = {};
	if (id.length > 0) {
		attribsToReturn['id'] = id;
	};
	if (keyname.length > 1) {
		attribsToReturn['data-keyname'] = keyname;
	};
	if (Object.entries(sbHtmlAttrs).length > 0) {
		if (sbHtmlAttrs.id.length > 0) {
			attribsToReturn['id'] = sbHtmlAttrs.id;
		};
		if (sbHtmlAttrs.class.length > 0) {
			attribsToReturn['className'] = sbHtmlAttrs.class;
		};
		if (sbHtmlAttrs.datasets.length > 0) {
			const newDataSets = processDatasetAttrib(
				sbHtmlAttrs.datasets
			);
			Object.assign(attribsToReturn, newDataSets);
		};
	};
	return attribsToReturn;
};
const filterSingleComponent = (componentProps)=> {
	const {
		component,
		editable = true
	} = componentProps;
	const Component = dictionary[component];
	componentProps.htmlAttrs = buildHtmlAttrsObj(componentProps);
	delete componentProps.sbHtmlAttrs;
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

function resolveGlobalComponent({ reference }) {
	return reference.map(
		({ slug, content }) => {
			const GlobalComponent = dictionary[slug];
			return (
				<GlobalComponent {...content} key={utils.getRandomString()} />
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
