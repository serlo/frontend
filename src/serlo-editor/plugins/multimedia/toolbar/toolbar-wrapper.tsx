import { faCog } from '@fortawesome/free-solid-svg-icons'
import { ReactNode, useState } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface Props {
  id: string
  children: ReactNode
  strings: ReturnType<typeof useEditorStrings>
}

export const ToolbarWrapper = ({ id, children, strings }: Props) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  return (
    <PluginToolbar
      pluginId={id}
      pluginType={EditorPluginType.Multimedia}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {strings.edtrIo.settings} <FaIcon icon={faCog} />
          </button>
          {showSettingsModal ? (
            <ModalWithCloseButton
              isOpen={showSettingsModal}
              onCloseClick={() => setShowSettingsModal(false)}
              className="!top-1/3 !max-w-xl"
            >
              <h3 className="serlo-h3 mt-4">
                {strings.edtrIo.settings}: {strings.plugins.multimedia.title}
              </h3>

              <div className="mx-side mb-3">{children}</div>
            </ModalWithCloseButton>
          ) : null}
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="-top-[35px] left-[21px] w-[calc(100%-37px)]"
    />
  )
}
