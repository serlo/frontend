import type { NewElement, NewNode, NewText } from '@edtr-io/plugin-text'

import { sanitizeLatex } from './sanitize-latex'
import {
  FrontendContentNode,
  FrontendLiNode,
  FrontendNodeType,
  FrontendTextColor,
  FrontendTextNode,
} from '@/frontend-node-types'

const colors: FrontendTextColor[] = ['blue', 'green', 'orange']

export function isSlateBlock(node: NewNode): node is NewElement {
  return (node as NewElement).type !== undefined
}

export function isTextNode(node: NewNode): node is NewText {
  return (node as NewText).text !== undefined
}

export function convertTextPluginState(
  node: NewNode[] | NewNode | undefined
): FrontendContentNode[] {
  if (!node || Object.keys(node).length === 0) return []
  if (Array.isArray(node)) return node.flatMap(convertTextPluginState)
  if (isSlateBlock(node)) return convertSlateBlock(node)
  if (isTextNode(node)) return convertTextNode(node)
  return []
}

export function convertSlateBlock(node: NewElement): FrontendContentNode[] {
  if (node.type === 'p') {
    return [
      {
        type: FrontendNodeType.SlateP,
        children: convertTextPluginState(node.children),
      },
    ]
  }
  if (node.type === FrontendNodeType.A) {
    const children = convertTextPluginState(node.children)
    if (!node.href) {
      // remove empty links
      return children
    }
    return [
      {
        type: FrontendNodeType.A,
        href: node.href,
        children,
      },
    ]
  }
  if (node.type === 'h') {
    if (
      node.level === 1 ||
      node.level === 2 ||
      node.level === 3 ||
      node.level === 4 ||
      node.level === 5
    ) {
      return [
        {
          type: FrontendNodeType.H,
          level: node.level,
          children: convertTextPluginState(node.children),
        },
      ]
    } else {
      return [
        {
          type: FrontendNodeType.H,
          level: 5,
          children: convertTextPluginState(node.children),
        },
      ]
    }
  }
  if (node.type === 'math' && !node.inline) {
    if (!node.src) {
      return []
    }
    return [
      {
        type: FrontendNodeType.Math,
        formula: sanitizeLatex(node.src),
        formulaSource: node.src,
        alignCenter: true,
      },
    ]
  }
  if (node.type === 'math' && node.inline) {
    if (!node.src) {
      return []
    }
    return [
      {
        type: FrontendNodeType.InlineMath,
        formula: sanitizeLatex(node.src),
        formulaSource: node.src,
      },
    ]
  }
  if (node.type === 'unordered-list') {
    // only allow li nodes
    const children = convertTextPluginState(node.children).filter(
      (child) => child.type === FrontendNodeType.Li
    ) as FrontendLiNode[]

    return [
      {
        type: FrontendNodeType.Ul,
        children,
      },
    ]
  }
  if (node.type === 'ordered-list') {
    // only allow li nodes
    const children = convertTextPluginState(node.children).filter(
      (child) => child.type === FrontendNodeType.Li
    ) as FrontendLiNode[]

    return [
      {
        type: FrontendNodeType.Ol,
        children,
      },
    ]
  }
  if (node.type === 'list-item') {
    const children: FrontendContentNode[] =
      handleSemistructedContentOfPForListItems(
        convertTextPluginState(node.children)
      )

    return [
      {
        type: FrontendNodeType.Li,
        children,
      },
    ]
  }
  if (node.type === 'list-item-child') {
    return convertTextPluginState(node.children)
  }
  return []
}

export function convertTextNode(node: NewText): FrontendContentNode[] {
  const text = node.text.replace(/\ufeff/g, '')
  if (text === '') return []
  return [
    {
      type: FrontendNodeType.Text,
      text,
      em: node.em,
      strong: node.strong,
      color: colors[node.color as number],
      code: node.code,
    },
  ]
}

function handleSemistructedContentOfPForListItems(
  input: FrontendContentNode[]
) {
  // generate children, split text blocks at new lines
  const children = input.flatMap((child) => {
    if (child.type == FrontendNodeType.Text && child.text.includes('\n')) {
      return child.text.split('\n').flatMap((text, i) => {
        const value: FrontendTextNode[] = []
        if (i != 0) {
          value.push({ type: FrontendNodeType.Text, text: '%%%BARRIER%%%' })
        }
        if (text) {
          value.push({ type: FrontendNodeType.Text, text })
        }
        return value
      })
    }
    return child
  })

  // group inline nodes together in p, don't merge if barrier is present
  const result: FrontendContentNode[] = []
  let resultAppendable = false
  children.forEach((child) => {
    if (
      child.type == FrontendNodeType.Text ||
      child.type == FrontendNodeType.A ||
      child.type == FrontendNodeType.InlineMath
    ) {
      const last = result[result.length - 1]
      if (
        child.type == FrontendNodeType.Text &&
        child.text == '%%%BARRIER%%%'
      ) {
        resultAppendable = false
        return
      }
      if (resultAppendable && last && last.type == FrontendNodeType.SlateP) {
        last.children!.push(child)
      } else {
        result.push({ type: FrontendNodeType.SlateP, children: [child] })
        resultAppendable = true
      }
    } else {
      result.push(child)
      resultAppendable = false
    }
  })

  return result
}
