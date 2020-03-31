const colors = ['blue', 'green', 'orange']

export function convertEdtrioState(state) {
  return { children: convert(state) }
}

export function convert(node) {
  if (!node) {
    console.log('e: empty node encountered')
    return []
  }

  if (Array.isArray(node)) {
    return node.flatMap(convert)
  }

  const plugin = node.plugin
  if (plugin === 'rows') {
    return convert(node.state)
  }
  if (plugin === 'text') {
    return convert(node.state)
  }
  if (plugin === 'image') {
    return [
      {
        type: 'img',
        src: node.state.src,
        alt: node.state.alt,
        children: [{ text: '' }]
      }
    ]
  }
  if (plugin === 'important') {
    return [
      {
        type: 'important',
        children: convert(node.state)
      }
    ]
  }
  if (plugin === 'spoiler') {
    return [
      {
        type: 'spoiler-container',
        children: [
          {
            type: 'spoiler-title',
            children: [{ text: node.state.title }]
          },
          {
            type: 'spoiler-body',
            children: convert(node.state.content)
          }
        ]
      }
    ]
  }
  if (plugin === 'multimedia') {
    return [
      {
        type: 'row',
        children: [
          { type: 'col', size: 3, children: convert(node.state.explanation) },
          {
            type: 'col',
            size: 1,
            children: convert(node.state.multimedia)
          }
        ]
      }
    ]
  }
  if (plugin === 'layout') {
    return [
      {
        type: 'row',
        children: node.state.map(child => {
          const children = convert(child.child)
          // compat: math align left
          children.forEach(child => {
            if (child.type === 'math') {
              child.alignLeft = true
            }
          })
          return {
            type: 'col',
            size: child.width,
            children
          }
        })
      }
    ]
  }
  if (plugin === 'injection') {
    return [
      {
        type: 'p',
        children: [
          {
            text: '[Injection: '
          },
          {
            type: 'a',
            href: node.state,
            children: [{ text: node.state }]
          },
          {
            text: ']'
          }
        ]
      }
    ]
  }
  if (plugin === 'table') {
    return [
      {
        type: 'p',
        children: [{ text: '[Tabelle]' }]
      }
    ]
  }
  if (plugin === 'video') {
    return [
      {
        type: 'p',
        children: [{ text: '[Video]' }]
      }
    ]
  }
  if (plugin === 'anchor') {
    return [
      {
        type: 'anchor',
        id: node.state,
        children: [{ text: '' }]
      }
    ]
  }

  const type = node.type
  if (type === 'p') {
    // compat unwrap math from p
    const children = convert(node.children)
    if (children.length === 1 && children[0].type === 'math') {
      return children
    }
    // compat handle newlines
    if (
      children.some(
        child =>
          (child.text && child.text.includes('\n')) ||
          child.type === 'inline-math'
      )
    ) {
      const splitted = children.flatMap(child => {
        if (child.text && child.text.includes('\n')) {
          const parts = child.text.split('\n').flatMap(text => [
            {
              text
            },
            '##break##'
          ])
          parts.pop()
          return parts
        }
        return child
      })
      let current = []
      let result = []
      if (splitted[0] === '##break##') splitted.shift()
      if (splitted[splitted.length - 1] !== '##break##')
        splitted.push('##break##')
      splitted.forEach((el, i) => {
        if (el === '##break##') {
          result.push({
            type: 'p',
            children: current
          })
          current = []
        } else {
          current.push(el)
        }
      })
      return result
    }
    const math = children.filter(
      child => child.type === 'math' || child.type === 'inline-math'
    )
    if (math.length === 1) {
      if (
        children.every(
          child =>
            child.type === 'math' ||
            child.type === 'inline-math' ||
            child.text === ''
        )
      ) {
        return [
          {
            type: 'math',
            formula: math[0].formula,
            alignLeft: true,
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
  if (type === 'a') {
    return [
      {
        type: 'a',
        href: node.href,
        children: convert(node.children)
      }
    ]
  }
  if (type === 'h') {
    return [
      {
        type: 'h',
        level: node.level,
        children: convert(node.children)
      }
    ]
  }
  if (type === 'math' && !node.inline) {
    return [
      {
        type: 'math',
        formula: node.src,
        children: [{ text: '' }]
      }
    ]
  }
  if (type === 'math' && node.inline) {
    return [
      {
        type: 'inline-math',
        formula: node.src,
        children: [{ text: '' }]
      }
    ]
  }
  if (type === 'unordered-list') {
    return [
      {
        type: 'ul',
        children: convert(node.children)
      }
    ]
  }
  if (type === 'list-item') {
    return [
      {
        type: 'li',
        children: convert(node.children)
      }
    ]
  }
  if (type === 'list-item-child') {
    // compat: don't wrap ps
    const children = convert(node.children)
    if (
      children.filter(
        child =>
          child.type === 'inline-math' ||
          child.type === 'a' ||
          child.text !== undefined
      ).length === 0
    ) {
      return children
    }
    return [{ type: 'p', children }]
  }

  if (node.text !== undefined) {
    if (node.color) {
      node.color = colors[node.color]
    }
    return [node]
  }

  console.log('-> ', node)
  return []
}
