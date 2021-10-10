'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Showdown = _interopDefault(require('showdown'));

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
var codeprepare = function codeprepare() {
  return [{
    type: 'lang',
    filter: function () {
      var replacements = {};
      var replacementRegexp = '';
      var codeRegexp = /(?:^|\n)```(.*)\n([\s\S]*?)\n```/gm;
      var charsToDecode = ['~D', '%', '\\|', '/'];
      var i;
      var l;

      for (i = 0, l = charsToDecode.length; i < l; i++) {
        // replacementRegexp += '\\' + charsToDecode[i];
        // charsToDecode[i] = '\\' + charsToDecode[i];
        replacements[charsToDecode[i].replace(/\\/g, '')] = '§SC' + i;
      } // (~D|\$|/|%)
      // (~D|%|\||\/)/gm


      replacementRegexp = new RegExp('(' + charsToDecode.join('|') + ')', 'gm');

      function replace(whole, language, code) {
        // escape all chars in code
        code = code.replace(replacementRegexp, function (match) {
          return replacements[match] || match;
        });
        return '\n```' + language + '\n' + code + '\n```';
      }

      return function (text) {
        return text.replace(codeRegexp, replace);
      };
    }()
  }];
};

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

/**
 * Serlo Flavored Markdown
 * Injections:
 * Transforms >[Title](injectionUrl)
 * into <div class="injection"><a href="injectionUrl" class="injection-link">Title</a></div>
 **/
