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
import split from './legacyToSplish/split'
import transform from './legacyToSplish/transform'
import {
  Legacy,
  Splish,
  RowsPlugin,
  isSplish,
  convertRow,
} from './splishToEdtr'

export function convert(content: Legacy | Splish): RowsPlugin {
  if (!content) return { plugin: 'rows', state: [] }
  const splish = isSplish(content)
    ? content
    : convertLegacyToSplish(content, '')
  return convertSplishToEdtrIO(splish)
}

export function convertLegacyToSplish(content: Legacy, id: string): Splish {
  const cells = split(transform(content))
  return {
    ...cells,
    id,
  }
}

export function convertSplishToEdtrIO(content: Splish): RowsPlugin {
  return {
    plugin: 'rows',
    state: convertRow(content),
  }
}

export {
  OtherPlugin,
  LayoutPlugin,
  RowsPlugin,
  Edtr,
  Legacy,
  Splish,
  isSplish,
  isEdtr,
} from './splishToEdtr'
