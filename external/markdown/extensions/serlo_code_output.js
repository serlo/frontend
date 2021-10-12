/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2020 Serlo Education e.V.
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
 * @copyright Copyright (c) 2013-2020 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
/* global define */
/* Prepares Github Style Code */
var codeoutput = function () {
  return [
    {
      type: 'lang',
      filter: (function () {
        var charsToEncode = ['~D', '%', '|', '/']
        var replacements = {}
        var regexp
        var i
        var l

        for (i = 0, l = charsToEncode.length; i < l; i++) {
          replacements['' + i] = charsToEncode[i]
        }

        regexp = new RegExp('§SC([0-9])', 'gm')

        function replace(whole, match) {
          return replacements[parseInt(match)] || match
        }

        return function (text) {
          return text.replace(regexp, replace)
        }
      })(),
    },
  ]
}

export default codeoutput
