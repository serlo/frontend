import styled from 'styled-components'

const SpecialCSS = styled.div`
  word-wrap: break-word;
  & {
    p + ul {
      margin-top: -14px;
    }
    li > p {
      margin-left: 0;
      margin-right: 0;
    }
    li > [class|='MathWrapper'] {
      padding-left: 0;
      padding-right: 0;
    }
    [class|='Important'],
    [class|='SpoilerBody'],
    [class*='SolutionBox'],
    li,
    th,
    td {
      p:last-child,
      [class|='MathWrapper']:last-child,
      ul:last-child,
      ol:last-child,
      [class|='ImgWrapper']:last-child {
        margin-bottom: 0;
      }
    }
  }
`

export default SpecialCSS
