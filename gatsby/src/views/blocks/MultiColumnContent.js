import React from 'react';
import styled from 'styled-components';
import { 
	StandardBackground , styles
} from '.';
import {
	ComponentResolver, utils
} from '../..';

const StyledColumnWrapper = styled.div`
	&& {
		width: 100%;
		z-index: 1;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		${ props => props.keyname = 'catalog' && `
			padding: 100px 25px 25px;
		`}
	}
`;
const SingleColumn = styled.div`
	&& {
		position: relative;
		width: 100%;
		height: auto;
		vertical-align: top;
		padding: 0;
		* {
			padding: 0;
		}
		${props => props.keyname = 'catalog' && `
			${ styles.contentBlockCardView }
		`}
	}
`;
/*
const marginVariable = 350;
const SingleColumn = styled.div`
	&& {
		position: relative;
		width: 100%;
		height: auto;
		vertical-align: top;
		padding: 0;
		* {
			padding: 0;
		}
		${ props=> props.keyname = 'catalog' && `
			position: relative;
			width: 45%;
			height: 500px;
			margin: 25px auto 150px;
			padding: 50px;
			border: 2px solid #333;
			background: rgba(255,255,255, 0.5);
			&:nth-child(1) {
				margin-top: ${ marginVariable}px;
			}
			&:nth-child(4) {
				margin-top: -${marginVariable - 50 }px;
			}
			&:nth-child(3) {
				margin-bottom: 0;
			}
			.text-content {
				position: absolute;
				width: 75%;
				top: 15%;
				right: 0;
				left: 0;
				margin: 0 auto;
				* {
					color: black;
					display: inline-block;
				}
				h3 {
					margin-bottom: 15px;
				}
				p {
					width: 75%;
					float: right;
				}
			}
			.media-content {
				position: relative;
				overflow: hidden;
				border: 2px solid #333;
				&::before {
					content: ' ';
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					background: rgba(255,255,255, 0.75);
				}
			}
		`}
	}
`;
*/

function getContainerContent(columns, keyname) {
	const ColumnContent = ({ ...item })=> {
		if (item.content) {
			return item.content.map(
				(contentItem)=> <ComponentResolver
					componentProps={contentItem}
					key={utils.getRandomString()}
				/>
			);
		};
		return <></>;
	};
	return columns.map(
		(item) => (
			<SingleColumn key={utils.getRandomString()} keyname={ keyname }>
				<ColumnContent { ...item } />
			</SingleColumn>
		)
	);
};

export default function MultiColumnContent({ columns, background, keyname = false }) {
	console.log(keyname)
	return (
		<StyledColumnWrapper keyname={ keyname } className={ 'multi-column-content' }>
			{ columns.length > 0 
				&& getContainerContent(columns, keyname) }
			{ background.length > 0
				&& <StandardBackground data={ background[0] } />
			}
		</StyledColumnWrapper>
	);
};

export const storyblok = [
  {
    name: 'views_blocks_multi_column_content',
    display_name: 'Multi-column content',
    id: 1843323,
    schema: {
      background: {
        type: 'bloks',
        pos: 0,
        restrict_components: true,
        component_whitelist: ['views_blocks_standard_background'],
        maximum: '1'
      },
      columns: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['views_blocks_standard_content'],
        pos: 2,
        required: true
      },
      tab1: {
        type: 'tab',
        display_name: 'Content',
        keys: ['columns'],
        pos: 3
      },
      tab2: {
        type: 'tab',
        display_name: 'Background',
        keys: ['background'],
        pos: 4
      }
    },
    is_root: false,
    preview_tmpl: '{{columns.length}} column',
    is_nestable: true,
    real_name: 'Multi-column content',
    component_group_uuid: 'eee899c0-2dac-47c4-ac65-32fbd8147882',
    component_group_name: 'Views'
  }
];
