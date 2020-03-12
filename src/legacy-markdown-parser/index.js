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
import Showdown from 'showdown'

import codePrepare from './extensions/serlo_code_prepare'
import injections from './extensions/injections'
import table from './extensions/table'
import htmlStrip from './extensions/html_strip'
import latex from './extensions/latex'
import atUsername from './extensions/at_username'
import strikeThrough from './extensions/strike_through'
import spoiler from './extensions/spoiler'
import spoilerPrepare from './extensions/spoiler_prepare'
import latexOutput from './extensions/latex_output'
import codeOutput from './extensions/serlo_code_output'

export const converter = new Showdown.Converter({
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
