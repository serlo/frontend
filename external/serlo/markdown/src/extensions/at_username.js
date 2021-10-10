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
var atusername = function () {
  return [
    // @username syntax
    {
      type: 'lang',
      regex: '\\B(\\\\)?@([\\S]+)\\b',
      replace: function (match, leadingSlash, username) {
        // Check if we matched the leading \ and return nothing changed if so
        if (leadingSlash === '\\') {
          return match
        } else {
          return (
            '<a class="user-mention" href="/user/profile/' +
            username +
            '">@' +
            username +
            '</a>'
          )
        }
      },
    },

    // Escaped @'s so we don't get into trouble
    //
    { type: 'lang', regex: '\\\\@', replace: '@' },
  ]
}

export default atusername
