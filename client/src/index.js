// helpers
import styles from './helpers/styles';
import * as utils from './helpers/utils';
// views
import MagicText from './views/misc/MagicText';
// services
import resolveJsonToHtml from './services/resolveJsonHtml';
// atomic
import StandardButton from './components/button/StandardButton';
import TextContent from './components/content/TextContent';

const Message = utils.DevDialogue;
const atomic = {
	StandardButton,
	TextContent
}
const views = {
	MagicText
}
const services = {
	resolveJsonToHtml
}

export {
	utils,
	styles,
	Message,
	atomic,
	views,
	services
};
