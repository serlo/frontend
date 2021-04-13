import { css, ThemeProps } from 'styled-components'

import { theme } from '@/theme'

type Theme = typeof theme
type _ThemeProps = ThemeProps<Theme>

export const makeMargin = (props: _ThemeProps) => `
  margin-left:${props.theme.defaults.sideSpacingMobile};
  margin-right:${props.theme.defaults.sideSpacingMobile};
`

export const makeResponsiveMargin = (props: _ThemeProps) =>
  `
  margin-left:${props.theme.defaults.sideSpacingMobile};
  margin-right:${props.theme.defaults.sideSpacingMobile};
  @media (min-width: ${props.theme.breakpoints.lg}) {
    margin-left:${props.theme.defaults.sideSpacingLg};
    margin-right:${props.theme.defaults.sideSpacingLg};
  }
  `

export const makePadding = (props: _ThemeProps) => `
  padding-left:${props.theme.defaults.sideSpacingMobile};
  padding-right:${props.theme.defaults.sideSpacingMobile};
`

export const makeResponsivePadding = (props: _ThemeProps) =>
  `
  padding-left:${props.theme.defaults.sideSpacingMobile};
  padding-right:${props.theme.defaults.sideSpacingMobile};
  @media (min-width: ${props.theme.breakpoints.lg}) {
    padding-left:${props.theme.defaults.sideSpacingLg};
    padding-right:${props.theme.defaults.sideSpacingLg};
  }
  `

interface MakeButtonProps {
  type?: 'transparent' | 'greenTransparent' | 'light' | 'primary' | 'greenFull'
}

function makeButton(props: _ThemeProps & MakeButtonProps) {
  const colors = props.theme.colors
  const type = props.type || 'transparent'

  const colorsLookup = {
    transparent: {
      color: colors.brand,
      background: 'transparent',
      colorHover: colors.white,
      backgroundHover: colors.brand,
    },
    greenTransparent: {
      color: colors.brandGreen,
      background: 'transparent',
      colorHover: colors.white,
      backgroundHover: colors.brandGreen,
    },
    light: {
      color: colors.brand,
      background: colors.bluewhite,
      colorHover: colors.white,
      backgroundHover: colors.brand,
    },
    primary: {
      color: colors.white,
      background: colors.brand,
      colorHover: colors.white,
      backgroundHover: colors.lightblue,
    },
    greenFull: {
      color: colors.white,
      background: colors.brandGreen,
      colorHover: colors.white,
      backgroundHover: colors.brand,
    },
  }

  const colorsObject = colorsLookup[type]

  return css`
    display: inline-block;
    transition: all 0.2s ease-in-out 0s;
    border-radius: 2em;
    padding: 3px 8px;
    font-weight: bold;
    border: 0;
    cursor: pointer;

    line-height: normal;

    text-decoration: none !important;
    font-size: 1.125rem;
    font-family: Karmilla, sans-serif;
    letter-spacing: '-0.007em';

    color: ${colorsObject.color};
    background-color: ${colorsObject.background};
    &:hover {
      color: ${colorsObject.colorHover};
      background-color: ${colorsObject.backgroundHover};
    }
  `
}

export const makeTransparentButton = (props: _ThemeProps) =>
  makeButton({ theme: props.theme, type: 'transparent' })

export const makeGreenTransparentButton = (props: _ThemeProps) =>
  makeButton({ theme: props.theme, type: 'greenTransparent' })

export const makeGreenButton = (props: _ThemeProps) =>
  makeButton({ theme: props.theme, type: 'greenFull' })

export const makePrimaryButton = (props: _ThemeProps) =>
  makeButton({ theme: props.theme, type: 'primary' })

export const makeLightButton = (props: _ThemeProps) =>
  makeButton({ theme: props.theme, type: 'light' })

export const inputFontReset = () =>
  css`
    font-size: 1rem;
    font-family: Karmilla, sans-serif;
    letter-spacing: '-0.007em';
  `

export const FontFix = () => null
export const PrintStylesheet = () => null
