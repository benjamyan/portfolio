// import { createGlobalStyle } from 'styled-components';
import { fonts } from './variables';

const textH1 = `
    ${ fonts.playfair }
    font-size: 250px;
    // font-size: calc(160px + (300 - 160) * ((99vw - 300px) / (1900 - 300)));
    font-style: italic;
    font-weight: 900;
    letter-spacing: -5px;
    line-height: 1.35;
    vertical-align: baseline;
`;
const textH2 = `
    ${ fonts.playfair }
    font-size: 120px;
    // font-size: calc(90px + (200 - 90) * ((99vw - 300px) / (1900 - 300)));
    letter-spacing: 1px;
    font-style: italic;
    font-weight: 900;
    line-height: 1;
`;
const textH3 = `
    ${fonts.archivo}
    font-size: 58px;
    // font-size: calc(40px + (65 - 40) * ((100vw - 300px) / (1900 - 300)));
    line-height: 1.35;
`;
const textH4 = `
    ${fonts.robotoMono}
    font-size: 26px;
    // font-size: calc(21px + (28 - 21) * ((100vw - 300px) / (1900 - 300)));
    font-style: normal;
`;
const textH5 = `
    ${fonts.robotoMono}
    font-size: 12px;
    // font-size: calc(10px + (13 - 10) * ((100vw - 300px) / (1900 - 300)));
    letter-spacing: 2.5px;
    font-weight: 700;
    text-transform: uppercase;
`;
const textP = `
    ${fonts.robotoMono}
    font-size: 14px;
    // font-size: calc(10px + (16 - 10) * ((100vw - 300px) / (1900 - 300)));
    letter-spacing: 0.0025rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
`;
const textLi = `
    ${textP}
`;
const textA = `
    color: black;
    text-decoration: none;
`;
const textFigCaption = `
    ${fonts.robotoMono}
    line-height: 1.35;
`;
const textBlockQuote = `
    ${fonts.archivo}
    position: relative;
    &::before {
        position: absolute;
        content: open-quote;
        top: -10px;
        left: 0;
        font-size: 200px;
    }
`;
const textFoundation = `
    h1 { ${textH1} }
    h2 { ${textH2} }
    h3 { ${textH3} }
    h4 { ${textH4} }
    h5 { ${textH5} }
    li { ${textLi} }
    p { ${textP} }
    a { ${textA} }
    figcaption { ${textFigCaption} }
    blockquote { ${textBlockQuote} }
    h1, h2, h3, h4, h5, p {
        span.super {
            font-size: calc(1em + 0.33em);
        }
        span.minor {
            font-size: calc(1em - 0.33em);
        }
        span.outline {
            color: transparent;
            -webkit-text-stroke: 2px black;
        }
        b {
            font-weight: 600;
        }
    }
`;

export {
  textH1,
  textH2,
  textH3,
  textH4,
  textH5,
  textP,
  textLi,
  textA,
  textFigCaption,
  textBlockQuote,
  textFoundation,
};
