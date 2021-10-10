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
import * as R from 'ramda'

import { Cell, isContentCell, LayoutPlugin, OtherPlugin, Row } from './types'
import { convertPlugin } from './convertPlugins'

export {
  Plugin,
  OtherPlugin,
  LayoutPlugin,
  RowsPlugin,
  Edtr,
  Legacy,
  Splish,
  isSplish,
  isEdtr,
} from './types'

export function convertRow(row: Row): (LayoutPlugin | OtherPlugin)[] {
  // no cells, then end the recursion
  if (!row.cells.length) return []

  // if more than one cell, than convert to special plugin 'layout'
  if (row.cells.length > 1) {
    return [
      {
        plugin: 'layout',
        state: row.cells.map((cell): LayoutPlugin['state'][0] => {
          return {
            width: cell.size || 12,
            child: {
              plugin: 'rows',
              state: convertCell(cell),
            },
          }
        }),
      },
    ]
  }

  // otherwise continue with converting the only cell
  return convertCell(row.cells[0])
}

function convertCell(cell: Cell): (LayoutPlugin | OtherPlugin)[] {
  if (isContentCell(cell)) {
    return [convertPlugin(cell)]
  } else {
    return R.reduce(
      (plugins, row) => R.concat(plugins, convertRow(row)),
      [] as (LayoutPlugin | OtherPlugin)[],
      cell.rows
    )
  }
}
