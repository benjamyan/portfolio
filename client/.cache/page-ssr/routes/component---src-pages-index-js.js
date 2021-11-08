"use strict";
exports.id = "component---src-pages-index-js";
exports.ids = ["component---src-pages-index-js"];
exports.modules = {

/***/ "./src/components/button/StandardButton.js":
/*!*************************************************!*\
  !*** ./src/components/button/StandardButton.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StandardButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ */ "./src/index.js");




const StyledStandardButton = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "StandardButton__StyledStandardButton"
})(["position:relative;width:260px;width:-moz-fit-content;width:fit-content;min-width:200px;height:40px;border:2px solid #000;vertical-align:top;color:#fff;background-color:transparent;> a{display:inline-block;width:100%;padding:0 15px;text-align:center;font-size:12px;font-weight:600;letter-spacing:1.5px;line-height:35px;color:black;vertical-align:top;border:none;cursor:pointer;", "}"], ___WEBPACK_IMPORTED_MODULE_2__.styles.fonts.robotoMono);
function StandardButton({
  text,
  link,
  target,
  attrs
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledStandardButton, {
    className: 'standard_button'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: link,
    target: target
  }, text));
}
StandardButton.propTypes = {
  copy: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  link: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  target: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};

/***/ }),

/***/ "./src/components/content/TextContent.js":
/*!***********************************************!*\
  !*** ./src/components/content/TextContent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");



const TextWrapper = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "TextContent__TextWrapper"
})(["> *:not(:last-child){margin-bottom:25px;}"]);
function TextContent({
  text,
  id,
  className,
  htmlAttrs = {}
}) {
  let finalText = '';

  for (const item in text) {
    if (item == 'h1' || item == 'h2' || item == 'h3' || item == 'h4' || item == 'h5' || item == 'p') {
      finalText = finalText + text[item];
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TextWrapper, Object.assign({}, htmlAttrs, {
    id: id,
    className: ('text_content', className),
    dangerouslySetInnerHTML: {
      __html: finalText
    }
  }));
}
;
TextContent.propTypes = {
  text: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  htmlAttrs: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)
};

/***/ }),

/***/ "./src/helpers/DevDialogue.js":
/*!************************************!*\
  !*** ./src/helpers/DevDialogue.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DevDialogue)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function DevDialogue({
  message,
  type = '',
  ...props
}) {
  if (type === 'err') {
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("center", {
      style: {
        background: 'rgb(255,220,220)',
        padding: '50px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Err!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
      style: {
        color: '#000'
      }
    }, message ? message : '-- no message'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", {
      style: {
        fontSize: '0.8rem',
        fontWeight: '900',
        color: '#000'
      }
    }, props.component)));
  }

  ;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("center", {
    style: {
      padding: '50px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    style: {
      color: '#000',
      wordBreak: 'break-word'
    }
  }, JSON.stringify(message)));
}

/***/ }),

/***/ "./src/helpers/styles/global.js":
/*!**************************************!*\
  !*** ./src/helpers/styles/global.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables */ "./src/helpers/styles/variables.js");

