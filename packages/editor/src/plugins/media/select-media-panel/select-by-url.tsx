import { useCallback, useRef, useState } from 'react'

import { resolveEmbedding } from '../services/resolve-embedding'
import { Embed, Resource } from '../services/types'
import { urlResolvers } from '../services/url-resolvers'
import { cn } from '@/helper/cn'

interface SelectMediaByUrlProps {
  onSelect: (resource: Resource) => void
  allowEmbedding?: Embed[]
}

export function SelectMediaByUrl({
  onSelect,
  allowEmbedding,
}: SelectMediaByUrlProps) {
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
            const embedding = await resolveEmbedding(result.resource)

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
