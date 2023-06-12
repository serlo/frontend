import { Node } from 'slate'

import { EditorPlugin, serializedScalar } from '../../plugin'
import { TextEditorProps, TextEditor } from './components/text-editor'
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

/**
 * @param config - {@link TextEditorConfig | Plugin configuration}
 * @returns The text plugin
 */
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

      return { value, selection: null }
    },
  }),
  onKeyDown() {
    return false
  },
  isEmpty: (state) => {
    return state.value.value.map(Node.string).join('') === ''
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
