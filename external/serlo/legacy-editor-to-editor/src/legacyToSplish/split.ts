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
import { Cell } from '../splishToEdtr/types'
import createPlugins from './createPlugin'
import normalizeMarkdown from './normalizeMarkdown'
import transform from './transform'

const splitMarkdown = (markdown: string) =>
  createPlugins(normalizeMarkdown(markdown))

type Leaf = { size: number; raw: string }
type CellBeforeSplit = Leaf | { rows: RowBeforeSplit[] }
type RowBeforeSplit = { cells: CellBeforeSplit[] }

function isLeaf(cell: CellBeforeSplit): cell is Leaf {
  const c = cell as Leaf
  return typeof c.raw !== 'undefined'
}
function splitCell(cell: CellBeforeSplit): Cell {
  if (isLeaf(cell)) {
    return {
      size: cell.size,
      rows: splitMarkdown(cell.raw),
    }
  } else {
    const { rows = [] } = cell
    return {
      ...cell,
      rows: rows.map(splitRow),
    }
  }
}

function splitRow(row: RowBeforeSplit) {
  return {
    ...row,
    cells: row.cells.map(splitCell),
  }
}

function split(input: ReturnType<typeof transform>) {
  return {
    ...input,
    cells: input.cells.map(splitCell),
  }
}

export default split
