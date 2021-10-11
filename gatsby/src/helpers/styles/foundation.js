const foundation = `
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
        color: black;
        padding: 0;
        margin: 0;
        font-kerning: normal;
    }
    h1, h2, h3, h4 {
        color: var(--main-color);
        -webkit-text-stroke-color: var(--main-color);
        span {
            color: var(--main-color);
            -webkit-text-stroke-color: var(--main-color);
        }
    }
    center * {
        text-align: center;
    }
`;

export default foundation;
