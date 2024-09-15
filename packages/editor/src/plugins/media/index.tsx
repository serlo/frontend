import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginProps, object, scalar } from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { SelectMediaPanel } from './select-media-panel'
import { Embedding } from './services/embedding'
import { Embed, Resource } from './services/types'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { cn } from '@/helper/cn'

export { Embed } from './services/types'

const state = object({
  resourceLocation: scalar<Resource | null>(null),
})
type MediaState = typeof state
interface MediaConfig {
  name: string
  allowedEmbedding?: Embed[]
}
type MediaProps = EditorPluginProps<MediaState, MediaConfig>

export function createMediaPlugin(
  config: MediaConfig = { name: EditorPluginType.Media }
) {
  return {
    state,
    config,
    Component: MediaPlugin,
  }
}

function MediaPlugin(props: MediaProps) {
  const { state, focused, id, config } = props
  const resource = state.resourceLocation.value

  return (
    <>
      {focused && (
        <PluginToolbar
          pluginType={config.name}
          pluginControls={<PluginDefaultTools pluginId={id} />}
          {...(resource !== null
            ? { pluginSettings: <MediaPluginSettings /> }
            : {})}
        />
      )}
      {resource !== null ? (
        <Embedding resource={resource} />
      ) : (
        <SelectMediaPanel
          allowEmbedding={config.allowedEmbedding}
          extraClassName="rounded-b-md shadow-md"
          onSelect={(resource) => state.resourceLocation.set(resource)}
        />
      )}
    </>
  )

  function MediaPluginSettings() {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <ModalWithCloseButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          className="bg-yellow-50"
        >
          <SelectMediaPanel
            allowEmbedding={config.allowedEmbedding}
            onSelect={(resource) => state.resourceLocation.set(resource)}
          />
        </ModalWithCloseButton>
        <button
          className={cn(
            'mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all',
            'hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200'
          )}
          onClick={() => setIsOpen(true)}
        >
          Datei ändern <FaIcon icon={faSyncAlt} />
        </button>
      </>
    )
  }
}
