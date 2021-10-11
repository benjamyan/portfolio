/*
Parses a string formatted like X=foo
- X is the initials for a specific CSS style
- foo is the desired value of that style, including unit
-- replace all spaces with '_' in Storyblok when entering values
*
Example
-
string: W=100% H=auto | T=0 R=0
return: [ 'width:100%', 'height:auto', 'top:0', 'right:0' ]
-
string = W=100vw | T=0 L=0 M=0_auto
return = [ 'width:100vw', 'top:0', 'left:0', 'margin:0 auto' ]
*
@param componentSettings <String>
- The initial string to be parsed, formatted like above example
@return <Array>
- Array with formatted css styling
- Ex: 'width:100%;'
*/
const SETTINGS = {
	POS: 	'position',
	DIS: 	'display',
	W: 		'width',
	H: 		'height',
	MH:		'min-height',
	T: 		'top',
	R: 		'right',
	B: 		'bottom',
	L: 		'left',
	M: 		'margin',
	P: 		'padding',
	C: 		'color',
	TA: 	'text-align',
	TRNS:	'transform'
};
const styleLookup = (curr)=> {
	const initialStyle = SETTINGS[curr[0]] || false;
	if (!initialStyle && curr[0].length > 1) {
		return curr[0].split('').map(
			style => SETTINGS[style]
		).join('-');
	};
	return initialStyle;
};
const valueLookup = (curr)=> {
	if (curr[1].indexOf('_') > -1) {
		return curr[1].replace(/(_)/g, ' ');
	}
	return curr[1];
};

function getCssSettings(setting) {
	if (setting.length > 1 && !setting.endsWith('=')) {
		const curr = setting.split('=');
		return `
			${styleLookup(curr)}:${valueLookup(curr)};
		`;
	};
	return false
};

export default function settingsResolver(componentSettings) {
	try {
		if (!!componentSettings) {
			if (componentSettings.indexOf(' ') > -1) {
				const settings = componentSettings.split(' ');
				return settings.map(
					setting => getCssSettings(setting)
				).filter(Boolean);
			};
			return getCssSettings(componentSettings)
		};
		return '';
	} catch (err) {
		console.log(err)
		return '';
	}
}
