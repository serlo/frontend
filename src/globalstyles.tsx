import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Karmilla';
    font-style: normal;
    font-weight: 400;
    src: url('/karmilla-regular.woff2') format('woff2'),
      url('/karmilla-regular.woff') format('woff');
  }
  @font-face {
    font-family: 'Karmilla';
    font-style: normal;
    font-weight: 700;
    src: url('/karmilla-bold.woff2') format('woff2'),
      url('/karmilla-bold.woff') format('woff');
  }

  /* -------------- essential resets ------------------ */ 
  */ https://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation */

  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    font: 16px/1 'Karmilla';
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  blockquote,
  ol,
  ul {
    margin: 0;
    padding: 0;
  }

  main,
  li {
    display: block;
  }

  h1,
  h2,
  h3,
  h4 {
    font-size: inherit;
  }

  strong {
    font-weight: bold;
  }

  /* https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
  html {
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
`
