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
import { EditorPlugin } from '@edtr-io/plugin'
import {
  createTablePlugin,
  TableProps,
  TablePluginState,
  TablePluginConfig,
} from '@edtr-io/plugin-table'
import { converter } from '@serlo/markdown'
import * as React from 'react'

import { renderArticle } from '@/schema/article-renderer'
import { convertLegacyState } from '@/schema/convert-legacy-state'

const edtrTablePlugin = createTablePlugin({
  MarkdownRenderer,
})

function MarkdownRenderer(props: { markdown: string }) {
  const html = converter.makeHtml(props.markdown)
  const node = convertLegacyState(html)
  return <>{renderArticle(node.children)}</>
}

export const tablePlugin: EditorPlugin<TablePluginState, TablePluginConfig> = {
  ...edtrTablePlugin,
  Component: TableEditor,
}

function TableEditor(props: TableProps) {
  return (
    <div>
      <edtrTablePlugin.Component {...props} />
    </div>
  )
}
