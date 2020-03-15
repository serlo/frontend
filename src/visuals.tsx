import styled from 'styled-components'
import { transparentize, darken } from 'polished'

export const DummyContainer = styled.main`
  margin-left: auto;
  margin-right: auto;
  max-width 900px;
  overflow: hidden;
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
  margin-bottom: 0;
`

export const ToolLine = styled.div`
  margin-right: 16px;
  margin-top: 5px;
  display: none;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
  }
  margin-bottom: 8px;
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

export const ImgWrapper = styled.div<{ maxWidth: number }>`
  max-width: ${props => (props.maxWidth > 0 ? props.maxWidth + 'px' : '')};
  display: block;
  margin-left: 10px;
  margin-right: 10px;
`

export const Img = styled.img`
  max-width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

export const StyledP = styled.p`
  margin: 0 15px 10px;
  hyphens: auto;
  line-height: 1.3;
  font-size: 18px;
`

export const StyledH2 = styled.h2`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 0;
  border-bottom: 1px solid
    ${props => transparentize(0.7, props.theme.colors.dark1)};
  padding-bottom: 6px;
  margin-bottom: 8px;
  hyphens: auto;
`

export const StyledH3 = styled.h3`
  margin: 0 15px;
`

export const StyledH4 = styled.h4`
  margin: 0 15px;
  font-size: 17px;
`

export const StyledH5 = styled.h5`
  margin: 0 15px;
  font-size: 16px;
`

export const StyledA = styled.a`
  color: ${props => darken(0.05, props.theme.colors.brandGreen)};
  text-decoration: none;
  font-weight: bold;
  &:visited {
    color: ${props => darken(0.2, props.theme.colors.brandGreen)};
  }
`

export const LayoutRow = styled.div`
  display: flex;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

export const Col = styled.div<{ size: number }>`
  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    flex-basis: ${props => Math.floor((props.size * 100) / 24)}%;
    box-sizing: border-box;
    width: ${props => Math.floor((props.size * 100) / 24)}%;
    max-width: ${props => Math.floor((props.size * 100) / 24)}%;
    padding: 10px 32px;
  }
`

export const StyledLi = styled.li`
  margin-bottom: 4px;
  hyphens: auto;
  line-height: 1.3;
  font-size: 18px;
`

export const StyledUl = styled.ul`
  margin: 0 15px 8px;
`

export const StyledOl = styled.ol`
  margin: 0 15px 8px;
`
