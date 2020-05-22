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
`
