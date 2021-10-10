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
  scalar,
  string,
} from '@edtr-io/plugin'
import { useI18n } from '@serlo/i18n'
import * as React from 'react'

export const errorState = object({
  plugin: string(),
  state: scalar<unknown>({}),
})

export type ErrorPluginState = typeof errorState

export const ErrorRenderer: React.FunctionComponent<
  EditorPluginProps<ErrorPluginState>
> = (props) => {
  const i18n = useI18n()

  return (
    <div className="panel panel-danger">
      <div className="panel-heading">
        {i18n.t('error::This part of the document could not be converted.')}
      </div>
      <div className="panel-body">
        <pre>
          {JSON.stringify(
            {
              plugin: props.state.plugin.value,
              state: props.state.state.value,
            },
            undefined,
            2
          )}
        </pre>
      </div>
    </div>
  )
}

export const errorPlugin: EditorPlugin<typeof errorState> = {
  Component: ErrorRenderer,
  state: errorState,
  config: {},
}
