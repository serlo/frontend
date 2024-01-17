import { isSelectionWithinList } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { captionPasteHandler } from '@editor/plugins/image/utils/caption-paste-handler'
import { checkIsAllowedNesting } from '@editor/plugins/rows/utils/check-is-allowed-nesting'
import {
  selectDocument,
  selectMayManipulateSiblings,
  useAppDispatch,
  store,
  selectAncestorPluginTypes,
} from '@editor/store'
import type { EditorRowsDocument } from '@editor/types/editor-plugins'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { showToastNotice } from '@serlo/frontend/src/helper/show-toast-notice'
import { useCallback } from 'react'
import { Editor as SlateEditor } from 'slate'

import { insertPlugin } from '../utils/insert-plugin'
import { shouldUseFeature } from '@/components/user/profile-experimental'

export interface UseEditablePasteHandlerArgs {
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

      // Exit if unable to select document data
      const storeState = store.getState()
      const document = selectDocument(storeState, id)
      const mayManipulateSiblings = selectMayManipulateSiblings(storeState, id)
      if (!document) return

      // special case: pasting in image caption
      captionPasteHandler({ event, files, text, id, dispatch })

      let media
      // pasting editor document string and insert as plugins
      if (
        shouldUseFeature('editorPluginCopyTool') &&
        !media &&
        text.startsWith('{"plugin":"rows"')
      ) {
        const rowsDocument = JSON.parse(text) as EditorRowsDocument
        if (rowsDocument.state.length !== 1) return
        const pluginDocument = rowsDocument.state.at(0)
        const typesOfAncestors = selectAncestorPluginTypes(store.getState(), id)
        if (!pluginDocument || typesOfAncestors === null) return

        if (
          mayManipulateSiblings &&
          checkIsAllowedNesting(pluginDocument.plugin, typesOfAncestors)
        ) {
          media = {
            pluginType: pluginDocument.plugin,
            state: pluginDocument.state,
          }
        } else {
          event.preventDefault()
          showToastNotice(textStrings.pastingPluginNotAllowedHere, 'warning')
        }
      }

      // Exit if not allowed to manipulate siblings
      if (!mayManipulateSiblings) return

      // Iterate through all plugins and try to process clipboard data
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
