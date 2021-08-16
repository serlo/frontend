import { NewNode } from '@edtr-io/plugin-text'

import { converter } from '../../external/markdown'
import { convertLegacyState } from './convert-legacy-state'
import {
  EdtrState,
  SlateBlockElement,
  SlateTextElement,
  UnsupportedEdtrState,
} from './edtr-io-types'
import { sanitizeLatex } from './sanitize-latex'
import {
  FrontendContentNode,
  FrontendMathNode,
  FrontendTextColor,
  FrontendTextNode,
} from '@/data-types'

const colors: FrontendTextColor[] = ['blue', 'green', 'orange']

function isEdtrState(node: ConvertData): node is EdtrState {
  return (node as EdtrState).plugin !== undefined
}

function isSlateBlock(node: ConvertData): node is SlateBlockElement {
  return (node as SlateBlockElement).type !== undefined
}

function isTextNode(node: ConvertData): node is SlateTextElement {
  return (node as SlateTextElement).text !== undefined
}

type ConvertData = EdtrState | NewNode | SlateTextElement | UnsupportedEdtrState

export function convert(
  node?: ConvertData | ConvertData[]
): FrontendContentNode[] {
  // compat: no or empty node, we ignore
  if (node === undefined || Object.keys(node).length === 0) {
    return []
  }

  if (Array.isArray(node)) {
    return node.flatMap(convert)
  }

  if (isEdtrState(node)) {
    return convertPlugin(node) as FrontendContentNode[]
  }

  if (isSlateBlock(node)) {
    return convertSlate(node) as FrontendContentNode[]
  }

  if (isTextNode(node)) {
    return convertText(node) as FrontendContentNode[]
  }

  return []
}

function convertPlugin(node: EdtrState) {
  if (node.plugin === 'rows') {
    return convert(node.state as unknown as EdtrState)
  }
  if (node.plugin === 'text') {
    return convert(node.state)
  }
  if (node.plugin === 'image') {
    // remove images without source
    if (!node.state.src) return []
    return [
      {
        type: 'img',
        src: node.state.src,
        alt: node.state.alt,
        maxWidth: node.state.maxWidth,
        href: node.state.link?.href,
      },
    ]
  }
  if (node.plugin === 'important') {
    return [
      {
        type: 'important',
        children: convert(node.state),
      },
    ]
  }
  if (node.plugin === 'blockquote') {
    return [
      {
        type: 'blockquote',
        children: convert(node.state as EdtrState),
      },
    ]
  }
  if (node.plugin === 'spoiler') {
    return [
      {
        type: 'spoiler-container',
        children: [
          {
            type: 'spoiler-title',
            children: [
              {
                type: 'text',
                text:
                  node.state.title ||
                  ' ' /* if title is falsy, use space instead to avoid empty text node*/,
              },
            ],
          },
          {
            type: 'spoiler-body',
            children: convert(node.state.content as EdtrState),
          },
        ],
      },
    ]
  }

  if (node.plugin === 'multimedia') {
    const width = node.state.width ?? 50
    return [
      {
        type: 'multimedia',
        mediaWidth: width,
        float: 'right',
        media: convert(node.state.multimedia as EdtrState),
        children: convert(node.state.explanation as EdtrState),
      },
    ]
  }
  if (node.plugin === 'layout') {
    return [
      {
        type: 'row',
        children: node.state.map((child) => {
          const children = convert(child.child)
          return {
            type: 'col',
            size: child.width,
            children,
          }
        }),
      },
    ]
  }
  if (node.plugin === 'injection') {
    return [
      {
        type: 'injection',
        href: node.state,
      },
    ]
  }
  if (node.plugin === 'highlight') {
    return [
      {
        type: 'code',
        code: node.state.code,
        language: node.state.language,
        showLineNumbers: node.state.showLineNumbers,
      },
    ]
  }
  if (node.plugin === 'table') {
    const html = converter.makeHtml(node.state)
    // compat: the markdown converter could return all types of content, only use table nodes.
    const children = convertLegacyState(html).children.filter(
      (child) => child.type == 'table'
    )
    return children
  }
  if (node.plugin === 'video') {
    if (!node.state.src) {
      return []
    }
    return [
      {
        type: 'video',
        src: node.state.src,
      },
    ]
  }
  if (node.plugin === 'anchor') {
    return [
      {
        type: 'anchor',
        id: node.state,
      },
    ]
  }
  if (node.plugin === 'geogebra') {
    // compat: full url given
    let id = node.state
    const match = /geogebra\.org\/m\/(.+)/.exec(id)
    if (match) {
      id = match[1]
    }
    return [{ type: 'geogebra', id }]
  }
  if (node.plugin === 'equations') {
    const steps = node.state.steps.map((step) => {
      return {
        left: sanitizeLatex(step.left),
        leftSource: step.left,
        sign: step.sign,
        right: sanitizeLatex(step.right),
        rightSource: step.right,
        transform: sanitizeLatex(step.transform),
        transformSource: step.transform,
        explanation: convert(step.explanation),
      }
    })
    return [{ type: 'equations', steps }]
  }

  return []
}

