import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { utils, settingsResolver } from '../..';
import { StandardContent, StandardBackground } from '../';

const GriddedContentSection = styled.section`
    position: relative;
	width: 100%;
	display: flex;
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	justify-content: center;
	resize: horizontal;
	align-content: baseline;
	${ (props)=> props.settings }
	* {
		display: flex;
		flex-direction: column;
		justify-content: center;
		resize: vertical;
		text-align: left;
	}
`;
const GridContainer = styled.div`
    position: relative;
    width: ${ ({contentLength}) => (100 / contentLength) }%;
    height: 100%;
    min-height: 500px;
    padding: 5rem;
	${ ({contentAlign})=> (
		(contentAlign === 'top' && `
			> * {
				margin-bottom: auto;
			}
		`) || 
		(contentAlign === 'bottom' && `
			> * {
				margin-top: auto;
			}
		`)
	)}
    ${ ({settings}) => (settings) }
`;

const GridContent = ({ content, contentLength, contentAlign }) => {
	return (
		<GridContainer 
			contentLength={ contentLength }
			contentAlign={ contentAlign }
			settings={settingsResolver(content.settings)}>
				<center>
					{ content.content?.length > 0
						&& <StandardContent content={content.content} />
					}
				</center>
				{ content.background?.length > 0
					&& <StandardBackground background={content.background[0]} />
				}
		</GridContainer>
	);
};
const GridColumnsWithContent = ({ columns }) => {
	return (
		<>
			{ columns.map(
				(content) => (
					<GridContent
						content={content}
						key={utils.getRandomString()}
						contentLength={ columns.length }
						contentAlign={ content.alignment }
					/>
				)
			)}
		</>
	);
};

export default function MultiColumnContentSection({ columns, settings }) {
	return (
		<GriddedContentSection settings={ settingsResolver(settings) }>
			<GridColumnsWithContent columns={columns} />
		</GriddedContentSection>
	);
};

MultiColumnContentSection.propTypes = {
  columns: PropTypes.array.isRequired,
  settings: PropTypes.string,
};
GridColumnsWithContent.propTypes = {
  columns: PropTypes.array,
};
GridContent.propTypes = {
  content: PropTypes.object.isRequired,
  totalContentsLength: PropTypes.number.isRequired,
};

export const storyblok = [
  {
    name: 'containers_sections_multi_column_section',
    display_name: 'Multi-column content section',
    id: 1843329,
    schema: {
      name: {
        type: 'text',
        pos: 0
      },
      columns: {
        type: 'bloks',
        pos: 1,
        maximum: '3',
        restrict_components: true,
        component_whitelist: ['views_blocks_single_column_content'],
        required: true,
        display_name: 'Column content',
        description: 'Each block here is a column. Add in, or remove, at  a maximum of 3.'
      },
      tab1: {
        type: 'tab',
        display_name: 'Columns',
        keys: [
          'col_1_content',
          'column_content',
          'columns'
        ]
      }
    },
    preview_field: 'name',
    is_root: false,
    is_nestable: true,
    real_name: 'Multi-column content section',
    component_group_uuid: 'ff1ca82b-ccb7-4009-8189-0d4bc0fbfbab',
    component_group_name: 'Containers'
  }
];
