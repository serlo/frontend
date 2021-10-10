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
import { useI18n } from '@serlo/i18n'
import * as React from 'react'

import {
  entity,
  Controls,
  editorContent,
  serializedChild,
  HeaderInput,
  entityType,
} from './common'
import { Settings, RevisionHistory } from './helpers/settings'

export const appletTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(),
    reasoning: editorContent(),
    meta_title: string(),
    meta_description: string(),
    url: serializedChild('geogebra'),
  },
  {}
)

export const appletTypePlugin: EditorPlugin<typeof appletTypeState> = {
  Component: AppletTypeEditor,
  state: appletTypeState,
  config: {},
}

function AppletTypeEditor(props: EditorPluginProps<typeof appletTypeState>) {
  const { title, url, content, meta_title, meta_description } = props.state
  const i18n = useI18n()

  return (
    <div>
      <div className="page-header">
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
              label={i18n.t('applet::Title for search engines')}
              state={meta_title}
            />
            <Settings.Textarea
              label={i18n.t('applet::Description for search engines')}
              state={meta_description}
            />
          </Settings>
        )}
        <h1>
          {props.editable ? (
            <HeaderInput
              placeholder={i18n.t('applet::Title')}
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
        {url.render()}
        {content.render()}
      </article>
      <Controls subscriptions {...props.state} />
    </div>
  )
}
