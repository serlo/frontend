/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
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
