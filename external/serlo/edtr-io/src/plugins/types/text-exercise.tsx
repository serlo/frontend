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
import { AddButton } from '@edtr-io/editor-ui/internal'
import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin'
import { useI18n } from '@serlo/i18n'
import * as React from 'react'

import {
  editorContent,
  entity,
  Controls,
  optionalSerializedChild,
  OptionalChild,
  entityType,
} from './common'

import { RevisionHistory } from './helpers/settings'

export const textExerciseTypeState = entityType(
  {
    ...entity,
    content: editorContent('exercise'),
  },
  {
    'text-solution': optionalSerializedChild('type-text-solution'),
  }
)

export const textExerciseTypePlugin: EditorPlugin<
  typeof textExerciseTypeState,
  { skipControls: boolean }
> = {
  Component: TextExerciseTypeEditor,
  state: textExerciseTypeState,
  config: {
    skipControls: false,
  },
}

export function TextExerciseTypeEditor(
  props: EditorPluginProps<
    typeof textExerciseTypeState,
    { skipControls: boolean }
  >
) {
  const { content, 'text-solution': textSolution } = props.state
  const i18n = useI18n()

  return (
    <article className="text-exercise">
      {props.renderIntoToolbar(
        <RevisionHistory
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      {content.render()}
      {textSolution.id ? (
        <OptionalChild
          state={textSolution}
          removeLabel={i18n.t('textExercise::Remove solution')}
          onRemove={() => {
            textSolution.remove()
          }}
        />
      ) : (
        <AddButton
          onClick={() => {
            textSolution.create()
          }}
        >
          {i18n.t('textExercise::Create solution')}
        </AddButton>
      )}
      {props.config.skipControls ? null : (
        <Controls subscriptions {...props.state} />
      )}
    </article>
  )
}
