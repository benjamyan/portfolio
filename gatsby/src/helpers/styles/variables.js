const colors = {
  green: {
    hex: '12A7A7',
    rgb: '',
  },
  yellow: {
    hex: 'FFF52D',
    rgb: '',
  },
  offBlack: {
    hex: '1A170C',
    rgb: '26,23,12'
  },
  black: {
    hex: '000000',
    rgb: '0, 0, 0',
  },
  white: {
    hex: 'ffffff',
    rgb: '255, 255, 255',
  },
  yellowWhite: {
    hex: 'fffef3'
  }
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
