import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { type Dispatch, type SetStateAction } from 'react'

import type { GeogebraProps } from '.'
import { EditorInput } from '../../editor-ui'

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
      pluginType={EditorPluginType.Geogebra}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {geogebraStrings.chooseApplet} <FaIcon icon={faPencilAlt} />
          </button>
          <ModalWithCloseButton
            isOpen={showSettingsModal}
            setIsOpen={setShowSettingsModal}
            className="top-8 max-w-xl translate-y-0 sm:top-1/3"
          >
            <h3 className="serlo-h3 mt-4">
              {editorStrings.edtrIo.settings}: {geogebraStrings.title}
            </h3>

            <div className="mx-side mb-3">
              <EditorInput
                autoFocus
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
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
