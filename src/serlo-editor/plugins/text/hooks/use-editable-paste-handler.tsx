import { useCallback } from 'react'
import { Editor as SlateEditor } from 'slate'

import { insertPlugin } from '../utils/insert-plugin'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { isSelectionWithinList } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import {
  selectDocument,
  selectMayManipulateSiblings,
  useAppDispatch,
  store,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface UseEditablePasteHandlerArgs {
  editor: SlateEditor
  id: string
}

export const useEditablePasteHandler = (args: UseEditablePasteHandlerArgs) => {
  const { editor, id } = args

  const dispatch = useAppDispatch()
  const textStrings = useEditorStrings().plugins.text

  return useCallback(
    (event: React.ClipboardEvent) => {
      const isListActive = isSelectionWithinList(editor)

      const document = selectDocument(store.getState(), id)
      if (!document) return

      const mayManipulateSiblings = selectMayManipulateSiblings(
        store.getState(),
        id
      )
      if (!mayManipulateSiblings) return

      const files = Array.from(event.clipboardData.files)
      const text = event.clipboardData.getData('text')

      // Handle pasted images or image URLs
      if (files?.length > 0 || text) {
        const imagePlugin = editorPlugins.getByType(EditorPluginType.Image)
        if (!imagePlugin) return

        const imagePluginState =
          imagePlugin.onFiles?.(files) ?? imagePlugin.onText?.(text)

        if (imagePluginState !== undefined) {
          if (isListActive) {
            showToastNotice(textStrings.noElementPasteInLists, 'warning')
            return
          }

          insertPlugin({
            pluginType: EditorPluginType.Image,
            editor,
            store,
            id,
            dispatch,
            state: imagePluginState.state,
          })
          return
        }
      }

      if (text) {
        // Handle pasted video URLs
        const videoPluginState = editorPlugins
          .getByType(EditorPluginType.Video)
          ?.onText?.(text)
        if (videoPluginState !== undefined) {
          event.preventDefault()

          if (isListActive) {
            showToastNotice(textStrings.noElementPasteInLists, 'warning')
            return
          }

          insertPlugin({
            pluginType: EditorPluginType.Video,
            editor,
            store,
            id,
            dispatch,
            state: videoPluginState.state,
          })
          return
        }

        // Handle pasted geogebra URLs
        const geogebraPluginState = editorPlugins
          .getByType(EditorPluginType.Geogebra)
          ?.onText?.(text)
        if (geogebraPluginState !== undefined) {
          event.preventDefault()

          if (isListActive) {
            showToastNotice(textStrings.noElementPasteInLists, 'warning')
            return
          }

          insertPlugin({
            pluginType: EditorPluginType.Geogebra,
            editor,
            store,
            id,
            dispatch,
            state: geogebraPluginState.state,
          })
          return
        }
      }
    },
    [dispatch, editor, id, textStrings]
  )
}