const global = `
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        resize: none;
    }
    html {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        -webkit-font-variant-ligatures: none;
        font-variant-ligatures: none;
    }
    :-moz-placeholder,
    :-ms-input-placeholder,
    ::-moz-placeholder,
    ::-webkit-input-placeholder {
        color: var(--main-color);
    }
    * {
        margin: 0;
        padding: 0;
    }
    *, *:before, *:after {
        -webkit-box-sizing: inherit;
        -moz-box-sizing: inherit;
        box-sizing: inherit;
    }
    body {
        overflow-x: hidden;
    }
    h1, h2, h3, h4, h5, h6, p, em, body, html, textarea, 
    input, submit, select, button, strong, span, b, sup, sub, 
    figcaption, blockquote {
        color: rgb(${_variables__WEBPACK_IMPORTED_MODULE_0__.colors.offBlack});
        padding: 0;
        margin: 0;
        font-kerning: normal;
    }
    h1, h2, h3, h4 {
        vertical-align: baseline;
        span {
            vertical-align: baseline;
        }
    }
    center * {
        text-align: center;
    }
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (global);

/***/ }),

/***/ "./src/helpers/styles/index.js":
/*!*************************************!*\
  !*** ./src/helpers/styles/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./src/helpers/styles/global.js");
/* harmony import */ var _typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typography */ "./src/helpers/styles/typography.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variables */ "./src/helpers/styles/variables.js");
/* harmony import */ var _mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mixins */ "./src/helpers/styles/mixins.js");




const stylesExport = {
  global: _global__WEBPACK_IMPORTED_MODULE_0__["default"],
  ..._typography__WEBPACK_IMPORTED_MODULE_1__,
  ..._variables__WEBPACK_IMPORTED_MODULE_2__,
  ..._mixins__WEBPACK_IMPORTED_MODULE_3__
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stylesExport);

/***/ }),

/***/ "./src/helpers/styles/mixins.js":
/*!**************************************!*\
  !*** ./src/helpers/styles/mixins.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "display": () => (/* binding */ display),
/* harmony export */   "align": () => (/* binding */ align),
/* harmony export */   "flex": () => (/* binding */ flex),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
const display = {
  flex: `
        // display: -webkit-box;
        // display: -moz-box;
        // display: -ms-flexbox;
        // display: -webkit-flex;
        display: flex;
    `,
  inline: `
        display: inline-block;
    `,
  block: `
        display: block;
    `
};
const flex = {
  bottom: `
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	`,
  vertical: `
      display: flex;
      flex-direction: column;
      justify-content: center;
    `,
  horizontal: `
		display: flex;
		-webkit-flex-flow: row wrap;
		flex-flow: row wrap;
		justify-content: center;
	`
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
        `
  }
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
    `
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
  pointer: 'pointer-events: none;'
};


/***/ }),

/***/ "./src/helpers/styles/typography.js":
/*!******************************************!*\
  !*** ./src/helpers/styles/typography.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "textH1": () => (/* binding */ textH1),
/* harmony export */   "textH2": () => (/* binding */ textH2),
/* harmony export */   "textH3": () => (/* binding */ textH3),
/* harmony export */   "textH4": () => (/* binding */ textH4),
/* harmony export */   "textH5": () => (/* binding */ textH5),
/* harmony export */   "textP": () => (/* binding */ textP),
/* harmony export */   "textLi": () => (/* binding */ textLi),
/* harmony export */   "textA": () => (/* binding */ textA),
/* harmony export */   "textFigCaption": () => (/* binding */ textFigCaption),
/* harmony export */   "textBlockQuote": () => (/* binding */ textBlockQuote),
/* harmony export */   "textFoundation": () => (/* binding */ textFoundation)
/* harmony export */ });
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables */ "./src/helpers/styles/variables.js");
// import { createGlobalStyle } from 'styled-components';

const textH1 = `
    ${_variables__WEBPACK_IMPORTED_MODULE_0__.fonts.playfair}
    font-size: 200px;
    font-size: calc(160px + (300 - 160) * ((99vw - 300px) / (1900 - 300)));
    font-style: italic;
    font-weight: 900;
    letter-spacing: -5px;
    line-height: 1.35;
    vertical-align: baseline;
`;
const textH2 = `
    ${_variables__WEBPACK_IMPORTED_MODULE_0__.fonts.playfair}
    font-size: 100px;
    font-size: calc(90px + (200 - 90) * ((99vw - 300px) / (1900 - 300)));
    letter-spacing: 1px;
    font-style: italic;
    font-weight: 900;
    line-height: 1;
`;
const textH3 = `
    ${_variables__WEBPACK_IMPORTED_MODULE_0__.fonts.archivo}
    font-size: 50px;
    font-size: calc(40px + (65 - 40) * ((100vw - 300px) / (1900 - 300)));
    line-height: 1.35;
