import EdusharingIcon from '@editor/editor-ui/assets/edusharing.svg'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { IframeResizer } from '@open-iframe-resizer/react'
import * as t from 'io-ts'
import DOMPurify from 'isomorphic-dompurify'
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

interface EmbedData {
  type: EmbedType
  html: string | null
  defineContainerHeight: boolean
}

const iframeResizerHtml =
  '<script type="module" src="https://cdn.jsdelivr.net/npm/@open-iframe-resizer/core@1.2.1/dist/index.min.js"></script>'

const cssReset = 'padding: 0; margin: 0; border: 0;'

export function EdusharingAssetRenderer(props: {
  nodeId?: string
  repositoryId?: string
  ltik: string
  contentWidth: string | undefined
}) {
  const { nodeId, repositoryId, ltik, contentWidth } = props

  const [embedData, setEmbedData] = useState<EmbedData>({
    type: 'unknown',
    html: null,
    defineContainerHeight: false,
  })

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
        // eslint-disable-next-line no-console
        console.error(
          `Request to /lit/get-embed-html failed. Status code ${response.status}.`
        )
        showToastNotice(
          'Der Edu-sharing server konnte nicht erreicht werden. Bitte versuche es später noch einmal.',
          'warning'
        )
        return
      }

      const responseJson: unknown = await response.json()

      if (!EmbedJson.is(responseJson)) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(responseJson))
        // eslint-disable-next-line no-console
        console.error(
          'Request to /lit/get-embed-html failed. Response json was malformed.'
        )
        showToastNotice(
          'Der Inhalt konnte nicht eingebunden werden. Bitte wende dich an den Support.',
          'warning'
        )
        return
      }

      // HTML snipped returned by edu-sharing cannot be used as it is.
      const {
        type,
        html: htmlSnippet,
        defineContainerHeight,
      } = getEmbedHtml(responseJson)

      const html = buildHtml(htmlSnippet ?? '', defineContainerHeight)

      const sanitizedHtml = DOMPurify.sanitize(html, {
        // We allow <script> and <iframe> elements. Those are part of the html snippet we get from edu-sharing and cannot be removed or the embed will break. <script> elements cannot be manipulated by the user and we can trust them.
        ADD_TAGS: ['script', 'iframe'],
        // Return entire html document including <html>, <body>, ...
        WHOLE_DOCUMENT: true,
      })

      setEmbedData({
        type,
        html: sanitizedHtml,
        defineContainerHeight,
      })
    }

    void fetchEmbedHtml()
  }, [nodeId, repositoryId, ltik])

  return (
    <figure className="relative z-[15] w-full">
      <div className="mx-side">
        {embedData.html ? (
          renderEmbed()
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center">
            <EdusharingIcon style={{ width: '5rem', height: '5rem' }} />
          </div>
        )}
      </div>
    </figure>
  )

  function buildHtml(html: string, defineContainerHeight: boolean) {
    // Hack: height: 97% -> Some learning apps size themselves to be a little bit too tall and a scroll bar appears -> 97% height to prevent this
    // Hack: overflow-y: hidden -> Sometimes after setting the correct iframe height the vertical scroll bar does not disappear.
    return `
      <html style="${cssReset}${defineContainerHeight ? 'height: 97%;' : 'overflow-y: hidden;'}">
        <head>
          ${defineContainerHeight ? '' : iframeResizerHtml}
        </head>
        <body style="${cssReset}${defineContainerHeight ? 'height: 100%;' : ''}">
          ${html}
        </body>
      </html> 
    `
  }

  function getEmbedHtml(content: t.TypeOf<typeof EmbedJson>): EmbedData {
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
          type: 'unknown',
          html: '<div>Fehler beim Einbinden des Inhalts</div>',
          defineContainerHeight: false,
        }
      }

      return {
        type: isLink ? 'link' : isBrockhaus ? 'brockhaus' : 'unknown',
        html: `<a class="serlo-link" target="_blank" rel="noopener noreferrer" href="${
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
        type: 'pixabay',
        html: imageSnippet + emptyStringOrJumpToSource,
        defineContainerHeight: false,
      }
    }

    const isImageSnippet = image && !content.node.remote
    if (isImageSnippet) {
      // Create completely new <img> element because patching the existing one is more work/error-prone
      const imageSnippet = buildImageSnippet(image)
      return {
        type: 'image',
        html: imageSnippet,
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
        type: 'file',
        html: detailsSnippet,
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
        type: 'audio',
        html: detailsSnippet,
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
        type: 'video',
        html: detailsSnippet,
        defineContainerHeight: false,
      }
    }

    const iframe = htmlDocument.querySelector('iframe')

    // H5P
    const isH5P = iframe && content.node.mediatype === 'file-h5p'
    if (isH5P) {
      return {
        type: 'h5p',
        html: detailsSnippet,
        defineContainerHeight: false,
      }
    }

    // Learning apps & PDFs
    const isPdf = iframe?.id === 'docFrame'
    const isLearningApp = iframe && detailsSnippet.includes('learningapps.org/')
    if (isLearningApp || isPdf) {
      return {
        type: isLearningApp ? 'learning-app' : isPdf ? 'pdf' : 'unknown',
        html: `<iframe style="${cssReset} height: 100%; width: 100%;" src="${iframe.src}" sandbox="allow-scripts"></iframe>`,
        defineContainerHeight: true,
      }
    }

    // Backup when content type could not be determined above
    return {
      type: 'unknown',
      html: detailsSnippet,
      defineContainerHeight: false,
    }
  }

  function renderEmbed() {
    if (embedData.html === null) return

    return (
      <div
        className="z-15 max-w-full"
        style={{
          width: contentWidth ? contentWidth : '100%',
          aspectRatio: embedData.defineContainerHeight ? '16/9' : undefined,
        }}
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