var injections = function injections() {
  var filter;
  var findInjections = new RegExp(/>\[(.*)\]\((.*)\)/g); // Corrects relative urls with missing leading slash

  function correctUrl(url) {
    url = url.split('/'); // Url does start with http

    if (url[0] === 'http:' || url[0] === 'https:') {
      // is invalid for injections, but do nothing
      return url.join('/');
    } // first item is empty, means there already is a leading slash


    if (url[0] === '') {
      url.shift();
    } // Url does not start with / or http


    return '/' + url.join('/');
  }

  filter = function filter(text) {
    return text.replace(findInjections, function (original, title, url) {
      var href = correctUrl(url);

      if (/assets\.serlo\.org\/legacy\/.*\.xml/.test(href)) {
        return "<div class=\"legacy-injection\">Legacy GeoGebra applets aren't supported anymore. Please upload the applet to GeoGebra instead.</div>";
      }

      if (/assets\.serlo\.org\/legacy\//.test(href)) {
        return "<div>\n            <div class=\"injection\"><a href=\"" + href + "\" class=\"injection-link\">" + title + "</a></div>\n            <div class=\"legacy-injection\">Please don't use injections for images. Change <code>>[...](...)</code> to <code>![...](...)</code></div>\n          </div>";
      }

      return "<div class=\"injection\"><a href=\"" + href + "\" class=\"injection-link\">" + title + "</a></div>";
    });
  };

  return [{
    type: 'lang',
    filter: filter
  }];
};

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
var table = function table() {
  var tables = {};
  var style = 'text-align:left;';
  var filter;
  var callbackConverter;

  tables.th = function (header) {
    return '<th style="' + style + '">' + callbackConverter.makeHtml(header) + '</th>';
  };

  tables.td = function (cell) {
    return '<td style="' + style + '">' + callbackConverter.makeHtml(cell) + '</td>';
  };

  tables.ths = function () {
    var out = '';
    var i = 0;
    var hs = [].slice.apply(arguments);

    for (i; i < hs.length; i += 1) {
      out += tables.th(hs[i]) + '\n';
    }

    return out;
  };

  tables.tds = function () {
    var out = '';
    var i = 0;
    var ds = [].slice.apply(arguments);

    for (i; i < ds.length; i += 1) {
      out += tables.td(ds[i]) + '\n';
    }

    return out;
  };

  tables.thead = function () {
    var out;
    var hs = [].slice.apply(arguments);
    out = '<thead>\n';
    out += '<tr>\n';
    out += tables.ths.apply(this, hs);
    out += '</tr>\n';
    out += '</thead>\n';
    return out;
  };

  tables.tr = function () {
    var out;
    var cs = [].slice.apply(arguments);
    out = '<tr>\n';
    out += tables.tds.apply(this, cs);
    out += '</tr>\n';
    return out;
  };

  filter = function filter(text, converter) {
    var i = 0;
    var lines = text.split('\n');
    var tbl = [];
    var line;
    var hs;
    var out = [];
    callbackConverter = converter;

    for (i; i < lines.length; i += 1) {
      line = lines[i]; // looks like a table heading

      if (line.trim().match(/^[|]{1}.*[|]{1}$/)) {
        line = line.trim();
        tbl.push('<div class="table-responsive">');
        tbl.push('<table class="table table-striped">');
        hs = line.substring(1, line.length - 1).split('|');
        tbl.push(tables.thead.apply(this, hs));
        line = lines[++i];

        if (!line.trim().match(/^[|]{1}[-=| ]+[|]{1}$/)) {
          // not a table rolling back
          line = lines[--i];
        } else {
          line = lines[++i];
          tbl.push('<tbody>');

          while (line.trim().match(/^[|]{1}.*[|]{1}$/)) {
            line = line.trim();
            tbl.push(tables.tr.apply(this, line.substring(1, line.length - 1).split('|')));
            line = lines[++i];
          }

          tbl.push('</tbody>');
          tbl.push('</table>');
          tbl.push('</div>'); // we are done with this table and we move along

          out.push(tbl.join('\n'));
          tbl = [];
          continue;
        }
      }

      out.push(line);
    }

    return out.join('\n');
  };

  return [{
    type: 'lang',
    filter: filter
  }];
};

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
var allowedTags = 'a|b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|h4|h5|h6|' + 'i|img|li|ol|p|pre|sup|sub|strong|strike|ul|br|hr|span|' + 'table|th|tr|td|tbody|thead|tfoot|div';
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
};
var testAllowed = /*#__PURE__*/new RegExp('^(' + /*#__PURE__*/allowedTags.toLowerCase() + ')$');
var findTags = /<(\/?)\s*([\w:-]+)([^>]*)>/g;
var findAttribs = /(\s*)([\w:-]+)\s*=\s*(?:(?:(["'])([^\3]+?)(?:\3))|([^\s]+))/g;

var htmlstrip = function htmlstrip() {
  var filter;

  filter = function filter(text) {
    return stripUnwantedHTML(text);
  };

  return [{
    type: 'output',
    filter: filter
  }];
};

function stripUnwantedHTML(html) {
  // convert all strings patterns into regexp objects (if not already converted)
  for (var i in allowedAttributes) {
    if (allowedAttributes.hasOwnProperty(i) && typeof allowedAttributes[i] === 'string') {
      allowedAttributes[i] = new RegExp('^(' + allowedAttributes[i].toLowerCase() + ')$');
    }
  } // find and match html tags


  return html.replace(findTags, function (original, lslash, tag, params) {
    var tagAttr;
    var wildcardAttr;
    var rslash = params.substr(-1) === '/' && '/' || '';
    tag = tag.toLowerCase(); // tag is not allowed, return empty string

    if (!tag.match(testAllowed)) return '';else {
      // tag is allowed
      // regexp objects for a particular tag
      tagAttr = tag in allowedAttributes && allowedAttributes[tag];
      wildcardAttr = '*' in allowedAttributes && allowedAttributes['*']; // if no attribs are allowed

      if (!tagAttr && !wildcardAttr) return '<' + lslash + tag + rslash + '>'; // remove trailing slash if any

      params = params.trim();

      if (rslash) {
        params = params.substr(0, params.length - 1);
      } // find and remove unwanted attributes


      params = params.replace(findAttribs, function (original, space, name, quot, value) {
        name = name.toLowerCase();

        if (!value && !quot) {
          value = '';
          quot = '"';
        } else if (!value) {
          value = quot;
          quot = '"';
        } // force data: and javascript: links and images to #


        if ((name === 'href' || name === 'src') && (value.trim().substr(0, 'javascript:'.length) === 'javascript:' || value.trim().substr(0, 'data:'.length) === 'data:')) {
          value = '#';
        } // scope links and sources to http protocol

        if (wildcardAttr && name.match(wildcardAttr) || tagAttr && name.match(tagAttr)) {
          return space + name + '=' + quot + value + quot;
        } else return '';
      });
      return '<' + lslash + tag + (params ? ' ' + params : '') + rslash + '>';
    }
  });
}

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
var _EncodeCode;

var serloSpecificCharsToEscape;

var latex = function latex() {
  var filter;

  filter = function filter(text) {
    // text = text.replace(/(^|[^\\])(%%)([^\r]*?[^%])\2(?!%)/gm,
    text = text.replace(/(^|[^\\])(%%)([^\r]*?[^%])(%%?%)/gm, function (wholeMatch, m1, m2, m3, m4) {
      var c = m3;
      c = c.replace(/^([ \t]*)/g, ''); // leading whitespace

      c = c.replace(/[ \t]*$/g, ''); // trailing whitespace
      // Solves an issue where the formula would end with %%% and therefore the last %
      // isn't added to c. However, this is a regex issue and should be solved there instead of here

      if (m4 === '%%%') {
        c += '% ';
      } // Escape latex environment thingies


      text = text.replace(/\$/g, '\\$');
      text = text.replace(/%/g, '\\%');
      c = _EncodeCode(c);
      return m1 + '<span class="mathInline">%%' + c + '%%</span>';
    });
    text = text.replace(/(^|[^\\])(¨D¨D)([^\r]*?[^~])\2(?!¨D)/gm, function (wholeMatch, m1, m2, m3) {
      var c = m3;
      c = c.replace(/^([ \t]*)/g, ''); // leading whitespace

      c = c.replace(/[ \t]*$/g, ''); // trailing whitespace

      c = _EncodeCode(c); // Escape already transliterated $
      // However, do not escape already escaped $s

      text = text.replace(/[^\\]¨D/g, '\\¨D');
      return m1 + '<span class="math">¨D¨D' + c + '¨D¨D</span>';
    });
    return text;
  };

  return [{
    type: 'lang',
    filter: filter
  }];
}; // FROM shodown.js


_EncodeCode = function _EncodeCode(text) {
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
  text = escapeSerloSpecificCharacters(text);
  return text;
};

serloSpecificCharsToEscape = /*#__PURE__*/function () {
  var regexp = '';
  var chars = ['*', '`', '_', '{', '}', '[', ']', '<', '\\'];
  var replacements = {};
  var l = chars.length;
  var i = 0;

  for (; i < l; i++) {
    regexp += '\\' + chars[i];
    replacements[chars[i]] = '§LT' + i;
  }

  regexp = /*#__PURE__*/new RegExp('([' + regexp + '])', 'gm');

  function replace(match) {
    return replacements[match] || match;
  }

  return {
    regexp: regexp,
    replace: replace
  };
}();

function escapeSerloSpecificCharacters(text) {
  return text.replace(serloSpecificCharsToEscape.regexp, serloSpecificCharsToEscape.replace);
}

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
var atusername = function atusername() {
  return [// @username syntax
  {
    type: 'lang',
    regex: '\\B(\\\\)?@([\\S]+)\\b',
    replace: function replace(match, leadingSlash, username) {
      // Check if we matched the leading \ and return nothing changed if so
      if (leadingSlash === '\\') {
        return match;
      } else {
        return '<a class="user-mention" href="/user/profile/' + username + '">@' + username + '</a>';
      }
    }
  }, // Escaped @'s so we don't get into trouble
  //
  {
    type: 'lang',
    regex: '\\\\@',
    replace: '@'
  }];
};

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
var strikethrough = function strikethrough() {
  return [{
    // strike-through
    // NOTE: showdown already replaced "~" with "~T", so we need to adjust accordingly.
    type: 'lang',
    regex: '(~T){2}([^~]+)(~T){2}',
    replace: function replace(match, prefix, content, suffix) {
      return '<del>' + content + '</del>';
    }
  }];
};

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

/**
 * Serlo Flavored Markdown
 * Spoilers:
 * Transforms ///.../// blocks into spoilers
 **/
var spoiler = function spoiler() {
  var filter;
  var findSpoilers = new RegExp(/^<p>=,sp. (.*)<\/p>([\s\S]*?)<p>=,sp.<\/p>/gm);

  filter = function filter(text) {
    return text.replace(findSpoilers, function (original, title, content) {
      return '<div class="spoiler panel panel-default"><div class="spoiler-teaser panel-heading"><span class="fa fa-caret-square-o-down"></span>' + title + '</div><div class="spoiler-content panel-body">' + content + '</div></div>';
    });
  };

  return [{
    type: 'output',
    filter: filter
  }];
};

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

/**
 * Serlo Flavored Markdown
 * Spoilers:
 * Transforms ///.../// blocks into spoilers
 **/
var spoilerprepare = function spoilerprepare() {
  var filter;
  var findSpoilers = new RegExp(/^\/\/\/ (.*)\n([\s\S]*?)(\n|\r)+\/\/\//gm);

  filter = function filter(text) {
    // convert all "///"s into "=,sp."s
    return text.replace(findSpoilers, function (original, title, content) {
      return '<p>=,sp. ' + title + '</p>\n' + content + '<p>=,sp.</p>';
    });
  };

  return [{
    type: 'lang',
    filter: filter
  }];
};

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
var serloSpecificCharsToEncode;

var latexoutput = function latexoutput() {
  return [{
    type: 'output',
    filter: function filter(text) {
      return encodeSerloSpecificChars(text);
    }
  }];
};

serloSpecificCharsToEncode = /*#__PURE__*/function () {
  var regexp;
  var chars = ['*', '`', '_', '{', '}', '[', ']', '&lt;', '\\'];
  var replacements = {};
  var l = chars.length;
  var i = 0;

  for (; i < l; i++) {
    replacements['' + i] = chars[i];
  }

  regexp = /*#__PURE__*/new RegExp('§LT([0-9])', 'gm');

  function replace(whole, match) {
    return replacements[parseInt(match)] || match;
  }

  return {
    regexp: regexp,
    replace: replace
  };
}();

function encodeSerloSpecificChars(text) {
  return text.replace(serloSpecificCharsToEncode.regexp, serloSpecificCharsToEncode.replace);
}

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
var codeoutput = function codeoutput() {
  return [{
    type: 'lang',
    filter: function () {
      var charsToEncode = ['~D', '%', '|', '/'];
      var replacements = {};
      var regexp;
      var i;
      var l;

      for (i = 0, l = charsToEncode.length; i < l; i++) {
        replacements['' + i] = charsToEncode[i];
      }

      regexp = new RegExp('§SC([0-9])', 'gm');

      function replace(whole, match) {
        return replacements[parseInt(match)] || match;
      }

      return function (text) {
        return text.replace(regexp, replace);
      };
    }()
  }];
};

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
var converter = /*#__PURE__*/new Showdown.Converter({
  extensions: [codeprepare, injections, table, htmlstrip, latex, atusername, strikethrough, spoiler, spoilerprepare, latexoutput, codeoutput]
});

exports.converter = converter;
//# sourceMappingURL=markdown.cjs.development.js.map
