import { css } from 'styled-components'

// TODO: needs type declaration
export const makeMargin = (props: any) => `
  margin-left:${props.theme.defaults.sideSpacingMobile as string};
  margin-right:${props.theme.defaults.sideSpacingMobile as string};
`

// TODO: needs type declaration
export const makeResponsiveMargin = (props: any) =>
  `
  margin-left:${props.theme.defaults.sideSpacingMobile as string};
  margin-right:${props.theme.defaults.sideSpacingMobile as string};
  @media (min-width: ${props.theme.breakpoints.lg as string}) {
    margin-left:${props.theme.defaults.sideSpacingLg as string};
    margin-right:${props.theme.defaults.sideSpacingLg as string};
  }
  `

// TODO: needs type declaration
export const makePadding = (props: any) => `
  padding-left:${props.theme.defaults.sideSpacingMobile as string};
  padding-right:${props.theme.defaults.sideSpacingMobile as string};
`

// TODO: needs type declaration
export const makeResponsivePadding = (props: any) =>
  `
  padding-left:${props.theme.defaults.sideSpacingMobile as string};
  padding-right:${props.theme.defaults.sideSpacingMobile as string};
  @media (min-width: ${props.theme.breakpoints.lg as string}) {
    padding-left:${props.theme.defaults.sideSpacingLg as string};
    padding-right:${props.theme.defaults.sideSpacingLg as string};
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
