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

const codeRegEx = new RegExp(/(\A|\n)```(\S*)\n([\s\S]*?)\r?\n?```/m)
const spoilerRegEx = new RegExp(/^\/\/\/ (.*)\n([\s\S]*?)(\n|\r)+\/\/\//m)
const injectionRegEx = new RegExp(/>\[(.*)\]\(((?!ggt\/).*)\)/)
const geogebraInjectionRegEx = new RegExp(/>\[(.*)\]\(ggt\/(.*)\)/)
const linkRegEx = new RegExp(
  /[^!>]\[(([^[()\]]*?(\[.*?\]\(.*?\))?)*?)\]\((.*?)\)/
)
const imagesRegEx = new RegExp(/!\[(.*?)\]\((.*?)( "(.*)?")?\)/)
const linkedImagesRegEx = new RegExp(
  /\[!\[(.*?)\]\((.*?)( "(.*)?")?\)\]\((.*?)\)/
)
const tableRegEx = new RegExp(/(^|\n)(((\|[^|\r\n]*)+\|( |\t)*(\r?\n|\r)?)+)/)

/**
 * Blockquote RegEx:
 *  1. Negative Lookahead: Ignore when start is injection not blockquote;
 *  2. match /> ?[\s\S]+?
 *  3. Lookahead: Match is finished, when two linebreaks, end of line or injection
 */
const blockquoteRegEx = new RegExp(
  /((((\A|\n+)(?!>\[.*?\]\(.*?\))>[\s\S]+?)(?=(\r?\n\r?\n\w)|$|(>\[.*?\]\(.*?\))))+)/m
)

const extractCode = (normalizedObj: NormalizedObject) =>
  extract(
    codeRegEx,
    (match) => ({
      name: 'code',
      language: match[2].trim(),
      src: match[3],
    }),
    normalizedObj
  )
const extractSpoilers = (normalizedObj: NormalizedObject) =>
  extract(
    spoilerRegEx,
    (match) => ({
      name: 'spoiler',
      title: match[1],
      content: normalizeMarkdown(match[2]),
    }),
    normalizedObj
  )

const extractTable = (normalizedObj: NormalizedObject) =>
  extract(
    tableRegEx,
    (match) => ({
      name: 'table',
      src: match[0],
    }),
    normalizedObj
  )

const extractInjections = (normalizedObj: NormalizedObject) =>
  extract(
    injectionRegEx,
    (match) => ({
      name: 'injection',
      description: match[1],
      src: match[2],
    }),
    normalizedObj
  )

const extractGeogebra = (normalizedObj: NormalizedObject) =>
  extract(
    geogebraInjectionRegEx,
    (match) => ({
      name: 'geogebra',
      description: match[1],
      src: match[2],
    }),
    normalizedObj
  )

const extractLinkedImages = (normalizedObj: NormalizedObject) =>
  extract(
    linkedImagesRegEx,
    (match) => ({
      name: 'image',
      description: match[1],
      src: match[2],
      title: match[4],
      href: match[5],
    }),
    normalizedObj
  )

const extractImages = (normalizedObj: NormalizedObject) =>
  extract(
    imagesRegEx,
    (match) => ({
      name: 'image',
      description: match[1],
      src: match[2],
      title: match[4],
    }),
    normalizedObj
  )

const extractBlockquote = (normalizedObj: NormalizedObject) =>
  extract(
    blockquoteRegEx,
    (match) => ({
      name: 'blockquote',
      content: normalizeMarkdown(match[1].replace(/(^|\n)>/g, '$1')),
    }),
    normalizedObj
  )

const normalizeMarkdown = (markdown: string) => {
  let normalizedObj: NormalizedObject = {
    normalized: markdown,
    elements: [],
  }
  normalizedObj = extractCode(normalizedObj)
  normalizedObj = extractSpoilers(normalizedObj)
  normalizedObj = extractTable(normalizedObj)
  normalizedObj = extractBlockquote(normalizedObj)
  normalizedObj = extractInjections(normalizedObj)
  normalizedObj = extractGeogebra(normalizedObj)
  normalizedObj = extractLinkedImages(normalizedObj)
  normalizedObj = extractImages(normalizedObj)

  return normalizedObj
}

const extract = (
  regex: RegExp,
  createElement: (match: RegExpExecArray) => Element,
  { normalized, elements }: NormalizedObject
) => {
  let match = regex.exec(normalized)
  while (match !== null) {
    normalized = normalized.replace(regex, '§' + elements.length + '§')
    elements = [...elements, createElement(match)]

    match = regex.exec(normalized)
  }
  return {
    normalized: normalized,
    elements: elements,
  }
}

export interface NormalizedObject {
  normalized: string
  elements: Element[]
}

interface CodeTMP {
  name: 'code'
  language: string
  src: string
}

interface SpoilerTMP {
  name: 'spoiler'
  title: string
  content: ReturnType<typeof normalizeMarkdown>
}
interface TableTMP {
  name: 'table'
  src: string
}
interface BlockquoteTMP {
  name: 'blockquote'
  content: ReturnType<typeof normalizeMarkdown>
}

interface InjectionsTMP {
  name: 'injection'
  description: string
  src: string
}
interface GeogebraTMP {
  name: 'geogebra'
  description: string
  src: string
}
interface ImagesTMP {
  name: 'image'
  description: string
  src: string
  title?: string
}
export interface LinkedImagesTMP extends ImagesTMP {
  href: string
}

export type Element =
  | CodeTMP
  | SpoilerTMP
  | TableTMP
  | BlockquoteTMP
  | InjectionsTMP
  | GeogebraTMP
  | LinkedImagesTMP
  | ImagesTMP

export default normalizeMarkdown
