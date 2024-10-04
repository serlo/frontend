import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { type Dispatch, type SetStateAction } from 'react'

import { LayoutChooser } from './layout-chooser'
import type { PageLayoutPluginProps } from '..'

export const PageLayoutToolbar = ({
  id,
  state,
  focused,
  showSettingsModal,
  setShowSettingsModal,
}: PageLayoutPluginProps & {
  showSettingsModal: boolean
  setShowSettingsModal: Dispatch<SetStateAction<boolean>>
}) => {
  const pageLayoutStrings = useEditStrings().plugins.pageLayout

  if (!focused) return null

  return (
    <PluginToolbar
      pluginType={EditorPluginType.PageLayout}
      pluginControls={<PluginDefaultTools pluginId={id} />}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {pageLayoutStrings.chooseRatio} <FaIcon icon={faPencilAlt} />
          </button>
          <EditorModal
            isOpen={showSettingsModal}
            setIsOpen={setShowSettingsModal}
            className="top-8 max-w-xl translate-y-0 sm:top-24"
            title={pageLayoutStrings.chooseRatio}
            extraTitleClassName="serlo-h4 mb-4 ml-0 mt-6 block"
          >
            <LayoutChooser {...state} />
          </EditorModal>
        </>
      }
    />
  )
}
