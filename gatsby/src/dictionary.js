/*
A catalog of all components & templates with their corresponding key names in storyblok
*/
//
// Globals
import ComponentResolver from './services/resolvers/ComponentResolver';
import HeaderNavigation from './views/navigation/HeaderNavigation';
//
// Templates
import BasicContentSection from './views/sections/BasicContentSection';
import MultiColumnContentSection from './views/sections/MultiColumnContentSection';
//
// Content blocks
import StandardContent from './views/blocks/StandardContent';
import StandardBackground from './views/blocks/StandardBackground';
import MultiColumnContent from './views/blocks/MultiColumnContent';
//
// Misc view components
import NavBlock from './views/misc/NavBlock';
import MagicText from './views/misc/MagicText';
//
// Atomic components
import ImageMedia from './components/media/ImageMedia';
import VideoMedia from './components/media/VideoMedia';
import MediaContent from './components/content/MediaContent';
import TextContent from './components/content/TextContent';
import StandardButton from './components/button/StandardButton';

const globals = {
	global_components: ComponentResolver,
	'header-navigation': HeaderNavigation,
};
const templates = {
	containers_sections_basic_content_section: BasicContentSection,
	containers_sections_multi_column_section: MultiColumnContentSection
};
const contentViews = {
	views_blocks_single_column_content: StandardContent,
	views_blocks_standard_content: StandardContent,
	views_blocks_multi_column_content: MultiColumnContent,
	views_blocks_standard_background: StandardBackground,
};
const miscViews = {
	misc_magic_text: MagicText,
	misc_navigation_block: NavBlock
};
const atomicComponents = {
	atomic_content_media_content: MediaContent,
	atomic_content_text_content: TextContent,
	atomic_button_basic_button: StandardButton,
	misc_single_image_media: ImageMedia,
	misc_single_video_url: VideoMedia
};
const dictionary = {
	...globals,
	...templates,
	...contentViews,
	...miscViews,
	...atomicComponents
};

export {
	globals,
	templates,
	contentViews,
	miscViews,
	atomicComponents
};
export default dictionary;
