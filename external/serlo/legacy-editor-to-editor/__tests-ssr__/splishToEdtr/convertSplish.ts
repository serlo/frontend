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
import { convertSplishToEdtrIO } from '@serlo/legacy-editor-to-editor'
import { expect } from '../common'
import { htmlToSlate } from '../../src/splishToEdtr/convertSlate'
import { Edtr, Splish, Plugin } from '../../src/splishToEdtr'

const cases: {
  description: string
  splish: Splish
  edtrIO: Edtr
}[] = [
  {
    description: 'Convert of real splish state works as expected',
    splish: {
      id: 'user/medescription',
      cells: [
        {
          id: '2ed3b415-fede-4215-bc21-a69b6b9db5a8',
          inline: null,
          size: 12,
          content: {
            plugin: {
              name: Plugin.Text,
              version: '999.0.0',
            },
            state: {
              editorState: {
                object: 'value',
                document: {
                  object: 'document',
                  data: {},
                  nodes: [
                    {
                      object: 'block',
                      type: 'paragraph',
                      data: {},
                      nodes: [
                        {
                          object: 'text',
                          leaves: [
                            {
                              object: 'leaf',
                              text: 'This was created with ',
                              marks: [],
                            },
                            {
                              object: 'leaf',
                              text: 'Splish',
                              marks: [
                                {
                                  object: 'mark',
                                  type: '@splish-me/strong',
                                  data: {},
                                },
                              ],
                            },
                            {
                              object: 'leaf',
                              text: ' editor.',
                              marks: [],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      object: 'block',
                      type: 'paragraph',
                      data: {},
                      nodes: [
                        {
                          object: 'text',
                          leaves: [
                            {
                              object: 'leaf',
                              text: '',
                              marks: [],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      object: 'block',
                      type: '@splish-me/ul',
                      data: {},
                      nodes: [
                        {
                          object: 'block',
                          type: '@splish-me/li',
                          data: {},
                          nodes: [
                            {
                              object: 'block',
                              type: 'paragraph',
                              data: {},
                              nodes: [
                                {
                                  object: 'text',
                                  leaves: [
                                    {
                                      object: 'leaf',
                                      text: 'foo',
                                      marks: [],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          object: 'block',
                          type: '@splish-me/li',
                          data: {},
                          nodes: [
                            {
                              object: 'block',
                              type: 'paragraph',
                              data: {},
                              nodes: [
                                {
                                  object: 'text',
                                  leaves: [
                                    {
                                      object: 'leaf',
                                      text: 'bar',
                                      marks: [],
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
              },
            },
          },
        },
      ],
    },
    edtrIO: {
      plugin: 'rows',
      state: [
        {
          plugin: 'text',
          state: serializer.serialize(
            htmlToSlate(
              '<p>This was created with <strong>Splish</strong> editor.</p><p></p><ul><li><p>foo</p></li><li><p>bar</p></li></ul>'
            )
          ),
        },
      ],
    },
  },
]

cases.forEach((testcase) => {
  describe('Transformes Splish state to editor state', () => {
    it(testcase.description, () => {
      expect(
        convertSplishToEdtrIO(testcase.splish),
        'to equal',
        testcase.edtrIO
      )
    })
  })
})