`;
const textH4 = `
    ${_variables__WEBPACK_IMPORTED_MODULE_0__.fonts.robotoMono}
    font-size: 26px;
    font-size: calc(21px + (28 - 21) * ((100vw - 300px) / (1900 - 300)));
    font-style: normal;
`;
const textH5 = `
    ${_variables__WEBPACK_IMPORTED_MODULE_0__.fonts.robotoMono}
    font-size: 11px;
    font-size: calc(10px + (13 - 10) * ((100vw - 300px) / (1900 - 300)));
    letter-spacing: 2.5px;
    font-weight: 700;
    text-transform: uppercase;
`;
const textP = `
    ${_variables__WEBPACK_IMPORTED_MODULE_0__.fonts.robotoMono}
    font-size: 13px;
    font-size: calc(10px + (16 - 10) * ((100vw - 300px) / (1900 - 300)));
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
    ${_variables__WEBPACK_IMPORTED_MODULE_0__.fonts.robotoMono}
    line-height: 1.35;
`;
const textBlockQuote = `
    ${_variables__WEBPACK_IMPORTED_MODULE_0__.fonts.archivo}
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
        b {
            font-weight: 600;
        }
    }
`;


/***/ }),

/***/ "./src/helpers/styles/variables.js":
/*!*****************************************!*\
  !*** ./src/helpers/styles/variables.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "colors": () => (/* binding */ colors),
/* harmony export */   "defaults": () => (/* binding */ defaults),
/* harmony export */   "layouts": () => (/* binding */ layouts),
/* harmony export */   "fonts": () => (/* binding */ fonts)
/* harmony export */ });
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
            `
    },
    padding: {
      vert: '7.5rem',
      hori: '200px'
    }
  },
  iconSize: '15px',
  pseudoClass: `
        position: absolute;
        content: ' ';
    `
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
        `
  },
  width: {
    full: `
            ${defaults.section.base.width}
            width: 100%;
        `
  }
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


/***/ }),

/***/ "./src/helpers/utils/getRandomString.js":
/*!**********************************************!*\
  !*** ./src/helpers/utils/getRandomString.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getRandomString)
/* harmony export */ });
function getRandomString() {
  return Math.random().toString(36).slice(2);
}

/***/ }),

/***/ "./src/helpers/utils/getStyle.js":
/*!***************************************!*\
  !*** ./src/helpers/utils/getStyle.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zeroToOneValue": () => (/* binding */ zeroToOneValue),
/* harmony export */   "hexColor": () => (/* binding */ hexColor)
/* harmony export */ });
const zeroToOneValue = prop => {
  let transProp = prop;

  if (transProp.length === 1) {
    transProp = `0${transProp}`;
  } else if (transProp.length === 3) {
    return '1';
  }

  return `0.${transProp}`;
};

const hexColor = function (prop) {
  const colorProp = prop || false;

  if (!colorProp) {
    return '#000000';
  }

  return colorProp;
};



/***/ }),

/***/ "./src/helpers/utils/index.js":
/*!************************************!*\
  !*** ./src/helpers/utils/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomString": () => (/* reexport safe */ _getRandomString__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "getStyle": () => (/* reexport module object */ _getStyle__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "DevDialogue": () => (/* reexport safe */ _DevDialogue__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _getStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getStyle */ "./src/helpers/utils/getStyle.js");
/* harmony import */ var _getRandomString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getRandomString */ "./src/helpers/utils/getRandomString.js");
/* harmony import */ var _DevDialogue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DevDialogue */ "./src/helpers/DevDialogue.js");





/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "utils": () => (/* reexport module object */ _helpers_utils__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "styles": () => (/* reexport safe */ _helpers_styles__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Message": () => (/* binding */ Message),
/* harmony export */   "atomic": () => (/* binding */ atomic),
/* harmony export */   "views": () => (/* binding */ views),
/* harmony export */   "services": () => (/* binding */ services)
/* harmony export */ });
/* harmony import */ var _helpers_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/styles */ "./src/helpers/styles/index.js");
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/utils */ "./src/helpers/utils/index.js");
/* harmony import */ var _views_misc_MagicText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/misc/MagicText */ "./src/views/misc/MagicText.js");
/* harmony import */ var _components_button_StandardButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/button/StandardButton */ "./src/components/button/StandardButton.js");
/* harmony import */ var _components_content_TextContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/content/TextContent */ "./src/components/content/TextContent.js");
// helpers

 // views

 // services
// import resolveJsonToHtml from './services/resolveJsonHtml';
// atomic



const Message = _helpers_utils__WEBPACK_IMPORTED_MODULE_1__.DevDialogue;
const atomic = {
  StandardButton: _components_button_StandardButton__WEBPACK_IMPORTED_MODULE_3__["default"],
  TextContent: _components_content_TextContent__WEBPACK_IMPORTED_MODULE_4__["default"]
};
const views = {
  MagicText: _views_misc_MagicText__WEBPACK_IMPORTED_MODULE_2__["default"]
};
const services = {// resolveJsonToHtml
};


/***/ }),

/***/ "./src/pages/_static/GlobalStyles.js":
/*!*******************************************!*\
  !*** ./src/pages/_static/GlobalStyles.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GlobalStyles)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ "./src/index.js");



function GlobalStyles({
  theme
}) {
  const StyleFoundation = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__.createGlobalStyle)([":root{--main-color:", ";}", " ", ""], theme, ___WEBPACK_IMPORTED_MODULE_1__.styles.global, ___WEBPACK_IMPORTED_MODULE_1__.styles.textFoundation);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyleFoundation, null);
}

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Index)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var _static_GlobalStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_static/GlobalStyles */ "./src/pages/_static/GlobalStyles.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ */ "./src/index.js");
/* harmony import */ var _views_navigation_DirectionalNavigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/navigation/DirectionalNavigation */ "./src/views/navigation/DirectionalNavigation.js");
/* harmony import */ var _views_navigation_HeaderNavigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../views/navigation/HeaderNavigation */ "./src/views/navigation/HeaderNavigation.js");






const {
  TextContent
} = ___WEBPACK_IMPORTED_MODULE_2__.atomic;
const {
  colors
} = ___WEBPACK_IMPORTED_MODULE_2__.styles;
const MainContent = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].main.withConfig({
  displayName: "pages__MainContent"
})(["width:100%;height:100vh;margin:0 auto;overflow:hidden;"]);
const Section = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].section.withConfig({
  displayName: "pages__Section"
})(["position:relative;width:100%;height:100%;margin:0 auto;text-align:center;"]);
const Modal = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].article.withConfig({
  displayName: "pages__Modal"
})(["position:absolute;top:0;left:0;right:0;margin:0 auto;width:100%;height:100vh;padding:50px;z-index:10;background:rgba(0,0,0,0.5);> div{width:100%;height:100%;overflow:hidden scroll;background:white;}"]);
const MagicBox = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div.withConfig({
  displayName: "pages__MagicBox"
})(["position:absolute;width:400px;height:350px;z-index:-1;background-color:rgb(", ");"], colors.yellow);
const Headline = (0,styled_components__WEBPACK_IMPORTED_MODULE_5__["default"])(TextContent).withConfig({
  displayName: "pages__Headline"
})(["&&{position:absolute;bottom:5%;left:5%;width:90%;display:inline-block;margin:0 auto;text-align:left;h1{margin:0 0 50px 10px;line-height:0.75;}h1,h2,h3,h4,h5{width:auto;display:inline-block;text-align:left;}}"]);
const Placard = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].aside.withConfig({
  displayName: "pages__Placard"
})(["position:absolute;top:50px;right:50px;width:35vw;min-width:450px;max-width:550px;padding:25px;z-index:3;border:5px solid rgb(", ");background:rgba(255,255,255,0.75);> div{height:auto;min-height:275px;display:flex;flex-flow:column;justify-content:center;padding:25px 50px 25px 35px;background-color:rgb(", ");h4,h5,p{text-align:left;}.standard_button{background-color:rgb(", ");}}"], colors.offBlack, colors.yellow, colors.yellowWhite);
const PlacardText = (0,styled_components__WEBPACK_IMPORTED_MODULE_5__["default"])(TextContent).withConfig({
  displayName: "pages__PlacardText"
})(["margin-bottom:20px;"]);
function Index({
  pageContext
}) {
  console.log(pageContext);
  const {
    placard,
    headline
  } = pageContext.content.initial;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_static_GlobalStyles__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_views_navigation_HeaderNavigation__WEBPACK_IMPORTED_MODULE_4__["default"], {
    "data-navigation": "explicit"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MainContent, {
    id: "main"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Section, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Placard, {
    id: "placard",
    className: 'placard'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PlacardText, {
    text: placard
  }), placard.btn && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(___WEBPACK_IMPORTED_MODULE_2__.atomic.StandardButton, placard.btn))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Headline, {
    id: "headline",
    className: 'headline',
    text: headline
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MagicBox, {
    id: "magicBox",
    className: 'magicbox'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: 'magicbox_overlay'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    className: 'magicbox_image-active'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    className: 'magicbox_image-next'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Modal, {
    id: "modal",
    style: {
      opacity: '0',
      display: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_views_navigation_DirectionalNavigation__WEBPACK_IMPORTED_MODULE_3__["default"], {
    "data-navigation": "implicit"
  }));
}

/***/ }),

/***/ "./src/views/misc/MagicText.js":
/*!*************************************!*\
  !*** ./src/views/misc/MagicText.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MagicText)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ "./src/index.js");
/* harmony import */ var _magicTextStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./magicTextStyles */ "./src/views/misc/magicTextStyles.js");





const MagicContainer = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "MagicText__MagicContainer"
})(["&&&{position:absolute;padding:0;pointer-events:none;*{pointer-events:all;}", " ", " ", " ", "}"], _magicTextStyles__WEBPACK_IMPORTED_MODULE_3__.defaultContainerStyling, props => props.magicType === 'floating' && `
			min-height: 350px;
			min-width: 400px;
			max-width: 600px;
			display: flex;
			flex-direction: column;
			padding: 35px;
			border: 2px solid #333;
			background-color: rgba(255,255,255,0.5);
			&[data-keyname='business-card'] > div {
				padding: 50px;
			}
		`, props => props.magicType === 'list' && `
			position: relative;
		`, props => props.cssSettings);
const RichtextWrapper = styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "MagicText__RichtextWrapper"
})(["", ""], props => props.contentStyles);
function MagicText({ ...props
}) {
  try {
    const {
      magicText,
      magicType,
      htmlAttrs = {}
    } = props;

    const richtextStyle = function () {
      switch (magicType) {
        case 'floating':
          return _magicTextStyles__WEBPACK_IMPORTED_MODULE_3__.floatingBox;

        case 'headline':
          return _magicTextStyles__WEBPACK_IMPORTED_MODULE_3__.bigHeadline;

        case 'list':
          return _magicTextStyles__WEBPACK_IMPORTED_MODULE_3__.contentList;

        default:
          return _magicTextStyles__WEBPACK_IMPORTED_MODULE_3__.defaultItem;
      }
    }();

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MagicContainer, Object.assign({}, htmlAttrs, {
      className: 'magic-text',
      "data-magictext": magicType,
      magicType: magicType
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(RichtextWrapper, {
      contentStyles: richtextStyle
    }, JSON.stringify(magicText)));
  } catch (err) {
    console.log(err);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
  }
}
;
MagicText.propTypes = {
  magicText: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object.isRequired),
  magicSettings: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  magicType: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  htmlAttrs: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)
};

/***/ }),

/***/ "./src/views/misc/magicTextStyles.js":
/*!*******************************************!*\
  !*** ./src/views/misc/magicTextStyles.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultContainerStyling": () => (/* binding */ defaultContainerStyling),
/* harmony export */   "floatingBox": () => (/* binding */ floatingBox),
/* harmony export */   "bigHeadline": () => (/* binding */ bigHeadline),
/* harmony export */   "contentList": () => (/* binding */ contentList),
/* harmony export */   "defaultItem": () => (/* binding */ defaultItem)
/* harmony export */ });
const defaultContainerStyling = `
	p, a, button {
		color: black;
		z-index: 1;
		* {
			vertical-align: unset;
		}
	}
	hr {
		position: relative;
		display: block;
		width: 100%;
		height: 10px;
		border: none;
	}
