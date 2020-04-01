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
/**
 * Serlo Flavored Markdown
 * Spoilers:
 * Transforms ///.../// blocks into spoilers
 **/
var spoiler = function() {
  var filter
  var findSpoilers = new RegExp(/^<p>=,sp. (.*)<\/p>([\s\S]*?)<p>=,sp.<\/p>/gm)

  filter = function(text) {
    return text.replace(findSpoilers, function(original, title, content) {
      return (
        '<div class="spoiler panel panel-default"><div class="spoiler-teaser panel-heading"><span class="fa fa-caret-square-o-down"></span>' +
        title +
        '</div><div class="spoiler-content panel-body">' +
        content +
        '</div></div>'
      )
    })
  }

  return [
    {
      type: 'output',
      filter: filter
    }
  ]
}

export default spoiler
