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
import * as R from 'ramda'
import {
  BlockJSON,
  NodeJSON,
  ValueJSON,
  DocumentJSON,
  InlineJSON,
  TextJSON,
} from 'slate'

export function normalize(value: ValueJSON): ValueJSON {
  return {
    ...value,
    document: value.document ? normalizeNode(value.document)[0] : undefined,
  }
}

function normalizeNode<A extends NodeJSON>(node: A): A[] {
  if (isBlock(node)) {
    if (node?.nodes?.some(isInline) && node?.nodes?.some(isBlock)) {
      // @ts-ignore
      return R.chain(normalizeNode, unwrapChildBlocks(node))
    } else {
      return [{ ...node, nodes: R.chain(normalizeNode, node.nodes ?? []) }]
    }
  } else if (isDocument(node)) {
    return [{ ...node, nodes: R.chain(normalizeNode, node.nodes ?? []) }]
  } else {
    return [node]
  }
}

export function unwrapChildBlocks(node: BlockJSON): BlockJSON[] {
  if (node.nodes === undefined) return [node]

  const result: BlockJSON[] = []
  let nodesToInspect = node.nodes

  while (nodesToInspect.length > 0) {
    const [inlineNodes, tailNodes] = R.splitWhen(isBlock, nodesToInspect)

    if (inlineNodes.length > 0) result.push({ ...node, nodes: inlineNodes })
    if (tailNodes.length > 0) result.push(tailNodes[0] as BlockJSON)

    nodesToInspect = tailNodes.slice(1)
  }

  return result
}

function isBlock(node: NodeJSON): node is BlockJSON {
  return node?.object === 'block'
}

function isDocument(node: NodeJSON): node is DocumentJSON {
  return node?.object === 'document'
}

function isInline(node: NodeJSON): node is InlineJSON | TextJSON {
  return node?.object === 'inline' || node?.object === 'text'
}
