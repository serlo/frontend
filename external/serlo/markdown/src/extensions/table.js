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
/*
 * Basic table support with re-entrant parsing, where cell content
 * can also specify markdown.
 *
 * Tables
 * ======
 *
 * | Col 1   | Col 2                                              |
 * |======== |====================================================|
 * |**bold** | ![Valid XHTML] (http://w3.org/Icons/valid-xhtml10) |
 * | Plain   | Value                                              |
 *
 */
var table = function () {
  var tables = {}
  var style = 'text-align:left;'
  var filter
  var callbackConverter

  tables.th = function (header) {
    return (
      '<th style="' +
      style +
      '">' +
      callbackConverter.makeHtml(header) +
      '</th>'
    )
  }
  tables.td = function (cell) {
    return (
      '<td style="' + style + '">' + callbackConverter.makeHtml(cell) + '</td>'
    )
  }
  tables.ths = function () {
    var out = ''
    var i = 0
    var hs = [].slice.apply(arguments)

    for (i; i < hs.length; i += 1) {
      out += tables.th(hs[i]) + '\n'
    }
    return out
  }
  tables.tds = function () {
    var out = ''
    var i = 0
    var ds = [].slice.apply(arguments)
    for (i; i < ds.length; i += 1) {
      out += tables.td(ds[i]) + '\n'
    }
    return out
  }
  tables.thead = function () {
    var out
    var hs = [].slice.apply(arguments)
    out = '<thead>\n'
    out += '<tr>\n'
    out += tables.ths.apply(this, hs)
    out += '</tr>\n'
    out += '</thead>\n'
    return out
  }
  tables.tr = function () {
    var out
    var cs = [].slice.apply(arguments)
    out = '<tr>\n'
    out += tables.tds.apply(this, cs)
    out += '</tr>\n'
    return out
  }
  filter = function (text, converter) {
    var i = 0
    var lines = text.split('\n')
    var tbl = []
    var line
    var hs
    var out = []
    callbackConverter = converter

    for (i; i < lines.length; i += 1) {
      line = lines[i]
      // looks like a table heading
      if (line.trim().match(/^[|]{1}.*[|]{1}$/)) {
        line = line.trim()
        tbl.push('<div class="table-responsive">')
        tbl.push('<table class="table table-striped">')
        hs = line.substring(1, line.length - 1).split('|')
        tbl.push(tables.thead.apply(this, hs))
        line = lines[++i]
        if (!line.trim().match(/^[|]{1}[-=| ]+[|]{1}$/)) {
          // not a table rolling back
          line = lines[--i]
        } else {
          line = lines[++i]
          tbl.push('<tbody>')
          while (line.trim().match(/^[|]{1}.*[|]{1}$/)) {
            line = line.trim()
            tbl.push(
              tables.tr.apply(
                this,
                line.substring(1, line.length - 1).split('|')
              )
            )
            line = lines[++i]
          }
          tbl.push('</tbody>')
          tbl.push('</table>')
          tbl.push('</div>')
          // we are done with this table and we move along
          out.push(tbl.join('\n'))
          tbl = []
          continue
        }
      }
      out.push(line)
    }
    return out.join('\n')
  }
  return [
    {
      type: 'lang',
      filter: filter,
    },
  ]
}

export default table
