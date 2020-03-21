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
          return {
            type: 'col',
            size: child.width,
            children: convert(child.child)
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

  const type = node.type
  if (type === 'p') {
    return [
      {
        type: 'p',
        children: convert(node.children)
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
        children: convert(node.children)
      }
    ]
  }
  if (type === 'math' && node.inline) {
    return [
      {
        type: 'inline-math',
        formula: node.src,
        children: convert(node.children)
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
    return convert(node.children)
  }

  if (node.text !== undefined) {
    return [node]
  }

  console.log('-> ', node)
  return []
}
