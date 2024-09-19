import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { Dispatch, SetStateAction, type ClipboardEvent } from 'react'

import type { InjectionProps } from '.'
import { EditorInput } from '../../editor-ui'
import { getCleanUrl } from '../text/utils/link'

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

  function validateBeforeClose() {
    const [id, hash] = state.value.split('#')
    const isValidId = /^\/[1-9]?[0-9]+$/.test(id)
    const isValidHash = hash === undefined || /[a-z0-9-]+/.test(hash)

    if (isValidId && isValidHash) setShowSettingsModal(false)
    else showToastNotice(injectionStrings.invalidStateWarning, 'warning')
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    // cleanup pasted links
    setTimeout(() => {
      const inputUrl = (e.target as HTMLInputElement).value
      const cleanUrl = getCleanUrl(inputUrl)
      if (cleanUrl !== inputUrl) state.set(cleanUrl)
    })
  }

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
            setIsOpen={(open) => {
              if (!open) validateBeforeClose()
            }}
            className="top-8 max-w-xl translate-y-0 sm:top-1/3"
            title={injectionStrings.title}
            extraTitleClassName="serlo-h3 mt-4"
          >
            <div className="mx-side mb-3">
              <EditorInput
                autoFocus
                label={`${injectionStrings.serloId}: `}
                placeholder={injectionStrings.placeholder}
                value={state.value}
                onPaste={onPaste}
                onChange={(e) => {
                  const { value } = e.target
                  const prepended =
                    value.length > 0 && value[0] !== '/' ? `/${value}` : value
                  state.set(prepended)
                }}
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
