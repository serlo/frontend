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
/* eslint-env jest */
import { expect } from './common'
import transform from '../src/legacyToSplish/transform'
import { Legacy } from '../src/splishToEdtr'

describe('Transformes Serlo Layout to new Layout', () => {
  test('Simple Layout', () => {
    createTestCase({
      input: [
        [
          {
            col: 24,
            content: 'Lorem ipsum',
          },
        ],
        [
          {
            col: 24,
            content: 'dolor sit amet.',
          },
        ],
      ],
      output: {
        cells: [
          {
            rows: [
              {
                cells: [{ size: 12, raw: 'Lorem ipsum' }],
              },
              {
                cells: [{ size: 12, raw: 'dolor sit amet.' }],
              },
            ],
          },
        ],
      },
    })
  })

  test('Two-Column Layout', () => {
    createTestCase({
      input: [
        [
          {
            col: 12,
            content: 'Lorem ipsum',
          },
          {
            col: 12,
            content: 'dolor adipiscing amet',
          },
        ],
      ],
      output: {
        cells: [
          {
            rows: [
              {
                cells: [
                  { size: 6, raw: 'Lorem ipsum' },
                  { size: 6, raw: 'dolor adipiscing amet' },
                ],
              },
            ],
          },
        ],
      },
    })
  })

  test('Two-column layout with odd column size', () => {
    createTestCase({
      input: [
        [
          {
            col: 5,
            content: 'Lorem ipsum',
          },
          {
            col: 19,
            content: 'dolor adipiscing amet',
          },
        ],
      ],
      output: {
        cells: [
          {
            rows: [
              {
                cells: [
                  { size: 2, raw: 'Lorem ipsum' },
                  { size: 9, raw: 'dolor adipiscing amet' },
                ],
              },
            ],
          },
        ],
      },
    })
  })

  function createTestCase({
    input,
    output,
  }: {
    input: Legacy
    output: ReturnType<typeof transform>
  }) {
    expect(transform(input), 'to equal', output)
  }
})
