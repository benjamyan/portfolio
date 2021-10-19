import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
	ComponentResolver, 
	useStoryblokBridge,
	utils
} from '../..';
import Meta from '../_static/Meta';
import Styles from '../_static/Styles';
import FooterNavigation from '../../views/navigation/FooterNavigation';
import HeaderNavigation from '../../views/navigation/HeaderNavigation';

const StoryblokWrapper = ({ node }) => {
	// console.log('StoryblokWrapper');
	const DATA = node.pageContext ? node.pageContext.data : false;
	const story = useStoryblokBridge(DATA || null, node.location);
	const components = [];
	const resolveContent = (item)=> {
		return story.content[item].forEach(
			(data)=> components.push(
				<ComponentResolver componentProps={data} key={ utils.getRandomString() } />
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
const IndexWrapper = styled.main`
	position: relative;
	width: 100%;
	height: auto;
	overflow: hidden;
`;

function MainContent({ slug, ...props }) {
	// let ContentBlock;
	// if (location.search.indexOf('_storyblok') > -1) {
	// 	ContentBlock = StoryblokWrapper
	// } else {
	// 	ContentBlock = ProductionWrapper
	// };
	// return (
	// 	<IndexWrapper id="mainContent" className={slug} data-maincontent>
	// 		<ContentBlock node={props} />
	// 	</IndexWrapper>
	// );
	return (
		<IndexWrapper id="mainContent" className={slug} data-maincontent>
			<StoryblokWrapper node={props} />
			{/* { props.location.search.indexOf('_storyblok') > -1 ?
				<StoryblokWrapper node={props} />
				:
				<ProductionWrapper node={props} />
			} */}
		</IndexWrapper>
	)
};
export default function DOMContentWrapper({ ...props }) {
	try {
		const badMsg = `Bad render in pages > tempates > index`;
		const pageContent = function() {
			if (props.pageContext) {
				const contentProp = props.pageContext.data.content;
				if (typeof contentProp === 'string') {
					return JSON.parse(contentProp) || null;
				}
				return contentProp;
			};
			return false;
		}();
		const {
			// pages = pageContent ? props.pageContext.pages : { msg: badMsg },
			globals = pageContent ? props.pageContext.globals : { msg: badMsg },
			slug = pageContent ? props.pageContext.data.slug : badMsg,
			fullSlug = pageContent ? props.pageContext.data.full_slug : badMsg,
			pageContext = pageContent ? props.pageContext : { msg: badMsg },
			pageMeta = pageContent ? pageContent.meta : false,
			pageTheme = pageContent ? pageContent.theme.color : 'default'
		} = props;
		return (
			<div>
				<Styles theme={pageTheme} />
				{ !!pageContext && pageContext.data &&
					<Meta site={ fullSlug } meta={ pageMeta } />
				}
				{ globals && globals['header-navigation'] &&
					<HeaderNavigation { ...globals['header-navigation'] } />
				}
				<MainContent slug={ slug } { ...props } />
				{ globals && globals['footer-navigation'] &&
					<FooterNavigation { ...globals['footer-navigation'] } />
				}
			</div>
		);
	} catch (err) {
		console.log(err);
		return (
			<utils.DevDialogue message={ `An error occured during render in pages > templates > index.` }/>
		);
	};
};
export {
	MainContent
}

DOMContentWrapper.propTypes = {
	pageContext: PropTypes.object,
	location: PropTypes.object
};
StoryblokWrapper.propTypes = {
	node: PropTypes.object,
};
ProductionWrapper.propTypes = {
	node: PropTypes.object,
};

export const storyblok = [
	{
		name: 'templates_standard_layout',
		display_name: 'Standard layout',
		id: 1843331,
		schema: {
			meta: {
				type: 'custom',
				field_type: 'seo-metatags',
				options: [],
				pos: 1
			},
			body: {
				type: 'bloks',
				restrict_components: true,
				display_name: 'Body',
				component_whitelist: [
					'global_reference',
					'containers_sections_basic_content_section',
					'containers_sections_multi_column_section'
				],
				pos: 2
			},
			tab1: {
				type: 'tab',
				display_name: 'Body',
				keys: [
					'content_section',
					'content',
					'body'
				],
				pos: 3
			}
		},
		is_root: true,
		is_nestable: false,
		real_name: 'Standard layout',
		component_group_uuid: '2024b6e7-4ad8-446a-ae14-0fdcf983e9d8',
		component_group_name: 'Templates'
	},
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