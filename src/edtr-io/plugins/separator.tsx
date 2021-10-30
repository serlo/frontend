import { EditorPlugin, EditorPluginProps, scalar } from '@edtr-io/plugin'
import * as React from 'react'
import styled from 'styled-components'

const separatorState = scalar(undefined)

export type SeparatorPluginState = typeof separatorState
export type SeparatorProps = EditorPluginProps<SeparatorPluginState>

export const separatorPlugin: EditorPlugin<SeparatorPluginState> = {
  Component: SeparatorEditor,
  state: separatorState,
  config: {},
}

const Container = styled.div({
  paddingTop: '10px',
  paddingBottom: '10px',
})

const Separator = styled.hr({
  marginTop: 0,
  marginBottom: 0,
})

function SeparatorEditor(props: SeparatorProps) {
  if (!props.editable) return null
  return (
    <Container>
      <Separator />
    </Container>
  )
}
