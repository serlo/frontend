import { isSelectionWithinList } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  listenForUnsupportedPlugins,
  removeUnsupportedPluginsListener,
} from '@editor/plugin/helpers/unsupported-plugin-event'
import { captionPasteHandler } from '@editor/plugins/image/utils/caption-paste-handler'
import { checkIsAllowedNesting } from '@editor/plugins/rows/utils/check-is-allowed-nesting'
import {
  selectDocument,
  selectMayManipulateSiblings,
  useAppDispatch,
  useStore,
  selectAncestorPluginTypes,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import { useCallback } from 'react'
import { Editor as SlateEditor } from 'slate'

import { insertPlugins } from '../utils/insert-plugins'
import { mathpixPasteHandler } from '../utils/mathpix-paste-handler'

export interface UseEditablePasteHandlerArgs {
  editor: SlateEditor
  id: string
}

export const useEditablePasteHandler = (args: UseEditablePasteHandlerArgs) => {
  const store = useStore()
  const { editor, id } = args

  const dispatch = useAppDispatch()
  const textStrings = useEditStrings().plugins.text

  return useCallback(
    async (event: React.ClipboardEvent) => {
      // Exit if no files or text in clipboard data
      const files = Array.from(event.clipboardData.files)
      const text = event.clipboardData.getData('text')
      if (!files.length && !text) return

      // Exit if unable to select plugin document data
      const storeState = store.getState()
      const pluginDocument = selectDocument(storeState, id)
      const mayManipulateSiblings = selectMayManipulateSiblings(storeState, id)
      if (!pluginDocument) return

      // special case: pasting in image caption
      void captionPasteHandler({
        event,
        files,
        text,
        id,
        dispatch,
        getStoreState: () => storeState,
      })

      // temporary hack to handle async onText
      if (text.startsWith('![](https://cdn.mathpix.com')) {
        event.preventDefault()
      }

      mathpixPasteHandler({ event, editor, text })

      // Exit if not allowed to manipulate siblings
      if (!mayManipulateSiblings) return

      let pluginsToAdd: Array<{ pluginType: string; state?: unknown }> = []

      // Pasting editor document string and insert as plugins
      if (!pluginsToAdd.length && text.startsWith('{"plugin":"rows"')) {
        listenForUnsupportedPlugins(notifyUserOfUnsupportedPlugins)
        const rowsDocument = decodeRowsPlugin(text)
        if (!rowsDocument || !rowsDocument.state.length) return
        rowsDocument.state.forEach(processPlugin)
      }

      // Iterate through all plugins and try to process clipboard data
      if (!pluginsToAdd.length) {
        for (const { plugin, type } of editorPlugins.getAllWithData()) {
          const state = plugin.onFiles?.(files) ?? (await plugin.onText?.(text))
          if (state?.state) {
            pluginsToAdd = [{ state: state.state as unknown, pluginType: type }]
            break
          }
        }
      }

      // Exit if no plugin was processed from clipboard data
      if (!pluginsToAdd.length) return

      // Prevent URL being pasted as text in the text plugin
      event.preventDefault()

      // Prevent pasting media when selection is within a list
      if (isSelectionWithinList(editor)) {
        showToastNotice(textStrings.noElementPasteInLists, 'warning')
        return
      }

      // Insert the plugins with appropriate type and state
      insertPlugins({
        plugins: pluginsToAdd,
        editor,
        id,
        getStoreState: () => store.getState(),
        dispatch,
      })

      removeUnsupportedPluginsListener(notifyUserOfUnsupportedPlugins)

      function decodeRowsPlugin(input: string) {
        return pipe(
          StateDecoder.decode(JSON.parse(input)),
          fold(
            (errors) => throwError(errors) ?? null,
            (decoded) => decoded
          )
        )
      }

      function processPlugin({ plugin, state }: AnyEditorDocument) {
        const typesOfAncestors = selectAncestorPluginTypes(store.getState(), id)
        if (typesOfAncestors === null) return
        if (checkIsAllowedNesting(plugin, typesOfAncestors)) {
          pluginsToAdd.push({ pluginType: plugin, state })
        } else {
          showToastNotice(textStrings.pastingPluginNotAllowedHere, 'warning')
        }
      }

      function notifyUserOfUnsupportedPlugins() {
        showToastNotice(textStrings.unsupportedPluginsPasted, 'warning')
      }

      function throwError(error: unknown) {
        showToastNotice(textStrings.invalidDataPasted, 'warning')
        // eslint-disable-next-line no-console
        console.error('Pasted JSON data is not a valid editor-state: ', error)
      }
    },
    [dispatch, editor, id, textStrings, store]
  )
}

const StateDecoder = t.strict({
  plugin: t.literal(EditorPluginType.Rows),
  state: t.array(
    t.strict({
      plugin: t.string,
      state: t.unknown,
    })
  ),
})
