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
let mathJaxInitialized = false

export function reprocess(context?: unknown) {
  command('Reprocess', context)
}

export function typeset(context?: unknown) {
  command('Typeset', context)
}

export function queue(args: unknown) {
  const { MathJax } = window as { MathJax?: any }
  if (MathJax) {
    MathJax.Hub.Queue(args)
  }
}

function command(command: string, context?: unknown) {
  const { MathJax } = window as { MathJax?: any }
  if (MathJax) {
    MathJax.Hub.Queue([command, MathJax.Hub, ...(context ? [context] : [])])
  }
}

export function initMathJax() {
  if (typeof window === undefined || mathJaxInitialized) return
  mathJaxInitialized = true
  const { $ } = (window as unknown) as { $: JQueryStatic }

  if ($('mathjax-config').length > 0) return
  const lang = $('html').attr('lang') || 'en'
  $('head').append(
    `
      <script type="text/x-mathjax-config" id="mathjax-config">
        MathJax.Hub.Config({
            displayAlign: 'left',
            extensions: ['tex2jax.js', 'fast-preview.js'],
            jax: ['input/TeX', 'output/SVG', 'output/CommonHTML'],
            skipStartupTypeset: true,
            tex2jax: {
                inlineMath: [
                    ['%%', '%%']
                ],
                displayMath: [
                    ['$$', '$$']
                ],
            },
            'HTML-CSS': {
                scale: 100,
                linebreaks: {
                    automatic: true
                },
                preferredFont: 'STIX'
            },
            SVG: {
                linebreaks: {
                    automatic: true
                },
                font: 'STIX-Web'
            },
            showProcessingMessages: false,
            TeX: {
                extensions: ['mediawiki-texvc.js', 'mhchem.js']
            }
        });
      </script>
    `
  )
  $.ajax({
    url: `https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-AMS-MML_HTMLorMML&locale=${lang}`,
    dataType: 'script',
    success() {
      // Initial typeset
      typeset()
    },
    async: true,
  })
}
