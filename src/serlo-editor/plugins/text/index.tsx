import { Node } from 'slate'

import {
  TextEditorProps,
  TextEditorWrapper,
} from './components/text-editor-wrapper'
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
  TextEditorConfig,
  TextEditorFormattingOption,
  TextEditorPluginConfig,
  TextEditorState,
} from './types'
import { emptyDocumentFactory } from './utils/document'
import { isEmptyObject } from './utils/object'
import { EditorPlugin, serializedScalar } from '../../plugin'

const createTextPlugin = (
  config: TextEditorConfig
): EditorPlugin<TextEditorState, TextEditorConfig> => ({
  Component: TextEditorWrapper,
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
  TextEditorFormattingOption,
  TextEditorPluginConfig,
  TextEditorState,
  TextEditorProps,
}
