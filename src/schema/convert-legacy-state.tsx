import * as htmlparser2 from 'htmlparser2'

export function convertLegacyState(html: string) {
  const dom = htmlparser2.parseDOM(html)
  return { children: convert(dom) }
}

// TODO: needs type declaration
function convert(node: any): any {
  if (!node) {
    console.log('l: empty node, ignoring')
    return []
  }

  if (Array.isArray(node)) {
    return node.flatMap(convert)
  }

  if (node.type === 'tag') {
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
            return children[0].children
          }
          return [
            {
              type: 'row',
              children,
            },
          ]
        }
        if (/^c[\d]+$/.test(className)) {
          let children = convert(node.children)
          if (children.length === 0) {
            children = [
              {
                type: 'p',
              },
            ]
          }
          // compat: wrap every inline child in p, grouped
          // TODO: needs type declaration
          children = children.reduce((acc: any, val: any) => {
            if (
              val.type === 'inline-math' ||
              val.type === 'a' ||
              val.text !== undefined
            ) {
              let last = undefined
              if (acc.length > 0) {
                last = acc[acc.length - 1]
              }
              if (last && last.type === 'p') {
                last.children.push(val)
                return acc
              } else {
                acc.push({
                  type: 'p',
                  children: [val],
                })
                return acc
              }
            } else {
              // block element
              acc.push(val)
              return acc
            }
          }, [])
          return [
            {
              type: 'col',
              size: parseInt(className.substring(1)),
              children,
            },
          ]
        }
        if (className === 'spoiler panel panel-default') {
          return [
            {
              type: 'spoiler-container',
              children: convert(node.children),
            },
          ]
        }
        if (className === 'spoiler-teaser panel-heading') {
          return [
            {
              type: 'spoiler-title',
              children: convert(node.children.slice(1)),
            },
          ]
        }
        if (className === 'spoiler-content panel-body') {
          return [
            {
              type: 'spoiler-body',
              children: convert(node.children),
            },
          ]
        }
        if (className === 'injection') {
          const href = node.children[0].attribs.href
          const match = /^\/ggt\/(.+)/.exec(href)
          if (match) {
            return [
              {
                type: 'geogebra',
                id: match[1],
              },
            ]
          }
          if (href.includes('assets.serlo.org')) {
            return [
              {
                type: 'img',
                src: href,
                alt: 'Bild',
              },
            ]
          }
          return [
            {
              type: 'injection',
              href,
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
          return [
            {
              type: 'inline-math',
              formula,
            },
          ]
        }
        if (className === 'math') {
          const formula = node.children[0].data
            .substring(2, node.children[0].data.length - 2)
            .split('&lt;')
            .join('<')
            .split('&nbsp;')
            .join(' ')
          return [
            {
              type: 'math',
              formula,
              alignLeft: true,
            },
          ]
        }
      }
    }
    if (node.name === 'p') {
      const children = convert(node.children)
      // compoat: remove empty paragraphs
      if (children.length === 0) {
        return []
      }
      // compat: unwrap images from p
      // TODO: needs type declaration
      if (children.some((child: any) => child.type === 'img')) {
        return children
      }
      // compat: unwrap formulas from p
      // TODO: needs type declaration
      const maths = children.filter((child: any) => child.type === 'math')
      if (maths.length >= 1) {
        // TODO: needs type declaration
        let current: any[] = []
        // TODO: needs type declaration
        const result: any[] = []
        // TODO: needs type declaration
        children.forEach((child: any) => {
          if (child.type === 'math') {
            if (current.length > 0) {
              result.push({
                type: 'p',
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
            type: 'p',
            children: current,
          })
        }
        return result
      }
      // compat: convert single inline-math in paragraph to block formula
      const inlineMaths = children.filter(
        // TODO: needs type declaration
        (child: any) => child.type === 'inline-math'
      )
      if (inlineMaths.length === 1) {
        if (
          children.every(
            // TODO: needs type declaration
            (child: any) =>
              child.type === 'inline-math' ||
              (child.text !== undefined && child.text.trim() == '')
          )
        ) {
          return [
            {
              type: 'math',
              alignLeft: true,
              formula: inlineMaths[0].formula,
            },
          ]
        }
      }

      return [
        {
          type: 'p',
          children,
        },
      ]
    }
    if (node.name === 'img') {
      return [
        {
          type: 'img',
          src: node.attribs.src,
          alt: node.attribs.alt,
        },
      ]
    }
    if (node.name === 'ul' || node.name == 'ol') {
      let children = convert(node.children)
      // compat: remove whitespace around list items
      // TODO: needs type declaration
      children = children.filter((child: any) => {
        if (child.text && child.text.trim() === '') {
          return false
        }
        return true
      })
      return [
        {
          type: node.name,
          children,
        },
      ]
    }
    if (node.name === 'li') {
      // compat: wrap li in p only if there are only inlines
      let children = convert(node.children)
      if (
        children.filter(
          // TODO: needs type declaration
          (child: any) =>
            child.text === undefined &&
            child.type !== 'a' &&
            child.type !== 'inline-math'
        ).length == 0
      ) {
        children = [{ type: 'p', children }]
      }
      return [
        {
          type: 'li',
          children,
        },
      ]
    }
    if (node.name === 'table') {
      return [{ type: 'table', children: convert(node.children) }]
    }
    if (node.name === 'thead') {
      return convert(node.children)
    }
    if (node.name === 'tbody') {
      return convert(node.children)
    }
    if (node.name === 'tr') {
      return [
        {
          type: 'tr',
          children: convert(node.children),
        },
      ]
    }
    if (node.name === 'th') {
      return [
        {
          type: 'th',
          children: convert(node.children),
        },
      ]
    }
    if (node.name === 'td') {
      // compat: skip empty entries (resulting from newlines)
      if (node.children.text?.trim() === '') {
        return []
      }
      return [
        {
          type: 'td',
          children: convert(node.children),
        },
      ]
    }
    if (node.name === 'h2') {
      return [
        {
          type: 'h',
          level: 2,
          id: node.attribs.id,
          children: convert(node.children),
        },
      ]
    }
    if (node.name === 'h3') {
      return [
        {
          type: 'h',
          level: 3,
          id: node.attribs.id,
          children: convert(node.children),
        },
      ]
    }
    if (node.name === 'h4') {
      return [
        {
          type: 'h',
          level: 4,
          id: node.attribs.id,
          children: convert(node.children),
        },
      ]
    }
    if (node.name === 'h5') {
      return [
        {
          type: 'h',
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
          type: 'h',
          level: 2,
          children: convert(node.children),
        },
      ]
    }
    if (node.name === 'a') {
      let children = convert(node.children)
      // compat: link images by tag
      if (children.length === 1 && children[0].type === 'img') {
        children[0].href = node.attribs.href
        return children
      }
      // compat: handle empty tag
      if (
        children.length == 0 ||
        (children.length == 1 && children[0].text === '')
      ) {
        children = [{ text: node.attribs.href }]
      }
      return [
        {
          type: 'a',
          href: node.attribs.href,
          children,
        },
      ]
    }
    if (node.name === 'strong') {
      const children = convert(node.children)
      // TODO: needs type declaration
      return makeFormat(children, (child: any) => {
        child.strong = true
      })
    }
    if (node.name === 'em') {
      const children = convert(node.children)
      // TODO: needs type declaration
      return makeFormat(children, (child: any) => {
        child.em = true
      })
    }
    // compat: ignore breaks
    if (node.name === 'br') {
      return [{ text: ' ' }]
    }
    // compat: ignore horizontal lines
    if (node.name === 'hr') {
      return []
    }
    if (node.name === 'blockquote') {
      return [
        {
          type: 'important',
          children: convert(node.children),
        },
      ]
    }
    if (node.name === 'pre') {
      const content = node.children[0]?.children[0]?.data
      if (content) {
        return [
          {
            type: 'code',
            content,
          },
        ]
      } else {
        return []
      }
    }
    if (node.name === 'code') {
      return convert(node.children)
    }
  }
  if (node.type === 'text') {
    // compat: remove entities and newlines
    const text = node.data
      .split('&nbsp;')
      .join(' ')
      .split('\n')
      .join(' ')
      .split('&lt;')
      .join('<')
      .split('&amp;')
      .join('&')
      // TODO: needs type declaration
      .replace(/&#(\d+);/g, function (match: any, dec: any) {
        return String.fromCharCode(dec)
      })
    // compat: remove empty text
    if (!text) return []
    return [{ text }]
  }

  console.log('--> ', node)
  return []
}

// TODO: needs type declaration
function makeFormat(array: any, fn: any) {
  // TODO: needs type declaration
  return array.map((child: any) => {
    if (child.text !== undefined) {
      fn(child)
    }
    if (Array.isArray(child.children)) {
      child.children = makeFormat(child.children, fn)
    }
    return child
  })
}
