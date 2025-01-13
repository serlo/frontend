import EdusharingIcon from '@editor/editor-ui/assets/edusharing.svg'
import { LoadingSpinner } from '@editor/editor-ui/loading-spinner'
import { IframeResizer } from '@open-iframe-resizer/react'
import { memo } from 'react'

import { useEmbedFetch } from './helper/use-embed-fetch'
import { BoxRenderer } from '../box/renderer'

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
        <BoxRenderer boxType="blank" title="" anchorId={nodeId ?? ''}>
          {isLoading ? (
            <LoadingSpinner noText />
          ) : embedData.component ? (
            embedData.component
          ) : embedData.html ? (
            (renderEmbed() ?? <></>)
          ) : (
            <EdusharingIcon style={{ width: '5rem', height: '5rem' }} />
          )}
        </BoxRenderer>
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
        {/* `sandbox="allow-scripts"` -> Limit iframe access to parent context but allow scripts to execute */}
        {embedData.defineContainerHeight ? (
          <iframe
            srcDoc={embedData.html}
            style={{ width: '100%', height: '100%' }}
            sandbox="allow-scripts"
          />
        ) : (
          <MemoizedIframeResizer
            // Necessary when using srcDoc
            checkOrigin={false}
            srcDoc={embedData.html}
            style={{ width: '100%' }}
            sandbox="allow-scripts"
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
