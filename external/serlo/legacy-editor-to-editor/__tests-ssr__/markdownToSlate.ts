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
import { expect, expectSplishSlate } from './common'
import markdownToSlate from '../src/legacyToSplish/markdownToSlate'

const cases: {
  description: string
  input: string
  output: ReturnType<typeof markdownToSlate>
}[] = [
  {
    description: 'Transform markdown header to slate plugin',
    input: '# header',
    output: expectSplishSlate('<h1 id="header">header</h1>'),
  },
  {
    description: 'Transform bold paragraph to slate plugin',
    input: '**bold text**',
    output: expectSplishSlate('<p><strong>bold text</strong></p>'),
  },
]

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(markdownToSlate(testcase.input), 'to equal', testcase.output)
    })
  })
})
