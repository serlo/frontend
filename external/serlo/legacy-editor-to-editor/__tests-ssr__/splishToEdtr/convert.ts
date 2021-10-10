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
import { serializer } from '@edtr-io/plugin-text'

import {
  convert,
  convertLegacyToSplish,
  convertSplishToEdtrIO,
} from '@serlo/legacy-editor-to-editor'
import { expect, expectSplishSlate } from '../common'
import { htmlToSlate } from '../../src/splishToEdtr/convertSlate'
import { Edtr, Legacy, Splish, Plugin } from '../../src/splishToEdtr'

const cases: {
  description: string
  legacy: Legacy
  splish: Splish
  edtrIO: Edtr
}[] = [
  {
    description: 'Convert taxonomy terms created without editor correctly',
    legacy: '# Hello world',
    splish: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [
                        expectSplishSlate(
                          '<h1 id="helloworld">Hello world</h1>'
                        ),
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      id: 'someID',
    },
    edtrIO: {
      plugin: 'rows',
      state: [
        {
          plugin: 'text',
          state: serializer.serialize(
            htmlToSlate('<h1 id="helloworld">Hello world</h1>')
          ),
        },
      ],
    },
  },
  {
    description: 'Convert chains methods together correctly',
    legacy: [
      [
        {
          col: 24,
          content: '## Lorem ipsum',
        },
      ],
      [
        {
          col: 16,
          content: 'dolor **sit** amet.',
        },
        {
          col: 8,
          content: 'consecetur',
        },
      ],
      [
        {
          col: 24,
          content: 'markdown with ![image](url)',
        },
      ],
    ],
    splish: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [
                        expectSplishSlate(
                          '<h2 id="loremipsum">Lorem ipsum</h2>'
                        ),
                      ],
                    },
                  ],
                },
              ],
            },
            {
              cells: [
                {
                  size: 8,
                  rows: [
                    {
                      cells: [
                        expectSplishSlate(
                          '<p>dolor <strong>sit</strong> amet.</p>'
                        ),
                      ],
                    },
                  ],
                },
                {
                  size: 4,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>consecetur</p>')],
                    },
                  ],
                },
              ],
            },
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>markdown with</p>')],
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: Plugin.Image,
                              version: '0.0.0',
                            },
                            state: {
                              description: 'image',
                              src: 'url',
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    edtrIO: {
      plugin: 'rows',
      state: [
        {
          plugin: 'text',
          state: serializer.serialize(
            htmlToSlate('<h2 id="loremipsum">Lorem ipsum</h2>')
          ),
        },
        {
          plugin: 'layout',
          state: [
            {
              child: {
                plugin: 'rows',
                state: [
                  {
                    plugin: 'text',
                    state: serializer.serialize(
                      htmlToSlate('<p>dolor <strong>sit</strong> amet.</p>')
                    ),
                  },
                ],
              },
              width: 8,
            },
            {
              child: {
                plugin: 'rows',
                state: [
                  {
                    plugin: 'text',
                    state: serializer.serialize(
                      htmlToSlate('<p>consecetur</p>')
                    ),
                  },
                ],
              },
              width: 4,
            },
          ],
        },
        {
          plugin: 'text',
          state: serializer.serialize(htmlToSlate('<p>markdown with</p>')),
        },
        {
          plugin: 'image',
          state: {
            alt: 'image',
            src: 'url',
          },
        },
      ],
    },
  },
]

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(
        convertLegacyToSplish(testcase.legacy, 'someID'),
        'to equal',
        testcase.splish
      )
      expect(
        convertSplishToEdtrIO(testcase.splish),
        'to equal',
        testcase.edtrIO
      )
      expect(convert(testcase.legacy), 'to equal', testcase.edtrIO)
    })
  })
})
