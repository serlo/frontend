// eslint-disable-next-line import/no-deprecated
import { parseDOM } from 'htmlparser2'

import { sanitizeLatex } from './sanitize-latex'
import {
  FrontendContentNode,
  FrontendColNode,
  FrontendLiNode,
  FrontendTextNode,
  FrontendInlineMathNode,
  FrontendMathNode,
  FrontendNodeType,
} from '@/frontend-node-types'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

// Result of the htmlparser
interface LegacyNode {
  type: string
  name: string
  attribs: {
    class?: string
    href?: string
    src?: string
    alt?: string
    id?: string
  }
  children: LegacyNode[]
  text?: string
  data?: string
}

export function convertLegacyState(html: string) {
  // eslint-disable-next-line import/no-deprecated
  const dom = parseDOM(html) as unknown as LegacyNode
  return { children: convert(dom) }
}

function convert(node: LegacyNode[] | LegacyNode): FrontendContentNode[] {
  if (!node) {
    return []
  }

  if (Array.isArray(node)) return node.flatMap(convert)
  if (node.type === 'tag') return convertTags(node)
  if (node.type === FrontendNodeType.Text) return convertText(node)

  return []
}

function convertTags(node: LegacyNode): FrontendContentNode[] {
  if (node.name === 'div') {
    if (node.attribs) {
      const className = node.attribs.class
      // compat: legacy injections wrapped in empty div
      if (className === undefined) {
        return convert(node.children)
      }
      if (className === 'r') {
        const children = convert(node.children)
        // compat: avoid single column layout
        if (children.length === 1) {
          return children[0].children ? children[0].children : []
        }
        const colChildren: FrontendColNode[] = []
        children.forEach((child) => {
          if (child.type === FrontendNodeType.Col) {
            colChildren.push(child)
          }
        })
        return [
          {
            type: FrontendNodeType.Row,
            children: colChildren,
          },
        ]
      }
      if (/^c[\d]+$/.test(className)) {
        const children = wrapSemistructuredTextInP(convert(node.children))
        return [
          {
            type: FrontendNodeType.Col,
            size: parseInt(className.substring(1)),
            children,
          },
        ]
      }
      if (className === 'spoiler panel panel-default') {
        const children = convert(node.children)
        if (
          children[0].type === 'spoiler-title' &&
          children[1].type === 'spoiler-body'
        )
          return [
            {
              type: FrontendNodeType.SpoilerContainer,
              children: [children[0], children[1]],
            },
          ]
      }
      if (className === 'spoiler-teaser panel-heading') {
        return [
          {
            type: FrontendNodeType.SpoilerTitle,
            children: convert(node.children.slice(1)),
          },
        ]
      }
      if (className === 'spoiler-content panel-body') {
        const children = wrapSemistructuredTextInP(
          convert(node.children).filter(
            (child) =>
              !(
                child.type === FrontendNodeType.Text && child.text.trim() === ''
              )
          )
        )
        return [
          {
            type: FrontendNodeType.SpoilerBody,
            children,
          },
        ]
      }
      if (className === 'injection') {
        const href = node.children[0].attribs.href
        if (href === undefined) return []
        const match = /^\/ggt\/(.+)/.exec(href)
        if (match) {
          return [
            {
              plugin: EditorPluginType.Geogebra,
              type: FrontendNodeType.Geogebra,
              state: match[1],
            },
          ]
        }
        if (href.includes('assets.serlo.org')) {
          return [
            {
              type: FrontendNodeType.Image,
              src: href,
              alt: 'Bild',
            },
          ]
        }
        return [
          {
            plugin: EditorPluginType.Injection,
            type: FrontendNodeType.Injection,
            state: href.trim(),
          },
        ]
      }
      if (className === 'table-responsive') {
        return convert(node.children)
      }
    }
  }
  if (node.name === 'span') {
    if (node.attribs) {
      const className = node.attribs.class
      if (className === 'mathInline') {
        // compat nested math element in table - wtf??
        if (!node.children[0].data) {
          return convert(node.children)
        }
        const formula = node.children[0].data
          .substring(2, node.children[0].data.length - 2)
          .split('&lt;')
          .join('<')
          .split('&nbsp;')
          .join(' ')
        if (!formula) return []
        return [
          {
            type: FrontendNodeType.InlineMath,
            formula: sanitizeLatex(formula),
            formulaSource: formula,
          },
        ]
      }
      if (className === 'math') {
        const mathData = node.children[0].data
        if (!mathData) return []
        const formula = mathData
          .substring(2, mathData.length - 2)
          .split('&lt;')
          .join('<')
          .split('&nbsp;')
          .join(' ')
        if (!formula) return []
        return [
          {
            type: FrontendNodeType.Math,
            formula: sanitizeLatex(formula),
            formulaSource: formula,
          },
        ]
      }
    }
  }
  if (node.name === 'p') {
    const children = convert(node.children)
    // compat: remove empty paragraphs
    if (children.length === 0) {
      return []
    }
    // compat: unwrap images from p
    if (children.some((child) => child.type === FrontendNodeType.Image)) {
      return children
    }
    // compat: unwrap formulas from p
    const maths = children.filter(
      (child) => child.type === FrontendNodeType.Math
    )
    if (maths.length >= 1) {
      let current: FrontendContentNode[] = []
      const result: FrontendContentNode[] = []

      children.forEach((child) => {
        if (child.type === FrontendNodeType.Math) {
          if (current.length > 0) {
            result.push({
              type: FrontendNodeType.P,
              children: current,
            })
            current = []
          }
          result.push(child)
        } else {
          current.push(child)
        }
      })
      if (current.length > 0) {
        result.push({
          type: FrontendNodeType.P,
          children: current,
        })
      }
      return result
    }
    // compat: convert single inline-math in paragraph to block formula
    const inlineMaths = children.filter(
      (child) => child.type === FrontendNodeType.InlineMath
    )
    if (inlineMaths.length === 1) {
      if (
        children.every(
          (child) =>
            child.type === FrontendNodeType.InlineMath ||
            (child.type === FrontendNodeType.Text &&
              child.text !== undefined &&
              child.text.trim() === '')
        )
      ) {
        return [
          {
            type: FrontendNodeType.Math,
            formula: (inlineMaths[0] as FrontendInlineMathNode).formula,
            formulaSource: (inlineMaths[0] as FrontendInlineMathNode)
              .formulaSource,
          },
        ]
      }
    }

    return [
      {
        type: FrontendNodeType.P,
        children,
      },
    ]
  }
  if (node.name === 'img') {
    return [
      {
        type: FrontendNodeType.Image,
        src: node.attribs.src!,
        alt: node.attribs.alt!,
      },
    ]
  }
  if (node.name === 'ul' || node.name === 'ol') {
    const liChildren: FrontendLiNode[] = []
    // compat: remove whitespace around list items
    convert(node.children).forEach((child) => {
      if (
        child.type === FrontendNodeType.Text &&
        child.text &&
        child.text.trim() === ''
      ) {
        return
      }
      if (child.type === FrontendNodeType.Li) {
        liChildren.push(child)
      }
    })
    return [
      {
        type: node.name === 'ol' ? FrontendNodeType.Ol : FrontendNodeType.Ul,
        children: liChildren,
      },
    ]
  }
  if (node.name === 'li') {
    // compat: wrap li in p only if there are only inlines
    const children = wrapSemistructuredTextInP(
      convert(node.children).filter(
        (child) =>
          !(child.type === FrontendNodeType.Text && child.text.trim() === '')
      )
    )
    return [
      {
        type: FrontendNodeType.Li,
        children,
      },
    ]
  }

  if (node.name === 'h2') {
    return [
      {
        type: FrontendNodeType.H,
        level: 2,
        id: node.attribs.id,
        children: convert(node.children),
      },
    ]
  }
  if (node.name === 'h3') {
    return [
      {
        type: FrontendNodeType.H,
        level: 3,
        id: node.attribs.id,
        children: convert(node.children),
      },
    ]
  }
  if (node.name === 'h4') {
    return [
      {
        type: FrontendNodeType.H,
        level: 4,
        id: node.attribs.id,
        children: convert(node.children),
      },
    ]
  }
  if (node.name === 'h5') {
    return [
      {
        type: FrontendNodeType.H,
        level: 5,
        id: node.attribs.id,
        children: convert(node.children),
      },
    ]
  }
  // compat: h1 as h2
  if (node.name === 'h1') {
    return [
      {
        type: FrontendNodeType.H,
        level: 2,
        children: convert(node.children),
      },
    ]
  }
  if (node.name === 'a') {
    let children = convert(node.children)
    // compat: link images by tag
    if (children.length === 1 && children[0].type === FrontendNodeType.Image) {
      children[0].href = node.attribs.href
      return children
    }
    // compat: handle empty tag
    if (
      children.length === 0 ||
      (children.length === 1 &&
        children[0].type === FrontendNodeType.Text &&
        children[0].text === '')
    ) {
      children = [{ type: FrontendNodeType.Text, text: node.attribs.href! }]
    }
    if (!node.attribs.href) return []
    return [
      {
        type: FrontendNodeType.A,
        // compat: replace absolute urls in german language version
        href: node.attribs.href ?? '',
        children,
      },
    ]
  }
  if (node.name === 'strong') {
    const children = convert(node.children)
    return makeFormat(children, (child) => {
      child.strong = true
    })
  }
  if (node.name === 'em') {
    const children = convert(node.children)
    return makeFormat(children, (child) => {
      child.em = true
    })
  }
  // compat: ignore breaks
  if (node.name === 'br') {
    return [{ type: FrontendNodeType.Text, text: ' ' }]
  }
  // compat: ignore horizontal lines
  if (node.name === 'hr') {
    return []
  }
  if (node.name === 'blockquote') {
    const children = convert(node.children).filter(
      (child) =>
        !(child.type === FrontendNodeType.Text && child.text.trim() === '')
    )
    return [
      {
        type: FrontendNodeType.Important,
        children,
      },
    ]
  }
  if (node.name === 'pre') {
    const code = node.children[0]?.children[0]?.data
    if (code) {
      return [
        {
          plugin: EditorPluginType.Highlight,
          type: FrontendNodeType.Code,
          state: {
            code,
            language: '',
            showLineNumbers: false,
          },
        },
      ]
    } else {
      return []
    }
  }
  if (node.name === 'code') {
    return convert(node.children)
  }

  return []
}

