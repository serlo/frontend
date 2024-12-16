import { isSelectionWithinList } from '@editor/editor-ui/plugin-toolbar/text-controls/utils/list'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
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
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { either as E } from 'fp-ts'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/PathReporter'
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

      // Exit if unable to select document data
      const storeState = store.getState()
      const document = selectDocument(storeState, id)
      const mayManipulateSiblings = selectMayManipulateSiblings(storeState, id)
      if (!document) return

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

      function processPlugin({ plugin, state }: AnyEditorDocument) {
        const typesOfAncestors = selectAncestorPluginTypes(store.getState(), id)
        if (typesOfAncestors === null) return
        if (checkIsAllowedNesting(plugin, typesOfAncestors)) {
          pluginsToAdd.push({ pluginType: plugin, state })
        } else {
          showToastNotice(textStrings.pastingPluginNotAllowedHere, 'warning')
        }
      }
    },
    [dispatch, editor, id, textStrings, store]
  )
}

export const StateDecoder = t.strict({
  plugin: t.literal(EditorPluginType.Rows),
  state: t.array(
    t.strict({
      plugin: t.union([
        t.literal(EditorPluginType.Article),
        t.literal(EditorPluginType.ArticleIntroduction),

        t.literal(EditorPluginType.Rows),

        t.literal(EditorPluginType.Anchor),
        t.literal(EditorPluginType.Audio),
        t.literal(EditorPluginType.Box),
        t.literal(EditorPluginType.Equations),
        t.literal(EditorPluginType.Geogebra),
        t.literal(EditorPluginType.Highlight),
        t.literal(EditorPluginType.Image),
        t.literal(EditorPluginType.ImageGallery),
        t.literal(EditorPluginType.Injection),
        t.literal(EditorPluginType.InteractiveVideo),
        t.literal(EditorPluginType.Multimedia),
        t.literal(EditorPluginType.SerloInjection),
        t.literal(EditorPluginType.SerloTable),
        t.literal(EditorPluginType.Spoiler),
        t.literal(EditorPluginType.Text),
        t.literal(EditorPluginType.Video),

        t.literal(EditorPluginType.Exercise),
        t.literal(EditorPluginType.ExerciseGroup),
        t.literal(EditorPluginType.BlanksExercise),
        t.literal(EditorPluginType.DropzoneImage),
        t.literal(EditorPluginType.InputExercise),
        t.literal(EditorPluginType.ScMcExercise),
        t.literal(EditorPluginType.Solution),
        t.literal(EditorPluginType.TextAreaExercise),
      ]),
      state: t.unknown,
    })
  ),
})

function decodeRowsPlugin(text: string) {
  try {
    const decoded = StateDecoder.decode(JSON.parse(text))
    if (E.isLeft(decoded)) {
      return throwError(
        `Could not validate data: ${PathReporter.report(decoded).join('\n')}`
      )
    }
    return decoded.right
  } catch (error) {
    throwError(error)
  }
}

function throwError(error?: unknown) {
  showToastNotice(
    '⚠️ Sorry, something is wrong with the data you pasted.',
    'warning'
  )
  // eslint-disable-next-line no-console
  console.error(error)
  throw new Error(
    'Pasted JSON data is not a valid editor-state or contains unsupported plugins'
  )
}
