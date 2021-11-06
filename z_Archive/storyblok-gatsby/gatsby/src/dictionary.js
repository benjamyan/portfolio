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
import MagicText from './views/misc/MagicText';
//
// Atomic components
import MediaContent from './components/content/MediaContent';
import TextContent from './components/content/TextContent';
import NavContent from './views/navigation/NavContent';
import ImageMedia from './components/media/ImageMedia';
import VideoMedia from './components/media/VideoMedia';
import StandardButton from './components/button/StandardButton';
import IconButton from './components/button/IconButton';

const globals = {
	global_components: ComponentResolver,
	'header-navigation': HeaderNavigation,
};
const templates = {
	containers_sections_basic_content_section: BasicContentSection,
	containers_sections_multi_column_section: MultiColumnContentSection
};
const views = {
	views_blocks_single_column_content: StandardContent,
	views_blocks_standard_content: StandardContent,
	views_blocks_multi_column_content: MultiColumnContent,
	views_blocks_standard_background: StandardBackground,
	views_navigation_nav_block: NavContent
};
const misc = {
	misc_magic_text: MagicText,
	misc_single_image_media: ImageMedia,
	misc_single_video_url: VideoMedia
};
const atomic = {
	// atomic_content_nav_content: NavContent,
	atomic_content_media_content: MediaContent,
	atomic_content_text_content: TextContent,
	atomic_button_basic_button: StandardButton,
	atomic_button_icon_button: IconButton,
};
const dictionary = {
	...globals,
	...templates,
	...views,
	...misc,
	...atomic
};

export {
	globals,
	templates,
	views,
	misc,
	atomic
};
export default dictionary;
