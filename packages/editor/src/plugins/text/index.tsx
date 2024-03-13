import { type EditorPlugin, serializedScalar } from '@editor/plugin'
import { Node as SlateNode } from 'slate'

import { TextEditor, type TextEditorProps } from './components/text-editor'
import type { TextEditorConfig, TextEditorState } from './types/config'
import type {
  CustomElement,
  CustomText,
  Paragraph,
  List,
  ListItem,
  ListItemText,
  Heading,
  Link,
  MathElement,
} from './types/text-editor'
import { emptyDocumentFactory } from './utils/document'
import { isEmptyObject } from './utils/object'

const createTextPlugin = (
  config: TextEditorConfig
): EditorPlugin<TextEditorState, TextEditorConfig> => ({
  Component: TextEditor,
  config,
  state: serializedScalar(emptyDocumentFactory(), {
    toStaticState({ value }) {
      return value //slate
    },
    toStoreState(descendants) {
      if (descendants.length === 0) {
        return emptyDocumentFactory()
      }

      // If the first child of the Element is an empty object,
      // replace it with an empty document.
      // https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints
      const firstChild = (descendants[0] as CustomElement).children[0]
      if (isEmptyObject(firstChild)) {
        return emptyDocumentFactory()
      }

      return { value: descendants, selection: null }
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
          const childNodes = [...SlateNode.elements(node)]
          if (
            childNodes.find(
              ([node]) => node.type === 'math' && node.src && node.src.length
            )
          ) {
            return false
          }

          return SlateNode.string(node)
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
