/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2020 Serlo Education e.V.
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
 * @copyright Copyright (c) 2013-2020 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { converter } from './markdown'

export function render(state: string): string {
  if (state === undefined) {
    throw new Error('No input given')
  }

  if (state === '') {
    return ''
  }

  let rows: Array<Array<{ col: string; content: string }>>
  try {
    rows = JSON.parse(state.trim().replace(/&quot;/g, '"'))
  } catch (e) {
    throw new Error('No valid json string given')
  }

  return rows
    .map(row => {
      const innerHtml = row
        .map(column => {
          return `<div class="c${column.col}">${converter.makeHtml(
            column.content
          )}</div>`
        })
        .join('')

      return `<div class="r">${innerHtml}</div>`
    })
    .join('')
}
