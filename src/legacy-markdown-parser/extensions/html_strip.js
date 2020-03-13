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
var allowedTags =
  'a|b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|h4|h5|h6|' +
  'i|img|li|ol|p|pre|sup|sub|strong|strike|ul|br|hr|span|' +
  'table|th|tr|td|tbody|thead|tfoot|div'
var allowedAttributes = {
  img: 'src|width|height|alt',
  a: 'href|name',
  '*': 'title',
  span: 'class',
  table: 'class',
  tr: 'rowspan',
  td: 'colspan|align',
  th: 'rowspan|align',
  div: 'class',
  b: 'class',
  h1: 'id',
  h2: 'id',
  h3: 'id',
  h4: 'id',
  h5: 'id',
  h6: 'id'
}
var forceProtocol = false
var testAllowed = new RegExp('^(' + allowedTags.toLowerCase() + ')$')
var findTags = /<(\/?)\s*([\w:-]+)([^>]*)>/g
var findAttribs = /(\s*)([\w:-]+)\s*=\s*(?:(?:(["'])([^\3]+?)(?:\3))|([^\s]+))/g

var htmlstrip = function() {
  var filter

  filter = function(text) {
    return stripUnwantedHTML(text)
  }

  return [
    {
      type: 'output',
      filter: filter
    }
  ]
}

function stripUnwantedHTML(html) {
  // convert all strings patterns into regexp objects (if not already converted)
  for (var i in allowedAttributes) {
    if (
      allowedAttributes.hasOwnProperty(i) &&
      typeof allowedAttributes[i] === 'string'
    ) {
      allowedAttributes[i] = new RegExp(
        '^(' + allowedAttributes[i].toLowerCase() + ')$'
      )
    }
  }

  // find and match html tags
  return html.replace(findTags, function(original, lslash, tag, params) {
    var tagAttr
    var wildcardAttr
    var rslash = (params.substr(-1) === '/' && '/') || ''

    tag = tag.toLowerCase()

    // tag is not allowed, return empty string
    if (!tag.match(testAllowed)) return ''
    else {
      // tag is allowed
      // regexp objects for a particular tag
      tagAttr = tag in allowedAttributes && allowedAttributes[tag]
      wildcardAttr = '*' in allowedAttributes && allowedAttributes['*']

      // if no attribs are allowed
      if (!tagAttr && !wildcardAttr) return '<' + lslash + tag + rslash + '>'

      // remove trailing slash if any
      params = params.trim()
      if (rslash) {
        params = params.substr(0, params.length - 1)
      }

      // find and remove unwanted attributes
      params = params.replace(findAttribs, function(
        original,
        space,
        name,
        quot,
        value
      ) {
        name = name.toLowerCase()

        if (!value && !quot) {
          value = ''
          quot = '"'
        } else if (!value) {
          value = quot
          quot = '"'
        }

        // force data: and javascript: links and images to #
        if (
          (name === 'href' || name === 'src') &&
          (value.trim().substr(0, 'javascript:'.length) === 'javascript:' ||
            value.trim().substr(0, 'data:'.length) === 'data:')
        ) {
          value = '#'
        }

        // scope links and sources to http protocol
        if (
          forceProtocol &&
          (name === 'href' || name === 'src') &&
          !/^[a-zA-Z]{3,5}:\/\//.test(value)
        ) {
          value = 'http://' + value
        }

        if (
          (wildcardAttr && name.match(wildcardAttr)) ||
          (tagAttr && name.match(tagAttr))
        ) {
          return space + name + '=' + quot + value + quot
        } else return ''
      })

      return '<' + lslash + tag + (params ? ' ' + params : '') + rslash + '>'
    }
  })
}

export default htmlstrip
