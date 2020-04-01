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
// @ts-ignore
import Showdown from 'showdown'

// @ts-ignore
import codePrepare from './extensions/serlo_code_prepare'
// @ts-ignore
import injections from './extensions/injections'
// @ts-ignore
import table from './extensions/table'
// @ts-ignore
import htmlStrip from './extensions/html_strip'
// @ts-ignore
import latex from './extensions/latex'
// @ts-ignore
import atUsername from './extensions/at_username'
// @ts-ignore
import strikeThrough from './extensions/strike_through'
// @ts-ignore
import spoiler from './extensions/spoiler'
// @ts-ignore
import spoilerPrepare from './extensions/spoiler_prepare'
// @ts-ignore
import latexOutput from './extensions/latex_output'
// @ts-ignore
import codeOutput from './extensions/serlo_code_output'

export const converter: {
  makeHtml(source: string): string
} = new Showdown.Converter({
  extensions: [
    codePrepare,
    injections,
    table,
    htmlStrip,
    latex,
    atUsername,
    strikeThrough,
    spoiler,
    spoilerPrepare,
    latexOutput,
    codeOutput
  ]
})
