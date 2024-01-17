import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  selectParentPluginType,
  store,
  selectAncestorDocumentIds,
  runChangeDocumentSaga,
} from '@editor/store'
import type { AppDispatch } from '@editor/store/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { ImageProps } from '..'

/**
 * Handles the "paste" event of the Image plugin caption input field.
 * If a URL or an image file are pasted, update the "src" property of the Image plugin.
 */
export function captionPasteHandler({
  event,
  files,
  text,
  id,
  dispatch,
}: {
  event: React.ClipboardEvent
  files: File[]
  text: string
  id: string
  dispatch: AppDispatch
}) {
  const parentType = selectParentPluginType(store.getState(), id)
  if (parentType !== EditorPluginType.Image) return

  const plugin = editorPlugins.getByType(parentType)
  const state = plugin.onFiles?.(files) ?? plugin.onText?.(text)
  if (!state?.state) return

  const src = (state.state as ImageProps['state']).src
  const parentId = selectAncestorDocumentIds(store.getState(), id)?.at(-2)
  if (!parentId) return

  dispatch(
    runChangeDocumentSaga({
      id: parentId,
      state: {
        initial: (previousState) => ({
          ...(previousState as ImageProps['state']),
          src,
        }),
      },
    })
  )
  event.preventDefault()
}
