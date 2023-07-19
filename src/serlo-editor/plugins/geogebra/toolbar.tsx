import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction } from 'react'

import { GeogebraProps } from '.'
import { EditorInput } from '../../editor-ui'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/editor-ui/plugin-toolbar/dropdown/default-controls'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const GeogebraToolbar = ({
  id,
  state,
  showSettingsModal,
  setShowSettingsModal,
}: GeogebraProps & {
  showSettingsModal: boolean
  setShowSettingsModal: Dispatch<SetStateAction<boolean>>
}) => {
  const editorStrings = useEditorStrings()
  const geogebraStrings = editorStrings.plugins.geogebra

  return (
    <PluginToolbar
      pluginId={id}
      pluginType={EditorPluginType.Geogebra}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {geogebraStrings.chooseApplet} <FaIcon icon={faPencilAlt} />
          </button>
          {/* In the future we want a popovers per setting, but this is faster for now */}
          {showSettingsModal ? (
            <ModalWithCloseButton
              isOpen={showSettingsModal}
              onCloseClick={() => setShowSettingsModal(false)}
              className="!top-1/3 !max-w-xl"
            >
              <h3 className="serlo-h3 mt-4">
                {editorStrings.edtrIo.settings}: {geogebraStrings.title}
              </h3>

              <div className="mx-side mb-3">
                <EditorInput
                  label={`${geogebraStrings.urlOrId}: `}
                  placeholder="z.B. N5ktHvtW"
                  value={state.value}
                  onChange={(e) => state.set(e.target.value)}
                  inputWidth="100%"
                  width="100%"
                  className="block"
                />
              </div>
            </ModalWithCloseButton>
          ) : null}
        </>
      }
      pluginControls={<DefaultControls pluginId={id} />}
    />
  )
}
