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
var _EncodeCode
var serloSpecificCharsToEscape
var latex = function () {
  var filter

  filter = function (text) {
    // text = text.replace(/(^|[^\\])(%%)([^\r]*?[^%])\2(?!%)/gm,
    text = text.replace(
      /(^|[^\\])(%%)([^\r]*?[^%])(%%?%)/gm,
      function (wholeMatch, m1, m2, m3, m4) {
        var c = m3
        c = c.replace(/^([ \t]*)/g, '') // leading whitespace
        c = c.replace(/[ \t]*$/g, '') // trailing whitespace
        // Solves an issue where the formula would end with %%% and therefore the last %
        // isn't added to c. However, this is a regex issue and should be solved there instead of here
        if (m4 === '%%%') {
          c += '% '
        }
        // Escape latex environment thingies
        text = text.replace(/\$/g, '\\$')
        text = text.replace(/%/g, '\\%')

        c = _EncodeCode(c)

        return m1 + '<span class="mathInline">%%' + c + '%%</span>'
      }
    )

    text = text.replace(
      /(^|[^\\])(¨D¨D)([^\r]*?[^~])\2(?!¨D)/gm,
      function (wholeMatch, m1, m2, m3) {
        var c = m3
        c = c.replace(/^([ \t]*)/g, '') // leading whitespace
        c = c.replace(/[ \t]*$/g, '') // trailing whitespace
        c = _EncodeCode(c)
        // Escape already transliterated $
        // However, do not escape already escaped $s
        text = text.replace(/[^\\]¨D/g, '\\¨D')
        return m1 + '<span class="math">¨D¨D' + c + '¨D¨D</span>'
      }
    )

    return text
  }

  return [
    {
      type: 'lang',
      filter: filter,
    },
  ]
}

// FROM shodown.js
_EncodeCode = function (text) {
  //
  // Encode/escape certain characters inside Markdown code runs.
  // The point is that in code, these characters are literals,
  // and lose their special Markdown meanings.
  //
  // Encode all ampersands; HTML entities are not
  // entities within a Markdown code span.
  // text = text.replace(/&/g, "&amp;");

  // Do the angle bracket song and dance:
  // text = text.replace(/</g, "&lt;");

  text = escapeSerloSpecificCharacters(text)

  return text
}

serloSpecificCharsToEscape = (function () {
  var regexp = ''
  var chars = ['*', '`', '_', '{', '}', '[', ']', '<', '\\']
  var replacements = {}
  var l = chars.length
  var i = 0

  for (; i < l; i++) {
    regexp += '\\' + chars[i]
    replacements[chars[i]] = '§LT' + i
  }

  regexp = new RegExp('([' + regexp + '])', 'gm')

  function replace(match) {
    return replacements[match] || match
  }

  return {
    regexp: regexp,
    replace: replace,
  }
})()

function escapeSerloSpecificCharacters(text) {
  return text.replace(
    serloSpecificCharsToEscape.regexp,
    serloSpecificCharsToEscape.replace
  )
}

export default latex
