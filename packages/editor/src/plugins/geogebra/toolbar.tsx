import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
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
  const editorStrings = useEditStrings()
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
          <EditorModal
            isOpen={showSettingsModal}
            setIsOpen={setShowSettingsModal}
            className="top-8 max-w-xl translate-y-0 sm:top-24"
            title={`${editorStrings.edtrIo.settings}: ${geogebraStrings.title}`}
            extraTitleClassName="serlo-h3 mt-4"
          >
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
          </EditorModal>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
