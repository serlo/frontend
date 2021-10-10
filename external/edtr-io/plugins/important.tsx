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
import { child, EditorPlugin, EditorPluginProps } from '@edtr-io/plugin'
import { styled } from '@edtr-io/renderer-ui'
import * as React from 'react'

export const importantState = child({ plugin: 'text' })
export type ImportantPluginState = typeof importantState
export type ImportantProps = EditorPluginProps<ImportantPluginState>

export function createImportantPlugin(): EditorPlugin<ImportantPluginState> {
  return {
    Component: ImportantRenderer,
    config: {},
    state: importantState,
  }
}

const Box = styled.div({
  borderLeft: '#bedfed solid 5px',
  paddingLeft: '15px',
})

function ImportantRenderer(props: ImportantProps) {
  return <Box>{props.state.render()}</Box>
}
