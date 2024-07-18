import { useCallback, useEffect, useMemo } from 'react'
import { Descendant, Editor, Transforms, withoutNormalizing } from 'slate'
import { ReactEditor } from 'slate-react'

import type { TextEditorProps } from '../components/text-editor'
import { instanceStateStore } from '../utils/instance-state-store'

interface UseEditorChangeArgs {
  editor: Editor
  state: TextEditorProps['state']
  id: string
  focused: boolean
}

const isEditorInDOM = (editor: Editor) => {
  try {
    // Get DOMNode of the whole editor
    const domNode = ReactEditor.toDOMNode(editor, editor)
    console.log('editorInDom: ', domNode)

    if (document.body.contains(domNode)) {
      return true
    }

    // Fallback to checking if it's in the Shadow DOM
    let rootNode = domNode.getRootNode() as ShadowRoot | Document
    while (rootNode instanceof ShadowRoot) {
      if (rootNode.host.contains(domNode)) {
        return true
      }
      rootNode = rootNode.host.getRootNode() as ShadowRoot | Document
    }

    return false
  } catch (error) {
    console.warn('Error checking. Editor is not mounted to DOM:', error)
    return false
  }
}

// Check if the Slate node exists in the DOM
// const isNodeInDOM = (
//   editor: Editor,
//   selection: BaseRange | BasePoint | undefined
// ) => {
//   try {

//     if (!selection) return false

//     console.log('IsNodeInDom: ', selection)

//     let path: Path
//     if ('path' in selection) {
//       // If selection is a BasePoint
//       path = selection.path
//     } else if ('focus' in selection) {
//       // If selection is a BaseRange
//       path = selection.focus.path
//     } else {
//       console.error('Unexpected selection format')
//       return false
//     }

//     // Get the node at the selection
//     const [node] = Editor.node(editor, path)

//     console.log('Node: ', node)
//     if (!node) return false

//     const domNode = ReactEditor.toDOMNode(editor, node)
//     console.log('DomNode: ', domNode)

//     if (document.body.contains(domNode)) {
//       return true
//     }

//     // Fallback to see if the node is in a Shadow DOM
//     let rootNode = domNode.getRootNode() as ShadowRoot | Document
//     while (rootNode instanceof ShadowRoot) {
//       if (rootNode.host.contains(domNode)) {
//         return true
//       }
//       rootNode = rootNode.host.getRootNode() as ShadowRoot | Document
//     }

//     return false
//   } catch (error) {
//     console.error('Error checking if selected node is in DOM:', error)
//     return false
//   }
// }

export const useEditorChange = (args: UseEditorChangeArgs) => {
  const { editor, state, id, focused } = args

  // Setup store on first render
  if (!instanceStateStore[id]) {
    instanceStateStore[id] = {
      value: state.value.value,
      selection: state.value.selection,
      needRefocus: 1,
    }
  }

  useMemo(() => {
    const { selection, value } = state.value

    // we received a new (different) state from core
    if (instanceStateStore[id].value !== value) {
      instanceStateStore[id].value = value
      instanceStateStore[id].selection = selection
      editor.children = value
      withoutNormalizing(editor, () => {
        Transforms.deselect(editor)
        Transforms.select(editor, selection ?? Editor.start(editor, []))
      })
    }
  }, [editor, state.value, id])

  useEffect(() => {
    const storeEntry = instanceStateStore[id]
    if (focused && storeEntry.needRefocus > 0) {
      const selection = storeEntry.selection ?? Editor.start(editor, [])

      withoutNormalizing(editor, () => {
        Transforms.deselect(editor)
        Transforms.select(editor, selection)
      })

      setTimeout(() => {
        if (isEditorInDOM(editor)) {
          ReactEditor.focus(editor)
          storeEntry.needRefocus--
        } else {
          console.warn('Editor not found in DOM, skipping focus')
          // storeEntry.needRefocus = 0
        }
      }, 0)

      // if (isNodeInDOM(editor, selection)) {
      //   console.log('About to focus', { id, storeEntry, selection })
      //   ReactEditor.focus(editor)
      //   storeEntry.needRefocus--
      // } else {
      //   console.warn('Slate node not found in DOM, skipping focus')
      //   // Optionally reset focus state
      //   // storeEntry.needRefocus = 0
      // }
      // ReactEditor.focus(editor)
      // storeEntry.needRefocus--
    }
  })

  useEffect(() => {
    if (focused) {
      instanceStateStore[id].needRefocus = 2

      instanceStateStore[id].selection = {
        anchor: Editor.start(editor, []),
        focus: Editor.start(editor, []),
      }
    }
  }, [focused, id, editor])

  return useCallback(
    (newValue: Descendant[]) => {
      const isAstChange = editor.operations.some(
        ({ type }) => type !== 'set_selection'
      )
      const storeEntry = instanceStateStore[id]

      if (isAstChange) {
        storeEntry.value = newValue
        state.set(
          { value: newValue, selection: editor.selection },
          ({ value }) => ({ value, selection: storeEntry.selection })
        )
      }

      storeEntry.selection = editor.selection
    },
    [editor.operations, editor.selection, state, id]
  )
}
