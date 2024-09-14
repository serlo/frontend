import { EditorPluginProps, object, scalar } from '@editor/plugin'
import {
  IconDefinition,
  faArrowUpFromBracket,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useRef, useState } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

const state = object({
  resourceLocation: scalar<Resource | null>(null),
})
type MediaState = typeof state
type MediaProps = EditorPluginProps<MediaState>

enum Hosting {
  CDN = 'cdn',
}

enum Embedding {
  Image = 'image',
}

export const mediaPlugin = {
  state,
  config: {},
  Component: MediaPlugin,
}

function MediaPlugin(props: MediaProps) {
  const { state } = props
  const resource = state.resourceLocation.value

  if (!resource) {
    return (
      <SelectMediaPanel
        onSelect={(resource) => state.resourceLocation.set(resource)}
      />
    )
  }

  const embedding = embeddingResolver[resource.hostingService](resource)

  if (embedding.type === Embedding.Image) {
    return <img src={embedding.contentUrl} />
  }
}

interface SelectMediaPanelProps {
  onSelect: (resource: Resource) => void
}

function SelectMediaPanel({ onSelect }: SelectMediaPanelProps) {
  return (
    <div className="almost-black flex flex-col items-center space-y-4 rounded-md bg-yellow-50 p-8 shadow-md">
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
      <SelectMediaByUrl onSelect={onSelect} />
    </div>
  )
}

// ### Select media by URL

type URLResolver = (
  url: URL,
  signal: AbortSignal
) => SyncOrAsync<URLResolverResult>
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

const urlResolvers: URLResolver[] = [
  // Try to resolve the URL as an image
  (url, signal) => {
    return new Promise((resolve) => {
      // Load the image to check whether the url belongs to an image
      const img = new Image()
      img.src = url.href

      signal.onabort = () => {
        resolve({ type: 'aborted' })
      }

      img.onload = () => {
        resolve({
          type: 'resourceFound',
          resource: {
            hostingService: Hosting.CDN,
            embeddingType: Embedding.Image,
            contentUrl: url.href,
          },
        })
      }

      img.onerror = () => {
        if (imageExtensions.some((ext) => url.pathname.endsWith(ext))) {
          resolve({
            type: 'error',
            message: 'Bild konnte nicht geladen werden.',
          })
        } else {
          resolve({ type: 'cannotResolve' })
        }
      }
    })
  },
]

function SelectMediaByUrl({ onSelect }: SelectMediaPanelProps) {
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

          const result = await resolver(url, controller.signal)

          if (result.type === 'resourceFound') {
            onSelect(result.resource)

            return
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
    [onSelect, updateErrorWhenNotSet]
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
      {error && (
        <span className="mt-1 inline-block pl-1 text-sm font-semibold text-red-500">
          {error}
        </span>
      )}
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
}

type ResourceResolver = {
  [H in Hosting]: (resource: Resource<H>) => EmbeddingType<H>
}

interface ResourceTypeAdditonalInformation {
  [Hosting.CDN]: { embeddingType: Embedding; contentUrl: string }
}

type Resource<H extends Hosting = Hosting> = {
  [T in H]: ResourceTypeAdditonalInformation[T] & { hostingService: H }
}[H]

// ### Embedding types

interface EmbeddingTypesAdditonalInformation {
  [Embedding.Image]: { contentUrl: string }
}

type EmbeddingType<
  Hosts extends Hosting = Hosting,
  Types extends Embedding = Embedding,
> = {
  [T in Types]: EmbeddingTypesAdditonalInformation[T] & {
    type: T
    resourceLocation: Resource<Hosts>
  }
}[Types]
