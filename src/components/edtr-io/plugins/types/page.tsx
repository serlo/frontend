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
import {
  EditorPlugin,
  EditorPluginProps,
  object,
  string,
} from '@edtr-io/plugin'
import * as React from 'react'

import { Controls, editorContent, HeaderInput, license, uuid } from './common'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const pageTypeState = object({
  ...uuid,
  ...license,
  title: string(),
  content: editorContent(),
})

export const pageTypePlugin: EditorPlugin<typeof pageTypeState> = {
  Component: PageTypeEditor,
  state: pageTypeState,
  config: {},
}

function PageTypeEditor(props: EditorPluginProps<typeof pageTypeState>) {
  const { title, content } = props.state
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <article>
      <header>
        <div className="page-header">
          <h1>
            {props.editable ? (
              <HeaderInput
                placeholder={editorStrings.page.title}
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
      </header>
      <section itemProp="articleBody">{content.render()}</section>
      <Controls {...props.state} />
    </article>
  )
}
