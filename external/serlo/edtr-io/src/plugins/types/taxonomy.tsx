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
  number,
} from '@edtr-io/plugin'
import { useI18n } from '@serlo/i18n'
import * as React from 'react'

import { Controls, editorContent, HeaderInput, uuid } from './common'

export const taxonomyTypeState = object({
  ...uuid,
  term: object({
    name: string(),
  }),
  taxonomy: number(),
  parent: number(),
  position: number(),
  description: editorContent(),
})

export const taxonomyTypePlugin: EditorPlugin<typeof taxonomyTypeState> = {
  Component: TaxonomyTypeEditor,
  state: taxonomyTypeState,
  config: {},
}

function TaxonomyTypeEditor(
  props: EditorPluginProps<typeof taxonomyTypeState>
) {
  const { term, description } = props.state
  const i18n = useI18n()

  return (
    <article>
      <header>
        <div className="page-header">
          <h1>
            {props.editable ? (
              <HeaderInput
                placeholder={i18n.t('taxonomy::Title')}
                value={term.name.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  term.name.set(e.target.value)
                }}
              />
            ) : (
              <span itemProp="name">{term.name.value}</span>
            )}
          </h1>
        </div>
      </header>
      <section itemProp="articleBody">{description.render()}</section>
      <Controls />
    </article>
  )
}
