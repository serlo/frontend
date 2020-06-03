import { css } from 'styled-components'

// TODO: needs type declaration
export const makeMargin = (props: any) => `
  margin-left:${props.theme.defaults.sideSpacingMobile};
  margin-right:${props.theme.defaults.sideSpacingMobile};
`

// TODO: needs type declaration
export const makeResponsiveMargin = (props: any) =>
  `
  margin-left:${props.theme.defaults.sideSpacingMobile};
  margin-right:${props.theme.defaults.sideSpacingMobile};
  @media (min-width: ${props.theme.breakpoints.lg}) {
    margin-left:${props.theme.defaults.sideSpacingLg};
    margin-right:${props.theme.defaults.sideSpacingLg};
  }
  `

// TODO: needs type declaration
export const makePadding = (props: any) => `
  padding-left:${props.theme.defaults.sideSpacingMobile};
  padding-right:${props.theme.defaults.sideSpacingMobile};
`

// TODO: needs type declaration
export const makeResponsivePadding = (props: any) =>
  `
  padding-left:${props.theme.defaults.sideSpacingMobile};
  padding-right:${props.theme.defaults.sideSpacingMobile};
  @media (min-width: ${props.theme.breakpoints.lg}) {
    padding-left:${props.theme.defaults.sideSpacingLg};
    padding-right:${props.theme.defaults.sideSpacingLg};
  }
  `

export const makeDefaultButton = () =>
  css`
    display: inline-block;
    transition: all 0.2s ease-in-out 0s;
    border-radius: 2em;
    padding: 2px 7px;
    text-decoration: none;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.colors.brand};
    &:hover {
      color: #fff;
      background-color: ${(props) => props.theme.colors.brand};
    }
    cursor: pointer;
  `

export const makeGreenButton = () =>
  css`
  ${makeDefaultButton}
  color: ${(props) => props.theme.colors.brandGreen};
  &:hover {
    color: #fff;
    background-color: ${(props) => props.theme.colors.brandGreen};
  }
`

export const inputFontReset = () =>
  css`
    font-size: 1rem;
    font-family: Karmilla, sans-serif;
    letter-spacing: '-0.007em';
  `
