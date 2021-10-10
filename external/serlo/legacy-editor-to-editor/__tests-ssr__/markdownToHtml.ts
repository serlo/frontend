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
import renderMarkdown from '../src/legacyToSplish/markdownToHtml'

const cases = [
  {
    description: 'Showdown renders markdown as expected',
    input: '# header \n\n**bold text**',
    output: '<h1 id="header">header</h1><p><strong>bold text</strong></p>',
  },
  {
    description: 'Renders markdown with complex latex formula as expected',
    input:
      'Addition der einzelnen Elementarwahrscheinlichkeiten:\n\n$$P(A)=P\\left(\\left\\{(T;T)\\right\\}\\right)+P\\left(\\left\\{(T;N)\\right\\}\\right)+P\\left(\\left\\{(N;T)\\right\\}\\right)$$\n\n%%P(A)=\\frac5{20}+\\frac{15}{20}\\cdot\\frac5{19}=\\frac{17}{38}=44,7\\%%%',
    output:
      '<p>Addition der einzelnen Elementarwahrscheinlichkeiten:</p><p><katexblock>P(A)=P\\left(\\left\\{(T;T)\\right\\}\\right)+P\\left(\\left\\{(T;N)\\right\\}\\right)+P\\left(\\left\\{(N;T)\\right\\}\\right)</katexblock></p><p><katexinline>P(A)=\\frac5{20}+\\frac{15}{20}\\cdot\\frac5{19}=\\frac{17}{38}=44,7\\% </katexinline></p>',
  },
]

cases.forEach((testcase) => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(renderMarkdown(testcase.input), 'to equal', testcase.output)
    })
  })
})
