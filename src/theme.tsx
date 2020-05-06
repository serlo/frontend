import { tint, shade } from 'polished'

type Color = {
  [key: string]: string
}

const colors = {} as Color

//tint mixes with white

//blues
colors.brand = '#007ec1'
colors.lightblue = tint(0.3, colors.brand) //#4ca4d3
colors.lighterblue = tint(0.55, colors.brand) //#8cc4e3
colors.lightBlueBackground = tint(0.85, colors.brand) //#d8ebf5
colors.bluewhite = tint(0.94, colors.brand) //#f0f7fb
colors.lightBackground = tint(0.96, colors.brand) //#f3f9fb

//black, gray, white
colors.black = '#000'
colors.darkgray = tint(0.135, colors.black) //#222
colors.dark1 = tint(0.2, colors.black) //#333 -> maybe merge with darkgray
colors.gray = tint(0.505, colors.black) //#808080
colors.lightgray = tint(0.8, colors.black) //#ccc
colors.white = '#fff'

//rest
colors.brandGreen = '#95bc1a'
colors.orange = '#ff6703'
colors.blue = '#1794c1'
colors.green = '#469a40'

//content
colors.h23 = colors.darkgray
colors.linkColor = colors.brand //was '#337AB7'
colors.linkHoverColor = shade(0.3, colors.linkColor) // was '#23527c'

export const theme = {
  spacing: {
    mb: {
      block: '30px',
      li: '8px',
      h2: '22px',
      h3: '20px',
      h4: '18px',
      h5: '16px'
    }
  },
  colors: colors,
  breakpoints: {
    mobile: '500px',
    sm: '800px',
    md: '1024px',
    lg: '1216px'
  },
  defaults: {
    sideSpacingMobile: '16px',
    sideSpacingLg: '40px',
    regularLetterSpacing: '-0.006em',
    boldLetterSpacing: '-0.012em'
  }
}
