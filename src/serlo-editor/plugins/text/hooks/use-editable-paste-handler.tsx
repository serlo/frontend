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
      // Exit if no files or text in clipboard data
      const files = Array.from(event.clipboardData.files)
      const text = event.clipboardData.getData('text')
      if (!files.length && !text) return

      // Exit if unable to select document data or if not allowed to manipulate siblings
      const storeState = store.getState()
      const document = selectDocument(storeState, id)
      const mayManipulateSiblings = selectMayManipulateSiblings(storeState, id)
      if (!document || !mayManipulateSiblings) return

      // Iterate through all plugins and try to process clipboard data
      let media
      for (const { plugin, type } of editorPlugins.getAllWithData()) {
        const state = plugin.onFiles?.(files) ?? plugin.onText?.(text)
        if (state?.state) {
          media = { state: state.state as unknown, pluginType: type }
          break
        }
      }

      // Exit if no media was processed from clipboard data
      if (!media) return

      // Prevent URL being pasted as text in the text plugin
      event.preventDefault()

      // Prevent pasting media when selection is within a list
      if (isSelectionWithinList(editor)) {
        showToastNotice(textStrings.noElementPasteInLists, 'warning')
        return
      }

      // Insert the plugin with appropriate type and state
      insertPlugin({ editor, id, dispatch, ...media })
    },
    [dispatch, editor, id, textStrings]
  )
}