`;
const bigHeadline = `
	h1 {
		// font-size: 10vw;
		// line-height: calc(12vw + 2.5px);
		padding: 0;
		margin-left: -0.5vw;
		z-index: -1;
		&:not(:last-of-type) {
			padding: 0 0 6vh 0;
		}
	}
`;
const floatingBox = `
	&& {
		width: auto;
		height: 100%;
		flex: 1;
		// padding: 35px 45px 75px 125px;
		border: 2px solid #333;
		background-color: white;
		h1, h2, h3, h4, h5 p {
			display: block;
		}
		h3 {
			padding: 0;
			line-height: 0.9;
		}
	}
`;
const contentList = `
	&&& {
		position: relative;
		width: 100%;
		h1, h2, h3, h4, h5, p {
			color: #000;
			padding-bottom: 150px;
			span {
				color: #000;
				-webkit-text-stroke-color: #000
			}
		}
	}
`;
const defaultItem = `
	position: relative;
	width: 100%;
	height: 100%;
`;


/***/ }),

/***/ "./src/views/navigation/DirectionalNavigation.js":
/*!*******************************************************!*\
  !*** ./src/views/navigation/DirectionalNavigation.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DirectionalNavigation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");



const Navigate = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].nav.withConfig({
  displayName: "DirectionalNavigation__Navigate"
})(["position:absolute;bottom:0;right:0;width:300px;height:70px;> ul{width:100%;height:100%;li{width:50%;height:100%;display:inline-block;line-height:70px;text-align:center;background-color:blue;&::before{color:white;font-size:30px;}&[data-navigate='-1']::before{content:'<'}&[data-navigate='1']::before{content:'>'}}}"]);
function DirectionalNavigation({ ...props
}) {
  // return (
  // 	<Navigate id="directional" {...props}>
  // 		<Link to="/portfolio"></Link>
  // 	</Navigate>
  // )
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Navigate, Object.assign({
    id: "directional"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    "data-navigate": "-1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    "data-navigate": "1"
  })));
}

/***/ }),

/***/ "./src/views/navigation/HeaderNavigation.js":
/*!**************************************************!*\
  !*** ./src/views/navigation/HeaderNavigation.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HeaderNavigation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.esm.js");


const HeaderWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].header.withConfig({
  displayName: "HeaderNavigation__HeaderWrapper"
})(["position:fixed;top:0;left:0;width:unset;z-index:100;.mobile{display:none;}nav{padding:25px 0px 0px 10px;ul{list-style:none;li{list-style-type:none;width:auto;width:max-content;padding:14px 70px 14px 20px;background:black;&:not(:first-child){margin:30px 0 0;}p{font-size:14px;font-weight:600;letter-spacing:2px;color:white;text-transform:lowercase;white-space:nowrap;}*{pointer-events:none;}}}}"]);
function HeaderNavigation({ ...props
}) {
  try {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HeaderWrapper, Object.assign({
      id: "header"
    }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: 'mobile'
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      "data-navigate": "portfolio"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "portfolio")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      "data-navigate": "about"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "about me")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      "data-navigate": "contact"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "contact")))));
  } catch (err) {
    console.log(err);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
  }

  ;
}
;

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-js.js.map