import { Node } from 'slate'

import { TextEditor, type TextEditorProps } from './components/text-editor'
import { createDefaultTextNode, isListNode } from './plugins'
import type { TextEditorConfig, TextEditorState } from './types/config'
import {
  type CustomElement,
  type CustomText,
  type Paragraph,
  type List,
  type ListItem,
  type ListItemText,
  type Heading,
  type Link,
  type MathElement,
} from './types/text-editor'
import { emptyDocumentFactory } from './utils/document'
import { isEmptyObject } from './utils/object'
import { type EditorPlugin, serializedScalar } from '@/serlo-editor/plugin'

const createTextPlugin = (
  config: TextEditorConfig
): EditorPlugin<TextEditorState, TextEditorConfig> => ({
  Component: TextEditor,
  config,
  state: serializedScalar(emptyDocumentFactory(), {
    serialize({ value }) {
      return value
    },
    deserialize(value) {
      if (value.length === 0) {
        return emptyDocumentFactory()
      }

      // If the first child of the Element is an empty object,
      // replace it with an empty document.
      // https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
      const firstChild = (value[0] as CustomElement).children[0]
      if (isEmptyObject(firstChild)) {
        return emptyDocumentFactory()
      }

      // Add an empty line in front of list elements at the start of the block
      // This way we avoid list related merging issues
      const firstElement = value[0] as CustomElement
      if (isListNode(firstElement)) {
        value = [createDefaultTextNode(), ...value]
      }

      return { value, selection: null }
    },
  }),
  onKeyDown() {
    return false
  },
  isEmpty: (state) => {
    // since Node.string does not seem to work for our void math nodes this quickfix
    // checks for them explicitly
    // for a possibly prettier solution check https://github.com/serlo/frontend/pull/2476#pullrequestreview-1475064574
    return (
      state.value.value
        .map((node) => {
          const childNodes = [...Node.elements(node)]
          if (
            childNodes.find(
              ([node]) => node.type === 'math' && node.src && node.src.length
            )
          ) {
            return false
          }

          return Node.string(node)
        })
        .join('') === ''
    )
  },
})

export { createTextPlugin }

export type {
  CustomElement,
  Paragraph,
  List,
  ListItem,
  ListItemText,
  Heading,
  Link,
  MathElement,
  CustomText,
  TextEditorConfig,
  TextEditorState,
  TextEditorProps,
}
