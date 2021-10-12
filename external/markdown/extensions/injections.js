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
 * Injections:
 * Transforms >[Title](injectionUrl)
 * into <div class="injection"><a href="injectionUrl" class="injection-link">Title</a></div>
 **/
var injections = function () {
  var filter
  var findInjections = new RegExp(/>\[(.*)\]\((.*)\)/g)

  // Corrects relative urls with missing leading slash
  function correctUrl(url) {
    url = url.split('/')
    // Url does start with http
    if (url[0] === 'http:' || url[0] === 'https:') {
      // is invalid for injections, but do nothing
      return url.join('/')
    }

    // first item is empty, means there already is a leading slash
    if (url[0] === '') {
      url.shift()
    }

    // Url does not start with / or http
    return '/' + url.join('/')
  }

  filter = function (text) {
    return text.replace(findInjections, function (original, title, url) {
      const href = correctUrl(url)

      if (/assets\.serlo\.org\/legacy\/.*\.xml/.test(href)) {
        return `<div class="legacy-injection">Legacy GeoGebra applets aren't supported anymore. Please upload the applet to GeoGebra instead.</div>`
      }
      if (/assets\.serlo\.org\/legacy\//.test(href)) {
        return `<div>
            <div class="injection"><a href="${href}" class="injection-link">${title}</a></div>
            <div class="legacy-injection">Please don't use injections for images. Change <code>>[...](...)</code> to <code>![...](...)</code></div>
          </div>`
      }

      return `<div class="injection"><a href="${href}" class="injection-link">${title}</a></div>`
    })
  }

  return [
    {
      type: 'lang',
      filter: filter,
    },
  ]
}

export default injections
