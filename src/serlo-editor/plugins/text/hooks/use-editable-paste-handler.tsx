import { useCallback } from 'react'
import { Editor as SlateEditor, Node } from 'slate'

import { sliceNodesAfterSelection } from '../utils/document'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { isSelectionWithinList } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import {
  selectDocument,
  selectParent,
  insertPluginChildAfter,
  selectMayManipulateSiblings,
  runReplaceDocumentSaga,
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

      const parentPluginType = document.plugin

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

          insertPlugin(EditorPluginType.Image, imagePluginState)
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

          insertPlugin(EditorPluginType.Video, videoPluginState)
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

          insertPlugin(EditorPluginType.Geogebra, geogebraPluginState)
          return
        }
      }

      function insertPlugin(
        pluginType: string,
        { state }: { state?: unknown }
      ) {
        const isEditorEmpty = Node.string(editor) === ''

        if (mayManipulateSiblings && isEditorEmpty) {
          dispatch(runReplaceDocumentSaga({ id, pluginType, state }))
          return
        }

        const parent = selectParent(store.getState(), id)
        if (!parent) return

        const slicedNodes = sliceNodesAfterSelection(editor)

        setTimeout(() => {
          if (slicedNodes) {
            dispatch(
              insertPluginChildAfter({
                parent: parent.id,
                sibling: id,
                document: {
                  plugin: parentPluginType,
                  state: slicedNodes,
                },
              })
            )
          }
          dispatch(
            insertPluginChildAfter({
              parent: parent.id,
              sibling: id,
              document: { plugin: pluginType, state },
            })
          )
        })
      }
    },
    [dispatch, editor, id, textStrings]
  )
}
