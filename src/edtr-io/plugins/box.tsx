import {
  child,
  EditorPlugin,
  EditorPluginProps,
  object,
  optional,
  string,
} from '@edtr-io/plugin'
import { styled } from '@edtr-io/renderer-ui'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

export enum BoxType {
  Blank = 'blank',
  Example = 'example',
  Quote = 'quote',
  Approach = 'approach',
  Remember = 'remember',
  Attention = 'attention',
  Observe = 'observe',
  Definition = 'definition',
  Proposition = 'proposition',
  Proof = 'proof',
}

export const boxState = object({
  type: string(typeof BoxType),
  title: child({ plugin: 'text' }),
  content: child({ plugin: 'rows' }),
})
export type BoxPluginState = typeof boxState
export type BoxProps = EditorPluginProps<BoxPluginState>

export function createBoxPlugin(): EditorPlugin<BoxPluginState> {
  return {
    Component: BoxRenderer,
    config: {},
    state: boxState,
  }
}

const Box = styled.div({
  borderLeft: '#bedfed solid 5px',
  paddingLeft: '15px',
})

function BoxRenderer(props: BoxProps) {
  const { title, type, content } = props.state

  const showIcon = type.value !== BoxType.Blank
  const icon = faExclamation

  return (
    <Box>
      {showIcon ? <FontAwesomeIcon icon={icon} /> : null}
      <b>{title.render()}</b>
      {content.render()}
    </Box>
  )
}
