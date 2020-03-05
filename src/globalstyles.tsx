import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: 'Karmilla';
}
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
`
