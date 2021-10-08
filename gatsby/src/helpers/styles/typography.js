// import { createGlobalStyle } from 'styled-components';
import { fonts } from './variables';

const textH1 = `
    ${ fonts.archivo }
    font-size: 120px;
    font-size: calc(60px + (190 - 60) * ((99vw - 300px) / (1900 - 300)));
    letter-spacing: -5px;
    line-height: 1.35;
`;
const textH2 = `
    ${ fonts.archivo }
    font-size: 82px;
    font-size: calc(62px + (92 - 62) * ((99vw - 300px) / (1900 - 300)));
    letter-spacing: 1px;
`;
const textH3 = `
    ${fonts.archivo}
    font-size: 38px;
    font-size: calc(32px + (46 - 32) * ((100vw - 300px) / (1900 - 300)));
`;
const textH4 = `
    ${fonts.robotoMono}
    font-size: 20px;
    font-size: calc(18px + (22 - 18) * ((100vw - 300px) / (1900 - 300)));
    font-style: normal;
`;
const textH5 = `
    ${fonts.robotoMono}
    font-size: 13px;
    font-size: calc(12px + (14 - 12) * ((100vw - 300px) / (1900 - 300)));
    letter-spacing: 4.21px;
`;
const textP = `
    ${fonts.robotoMono}
    font-size: 16px;
    font-size: calc(12px + (18 - 12) * ((100vw - 300px) / (1900 - 300)));
    letter-spacing: 0.0025rem;
    font-style: normal;
    line-height: 1.5;
`;
const textLi = `
    ${textP}
`;
const textA = `
    color: white;
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
