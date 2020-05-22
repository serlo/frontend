import styled from 'styled-components'
import { makeMargin } from '../../helper/csshelper'

export default function Code({ content }) {
  return (
    <Pre>
      <code>{content}</code>
    </Pre>
  )
}

const Pre = styled.pre`
  ${makeMargin}
  margin-bottom: ${props => props.theme.spacing.mb.block};
  padding: 16px;

  background-color: ${props => props.theme.colors.bluewhite};
  border-left: 8px solid ${props => props.theme.colors.lighterblue};

  > code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
  }
`
