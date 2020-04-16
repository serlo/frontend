import { Transforms, Path, Element, Range, Node } from 'slate'
import { getNextElementPath } from './helper'

export default function withCreate(editor) {
  const { normalizeNode, insertBreak, insertNode } = editor

  editor.insertNode = entry => {
    insertNode(entry)
  }

  editor.normalizeNode = entry => {
    const [node, path] = entry as [Node, Path]

    if (Element.isElement(node) || path.length === 0) {
      // layout begins with h1 and ends with empty paragraph
      if (path.length === 0) {
        const childCount = editor.children.length
        if (
          childCount < 1 ||
          editor.children[0].type !== 'h' ||
          editor.children[0].level !== 1
        ) {
          console.log('create: missing h1')
          Transforms.insertNodes(
            editor,
            {
              type: 'h',
              level: 1,
              children: [{ text: '' }]
            },
            { at: [0], voids: true }
          )
          return
        }
        if (
          childCount < 1 ||
          editor.children[childCount - 1].type !== 'p' ||
          editor.children[childCount - 1].children.length !== 1 ||
          editor.children[childCount - 1].children[0].text !== ''
        ) {
          console.log('create: missing ending paragraph')
          Transforms.insertNodes(
            editor,
            {
              type: 'p',
              children: [{ text: '' }]
            },
            { at: [childCount], voids: true }
          )
          return
        }
      }
    }
    normalizeNode(entry)
  }

  editor.insertBreak = () => {
    const { selection } = editor
    if (Range.isCollapsed(selection)) {
      const enclosingBlockAnchorPath = getNextElementPath(
        editor,
        selection.anchor.path
      )
      const enclosingBlock = Node.get(editor, enclosingBlockAnchorPath)
      if (
        enclosingBlock.type === 'h' ||
        enclosingBlock.type === 'img' ||
        enclosingBlock.type === 'math'
      ) {
        enclosingBlockAnchorPath[enclosingBlockAnchorPath.length - 1]++
        Transforms.insertNodes(
          editor,
          { type: 'p', children: [{ text: '' }] },
          { at: enclosingBlockAnchorPath }
        )
        Transforms.select(editor, enclosingBlockAnchorPath)
        return
      }
      if (enclosingBlock.type === 'p') {
        const outerEnclosingBlockPath = getNextElementPath(
          editor,
          Path.parent(enclosingBlockAnchorPath)
        )
        const outerBlock = Node.get(editor, outerEnclosingBlockPath)
        if (Node.string(enclosingBlock) == '') {
          if (outerBlock.type === 'important') {
            outerEnclosingBlockPath[outerEnclosingBlockPath.length - 1]++
            Transforms.insertNodes(
              editor,
              {
                type: 'p',
                children: [{ text: '' }]
              },
              { at: outerEnclosingBlockPath }
            )
            Transforms.select(editor, outerEnclosingBlockPath)
            return
          }
          if (outerBlock.type === 'li') {
            const outerParentPath = Path.parent(outerEnclosingBlockPath)
            outerParentPath[outerParentPath.length - 1]++
            Transforms.insertNodes(
              editor,
              {
                type: 'p',
                children: [{ text: '' }]
              },
              { at: outerParentPath }
            )
            Transforms.select(editor, outerParentPath)
            return
          }
        }
        if (outerBlock.type === 'li') {
          outerEnclosingBlockPath[outerEnclosingBlockPath.length - 1]++
          Transforms.insertNodes(
            editor,
            {
              type: 'li',
              children: [
                {
                  type: 'p',
                  children: [{ text: '' }]
                }
              ]
            },
            { at: outerEnclosingBlockPath }
          )
          Transforms.select(editor, outerEnclosingBlockPath)
          return
        }
      }
    }

    insertBreak()
  }

  return editor
}
