const display = {
  flex: `
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    `,
  inline: `
        display: inline-block;
    `,
  block: `
        display: block;
    `,
};
const flex = {
	bottom: `
		${display.flex}
		flex-direction: column;
		justify-content: flex-end;
		resize: vertical;
	`,
	vertical: `
      ${display.flex}
      flex-direction: column;
      justify-content: center;
      resize: vertical;
    `,
	horizontal: `
		${display.flex}
		-webkit-flex-flow: row wrap;
		flex-flow: row wrap;
		justify-content: center;
		resize: horizontal;
	`,
};
const align = {
  text: {
    left: `
            h1, h2, h3, h4, h5, p, ul, li, sub {
                text-align: left;
            }
        `,
    center: `
            h1, h2, h3, h4, h5, p, ul, li, sub {
                text-align: center;
            }
        `,
    right: `
            h1, h2, h3, h4, h5, p, ul, li, sub {
                text-align: right;
            }
        `,
  },
};
const filter = {
  blur: `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: rgba(255, 255, 255, .2);
        @supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px)) or (-moz-backdrop-filter: blur(10px)) or (-o-backdrop-filter: blur(10px)) or (-ms-backdrop-filter: blur(10px))) {
            background-color: transparent;
            -webkit-backdrop-filter: blur(10px);
            -moz-backdrop-filter: blur(10px);
            -o-backdrop-filter: blur(10px);
            -ms-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
        }
    `,
};
const remove = {
  padding: 'padding: 0;',
  margin: 'margin: 0;',
  select: `
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    `,
  pointer: 'pointer-events: none;',
};

export {
  display,
  align,
  flex,
  filter,
  remove,
};
