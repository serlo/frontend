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
/* eslint-disable */
// Type definitions for slate-html-serializer 0.6
// Project: https://github.com/ianstormtaylor/slate
// Definitions by: Brandon Shelton <https://github.com/YangusKhan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8
declare module 'slate-html-serializer' {
  import * as React from 'react'
  import {
    BlockProperties,
    ValueJSON,
    Value,
    Node as SlateNode,
    Mark,
    Leaf,
  } from 'slate'

  export interface Rule {
    deserialize?: (
      el: Element,
      next: (elements: Element[] | NodeList | Array<Node & ChildNode>) => any
    ) => any
    serialize?: (obj: any, children: string) => React.ReactNode
  }

  export interface HtmlOptions {
    rules?: Rule[]
    defaultBlock?: BlockProperties
    parseHtml?: (html: string) => HTMLElement
  }

  export default class Html {
    constructor(options?: HtmlOptions)

    deserialize(html: string, options: { toJSON: true }): ValueJSON
    deserialize(html: string, options?: { toJSON?: false }): Value

    serialize(value: Value, options?: { render?: true }): string
    serialize(value: Value, options: { render: false }): Element[]

    protected rules: Rule[]
    protected defaultBlock: BlockProperties
    protected parseHtml: (html: string) => HTMLElement

    protected deserializeElements: (elements: HTMLElement[]) => SlateNode[]
    protected deserializeElement: (element: HTMLElement) => any
    protected deserializeMark: (mark: Mark) => SlateNode[]

    protected serializeNode: (node: SlateNode) => string
    protected serializeLeaf: (leaf: Leaf) => string
    protected serializeString: (string: string) => string
  }
}
