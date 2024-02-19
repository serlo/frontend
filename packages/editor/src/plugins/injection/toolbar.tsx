import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { Dispatch, SetStateAction } from 'react'

import type { InjectionProps } from '.'
import { EditorInput } from '../../editor-ui'

export const InjectionToolbar = ({
  id,
  state,
  showSettingsModal,
  setShowSettingsModal,
}: InjectionProps & {
  showSettingsModal: boolean
  setShowSettingsModal: Dispatch<SetStateAction<boolean>>
}) => {
  const injectionStrings = useEditorStrings().plugins.injection

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Injection}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {injectionStrings.serloId} <FaIcon icon={faPencilAlt} />
          </button>
          <ModalWithCloseButton
            isOpen={showSettingsModal}
            onCloseClick={() => setShowSettingsModal(false)}
            className="top-8 max-w-xl translate-y-0 sm:top-1/3"
          >
            <h3 className="serlo-h3 mt-4">{injectionStrings.title}</h3>

            <div className="mx-side mb-3">
              <EditorInput
                autoFocus
                label={`${injectionStrings.serloId}: `}
                placeholder={injectionStrings.placeholder}
                inputMode="numeric"
                value={state.value}
                onChange={(e) =>
                  // TODO: make pasting a serlo url a working method
                  // TODO: enforce form starting with `/`
                  state.set(e.target.value.replace(/[^0-9]/g, ''))
                }
                width="100%"
                inputWidth="100%"
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
