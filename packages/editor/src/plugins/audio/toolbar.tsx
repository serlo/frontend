import {
  getFirstElementOrUndefined,
  useShadowRoot,
} from '@editor/core/helpers/use-shadow-root'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import {
  KeyboardEvent as ReactKeyboardEvent,
  Dispatch,
  SetStateAction,
  useRef,
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
  const audioStrings = useEditorStrings().plugins.audio
  const ref = useRef<HTMLButtonElement>(null)
  const shadowRoot = useShadowRoot(ref)

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
            ref={ref}
          >
            {audioStrings.audioUrl} <FaIcon icon={faPencilAlt} />
          </button>
          <ModalWithCloseButton
            isOpen={showSettingsModal}
            onCloseClick={() => setShowSettingsModal(false)}
            className="top-8 max-w-xl translate-y-0 sm:top-1/3"
            appElement={getFirstElementOrUndefined(shadowRoot) ?? document.body}
          >
            <h3 className="serlo-h3 mt-4">{audioStrings.title}</h3>

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
          </ModalWithCloseButton>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
