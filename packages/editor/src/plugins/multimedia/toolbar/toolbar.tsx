import { useShadowRoot } from '@editor/core/helpers/use-shadow-root'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { ReactNode, useRef, useState } from 'react'

interface MultimediaToolbarProps {
  id: string
  children: ReactNode
}

export const MultimediaToolbar = ({ id, children }: MultimediaToolbarProps) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const editorStrings = useEditorStrings()
  const ref = useRef<HTMLButtonElement>(null)

  const shadowRoot = useShadowRoot(ref)
  console.log('Parent selector: ', shadowRoot?.host as HTMLElement)

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Multimedia}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            data-qa="plugin-multimedia-settings-button"
            ref={ref}
          >
            {editorStrings.edtrIo.settings} <FaIcon icon={faCog} />
          </button>
          <ModalWithCloseButton
            isOpen={showSettingsModal}
            onCloseClick={() => setShowSettingsModal(false)}
            className="top-8 max-w-xl translate-y-0 sm:top-1/3"
            parentSelector={
              shadowRoot ? () => shadowRoot.host as HTMLElement : undefined
            }
          >
            <h3 className="serlo-h3 mt-4">
              {editorStrings.edtrIo.settings}:{' '}
              {editorStrings.plugins.multimedia.title}
            </h3>

            <div className="mx-side mb-3">{children}</div>
          </ModalWithCloseButton>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
