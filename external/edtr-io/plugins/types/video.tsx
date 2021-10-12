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
import { createVideoPlugin } from '@edtr-io/plugin-video'
import * as React from 'react'

import {
  entity,
  Controls,
  editorContent,
  HeaderInput,
  entityType,
} from './common'
import { RevisionHistory } from './helpers/settings'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const videoTypeState = entityType(
  {
    ...entity,
    content: string(),
    title: string(),
    description: editorContent(),
    reasoning: editorContent(),
  },
  {}
)

const videoPlugin = createVideoPlugin()

export const videoTypePlugin: EditorPlugin<typeof videoTypeState> = {
  Component: VideoTypeEditor,
  state: videoTypeState,
  config: {},
}

function VideoTypeEditor(props: EditorPluginProps<typeof videoTypeState>) {
  const { title, description } = props.state
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <section>
      {props.renderIntoToolbar(
        <RevisionHistory
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      <div className="page-header">
        <h1>
          {props.editable ? (
            <HeaderInput
              placeholder={editorStrings.video.title}
              value={title.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                title.set(e.target.value)
              }}
            />
          ) : (
            <span itemProp="name">{title.value}</span>
          )}
        </h1>
      </div>
      <article>
        <section>
          <videoPlugin.Component
            {...props}
            state={{
              src: props.state.content,
              alt: props.state.title,
            }}
            config={{
              i18n: {
                src: {
                  label: editorStrings.video.url,
                },
                alt: {
                  label: editorStrings.video.titleForSearchEngines,
                },
              },
            }}
          />
        </section>
        <section>{description.render()}</section>
      </article>
      <Controls subscriptions {...props.state} />
    </section>
  )
}
