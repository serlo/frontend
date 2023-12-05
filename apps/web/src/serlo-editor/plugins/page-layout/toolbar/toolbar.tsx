import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import type { Dispatch, SetStateAction } from 'react'

import { LayoutChooser } from './layout-chooser'
import type { PageLayoutPluginProps } from '..'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

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
  const pageLayoutStrings = useEditorStrings().plugins.pageLayout

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
          {showSettingsModal ? (
            <ModalWithCloseButton
              isOpen={showSettingsModal}
              onCloseClick={() => setShowSettingsModal(false)}
              className="top-8 max-w-xl translate-y-0 sm:top-1/3"
            >
              <LayoutChooser {...state} />
            </ModalWithCloseButton>
          ) : null}
        </>
      }
    />
  )
}
