const colors = {
  green: '18, 167, 167',
  yellow: '255, 245, 45',
  offBlack: '26,23,12',
  black: '0, 0, 0',
  yellowWhite: '255, 254, 243',
  white: '255, 255, 255'
};
const defaults = {
  section: {
    base: {
      height: `
                position: relative;
                overflow: hidden;
            `,
      width: `
                left: 0;
                right: 0;
                margin: 0 auto;
            `,
    },
    padding: {
      vert: '7.5rem',
      hori: '200px',
    },
  },
  iconSize: '15px',
  pseudoClass: `
        position: absolute;
        content: ' ';
    `,
};
const layouts = {
  height: {
    full: `
            ${defaults.section.base.height}
            min-height: 100vh;
            padding: ${defaults.section.padding.vert} ${defaults.section.padding.hori}
        `,
    half: `
            ${defaults.section.base.height}
            min-height: 60vh;
            padding: ${defaults.section.padding.vert} ${defaults.section.padding.hori}
        `,
    none: `
            ${defaults.section.base.height}
            min-height: unset;
            padding: ${defaults.section.padding.vert} ${defaults.section.padding.hori}
        `,
  },
  width: {
    full: `
            ${defaults.section.base.width}
            width: 100%;
        `,
  },
};
const fonts = {
  archivo: `
    font-family: "Archivo Black", Helvetica, Arial, sans-serif;
    font-style: normal;
  `,
  robotoMono: `
    font-family: 'Roboto Mono', monospace;
    font-style: normal;
  `,
  openSans: `
    font-family: "Open Sans", Arial, sans-serif;
    font-style: normal;
  `,
  playfair: `
    font-family: "Playfair Display", serif;
    font-style: normal;
  `
};

export {
  colors,
  defaults,
  layouts,
  fonts,
};
