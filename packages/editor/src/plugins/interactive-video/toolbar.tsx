import { PluginToolbar, PreviewButton } from '@editor/editor-ui/plugin-toolbar'
import { DropdownButton } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/dropdown-button'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { runChangeDocumentSaga } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { type Dispatch, type SetStateAction } from 'react'
import { useDispatch } from 'react-redux'

import type { InteractiveVideoProps } from '.'

export const InteractiveVideoToolbar = ({
  id,
  state,
  previewActive,
  setPreviewActive,
}: InteractiveVideoProps & {
  previewActive: boolean
  setPreviewActive: Dispatch<SetStateAction<boolean>>
}) => {
  const interactiveVideoStrings = useEditStrings().plugins.interactiveVideo
  const dispatch = useDispatch()

  function handleOnChangeVideo() {
    dispatch(
      runChangeDocumentSaga({
        id: state.video.id,
        state: { initial: (curr) => ({ ...(curr as object), src: '' }) },
      })
    )
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
          <DropdownButton
            onClick={handleOnChangeVideo}
            label={interactiveVideoStrings.changeVideo}
            icon={faArrowsRotate}
            separatorTop
          />
        </>
      }
    />
  )
}
