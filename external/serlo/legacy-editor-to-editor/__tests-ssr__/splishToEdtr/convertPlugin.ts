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
import { convertPlugin } from '../../src/splishToEdtr/convertPlugins'
import { expect } from '../common'
import {
  SplishImageState,
  SplishSpoilerState,
} from '../../src/legacyToSplish/createPlugin'
import { ContentCell, Plugin } from '../../src/splishToEdtr/types'

describe('plugin convert works', () => {
  it('works with Spoiler wrapping an image', () => {
    const image: ContentCell<SplishImageState> = {
      content: {
        plugin: { name: Plugin.Image },
        state: {
          description: 'Some image description',
          src: 'https://assets.serlo.org/some/asset',
          title: '',
        },
      },
    }
    const spoiler: ContentCell<SplishSpoilerState> = {
      content: {
        plugin: { name: Plugin.Spoiler },
        state: {
          title: 'title',
          content: {
            type: '@splish-me/editor-core/editable',
            state: {
              id: '1',
              cells: [
                {
                  id: '2',
                  rows: [
                    {
                      cells: [image],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    }

    const expected = {
      plugin: 'spoiler',
      state: {
        content: {
          plugin: 'rows',
          state: [
            {
              plugin: 'image',
              state: {
                alt: 'Some image description',
                link: undefined,
                maxWidth: undefined,
                src: 'https://assets.serlo.org/some/asset',
              },
            },
          ],
        },
        title: 'title',
      },
    }
    expect(convertPlugin(spoiler), 'to equal', expected)
  })
})
