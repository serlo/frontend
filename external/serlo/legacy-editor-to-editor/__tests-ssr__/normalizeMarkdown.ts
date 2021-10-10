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
import { expect } from './common'
import normalizeMarkdown from '../src/legacyToSplish/normalizeMarkdown'

const cases: {
  description: string
  input: string
  output: ReturnType<typeof normalizeMarkdown>
}[] = [
  {
    description: 'Split spoilers',
    input: 'Lorem \n/// title\nmarkdowntext\n///\n ipsum',
    output: {
      normalized: 'Lorem \n§0§\n ipsum',
      elements: [
        {
          name: 'spoiler',
          title: 'title',
          content: {
            normalized: 'markdowntext',
            elements: [],
          },
        },
      ],
    },
  },
  {
    description: 'split injections',
    input: 'Lorem \n>[alttext](url)\n ipsum',
    output: {
      normalized: 'Lorem \n§0§\n ipsum',
      elements: [
        {
          name: 'injection',
          description: 'alttext',
          src: 'url',
        },
      ],
    },
  },
  {
    description: 'split images',
    input: 'Lorem ![image](url) ipsum',
    output: {
      normalized: 'Lorem §0§ ipsum',
      elements: [
        {
          name: 'image',
          description: 'image',
          src: 'url',
        },
      ],
    },
  },
  {
    description: 'split images with title',
    input: 'Lorem ![image](url "title") ipsum',
    output: {
      normalized: 'Lorem §0§ ipsum',
      elements: [
        {
          name: 'image',
          description: 'image',
          src: 'url',
          title: 'title',
        },
      ],
    },
  },
  {
    description: 'split images in spoilers',
    input: '/// title\nmarkdowntext with image ![image](url)\n///',
    output: {
      normalized: '§0§',
      elements: [
        {
          name: 'spoiler',
          title: 'title',
          content: {
            normalized: 'markdowntext with image §0§',
            elements: [
              {
                name: 'image',
                description: 'image',
                src: 'url',
              },
            ],
          },
        },
      ],
    },
  },
  {
    description: 'split images with title in spoilers',
    input: '/// title\nmarkdowntext with image ![image](url "title")\n///',
    output: {
      normalized: '§0§',
      elements: [
        {
          name: 'spoiler',
          title: 'title',
          content: {
            normalized: 'markdowntext with image §0§',
            elements: [
              {
                name: 'image',
                description: 'image',
                src: 'url',
                title: 'title',
              },
            ],
          },
        },
      ],
    },
  },
  {
    description: 'split multiple elements',
    input:
      'some markdown text with image\n![image](url)\n some more markdown\n![image2](url2)',
    output: {
      normalized:
        'some markdown text with image\n§0§\n some more markdown\n§1§',
      elements: [
        {
          name: 'image',
          description: 'image',
          src: 'url',
        },
        {
          name: 'image',
          description: 'image2',
          src: 'url2',
        },
      ],
    },
  },
  {
    description: 'split geogebra injection',
    input: 'Lorem \n>[alttext](ggt/url)\n ipsum',
    output: {
      normalized: 'Lorem \n§0§\n ipsum',
      elements: [
        {
          name: 'geogebra',
          description: 'alttext',
          src: 'url',
        },
      ],
    },
  },
  {
    description: 'split linked images',
    input: 'Lorem [![image](imageurl)](linkurl) ipsum',
    output: {
      normalized: 'Lorem §0§ ipsum',
      elements: [
        {
          name: 'image',
          description: 'image',
          src: 'imageurl',
          href: 'linkurl',
        },
      ],
    },
  },
  {
    description: 'split linked images with title',
    input: 'Lorem [![image](imageurl "imagetitle")](linkurl) ipsum',
    output: {
      normalized: 'Lorem §0§ ipsum',
      elements: [
        {
          name: 'image',
          description: 'image',
          src: 'imageurl',
          title: 'imagetitle',
          href: 'linkurl',
        },
      ],
    },
  },
  {
    description: 'split tables',
    input:
      'Lorem \n|header1|header2 | \n|--|--|\n| row1 col1 | row1 *col2* | \n|row2 col1 | row2 col2| row2 col3|\n ipsum',
    output: {
      normalized: 'Lorem §0§ ipsum',
      elements: [
        {
          name: 'table',
          src:
            '\n|header1|header2 | \n|--|--|\n| row1 col1 | row1 *col2* | \n|row2 col1 | row2 col2| row2 col3|\n',
        },
      ],
    },
  },
  {
    description: 'parse escape parameters correctly',
    input: 'Lorem \\!\\[image](imageurl) ipsum',
    output: {
      normalized: 'Lorem \\!\\[image](imageurl) ipsum',
      elements: [],
    },
  },
  {
    description: 'blockquotes',
    input:
      'Lorem \n> ipsum\n> dolor\n\n>sit amet\n\nconsectetur -> not a quote',
    output: {
      normalized: 'Lorem §0§\n\nconsectetur -> not a quote',
      elements: [
        {
          name: 'blockquote',
          content: {
            normalized: '\n ipsum\n dolor\n\nsit amet',
            elements: [],
          },
        },
      ],
    },
  },
  {
    description: 'code',
    input:
      'Check this code:\n```javascript\nconsole.log("hello, world!);\n```\nI hope this helped',
    output: {
      normalized: 'Check this code:§0§\nI hope this helped',
      elements: [
        {
          name: 'code',
          language: 'javascript',
          src: 'console.log("hello, world!);',
        },
      ],
    },
  },
]

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(normalizeMarkdown(testcase.input), 'to equal', testcase.output)
    })
  })
})
