import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction, useState, type ClipboardEvent } from 'react'

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
  const [idState, setIdState] = useState(state.value)

  const injectionStrings = useEditStrings().plugins.injection

  function validateAndStoreBeforeClose() {
    const [id, hash] = idState.split('#')
    const isValidId = /^\/[1-9]?[0-9]+$/.test(id)
    const isValidHash = hash === undefined || /[a-z0-9-]+/.test(hash)

    if (isValidId && isValidHash) {
      setShowSettingsModal(false)
      state.set(idState)
    } else showToastNotice(injectionStrings.invalidStateWarning, 'warning')
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    // cleanup pasted links
    setTimeout(() => {
      const inputUrl = (e.target as HTMLInputElement).value
      const cleanUrl = getCleanUrl(inputUrl)
      if (cleanUrl !== inputUrl) setIdState(cleanUrl)
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
          <EditorModal
            isOpen={showSettingsModal}
            setIsOpen={(open) => {
              if (!open) validateAndStoreBeforeClose()
            }}
            className="top-8 max-w-xl translate-y-0 sm:top-24"
            title={injectionStrings.title}
            extraTitleClassName="serlo-h3 mt-4"
          >
            <div className="mx-side mb-3">
              <EditorInput
                autoFocus
                label={`${injectionStrings.serloId}: `}
                placeholder={injectionStrings.placeholder}
                value={idState}
                onPaste={onPaste}
                onChange={(e) => {
                  const { value } = e.target
                  const prepended =
                    value.length > 0 && value[0] !== '/' ? `/${value}` : value
                  setIdState(prepended)
                }}
                width="100%"
                inputWidth="100%"
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
