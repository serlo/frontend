import styled, { css } from 'styled-components'

export const MaxWidthDiv = styled.div<{
  showNav?: boolean
  width?: number
}>`
  max-width: ${(props) => (props.width ? props.width : 800)}px;
  margin: 0 auto 100px auto;

  @media (min-width: ${(props) =>
      props.theme.breakpoints.sm}) AND (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    margin: 0 0 0 51px;
  }

  ${(props) =>
    props.showNav &&
    css`
      @media (min-width: ${(props) =>
          props.theme.breakpoints.md}) AND (max-width: ${(props) =>
          props.theme.breakpoints.lg}) {
        margin: 0 0 0 200px;
      }
    `}
`
