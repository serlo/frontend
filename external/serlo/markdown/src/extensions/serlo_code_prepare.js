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
/* global define */
/* Prepares Github Style Code */
var codeprepare = function () {
  return [
    {
      type: 'lang',
      filter: (function () {
        var replacements = {}
        var replacementRegexp = ''
        var codeRegexp = /(?:^|\n)```(.*)\n([\s\S]*?)\n```/gm
        var charsToDecode = ['~D', '%', '\\|', '/']
        var i
        var l

        for (i = 0, l = charsToDecode.length; i < l; i++) {
          // replacementRegexp += '\\' + charsToDecode[i];
          // charsToDecode[i] = '\\' + charsToDecode[i];
          replacements[charsToDecode[i].replace(/\\/g, '')] = '§SC' + i
        }

        // (~D|\$|/|%)
        // (~D|%|\||\/)/gm
        replacementRegexp = new RegExp(
          '(' + charsToDecode.join('|') + ')',
          'gm'
        )

        function replace(whole, language, code) {
          // escape all chars in code
          code = code.replace(replacementRegexp, function (match) {
            return replacements[match] || match
          })

          return '\n```' + language + '\n' + code + '\n```'
        }

        return function (text) {
          return text.replace(codeRegexp, replace)
        }
      })(),
    },
  ]
}

export default codeprepare
