/*
A catalog of all components & templates with their corresponding key names in storyblok
*/
//
// Views
import * as section from './views/sections';
import * as block from './views/blocks';
import MagicText from './views/misc/MagicText';
//
// Components
import * as button from './components/button';
import * as content from './components/content';

const dictionary = {
  containers_sections_basic_content_section: section.BasicContentSection,
  containers_sections_multi_column_section: section.MultiColumnContentSection,
  views_blocks_single_column_content: block.StandardContent,
  views_blocks_standard_content: block.StandardContent,
  views_blocks_multi_column_content: block.MultiColumnContent,
  views_blocks_standard_background: block.StandardBackground,
  atomic_content_media_content: content.MediaContent,
  atomic_content_text_content: content.TextContent,
  atomic_button_basic_button: button.StandardButton,
  misc_magic_text: MagicText
};

export default dictionary;