function convertSlate(node: SlateBlockElement) {
  if (node.type === 'p') {
    return handleSemistructedContentOfP(convert(node.children))
  }
  if (node.type === 'a') {
    const children = convert(node.children)
    if (!node.href) {
      // remove empty links
      return children
    }
    return [
      {
        type: 'a',
        href: node.href,
        children,
      },
    ]
  }
  if (node.type === 'h') {
    if (
      node.level === 1 ||
      node.level === 2 ||
      node.level == 3 ||
      node.level === 4 ||
      node.level === 5
    ) {
      return [
        {
          type: 'h',
          level: node.level,
          children: convert(node.children),
        },
      ]
    } else {
      return [
        {
          type: 'h',
          level: 5,
          children: convert(node.children),
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
        type: 'math',
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
        type: 'inline-math',
        formula: sanitizeLatex(node.src),
        formulaSource: node.src,
      },
    ]
  }
  if (node.type === 'unordered-list') {
    // only allow li nodes
    const children = convert(node.children).filter(
      (child) => true && child.type === 'li'
    )
    return [
      {
        type: 'ul',
        children,
      },
    ]
  }
  if (node.type === 'ordered-list') {
    // only allow li nodes
    const children = convert(node.children).filter(
      (child) => true && child.type === 'li'
    )
    return [
      {
        type: 'ol',
        children,
      },
    ]
  }
  if (node.type === 'list-item') {
    const children = handleSemistructedContentOfP(convert(node.children))
    return [
      {
        type: 'li',
        children,
      },
    ]
  }
  if (node.type === 'list-item-child') {
    return convert(node.children)
  }

  return []
}

function convertText(node: SlateTextElement) {
  const text = node.text.replace(/\ufeff/g, '')
  if (text === '') return []
  return [
    {
      type: 'text',
      text,
      em: node.em,
      strong: node.strong,
      color: colors[node.color as number],
      code: node.code,
    },
  ]
}

function unwrapSingleMathInline(children: FrontendContentNode[]) {
  return children.map((child) => {
    if (
      child.type == 'p' &&
      child.children?.length == 1 &&
      child.children[0].type == 'inline-math'
    ) {
      // force conversion
      ;(child.children[0] as unknown as FrontendMathNode).type = 'math'
      return child.children[0]
    }
    return child
  })
}

function handleSemistructedContentOfP(input: FrontendContentNode[]) {
  // generate children, split text blocks at new lines
  const children = input.flatMap((child) => {
    if (child.type == 'text' && child.text.includes('\n')) {
      return child.text.split('\n').flatMap((text, i) => {
        const value: FrontendTextNode[] = []
        if (i != 0) {
          value.push({ type: 'text', text: '%%%BARRIER%%%' })
        }
        if (text) {
          value.push({ type: 'text', text })
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
      child.type == 'text' ||
      child.type == 'a' ||
      child.type == 'inline-math'
    ) {
      const last = result[result.length - 1]
      if (child.type == 'text' && child.text == '%%%BARRIER%%%') {
        resultAppendable = false
        return
      }
      if (resultAppendable && last && last.type == 'p') {
        last.children!.push(child)
      } else {
        result.push({ type: 'p', children: [child] })
        resultAppendable = true
      }
    } else {
      result.push(child)
      resultAppendable = false
    }
  })

  return unwrapSingleMathInline(result)
}
