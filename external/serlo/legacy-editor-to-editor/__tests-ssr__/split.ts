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
import { expect, expectSplishSlate } from './common'
import split from '../src/legacyToSplish/split'

import { Plugin } from '../src/splishToEdtr/types'
import transform from '../src/legacyToSplish/transform'

const cases: {
  description: string
  input: ReturnType<typeof transform>
  output: ReturnType<typeof split>
}[] = [
  {
    description: 'Simple Layout no split',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [{ size: 12, raw: 'Lorem ipsum' }],
            },
            {
              cells: [{ size: 12, raw: 'dolor adipiscing amet' }],
            },
          ],
        },
      ],
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>Lorem ipsum</p>')],
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
                      cells: [
                        expectSplishSlate('<p>dolor adipiscing amet</p>'),
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
  {
    description: 'Layout with block element',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [{ size: 12, raw: 'Lorem \n![image](url)\n ipsum' }],
            },
          ],
        },
      ],
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>Lorem</p>')],
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
                    {
                      cells: [expectSplishSlate('<p>ipsum</p>')],
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
  {
    description: 'Layout with injection',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [{ size: 12, raw: 'Lorem \n>[alttext](url)\n ipsum' }],
            },
          ],
        },
      ],
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>Lorem</p>')],
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: Plugin.Injection,
                              version: '0.0.0',
                            },
                            state: {
                              description: 'alttext',
                              src: 'url',
                            },
                          },
                        },
                      ],
                    },
                    {
                      cells: [expectSplishSlate('<p>ipsum</p>')],
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
  {
    description: 'Layout with spoiler',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  raw: 'Lorem \n/// title\nmarkdowntext\n///\n ipsum',
                },
              ],
            },
          ],
        },
      ],
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>Lorem</p>')],
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: Plugin.Spoiler,
                              version: '0.0.0',
                            },
                            state: {
                              title: 'title',
                              content: {
                                type: '@splish-me/editor-core/editable',
                                state: {
                                  cells: [
                                    {
                                      rows: [
                                        {
                                          cells: [
                                            expectSplishSlate(
                                              '<p>markdowntext</p>'
                                            ),
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
                    {
                      cells: [expectSplishSlate('<p>ipsum</p>')],
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
  {
    description: 'Layout with image in spoiler',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  raw: '/// title\nmarkdowntext with image ![image](url)\n///',
                },
              ],
            },
          ],
        },
      ],
    },
    output: {
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
                        {
                          content: {
                            plugin: {
                              name: Plugin.Spoiler,
                              version: '0.0.0',
                            },
                            state: {
                              title: 'title',
                              content: {
                                type: '@splish-me/editor-core/editable',
                                state: {
                                  cells: [
                                    {
                                      rows: [
                                        {
                                          cells: [
                                            expectSplishSlate(
                                              '<p>markdowntext with image</p>'
                                            ),
                                          ],
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
                              },
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
  },
  {
    description: 'Layout with geogebra injection',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [{ size: 12, raw: 'Lorem \n>[alttext](ggt/url)\n ipsum' }],
            },
          ],
        },
      ],
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>Lorem</p>')],
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: Plugin.Geogebra,
                              version: '0.0.0',
                            },
                            state: {
                              description: 'alttext',
                              src: 'url',
                            },
                          },
                        },
                      ],
                    },
                    {
                      cells: [expectSplishSlate('<p>ipsum</p>')],
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
  {
    description: 'Layout with linked block element',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  raw: 'Lorem \n[![image](imageurl)](linkurl)\n ipsum',
                },
              ],
            },
          ],
        },
      ],
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>Lorem</p>')],
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
                              src: 'imageurl',
                              href: 'linkurl',
                            },
                          },
                        },
                      ],
                    },
                    {
                      cells: [expectSplishSlate('<p>ipsum</p>')],
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
  {
    description: 'Empty columns layout',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                { size: 3, raw: 'Lorem ipsum' },
                { size: 3, raw: 'dolor adipiscing amet' },
                { size: 3, raw: '' },
                { size: 3, raw: '' },
              ],
            },
          ],
        },
      ],
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 3,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>Lorem ipsum</p>')],
                    },
                  ],
                },
                {
                  size: 3,
                  rows: [
                    {
                      cells: [
                        expectSplishSlate('<p>dolor adipiscing amet</p>'),
                      ],
                    },
                  ],
                },
                {
                  size: 3,
                  rows: [
                    {
                      cells: [expectSplishSlate('')],
                    },
                  ],
                },
                {
                  size: 3,
                  rows: [
                    {
                      cells: [expectSplishSlate('')],
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
  {
    description: 'Blockquote',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  raw:
                    'Lorem \n> ipsum\n> dolor\n\n>sit amet\n\nconsectetur -> not a quote',
                },
              ],
            },
          ],
        },
      ],
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>Lorem</p>')],
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: Plugin.Blockquote,
                              version: '0.0.0',
                            },
                            state: {
                              child: {
                                type: '@splish-me/editor-core/editable',
                                state: {
                                  cells: [
                                    {
                                      rows: [
                                        {
                                          cells: [
                                            expectSplishSlate(
                                              '<p>ipsum dolor</p><p>sit amet</p>'
                                            ),
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
                    {
                      cells: [
                        expectSplishSlate(
                          '<p>consectetur -&gt; not a quote</p>'
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
    },
  },
  {
    description: 'Code',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  raw:
                    'Check this code:\n```javascript\nconsole.log("hello, world!);\n```\nI hope this helped',
                },
              ],
            },
          ],
        },
      ],
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSplishSlate('<p>Check this code:</p>')],
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: 'code',
                            },
                            state: {
                              language: 'javascript',
                              src: 'console.log("hello, world!);',
                            },
                          },
                        },
                      ],
                    },
                    {
                      cells: [expectSplishSlate('<p>I hope this helped</p>')],
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
]

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(split(testcase.input), 'to equal', testcase.output)
    })
  })
})
