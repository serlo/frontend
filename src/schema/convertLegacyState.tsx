import * as htmlparser2 from 'htmlparser2'

export default function convertLegacyState(html) {
  const dom = htmlparser2.parseDOM(html)
  return { children: convert(dom) }
}

function convert(node) {
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
        if (className === 'r') {
          const children = convert(node.children)
          // compat: avoid single column layout
          if (children.length === 1) {
            return children[0].children
          }
          return [
            {
              type: 'row',
              children
            }
          ]
        }
        if (/^c[\d]+$/.test(className)) {
          let children = convert(node.children)
          if (children.length === 0) {
            children = [{ type: 'p', children: [{ text: '' }] }]
          }
          // compat: wrap every inline child in p, grouped
          children = children.reduce((acc, val) => {
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
                acc.push({ type: 'p', children: [val] })
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
              children
            }
          ]
        }
        if (className === 'spoiler panel panel-default') {
          return [
            {
              type: 'spoiler-container',
              children: convert(node.children)
            }
          ]
        }
        if (className === 'spoiler-teaser panel-heading') {
          return [
            {
              type: 'spoiler-title',
              children: convert(node.children.slice(1))
            }
          ]
        }
        if (className === 'spoiler-content panel-body') {
          return [
            {
              type: 'spoiler-body',
              children: convert(node.children)
            }
          ]
        }
        if (className === 'injection') {
          return [
            {
              type: 'p',
              children: [
                { text: '[Injection: ' },
                ...convert(node.children),
                { text: ']' }
              ]
            }
          ]
        }
        if (className === 'table-responsive') {
          return [
            {
              type: 'p',
              children: [{ text: '[Tabelle]' }]
            }
          ]
        }
      }
    }
    if (node.name === 'span') {
      if (node.attribs) {
        const className = node.attribs.class
        if (className === 'mathInline') {
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
              children: [{ text: '' }]
            }
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
            { type: 'math', formula, alignLeft: true, children: [{ text: '' }] }
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
      if (children.some(child => child.type === 'img')) {
        return children
      }
      // compat: unwrap formulas from p
      const maths = children.filter(child => child.type === 'math')
      if (maths.length >= 1) {
        let current = []
        let result = []
        children.forEach(child => {
          if (child.type === 'math') {
            if (current.length > 0) {
              result.push({
                type: 'p',
                children: current
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
            children: current
          })
        }
        return result
      }
      // compat: convert single inline-math in paragraph to block formula
      const inlineMaths = children.filter(child => child.type === 'inline-math')
      if (inlineMaths.length === 1) {
        if (
          children.every(
            child =>
              child.type === 'inline-math' ||
              (child.text !== undefined && child.text.trim() == '')
          )
        ) {
          return [
            {
              type: 'math',
              alignLeft: true,
              formula: inlineMaths[0].formula,
              children: [{ text: '' }]
            }
          ]
        }
      }

      return [
        {
          type: 'p',
          children
        }
      ]
    }
    if (node.name === 'img') {
      return [
        {
          type: 'img',
          src: node.attribs.src,
          alt: node.attribs.alt,
          children: [{ text: '' }]
        }
      ]
    }
    if (node.name === 'ul' || node.name == 'ol') {
      let children = convert(node.children)
      // compat: remove whitespace around list items
      children = children.filter(child => {
        if (child.text && child.text.trim() === '') {
          return false
        }
        return true
      })
      return [
        {
          type: node.name,
          children
        }
      ]
    }
    if (node.name === 'li') {
      // compat: wrap li in p only if there are only inlines
      let children = convert(node.children)
      if (
        children.filter(
          child =>
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
          children
        }
      ]
    }
    if (node.name === 'h2') {
      return [
        {
          type: 'h',
          level: 2,
          children: convert(node.children)
        }
      ]
    }
    if (node.name === 'h3') {
      return [
        {
          type: 'h',
          level: 3,
          children: convert(node.children)
        }
      ]
    }
    if (node.name === 'h4') {
      return [
        {
          type: 'h',
          level: 4,
          children: convert(node.children)
        }
      ]
    }
    if (node.name === 'h5') {
      return [
        {
          type: 'h',
          level: 5,
          children: convert(node.children)
        }
      ]
    }
    // compat: h1 as h2
    if (node.name === 'h1') {
      return [
        {
          type: 'h',
          level: 2,
          children: convert(node.children)
        }
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
          children
        }
      ]
    }
    if (node.name === 'strong') {
      const children = convert(node.children)
      return makeFormat(children, child => {
        child.strong = true
      })
    }
    if (node.name === 'em') {
      const children = convert(node.children)
      return makeFormat(children, child => {
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
          children: convert(node.children)
        }
      ]
    }
  }
  if (node.type === 'text') {
    // compat: remove entities and newlines
    const text = node.data
      .split('&nbsp;')
      .join('')
      .split('\n')
      .join('')
      .split('&lt;')
      .join('<')
    // compat: remove empty text
    if (!text) return []
    return [{ text }]
  }

  console.log('--> ', node)
  return []
}

function makeFormat(array, fn) {
  return array.map(child => {
    if (child.text !== undefined) {
      fn(child)
    }
    if (Array.isArray(child.children)) {
      child.children = makeFormat(child.children, fn)
    }
    return child
  })
}
