import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import {
  KeyboardEvent as ReactKeyboardEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Key } from 'ts-key-enum'

import type { AudioProps } from '.'
import { EditorInput } from '../../editor-ui'

export const AudioToolbar = ({
  id,
  state,
  showSettingsModal,
  setShowSettingsModal,
}: AudioProps & {
  showSettingsModal: boolean
  setShowSettingsModal: Dispatch<SetStateAction<boolean>>
}) => {
  const audioStrings = useEditStrings().plugins.audio

  useHotkeys(
    [Key.Escape],
    (event) => {
      event.preventDefault()
      setShowSettingsModal(false)
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
      scopes: ['global'],
    }
  )

  const handleInputEnter = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setShowSettingsModal(false)
    }
  }

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Audio}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {audioStrings.audioUrl} <FaIcon icon={faPencilAlt} />
          </button>
          <EditorModal
            isOpen={showSettingsModal}
            setIsOpen={setShowSettingsModal}
            className="top-8 max-w-xl translate-y-0 sm:top-24"
            title={audioStrings.title}
            extraTitleClassName="serlo-h3 mt-4"
          >
            <div className="mx-side mb-3">
              <EditorInput
                autoFocus
                label={`${audioStrings.audioUrl}: `}
                value={state.src.value}
                onChange={(e) => {
                  state.src.set(e.target.value)
                }}
                inputWidth="100%"
                width="100%"
                onKeyDown={handleInputEnter}
                placeholder="voca.ro/audio-id"
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
