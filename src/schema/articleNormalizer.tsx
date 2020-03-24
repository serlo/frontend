import { Path, Transforms, Node, Text, Element } from 'slate'

const voidElements = ['math', 'img', 'inline-math']
const inlineElements = ['inline-math', 'a']
export const onlyInlineChildren = ['a', 'p', 'h', 'li', 'spoiler-title']
export const onlySomeBlocksAllowed = [
  {
    parent: 'spoiler-body',
    children: ['p', 'img', 'math', 'ul', 'ol', 'row'],
    wrap: 'p'
  },
  {
    parent: 'col',
    children: ['p', 'img', 'math', 'ul', 'ol'],
    wrap: 'p'
  },
  {
    parent: 'important',
    children: ['p', 'img', 'math', 'ul', 'ol', 'row'],
    wrap: 'p'
  },
  {
    parent: '#root',
    children: [
      'p',
      'h',
      'img',
      'math',
      'spoiler-container',
      'ul',
      'ol',
      'row',
      'important'
    ],
    wrap: 'p'
  },
  {
    parent: 'ul',
    children: ['li'],
    wrap: 'li'
  },
  {
    parent: 'ol',
    children: ['li'],
    wrap: 'li'
  },
  {
    parent: 'row',
    children: ['col'],
    wrap: 'col'
  }
]

export default function withArticle(editor) {
  const { isVoid, isInline, normalizeNode } = editor

  editor.isVoid = element =>
    voidElements.includes(element.type) || isVoid(element)

  editor.isInline = element =>
    inlineElements.includes(element.type) || isInline(editor)

  editor.normalizeNode = entry => {
    const [node, path] = entry as [Node, Path]

    if (Element.isElement(node) || path.length === 0) {
      // void elements contain exactly one empty text node
      if (editor.isVoid(node)) {
        const children = node.children
        if (children.length > 0) {
          if (children.length !== 1 || children[0].text !== '') {
            console.log('n: remove children from void nodes')
            Transforms.removeNodes(editor, { at: path.concat(0), voids: true })
            return
          }
        }
      }
      // some elements only allow inline children
      if (onlyInlineChildren.includes(node.type)) {
        for (const [child, childpath] of Node.children(editor, path)) {
          if (Element.isElement(child) && !editor.isInline(child)) {
            console.log(
              `n: only inlines allowed in ${node.type}, unwrapping ${child.type}`
            )
            Transforms.unwrapNodes(editor, { at: childpath, voids: true })
            return
          }
        }
      }
      // disallow nesting of anchors
      if (node.type === 'a') {
        for (const [anchestor] of Node.ancestors(editor, path, {
          reverse: true
        })) {
          if (Element.isElement(anchestor) && anchestor.type === 'a') {
            console.log('n: disallow a nesting, unwrapping inner')
            Transforms.unwrapNodes(editor, { at: path, voids: true })
            return
          }
        }
      }
      // check for allowed children
      for (const { parent, children, wrap } of onlySomeBlocksAllowed) {
        if (node.type === parent || (parent === '#root' && path.length === 0)) {
          for (const [child, childpath] of Node.children(editor, path)) {
            if (Text.isText(child)) {
              console.log(
                `n: text should be block in ${parent}, wrapping in ${wrap}`
              )
              Transforms.wrapNodes(
                editor,
                { type: wrap, children: [{ text: '' }] },
                { at: childpath, voids: true }
              )
              return
            }
            if (Element.isElement(child) && !children.includes(child.type)) {
              console.log(
                `n: ${child.type} not allowed in ${parent}, unwrapping`
              )
              Transforms.unwrapNodes(editor, { at: childpath, voids: true })
              return
            }
          }
        }
      }
      // spoiler has exactly one title and one body
      if (node.type === 'spoiler-container') {
        if (
          node.children.length !== 2 ||
          node.children[0].type !== 'spoiler-title' ||
          node.children[1].type !== 'spoiler-body'
        ) {
          if (
            node.children.length < 2 ||
            node.children[0].type !== 'spoiler-title'
          ) {
            console.log('n: incomplete spoiler, removing')
            Transforms.removeNodes(editor, { at: path, voids: true })
            return
          }

          let hasTitle = false
          let hasBody = false

          for (const [child, childpath] of Node.children(editor, path)) {
            if (child.type == 'spoiler-title') {
              if (hasTitle) {
                console.log('n: spoiler has too many titles')
                Transforms.removeNodes(editor, { at: childpath, voids: true })
                return
              }
              hasTitle = true
            } else if (child.type == 'spoiler-body') {
              if (hasBody || !hasTitle) {
                console.log('n: spoiler has too many bodys')
                Transforms.removeNodes(editor, { at: childpath, voids: true })
                return
              }
              hasBody = true
            } else {
              console.log('n: spoiler has invalid child')
              Transforms.removeNodes(editor, { at: childpath, voids: true })
              return
            }
          }
        }
      }
      // headings only on topleve and h1 only at beginning
      if (node.type === 'h') {
        if (!Number.isInteger(node.level) || node.level < 1 || node.level > 5) {
          console.log('n: heading is missing / has wrong level, removing')
          Transforms.removeNodes(editor, { at: path, voids: true })
          return
        }
        if (node.level == 1 && (path.length !== 1 || path[0] !== 0)) {
          console.log('n: h1 within document, unwrapping')
          Transforms.unwrapNodes(editor, { at: path, voids: true })
        }
      }
      // cols should have proper sizes
      if (node.type === 'col') {
        if (!Number.isInteger(node.size) || node.size <= 0) {
          console.log(`n: col has wrong size ${node.size}`)
          Transforms.setNodes(editor, { size: 4 }, { at: path, voids: true })
          return
        }
      }
      // remove empty links
      if (node.type === 'a') {
        if (node.children.length === 1 && node.children[0].text === '') {
          console.log('n: empty link, removing')
          Transforms.removeNodes(editor, { at: path })
          return
        }
      }
      // adjacent unordered lists should be merged
      for (let i = 1; i < node.children.length; i++) {
        if (
          node.children[i].type === node.children[i - 1].type &&
          (node.children[i].type === 'ul' || node.children[i].type === 'ol')
        ) {
          console.log('n: adjacent lists found, merging')
          Transforms.mergeNodes(editor, { at: path.concat(i), voids: true })
          return
        }
      }
    }

    if (Text.isText(node)) {
      let text = node.text
      if (text.includes('\n')) {
        text = text.split('\n').join('')
        console.log('n: removing newlines from text')
        Transforms.removeNodes(editor, { at: path })
        Transforms.insertNodes(editor, { text }, { at: path })
        return
      }
    }

    normalizeNode(entry)
  }

  return editor
}
