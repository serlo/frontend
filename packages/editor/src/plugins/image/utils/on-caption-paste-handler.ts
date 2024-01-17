import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import {
  selectParentPluginType,
  type DocumentState,
  store,
  selectAncestorDocumentIds,
  runChangeDocumentSaga,
} from '@editor/store'
import type { AppDispatch } from '@editor/store/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { ImageProps } from '..'

/**
 * update parent image src if url or image are pasted in image caption
 */
export function onCaptionPasteHandler({
  event,
  document,
  files,
  text,
  id,
  dispatch,
}: {
  event: React.ClipboardEvent
  document: DocumentState
  files: File[]
  text: string
  id: string
  dispatch: AppDispatch
}) {
  const storeState = store.getState()
  if (document.plugin === EditorPluginType.Text) {
    const parentType = selectParentPluginType(storeState, id)
    if (parentType === EditorPluginType.Image) {
      const plugin = editorPlugins.getByType(parentType)
      const state = plugin.onFiles?.(files) ?? plugin.onText?.(text)

      if (state?.state) {
        const src = (state.state as ImageProps['state']).src
        const parentId = selectAncestorDocumentIds(storeState, id)?.at(-2)
        if (parentId) {
          dispatch(
            runChangeDocumentSaga({
              id: parentId,
              state: {
                initial: (previousState) => {
                  const imageState = previousState as ImageProps['state']
                  return {
                    ...imageState,
                    src,
                  }
                },
              },
            })
          )
          event.preventDefault()
        }
      }
      return true
    }
  }
  return false
}
