import React from 'react';
import PropTypes from 'prop-types';
import DOMContentWrapper from './';

export default function StandardLayout({ pageContext }) {
  console.log("StandardLayout")
  return (
    <>
      <DOMContentWrapper
        pageContext={pageContext}
        location={pageContext.location}
      />
    </>
  );
}

StandardLayout.propTypes = {
  pageContext: PropTypes.object,
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
  }
];
