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
import { EditorPlugin, EditorPluginProps, string } from '@edtr-io/plugin'
import * as React from 'react'

import { entity, Controls, editorContent, entityType } from './common'
import { RevisionHistory, Settings } from './helpers/settings'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const mathPuzzleTypeState = entityType(
  {
    ...entity,
    source: string(),
    content: editorContent(),
  },
  {}
)

export const mathPuzzleTypePlugin: EditorPlugin<typeof mathPuzzleTypeState> = {
  Component: MathPuzzleTypeEditor,
  state: mathPuzzleTypeState,
  config: {},
}

function MathPuzzleTypeEditor(
  props: EditorPluginProps<typeof mathPuzzleTypeState>
) {
  const { source, content } = props.state
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <>
      {props.renderIntoToolbar(
        <RevisionHistory
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      {props.renderIntoSettings(
        <Settings>
          <Settings.Textarea
            label={editorStrings.mathPuzzle.sourceCode}
            state={source}
          />
        </Settings>
      )}
      <div className="math-puzzle" data-source={source.value}>
        {content.render()}
      </div>
      <Controls subscriptions {...props.state} />
    </>
  )
}
