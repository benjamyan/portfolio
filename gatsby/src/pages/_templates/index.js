import * as React from 'react';
import PropTypes from 'prop-types';
import { 
	ComponentResolver, 
	useStoryblokBridge,
	utils
} from '../..';
import Meta from '../_static/Meta';
import Styles from '../_static/Styles';

const StoryblokWrapper = ({ node }) => {
	console.log('StoryblokWrapper');
	const DATA = node.pageContext ? node.pageContext.data : false;
	const story = useStoryblokBridge(DATA || null, node.location);
	const components = [];
	const resolveContent = (item)=> {
		return story.content[item].forEach(
			(data)=> components.push(
				<ComponentResolver
					componentProps={data}
					key={data._uid}
				/>
			)
		);
	};
	if (story && story.content) {
		const content = story.content;
		for (const item in content) {
			if (Array.isArray(content[item])) {
				resolveContent(item);
			};
		}
		return (
			<>{components}</>
		);
	};
	console.log(node)
	return (
		<utils.DevDialogue message={ 'No content found' } />
	);
};
const ProductionWrapper = ({ node }) => {
	console.log('ProductionContainer');
	// TODO
};

export default function DOMContentWrapper({ ...props }) {
	const { pageContext } = props;
	return (
		<>
			<Styles />
			{ !!pageContext && pageContext.data &&
				<Meta
					site={pageContext.data.full_slug}
					meta={pageContext.data.content.meta}
				/>
			}
			{ props.location.search.indexOf('_storyblok') > -1 ?
				<StoryblokWrapper node={ props } />
				:
				<ProductionWrapper node={ props } />
			}
		</>
	);
};

DOMContentWrapper.propTypes = {
	pageContext: PropTypes.object,
	location: PropTypes.object,
};
StoryblokWrapper.propTypes = {
	node: PropTypes.object,
};
ProductionWrapper.propTypes = {
	node: PropTypes.object,
};

export const storyblok = [
	{
		name: 'global',
		display_name: 'Global components',
		id: 1843423,
		schema: {
			body: {
				type: 'bloks',
				restrict_components: true,
				display_name: 'Body',
				component_whitelist: [
					'atomic_content_text_content',
					'atomic_content_media_content'
				]
			}
		},
		is_root: true,
		is_nestable: false,
		real_name: 'Global components',
		component_group_uuid: '2024b6e7-4ad8-446a-ae14-0fdcf983e9d8',
		component_group_name: 'Templates'
	},
	{
		name: 'global_reference',
		display_name: 'Global reference',
		id: 1843423,
		schema: {
			reference: {
				type: 'options',
				restrict_components: true,
				use_uuid: true,
				source: 'internal_stories',
				folder_slug: 'global/',
				filter_content_type: 'global'
			}
		},
		is_root: false,
		is_nestable: true,
		real_name: 'Global reference',
		component_group_uuid: 'ff1ca82b-ccb7-4009-8189-0d4bc0fbfbab',
		component_group_name: 'Containers'
	}
];