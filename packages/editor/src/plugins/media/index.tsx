import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginProps, object, scalar } from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  IconDefinition,
  faArrowUpFromBracket,
  faSearch,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useCallback, useRef, useState } from 'react'

import { Embedding } from './services/embedding'
import { resolveEmbedding } from './services/resolve-embedding'
import { Embed, Resource } from './services/types'
import { urlResolvers } from './services/url-resolvers'
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

interface SelectMediaPanelProps {
  extraClassName?: string
  onSelect: (resource: Resource) => void
  allowEmbedding?: Embed[]
}

function SelectMediaPanel({
  onSelect,
  extraClassName,
  allowEmbedding,
}: SelectMediaPanelProps) {
  return (
    <div
      className={cn(
        'almost-black flex flex-col items-center space-y-4 bg-yellow-50 p-8',
        extraClassName
      )}
    >
      <SelectMediaPanelButton
        onClick={() => void 0}
        icon={faArrowUpFromBracket}
        label="Datei hochladen"
      />
      <SelectMediaPanelButton
        onClick={() => void 0}
        icon={faSearch}
        label="Datei suchen"
      />
      <SelectMediaByUrl onSelect={onSelect} allowEmbedding={allowEmbedding} />
    </div>
  )
}

// ### Select media by URL

function SelectMediaByUrl({ onSelect, allowEmbedding }: SelectMediaPanelProps) {
  const timeOfLastChange = useRef(Date.now())
  const checkUrlController = useRef<AbortController | null>(null)
  const waitTimeUntilCheckingUrl = 500
  const [error, setError] = useState<string | null>(null)

  const updateErrorWhenNotSet = useCallback(
    (message: string) => {
      setError((prev) => (prev === null ? message : prev))
    },
    [setError]
  )

  const checkUrl = useCallback(
    async (urlString: string) => {
      if (urlString.trim() === '') return

      const controller = new AbortController()

      try {
        checkUrlController.current = controller

        let url: URL

        try {
          url = new URL(urlString)
        } catch {
          setError('Ungültige URL')
          return
        }

        for (const resolver of urlResolvers) {
          if (controller.signal.aborted) return

          if (
            allowEmbedding !== undefined &&
            !allowEmbedding.some((embedding) =>
              resolver.resolvableEmbeddings.includes(embedding)
            )
          ) {
            continue
          }

          const result = await resolver.resolve(url, controller.signal)

          if (result.type === 'resourceFound') {
            const embedding = resolveEmbedding(result.resource)

            if (
              allowEmbedding === undefined ||
              allowEmbedding.includes(embedding.type)
            ) {
              onSelect(result.resource)

              return
            }
          } else if (result.type === 'error') {
            updateErrorWhenNotSet(result.message)

            continue
          } else if (result.type === 'aborted') {
            // Check was aborted, so we do not need to continue checking
            return
          } else if (result.type === 'cannotResolve') {
            // Continue with the next resolver
            continue
          }
        }

        updateErrorWhenNotSet('URL konnte nicht aufgelöst werden')
      } finally {
        if (controller === checkUrlController.current) {
          checkUrlController.current = null
        }
      }
    },
    [allowEmbedding, onSelect, updateErrorWhenNotSet]
  )

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const urlString = e.target.value
      const timeOfThisCall = Date.now()
      timeOfLastChange.current = timeOfThisCall

      // Abort the previous check if it is still running
      if (checkUrlController.current) {
        checkUrlController.current.abort()
      }

      setError(null)

      setTimeout(() => {
        // Only check the URL if the input has not changed in the meantime
        if (timeOfThisCall === timeOfLastChange.current) {
          void checkUrl(urlString)
        }
      }, waitTimeUntilCheckingUrl)
    },
    [checkUrl]
  )

  return (
    <div className="flex min-w-[60%] flex-col items-center space-y-2">
      <span>URL:</span>
      <input
        className={cn(
          'w-full rounded-lg border-0 bg-yellow-100 px-4 py-2 text-gray-600',
          error ? 'outline outline-1 outline-red-500' : ''
        )}
        placeholder="https://example.com/image.png"
        onChange={(e) => handleOnChange(e)}
      />
      <span className="mt-1 inline-block pl-1 text-sm font-semibold text-red-500">
        {/* Use a non-breaking space to keep the height of the element */}
        {error ? error : '\u00A0'}
      </span>
    </div>
  )
}

// ### Button for selecting media

interface SelectMediaPanelButtonProps {
  onClick: () => void
  icon: IconDefinition
  label: string
}

function SelectMediaPanelButton({
  onClick,
  icon,
  label,
}: SelectMediaPanelButtonProps) {
  return (
    <button
      className="min-w-[60%] rounded-md bg-editor-primary-200 p-2 font-bold hover:bg-editor-primary-300"
      onClick={onClick}
    >
      <FaIcon className="mr-2" icon={icon} />
      {label}
    </button>
  )
}
