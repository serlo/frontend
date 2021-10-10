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
  unwrapChildBlocks,
  normalize,
} from '../../src/splishToEdtr/normalize-slate'
import { BlockJSON, ValueJSON } from 'slate'

describe('normalizeSlateValue()', () => {
  test('unwrap child block elements with inline siblings', () => {
    const input: ValueJSON = {
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'block',
                type: '@splish-me/katex-block',
                data: { formula: 'a^2+b^2=c^2', inline: false },
                nodes: [{ object: 'text', text: 'a^2+b^2=c^2', marks: [] }],
              },
              { object: 'text', text: ' and ', marks: [] },
              {
                object: 'block',
                type: '@splish-me/katex-block',
                data: { formula: '\\sqrt{-1}=i', inline: false },
                nodes: [{ object: 'text', text: '\\sqrt{-1}=i', marks: [] }],
              },
            ],
            data: {},
          },
        ],
      },
    }
    const expectedResult: ValueJSON = {
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: [
          {
            object: 'block',
            type: '@splish-me/katex-block',
            data: { formula: 'a^2+b^2=c^2', inline: false },
            nodes: [{ object: 'text', text: 'a^2+b^2=c^2', marks: [] }],
          },
          {
            object: 'block',
            type: 'paragraph',
            nodes: [{ object: 'text', text: ' and ', marks: [] }],
            data: {},
          },
          {
            object: 'block',
            type: '@splish-me/katex-block',
            data: { formula: '\\sqrt{-1}=i', inline: false },
            nodes: [{ object: 'text', text: '\\sqrt{-1}=i', marks: [] }],
          },
        ],
      },
    }

    expect(normalize(input)).toEqual(expectedResult)
  })
})

describe('unwrapChildBlocks()', () => {
  describe('unwraps child block elements', () => {
    test('Example: child block element in the middle', () => {
      const input: BlockJSON = {
        object: 'block',
        type: 'paragraph',
        nodes: [
          { object: 'text', text: 'The theorem ', marks: [] },
          {
            object: 'block',
            type: '@splish-me/katex-block',
            data: { formula: 'a^2+b^2=c^2', inline: false },
            nodes: [{ object: 'text', text: 'a^2+b^2=c^2', marks: [] }],
          },
          { object: 'text', text: ' is very famous.', marks: [] },
        ],
        data: {},
      }
      const expectedResult = [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [{ object: 'text', text: 'The theorem ', marks: [] }],
          data: {},
        },
        {
          object: 'block',
          type: '@splish-me/katex-block',
          data: { formula: 'a^2+b^2=c^2', inline: false },
          nodes: [{ object: 'text', text: 'a^2+b^2=c^2', marks: [] }],
        },
        {
          object: 'block',
          type: 'paragraph',
          nodes: [{ object: 'text', text: ' is very famous.', marks: [] }],
          data: {},
        },
      ]

      expect(unwrapChildBlocks(input)).toEqual(expectedResult)
    })

    test('child block elements as first and last child', () => {
      const input: BlockJSON = {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'block',
            type: '@splish-me/katex-block',
            data: { formula: 'a^2+b^2=c^2', inline: false },
            nodes: [{ object: 'text', text: 'a^2+b^2=c^2', marks: [] }],
          },
          { object: 'text', text: ' and ', marks: [] },
          {
            object: 'block',
            type: '@splish-me/katex-block',
            data: { formula: '\\sqrt{-1}=i', inline: false },
            nodes: [{ object: 'text', text: '\\sqrt{-1}=i', marks: [] }],
          },
        ],
        data: {},
      }
      const expectedResult: BlockJSON[] = [
        {
          object: 'block',
          type: '@splish-me/katex-block',
          data: { formula: 'a^2+b^2=c^2', inline: false },
          nodes: [{ object: 'text', text: 'a^2+b^2=c^2', marks: [] }],
        },
        {
          object: 'block',
          type: 'paragraph',
          nodes: [{ object: 'text', text: ' and ', marks: [] }],
          data: {},
        },
        {
          object: 'block',
          type: '@splish-me/katex-block',
          data: { formula: '\\sqrt{-1}=i', inline: false },
          nodes: [{ object: 'text', text: '\\sqrt{-1}=i', marks: [] }],
        },
      ]

      expect(unwrapChildBlocks(input)).toEqual(expectedResult)
    })
  })

  test('block elements with only inline elements are not changed', () => {
    const paragraph: BlockJSON = {
      object: 'block',
      type: 'paragraph',
      nodes: [
        { object: 'text', text: 'Hello ', marks: [] },
        {
          object: 'text',
          text: 'World!',
          marks: [{ type: '@splish-me/strong' }],
        },
      ],
      data: {},
    }

    expect(unwrapChildBlocks(paragraph)).toEqual([paragraph])
  })
})
