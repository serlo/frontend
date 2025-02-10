import { PluginToolbar, PreviewButton } from '@editor/editor-ui/plugin-toolbar'
import { DropdownButton } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/dropdown-button'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { runChangeDocumentSaga, useAppDispatch } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faArrowsRotate, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { type Dispatch, type SetStateAction } from 'react'

import type { InteractiveVideoProps } from '.'

export const InteractiveVideoToolbar = ({
  id,
  hasVideo,
  state,
  previewActive,
  setPreviewActive,
}: InteractiveVideoProps & {
  hasVideo: boolean
  previewActive: boolean
  setPreviewActive: Dispatch<SetStateAction<boolean>>
}) => {
  const interactiveVideoStrings = useEditStrings().plugins.interactiveVideo
  const dispatch = useAppDispatch()

  function handleOnChangeVideo() {
    dispatch(
      runChangeDocumentSaga({
        id: state.video.id,
        state: { initial: (curr) => ({ ...(curr as object), src: '' }) },
      })
    )
  }

  function handleRemoveAllMarks() {
    if (!window.confirm(interactiveVideoStrings.confirmRemoveAllMarks)) return
    state.marks.forEach(() => state.marks.remove(0))
  }

  return (
    <PluginToolbar
      pluginType={EditorPluginType.InteractiveVideo}
      pluginSettings={
        <PreviewButton
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      }
      pluginControls={
        <>
          <PluginDefaultTools pluginId={id} />
          {hasVideo ? (
            <>
              {state.marks.length > 0 ? (
                <DropdownButton
                  onClick={handleRemoveAllMarks}
                  label={interactiveVideoStrings.removeAllMarks}
                  icon={faTrashAlt}
                  separatorTop
                />
              ) : null}
              <DropdownButton
                onClick={handleOnChangeVideo}
                label={interactiveVideoStrings.changeVideo}
                icon={faArrowsRotate}
                separatorTop
              />
            </>
          ) : null}
        </>
      }
    />
  )
}
