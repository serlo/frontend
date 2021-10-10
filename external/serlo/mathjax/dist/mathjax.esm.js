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
var mathJaxInitialized = false;
function reprocess(context) {
  command('Reprocess', context);
}
function typeset(context) {
  command('Typeset', context);
}
function queue(args) {
  var _window = window,
      MathJax = _window.MathJax;

  if (MathJax) {
    MathJax.Hub.Queue(args);
  }
}

function command(command, context) {
  var _window2 = window,
      MathJax = _window2.MathJax;

  if (MathJax) {
    MathJax.Hub.Queue([command, MathJax.Hub].concat(context ? [context] : []));
  }
}

function initMathJax() {
  if (typeof window === undefined || mathJaxInitialized) return;
  mathJaxInitialized = true;
  var _window3 = window,
      $ = _window3.$;
  if ($('mathjax-config').length > 0) return;
  var lang = $('html').attr('lang') || 'en';
  $('head').append("\n      <script type=\"text/x-mathjax-config\" id=\"mathjax-config\">\n        MathJax.Hub.Config({\n            displayAlign: 'left',\n            extensions: ['tex2jax.js', 'fast-preview.js'],\n            jax: ['input/TeX', 'output/SVG', 'output/CommonHTML'],\n            skipStartupTypeset: true,\n            tex2jax: {\n                inlineMath: [\n                    ['%%', '%%']\n                ],\n                displayMath: [\n                    ['$$', '$$']\n                ],\n            },\n            'HTML-CSS': {\n                scale: 100,\n                linebreaks: {\n                    automatic: true\n                },\n                preferredFont: 'STIX'\n            },\n            SVG: {\n                linebreaks: {\n                    automatic: true\n                },\n                font: 'STIX-Web'\n            },\n            showProcessingMessages: false,\n            TeX: {\n                extensions: ['mediawiki-texvc.js', 'mhchem.js']\n            }\n        });\n      </script>\n    ");
  $.ajax({
    url: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-AMS-MML_HTMLorMML&locale=" + lang,
    dataType: 'script',
    success: function success() {
      // Initial typeset
      typeset();
    },
    async: true
  });
}

export { initMathJax, queue, reprocess, typeset };
//# sourceMappingURL=mathjax.esm.js.map
