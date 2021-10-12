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
import { EditorPlugin, EditorPluginProps, list, string } from '@edtr-io/plugin'
import { useI18n } from '@serlo/i18n'
import * as React from 'react'

import {
  editorContent,
  entity,
  Controls,
  serializedChild,
  HeaderInput,
  OptionalChild,
  entityType,
} from './common'
import { RevisionHistory, Settings } from './helpers/settings'

export const courseTypeState = entityType(
  {
    ...entity,
    title: string(),
    description: editorContent(),
    reasoning: editorContent(),
    meta_description: string(),
  },
  {
    'course-page': list(serializedChild('type-course-page')),
  }
)

export const courseTypePlugin: EditorPlugin<typeof courseTypeState> = {
  Component: CourseTypeEditor,
  state: courseTypeState,
  config: {},
}

function CourseTypeEditor(props: EditorPluginProps<typeof courseTypeState>) {
  const { title, meta_description, 'course-page': children } = props.state
  const i18n = useI18n()

  return (
    <article>
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
            label={i18n.t('course::Description for search engines')}
            state={meta_description}
          />
        </Settings>
      )}
      <h1>
        {props.editable ? (
          <HeaderInput
            placeholder={i18n.t('course::Title')}
            value={title.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              title.set(e.target.value)
            }}
          />
        ) : (
          <span itemProp="name">{title.value}</span>
        )}
      </h1>
      {children.map((child, index) => {
        return (
          <OptionalChild
            state={child}
            key={child.id}
            removeLabel={i18n.t('course::Remove course page')}
            onRemove={() => {
              children.remove(index)
            }}
          />
        )
      })}
      <hr />
      <AddButton onClick={() => children.insert()}>
        {i18n.t('course::Add course page')}
      </AddButton>
      <Controls subscriptions {...props.state} />
    </article>
  )
}
