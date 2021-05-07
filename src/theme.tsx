import { tint, shade } from 'polished'

// base colors
const brand = '#2F67E9'
const black = '#000'

// use object notation to allow types to be infered
const basicColors = {
  //tint mixes with white
  //blues
  brand,
  lightblue: tint(0.2, brand),
  lighterblue: tint(0.55, brand),
  lightBlueBackground: tint(0.9, brand),
  bluewhite: tint(0.94, brand),
  lightBackground: tint(0.96, brand),

  //black, gray, white
  black,
  darkgray: tint(0.135, black), //#222
  dark1: tint(0.2, black), //#333 -> maybe merge with darkgray
  gray: tint(0.505, black), //#808080
  lightgray: tint(0.8, black), //#ccc
  white: '#fff',

  //rest
  brandGreen: '#95bc1a',
  orange: '#ff6600',
  blue: '#1794c1',
  green: '#006400',
}

const colors = basicColors as Colors

// colors that are using basic colors needs to be typed separately
type Colors = typeof basicColors & {
  h23: string
  linkColor: string
  linkHoverColor: string
}

//content
colors.h23 = colors.darkgray
colors.linkColor = brand
colors.linkHoverColor = shade(0.3, colors.linkColor)

const breakpointsInt = {
  mobile: 500,
  sm: 800,
  md: 1024,
  lg: 1216,
}

export const theme = {
  spacing: {
    mb: {
      block: '30px',
      li: '8px',
      h2: '22px',
      h3: '20px',
      h4: '18px',
      h5: '16px',
    },
  },
  colors: colors,
  breakpointsInt: breakpointsInt,
  breakpointsMax: {
    mobile: `${breakpointsInt.mobile - 1}px`,
    sm: `${breakpointsInt.sm - 1}px`,
    md: `${breakpointsInt.md - 1}px`,
    lg: `${breakpointsInt.lg - 1}px`,
  },
  breakpoints: {
    mobile: `${breakpointsInt.mobile}px`,
    sm: `${breakpointsInt.sm}px`,
    md: `${breakpointsInt.md}px`,
    lg: `${breakpointsInt.lg}px`,
  },
  defaults: {
    sideSpacingMobile: '16px',
    sideSpacingLg: '40px',
    regularLetterSpacing: '-0.006em',
    boldLetterSpacing: '-0.012em',
  },
}