function convertText(node: LegacyNode): FrontendContentNode[] {
  // compat: remove entities and newlines
  if (node.data === undefined) return []
  const text = node.data
    .split('&nbsp;')
    .join(' ')
    .split('\n')
    .join(' ')
    .split('&lt;')
    .join('<')
    .split('&gt;')
    .join('>')
    .split('&amp;')
    .join('&')
    .replace(/&#(\d+);/g, function (_match, dec: number) {
      return String.fromCharCode(dec)
    })
  // compat: remove empty text
  if (!text) return []
  return [{ type: FrontendNodeType.Text, text }]
}

function makeFormat(
  array: FrontendContentNode[],
  fn: (child: FrontendTextNode) => void
): FrontendContentNode[] {
  return array.map((child) => {
    if (child.type === FrontendNodeType.Text && child.text !== undefined) {
      fn(child)
    }
    if (Array.isArray(child.children)) {
      child.children = makeFormat(child.children, fn)
    }
    return child
  })
}

function wrapSemistructuredTextInP(children: FrontendContentNode[]) {
  const result: FrontendContentNode[] = []
  let resultAppendable = false
  children.forEach((child) => {
    if (
      child.type === FrontendNodeType.Text ||
      child.type === FrontendNodeType.A ||
      child.type === FrontendNodeType.InlineMath
    ) {
      const last = result[result.length - 1]
      if (resultAppendable && last && last.type === 'p') {
        last.children!.push(child)
      } else {
        result.push({ type: FrontendNodeType.P, children: [child] })
        resultAppendable = true
      }
    } else {
      result.push(child)
      resultAppendable = false
    }
  })
  return unwrapSingleMathInline(result)
}

function unwrapSingleMathInline(children: FrontendContentNode[]) {
  return children.map((child) => {
    if (
      child.type === FrontendNodeType.P &&
      child.children?.length === 1 &&
      child.children[0].type === FrontendNodeType.InlineMath
    ) {
      // force conversion to math node
      ;(child.children[0] as unknown as FrontendMathNode).type =
        FrontendNodeType.Math
      return child.children[0]
    }
    return child
  })
}
