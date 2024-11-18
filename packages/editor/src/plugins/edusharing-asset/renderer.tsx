import EdusharingIcon from '@editor/editor-ui/assets/edusharing.svg'
import IframeResizer from 'iframe-resizer-react'
import * as t from 'io-ts'
import { memo, useEffect, useState } from 'react'

type EmbedType =
  | 'unknown'
  | 'audio'
  | 'brockhaus'
  | 'file'
  | 'h5p'
  | 'image'
  | 'learning-app'
  | 'link'
  | 'pdf'
  | 'pixabay'
  | 'video'

const EmbedJson = t.type({
  detailsSnippet: t.string,
  node: t.type({
    mediatype: t.string,
    remote: t.union([
      t.null,
      t.type({
        repository: t.type({
          repositoryType: t.string,
        }),
      }),
    ]),
  }),
})

const iframeResizerHtml =
  '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.9/iframeResizer.contentWindow.min.js"></script>'

const cssReset = 'padding: 0; margin: 0; border: 0;'

export function EdusharingAssetRenderer(props: {
  nodeId?: string
  repositoryId?: string
  ltik: string
  contentWidth: string | undefined
  id?: string
}) {
  const { nodeId, repositoryId, ltik, contentWidth, id } = props

  const [embedHtml, setEmbedHtml] = useState<string | null>(null)
  const [defineContainerHeight, setDefineContainerHeight] =
    useState<boolean>(false)
  const [embedType, setEmbedType] = useState<EmbedType>('unknown')

  useEffect(() => {
    async function fetchEmbedHtml() {
      if (nodeId === undefined || repositoryId === undefined) return

      const embedHtmlUrl = new URL(window.location.origin)
      embedHtmlUrl.pathname = '/edusharing-embed/get'
      embedHtmlUrl.searchParams.append('nodeId', nodeId)
      embedHtmlUrl.searchParams.append('repositoryId', repositoryId)

      const response = await fetch(embedHtmlUrl.href, {
        headers: { Authorization: `Bearer ${ltik}` },
      })

      if (!response.ok) {
        setEmbedHtml(
          `Request to /lit/get-embed-html failed. Status code ${response.status}.`
        )
        return
      }

      const responseJson: unknown = await response.json()

      if (!EmbedJson.is(responseJson)) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(responseJson))
        setEmbedHtml(
          'Request to /lit/get-embed-html failed. Response json was malformed. Json was logged to console.'
        )
        return
      }

      // HTML snipped returned by edu-sharing cannot be used as it is.
      const { embedType, htmlSnippet, defineContainerHeight } =
        getEmbedHtml(responseJson)

      const html = buildHtml(htmlSnippet, defineContainerHeight)

      setEmbedType(embedType)
      setEmbedHtml(html)
      setDefineContainerHeight(defineContainerHeight)
    }

    void fetchEmbedHtml()
  }, [nodeId, repositoryId, ltik])

  return (
    <figure className="w-full">
      <div className="mx-side">
        {embedHtml ? (
          renderEmbed()
        ) : (
          <div className="flex justify-center">
            <EdusharingIcon />
          </div>
        )}
      </div>
    </figure>
  )

  function buildHtml(htmlSnippet: string, defineContainerHeight: boolean) {
    // Hack: Some learning apps size themselves to be a little bit too tall and a scroll bar appears -> 97% height to prevent this
    return `
      <html style="${cssReset}${defineContainerHeight ? 'height: 97%;' : ''}">
        <body style="${cssReset}${defineContainerHeight ? 'height: 100%;' : ''}">
          ${htmlSnippet}
          ${defineContainerHeight ? '' : iframeResizerHtml}
        </body>
      </html> 
    `
  }

  function getEmbedHtml(content: t.TypeOf<typeof EmbedJson>): {
    embedType: EmbedType
    htmlSnippet: string
    defineContainerHeight: boolean
  } {
    let { detailsSnippet } = content

    // Remove all min-width
    detailsSnippet = detailsSnippet.replaceAll(/min-width[^;]*;/g, '')

    // Hide all footers
    detailsSnippet = detailsSnippet.replaceAll(
      /edusharing_rendering_content_footer \{/g,
      'edusharing_rendering_content_footer { display: none;'
    )

    const parser = new DOMParser()
    const htmlDocument = parser.parseFromString(detailsSnippet, 'text/html')

    const isBrockhaus =
      content.node.remote?.repository.repositoryType === 'BROCKHAUS'
    // Both 'link' and 'learning-app' have mediatype:'link' so we need to check if 'remote' is falsy as well
    const isLink = content.node.mediatype === 'link' && !content.node.remote
    if (isLink || isBrockhaus) {
      const linkElement = htmlDocument.querySelector<HTMLLinkElement>(
        '.edusharing_rendering_content_footer a'
      )
      if (!linkElement) {
        return {
          embedType: 'unknown',
          htmlSnippet: '<div>Fehler beim Einbinden des Inhalts</div>',
          defineContainerHeight: false,
        }
      }

      return {
        embedType: isLink ? 'link' : isBrockhaus ? 'brockhaus' : 'unknown',
        htmlSnippet: `<a class="serlo-link" target="_blank" rel="noopener noreferrer" href="${
          linkElement.href
        }">${
          linkElement.innerText ? linkElement.innerText : linkElement.href
        }</a>`,
        defineContainerHeight: false,
      }
    }

    const image = getImageOrUndefined(htmlDocument)

    const isPixabayImage =
      image &&
      content.node.mediatype === 'file-image' &&
      content.node.remote?.repository.repositoryType === 'PIXABAY'
    if (isPixabayImage) {
      const imageSnippet = buildImageSnippet(image)

      // fetch the src link of the image (usually says "Zur Originalseite
      // springen"). Note that not all pixabay images contain a source link.
      const sourceLink = htmlDocument.querySelector<HTMLAnchorElement>(
        '#edusharing_rendering_content_href'
      )

      // Positions the button to the left, makes it smaller and removes bg
      // color + padding.
      const shrinkPixabaySourceButton = `
      <style>
        #edusharing_rendering_content_href {
            margin-left: 0px !important;
            text-align: left !important;
            margin-top: 5px !important;
            display: block !important;
            width: fit-content !important;
            background-color: transparent !important;
            padding: 0px !important;
            color: #007bff !important;
            font-size: 0.7rem !important;
        }
        </style>
        `

      const emptyStringOrJumpToSource = sourceLink
        ? sourceLink.outerHTML + shrinkPixabaySourceButton
        : ''

      return {
        embedType: 'pixabay',
        htmlSnippet: imageSnippet + emptyStringOrJumpToSource,
        defineContainerHeight: false,
      }
    }

    const isImageSnippet = image && !content.node.remote
    if (isImageSnippet) {
      // Create completely new <img> element because patching the existing one is more work/error-prone
      const imageSnippet = buildImageSnippet(image)
      return {
        embedType: 'image',
        htmlSnippet: imageSnippet,
        defineContainerHeight: false,
      }
    }

    // File. For example .docx, .pptx
    const isFilePreview =
      image && image.classList.contains('edusharing_rendering_content_preview')
    if (isFilePreview) {
      // Make preview image visible
      detailsSnippet = detailsSnippet
        .replace('width="0"', '')
        .replace('height="0"', '')
      return {
        embedType: 'file',
        htmlSnippet: detailsSnippet,
        defineContainerHeight: false,
      }
    }

    // Audio
    const isEmbedThatNeedsToFetchContent =
      detailsSnippet.includes('get_resource')
    if (isEmbedThatNeedsToFetchContent) {
      // Converts a function within a <script> tag in the html snippet sent by edu-sharing. Fixes "token issue" when executing script.
      detailsSnippet = detailsSnippet.replace(
        'get_resource = function(authstring)',
        'function get_resource(authstring)'
      )

      return {
        embedType: 'audio',
        htmlSnippet: detailsSnippet,
        defineContainerHeight: false,
      }
    }

    // Video
    const isVideo: boolean = htmlDocument.querySelector('video') !== null
    if (isVideo) {
      // Add style overwrites
      detailsSnippet =
        detailsSnippet +
        `
        <style>
        .edusharing_rendering_content_video_wrapper {
          display: block !important;
        }
        .edusharing_rendering_content_video_wrapper video {
          width: 100% !important;
        }
        </style>
        `
      return {
        embedType: 'video',
        htmlSnippet: detailsSnippet,
        defineContainerHeight: false,
      }
    }

    const iframe = htmlDocument.querySelector('iframe')

    // H5P
    const isH5P = iframe && content.node.mediatype === 'file-h5p'
    if (isH5P) {
      return {
        embedType: 'h5p',
        htmlSnippet: detailsSnippet,
        defineContainerHeight: false,
      }
    }

    // Learning apps & PDFs
    const isPdf = iframe?.id === 'docFrame'
    const isLearningApp = iframe && detailsSnippet.includes('learningapps.org/')
    if (isLearningApp || isPdf) {
      return {
        embedType: isLearningApp ? 'learning-app' : isPdf ? 'pdf' : 'unknown',
        htmlSnippet: `<iframe style="${cssReset} height: 100%; width: 100%;" src="${iframe.src}"></iframe>`,
        defineContainerHeight: true,
      }
    }

    // Backup when content type could not be determined above
    return {
      embedType: 'unknown',
      htmlSnippet: detailsSnippet,
      defineContainerHeight: false,
    }
  }

  function renderEmbed() {
    if (embedHtml === null) return

    // IframeResizer properties:
    // - `heightCalculationMethod="lowestElement"` -> Documentation says its the most accurate (however worse performance than others)
    // - `srcDoc` -> Sets the iframe content
    // - `checkOrigin={false}` -> Necessary when using srcDoc
    // - `style={{ width: '1px', minWidth: '100%' }}` -> Makes Iframe have width 100% and take as much height as it needs. Recommended by documentation.
    // - Missing `sandbox` -> Should put no restrictions on what the iframe can do: A) Make iframe send the same cookies as the host. B) Allow it to execute scripts. Both important to be able to fetch video.
    return (
      <div
        className="max-w-full"
        style={{
          width: contentWidth ? contentWidth : '100%',
          aspectRatio: defineContainerHeight ? '16/9' : undefined,
        }}
        data-embed-type={embedType}
      >
        {defineContainerHeight ? (
          <iframe
            id={id}
            srcDoc={embedHtml}
            style={{
              width: '100%',
              height: '100%',
            }}
            onLoad={registerIframeClickHandler}
          />
        ) : (
          <MemoizedIframeResizer
            id={id}
            heightCalculationMethod="lowestElement"
            checkOrigin={false}
            srcDoc={embedHtml}
            style={{
              width: '1px',
              minWidth: '100%',
            }}
            onLoad={registerIframeClickHandler}
          />
        )}
      </div>
    )
  }

  // https://stackoverflow.com/a/6452599
  function registerIframeClickHandler() {
    const element = document.getElementById(id) as HTMLIFrameElement
    if (!element) return
    if (!element.contentWindow) return
    element.contentWindow.document.body.onclick = () => {
      console.log(`Clicked iframe id=${id}`)
    }
  }
}

function getImageOrUndefined(
  htmlDocument: Document
): HTMLImageElement | undefined {
  const image =
    htmlDocument.querySelector<HTMLImageElement>(
      '.edusharing_rendering_content_wrapper > img'
    ) ??
    htmlDocument.querySelector<HTMLImageElement>(
      '.edusharing_rendering_content'
    )

  if (image === null) return undefined

  if (image && image.nodeName !== 'IMG') {
    return undefined
  }

  return image
}

function buildImageSnippet(image: HTMLImageElement): string {
  return `<img style="width: 100%; object-fit: contain;" src="${image.getAttribute('src')}" alt="${image.getAttribute('alt')}" title="${image.getAttribute('title')}">`
}

// Only re-render if `srcDoc` prop changed. We do not want to re-render the Iframe every time when EdusharingAssetRenderer is re-rendered because the state within the iframe is lost.
const MemoizedIframeResizer = memo(
  IframeResizer,
  (prevProps, nextProps) => prevProps.srcDoc === nextProps.srcDoc
)
