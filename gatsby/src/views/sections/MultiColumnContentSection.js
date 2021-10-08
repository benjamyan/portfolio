import React from 'react';
import styled from 'styled-components';
import { utils } from '../..';
import { StandardContent, StandardBackground } from '../blocks';
import PropTypes from 'prop-types';

const GriddedContentSection = styled.section`
    position: relative;
	width: 100%;
	display: flex;
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	justify-content: center;
	resize: horizontal;
	align-content: baseline;
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
    width: ${ (props) => 100 / props.contentLength }%;
	height: 100%;
	min-height: 500px;
    padding: 5rem;
`;

const GridContent = ({ content, totalContentsLength }) => {
	// If we need to re-implement content settings, settings can be pulled from content
	return (
		<GridContainer contentLength={totalContentsLength}>
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
		  (content) => <GridContent
			  content={content}
			  key={utils.getRandomString()}
			  totalContentsLength={columns.length}
		  />
		)
      }
    </>
  );
};

export default function MultiColumnContentSection({ columns }) {
	return (
		<GriddedContentSection>
			<GridColumnsWithContent
				columns={columns}
			/>
		</GriddedContentSection>
	);
}

MultiColumnContentSection.propTypes = {
  columns: PropTypes.array.isRequired,
  settings: PropTypes.object,
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
