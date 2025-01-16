import { LoadingSpinner } from '@editor/editor-ui/loading-spinner'
import { IframeResizer } from '@open-iframe-resizer/react'
import { memo } from 'react'

import { useEmbedFetch } from './helper/use-embed-fetch'

export function EdusharingAssetRenderer(props: {
  nodeId?: string
  repositoryId?: string
  ltik: string
  contentWidth: string | undefined
}) {
  const { nodeId, repositoryId, ltik, contentWidth } = props

  const { embedData } = useEmbedFetch({
    nodeId,
    repositoryId,
    ltik,
  })

  // just hide broken embeds for now
  if (embedData.type === 'error') return null

  const isLoading = embedData.type === 'unknown'

  return (
    <figure className="relative z-[15] w-full">
      <div className="mx-side">
        {isLoading ? (
          <LoadingSpinner noText />
        ) : (
          (embedData.component ?? renderEmbed())
        )}
      </div>
    </figure>
  )

  function renderEmbed() {
    if (!embedData.html) return

    const width = contentWidth ? contentWidth : '100%'
    const aspectRatio = embedData.defineContainerHeight ? '16/9' : undefined

    return (
      <div
        className="z-15 max-w-full"
        style={{ width, aspectRatio }}
        data-embed-type={embedData.type}
      >
        {/* `srcDoc` -> Sets the iframe content */}
        {/* No attribute 'sandbox' because it broke H5P embeds. */}
        {embedData.defineContainerHeight ? (
          <iframe
            srcDoc={embedData.html}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <MemoizedIframeResizer
            // Necessary when using srcDoc
            checkOrigin={false}
            srcDoc={embedData.html}
            style={{ width: '100%' }}
          />
        )}
      </div>
    )
  }
}

// Only re-render if `srcDoc` prop changed. We do not want to re-render the Iframe every time when EdusharingAssetRenderer is re-rendered because the state within the iframe is lost.
const MemoizedIframeResizer = memo(
  IframeResizer,
  (prevProps, nextProps) => prevProps.srcDoc === nextProps.srcDoc
)
