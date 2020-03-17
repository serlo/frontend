import styled from 'styled-components'
import { transparentize, darken } from 'polished'

import { theme } from '../theme'

const makeMargin = props =>
  props.full ? '' : 'margin-left:15px;margin-right:15px;'

const makePadding = props =>
  props.full ? '' : 'padding-left:15px;padding-right:15px;'

export const DummyContainer = styled.main<{ hide?: boolean }>`
  margin-left: auto;
  margin-right: auto;
  max-width 900px;
  ${props => (props.hide ? 'overflow: hidden;' : '')}
`

export const HSpace = styled.div<{ amount?: number }>`
  height: ${props => (props.amount ? props.amount : 30)}px;
`

export const ArticleHeading = styled.h1`
  margin-top: 35px;
  margin-left: 15px;
  font-size: 32px;
  padding: 0;
  margin-right: 15px;
  margin-bottom: 20px;
`

export const ToolLine = styled.div`
  margin-right: 16px;
  margin-top: 5px;
  display: none;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
  }
  margin-bottom: 40px;
  justify-content: flex-end;
`

export const ToolLineButton = styled.button`
  font-weight: bold;
  font-size: 12px;
  border: none;
  padding: 4px 4px;
  margin: 2px;
  margin-left: 3px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${props => props.theme.colors.brandGreen};
  background-color: transparent;
  border: thin solid;
`

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Row = styled.div`
  width: 100%;
  margin-bottom: 12px;
`

export const ImgCentered = styled.div`
  ${makePadding}
  margin-bottom: 38px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Img = styled.img<{ maxWidth?: number }>`
  max-width: ${props => (props.maxWidth > 0 ? props.maxWidth + 'px' : '')};
`

export const StyledP = styled.p<{
  full?: boolean
  slim?: boolean
  halfslim?: boolean
}>`
  ${makeMargin}
  margin-top: 0;
  margin-bottom: ${props => (props.slim ? '0' : '38px')};
  ${props => (props.halfslim ? 'margin-bottom: 12px;' : '')}
  hyphens: auto;
  line-height: 1.3;
  font-size: 18px;
`

export const StyledH2 = styled.h2`
  ${makeMargin}
  margin-top: 0;
  border-bottom: 1px solid
    ${props => transparentize(0.7, props.theme.colors.dark1)};
  padding-bottom: 6px;
  margin-bottom: 38px;
  font-size: 24px;
  hyphens: auto;
`

export const StyledH3 = styled.h3`
  ${makeMargin}
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 21px;
`

export const StyledH4 = styled.h4`
  ${makeMargin}
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 19px;
`

export const StyledH5 = styled.h5`
  ${makeMargin}
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 17px;
`

export const StyledA = styled.a`
  color: ${props => darken(0.05, props.theme.colors.brandGreen)};
  text-decoration: none;
  font-weight: bold;
  &:visited {
    color: ${props => darken(0.2, props.theme.colors.brandGreen)};
  }
`

export const MathCentered = styled.div<{ full?: boolean }>`
  ${makePadding}
  width:100%;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 38px;
  font-size: 19px;
  overflow: scroll;
`

export const LayoutRow = styled.div`
  display: flex;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

export const Col = styled.div<{ size: number }>`
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    box-sizing: border-box;
    flex-basis: ${props => Math.floor((props.size * 100) / 24)}%;
    width: ${props => Math.floor((props.size * 100) / 24)}%;
    max-width: ${props => Math.floor((props.size * 100) / 24)}%;
  }
`

export const StyledLi = styled.li`
  hyphens: auto;
  line-height: 1.3;
  font-size: 18px;
  margin-bottom: 8px;
`

export const StyledUl = styled.ul`
  ${makeMargin}
  margin-bottom: 38px;
  margin-top: 0;
`

export const StyledOl = styled.ol`
  ${makeMargin}
  margin-bottom: 38px;
  margin-top: 0;
`

export const Important = styled.div`
  border-left: 6px solid ${props => theme.colors.brand};
  padding-left: 10px;
  padding-right: 10px
  margin-bottom: 38px;
`

export const InlineImg = styled.img`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`
