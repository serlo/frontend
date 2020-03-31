export const makeMargin = props =>
  props.full
    ? ''
    : `
  margin-left:${props.theme.defaults.sideSpacingMobile};
  margin-right:${props.theme.defaults.sideSpacingMobile};
  `

export const makeResponsiveMargin = props =>
  `
  margin-left:${props.theme.defaults.sideSpacingMobile};
  margin-right:${props.theme.defaults.sideSpacingMobile};
  @media (min-width: ${props.theme.breakpoints.lg}) {
    margin-left:${props.theme.defaults.sideSpacingLg};
    margin-right:${props.theme.defaults.sideSpacingLg};
  }
  `

export const makePadding = props =>
  props.full
    ? ''
    : `
padding-left:${props.theme.defaults.sideSpacingMobile};
padding-right:${props.theme.defaults.sideSpacingMobile};
`

export const makeResponsivePadding = props =>
  `
  padding-left:${props.theme.defaults.sideSpacingMobile};
  padding-right:${props.theme.defaults.sideSpacingMobile};
  @media (min-width: ${props.theme.breakpoints.lg}) {
    padding-left:${props.theme.defaults.sideSpacingLg};
    padding-right:${props.theme.defaults.sideSpacingLg};
  }
  `
