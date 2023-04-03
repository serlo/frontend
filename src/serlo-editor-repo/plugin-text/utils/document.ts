import { StateTypeValueType } from '../../plugin'

import type { TextEditorState } from '../types'

export const emptyDocumentFactory =
  (): StateTypeValueType<TextEditorState> => ({
    value: [{ type: 'p', children: [{ text: '' }] }],
    selection: null,
  })
