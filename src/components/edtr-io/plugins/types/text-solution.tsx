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
import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin'
import { ExpandableBox } from '@edtr-io/renderer-ui'
import { ThemeProvider } from '@edtr-io/ui'
import * as React from 'react'

import { Controls, editorContent, entity, entityType } from './common'
import { RevisionHistory } from './helpers/settings'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const textSolutionTypeState = entityType(
  {
    ...entity,
    content: editorContent('solution'),
  },
  {}
)
export type TextSolutionTypeProps = EditorPluginProps<
  typeof textSolutionTypeState,
  { skipControls: boolean }
>

export const textSolutionTypePlugin: EditorPlugin<
  typeof textSolutionTypeState,
  { skipControls: boolean }
> = {
  Component: TextSolutionTypeEditor,
  state: textSolutionTypeState,
  config: {
    skipControls: false,
  },
}

const solutionTheme = {
  rendererUi: {
    expandableBox: {
      toggleBackgroundColor: '#d9edf7',
      containerBorderColor: '#d9edf7',
    },
  },
}

function TextSolutionTypeEditor(props: TextSolutionTypeProps) {
  const loggedInData = useLoggedInData()
  const renderTitle = React.useCallback(
    (collapsed: boolean) => {
      if (!loggedInData) return
      const editorStrings = loggedInData.strings.editor
      return (
        <>
          {collapsed
            ? editorStrings.solution.showSolution
            : editorStrings.solution.hideSolution}
        </>
      )
    },
    [loggedInData]
  )

  return (
    <>
      {props.renderIntoToolbar(
        <RevisionHistory
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      <ThemeProvider theme={solutionTheme}>
        <ExpandableBox renderTitle={renderTitle} editable={props.editable}>
          {props.state.content.render()}
        </ExpandableBox>
      </ThemeProvider>
      {props.config.skipControls ? null : (
        <Controls subscriptions {...props.state} />
      )}
    </>
  )
}
