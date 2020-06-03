import styled from 'styled-components'

import { makeMargin } from '../../helper/css'

// TODO: needs type declaration
export type CodeProps = any

export function Code({ content }: CodeProps) {
  return (
    <Pre>
      <code>{content}</code>
    </Pre>
  )
}

const Pre = styled.pre`
  ${makeMargin}
  margin-top: 5px;
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  padding: 16px;

  background-color: ${(props) => props.theme.colors.bluewhite};
  border-left: 8px solid ${(props) => props.theme.colors.lighterblue};

  > code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
      monospace;
  }
`
