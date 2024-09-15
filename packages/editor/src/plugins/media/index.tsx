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

import { Embed, EmbeddingType, Hosting, Resource } from './services/types'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { cn } from '@/helper/cn'

export { Embed as Embed } from './services/types'

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
      {/* TODO: Add default toolbar buttons */}
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
        <EmbeddedMedia resource={resource} />
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

function EmbeddedMedia({ resource }: { resource: Resource }) {
  const embedding = resolveEmbedding(resource)

  if (embedding.type === Embed.HTMLImage) {
    return <img src={embedding.contentUrl} />
  } else if (embedding.type === Embed.HTMLVideo) {
    return <video src={embedding.contentUrl} controls />
  } else if (embedding.type === Embed.GeoGebraApplet) {
    return <div>GeoGebraApplet with id: ${embedding.appletId}</div>
  }
}

function resolveEmbedding(resource: Resource) {
  // TODO: Find a way to omit the "as" statement
  const resolveFunc = embeddingResolver[resource.hostingService] as (
    resource: Resource
  ) => EmbeddingType
  return resolveFunc(resource)
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

interface URLResolver {
  name: string
  resolvableEmbeddings: Embed[]
  resolve: (url: URL, signal: AbortSignal) => SyncOrAsync<URLResolverResult>
}
type SyncOrAsync<T> = T | Promise<T>
type URLResolverResult = ResourceFound | Aborted | CannotResolve | Error

interface ResourceFound {
  type: 'resourceFound'
  resource: Resource
}

interface Aborted {
  type: 'aborted'
}

interface CannotResolve {
  type: 'cannotResolve'
}

interface Error {
  type: 'error'
  message: string
}

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv']

const urlResolvers: URLResolver[] = [
  {
    name: 'Resolve geogebra applet',
    resolvableEmbeddings: [Embed.GeoGebraApplet],
    resolve: (url) => {
      if (
        url.hostname === 'www.geogebra.org' &&
        url.pathname.startsWith('/m/')
      ) {
        return {
          type: 'resourceFound',
          resource: {
            hostingService: Hosting.GeoGebra,
            embeddingType: Embed.GeoGebraApplet,
            appletId: url.pathname.slice(3),
          },
        }
      } else {
        return { type: 'cannotResolve' }
      }
    },
  },
  {
    name: 'Resolve image from CDN',
    resolvableEmbeddings: [Embed.HTMLImage],
    resolve: (url, signal) => {
      return new Promise((resolve) => {
        // Load the image to check whether the url belongs to an image
        const img = new Image()

        signal.onabort = () => {
          resolve({ type: 'aborted' })
        }

        img.onload = () => {
          resolve({
            type: 'resourceFound',
            resource: {
              hostingService: Hosting.CDN,
              embeddingType: Embed.HTMLImage,
              contentUrl: url.href,
            },
          })
        }

        img.onerror = () => {
          if (imageExtensions.some((ext) => url.pathname.endsWith('.' + ext))) {
            resolve({
              type: 'error',
              message: 'Bild konnte nicht geladen werden.',
            })
          } else {
            resolve({ type: 'cannotResolve' })
          }
        }

        img.src = url.href
      })
    },
  },
  {
    name: 'Resolve video from CDN',
    resolvableEmbeddings: [Embed.HTMLVideo],
    resolve: (url, signal) => {
      return new Promise((resolve) => {
        // Load the image to check whether the url belongs to an image
        const video = document.createElement('video')

        signal.onabort = () => {
          resolve({ type: 'aborted' })
        }

        video.oncanplay = () => {
          resolve({
            type: 'resourceFound',
            resource: {
              hostingService: Hosting.CDN,
              embeddingType: Embed.HTMLVideo,
              contentUrl: url.href,
            },
          })
        }

        video.onerror = () => {
          if (videoExtensions.some((ext) => url.pathname.endsWith('.' + ext))) {
            resolve({
              type: 'error',
              message: 'Video konnte nicht geladen werden.',
            })
          } else {
            resolve({ type: 'cannotResolve' })
          }
        }

        video.src = url.href
      })
    },
  },
]

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

// ### Resolver types

const embeddingResolver: ResourceResolver = {
  [Hosting.CDN]: (resource) => {
    return {
      resourceLocation: resource,
      type: resource.embeddingType,
      contentUrl: resource.contentUrl,
    }
  },
  [Hosting.GeoGebra]: (resource) => {
    return {
      resourceLocation: resource,
      type: Embed.GeoGebraApplet,
      appletId: resource.appletId,
    }
  },
}

type ResourceResolver = {
  [H in Hosting]: (resource: Resource<H>) => EmbeddingType<H>
}
