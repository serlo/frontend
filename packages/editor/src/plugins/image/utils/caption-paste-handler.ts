import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  selectParentPluginType,
  selectAncestorDocumentIds,
  runChangeDocumentSaga,
} from '@editor/store'
import type { AppDispatch, RootState } from '@editor/store/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { ImageProps } from '..'

/**
 * Handles the "paste" event of the Image plugin caption input field.
 * If a URL or an image file are pasted, update the "src" property of the Image plugin.
 */
export async function captionPasteHandler({
  event,
  files,
  text,
  id,
  dispatch,
  getStoreState,
}: {
  event: React.ClipboardEvent
  files: File[]
  text: string
  id: string
  dispatch: AppDispatch
  getStoreState: () => RootState
}) {
  const parentType = selectParentPluginType(getStoreState(), id)
  if (parentType !== EditorPluginType.Image) return

  const plugin = editorPlugins.getByType(parentType)
  const state = plugin.onFiles?.(files) ?? (await plugin.onText?.(text))
  if (!state?.state) return

  const src = (state.state as ImageProps['state']).src
  const parentId = selectAncestorDocumentIds(getStoreState(), id)?.at(-2)
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
