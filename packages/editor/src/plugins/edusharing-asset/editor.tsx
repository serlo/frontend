import { EditorMetaContext } from '@editor/core/contexts/editor-meta-context'
import EdusharingIcon from '@editor/editor-ui/assets/edusharing.svg'
import { EditorModal } from '@editor/editor-ui/editor-modal'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { cn } from '@editor/utils/cn'
import * as t from 'io-ts'
import { useContext, useEffect, useRef, useState } from 'react'

import type { EdusharingAssetProps } from '.'
import { EdusharingAssetRenderer } from './renderer'
import { PluginToolbar } from '../../editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '../../editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'

export const EdusharingAssetDecoder = t.type({
  nodeId: t.string,
  repositoryId: t.string,
})

export function EdusharingAssetEditor({
  state,
  focused,
  id,
}: EdusharingAssetProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const pluginStrings = useEditStrings().plugins.edusharingAsset
  const { edusharingAsset, contentWidth } = state

  useEffect(() => {
    function handleIFrameEvent({ data, source }: MessageEvent) {
      if (source !== iframeRef.current?.contentWindow) return

      if (typeof data === 'object' && EdusharingAssetDecoder.is(data)) {
        const newEdusharingAsset = {
          nodeId: data.nodeId,
          repositoryId: data.repositoryId,
        }

        if (edusharingAsset.defined === false) {
          edusharingAsset.create(newEdusharingAsset)
        } else {
          edusharingAsset.nodeId.set(newEdusharingAsset.nodeId)
          edusharingAsset.repositoryId.set(newEdusharingAsset.repositoryId)
        }

        setModalIsOpen(false)
      }
    }

    window.addEventListener('message', handleIFrameEvent)

    return () => window.removeEventListener('message', handleIFrameEvent)
  }, [edusharingAsset])

  const { ltik } = useContext(EditorMetaContext)
  if (!ltik) return <p>Error: ltik missing</p>

  return (
    <>
      {renderPluginToolbar()}
      {renderModal(ltik)}

      <div className="relative">
        {edusharingAsset.defined ? (
          <EdusharingAssetRenderer
            nodeId={
              state.edusharingAsset.defined
                ? state.edusharingAsset.nodeId.value
                : undefined
            }
            repositoryId={
              state.edusharingAsset.defined
                ? state.edusharingAsset.repositoryId.value
                : undefined
            }
            ltik={ltik}
            contentWidth={contentWidth.defined ? contentWidth.value : undefined}
          />
        ) : (
          <EdusharingIcon style={{ width: '5rem', height: '5rem' }} />
        )}
        {renderOverlay()}
      </div>
    </>
  )

  // Transparent overlay. If the plugin is ...
  // ... unfocused -> Clicking it will focus the plugin
  // ... focused -> Clicking it does nothing and the events are handled in the iframe behind it
  // Explanation: Content is inside an iframe. Clicking within the iframe does sadly not change the editor focus automatically. Solutions I found are not easy and don't work reliably. So, we require an extra click from the user to be able to interact with the content in the editor.
  function renderOverlay() {
    const captureClick = !focused
    return (
      <div
        className={cn(
          'absolute left-0 top-0 z-[15] h-full w-full',
          captureClick ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      ></div>
    )
  }

  function renderPluginToolbar() {
    if (!focused) return null

    return (
      <PluginToolbar
        pluginType={pluginStrings.title}
        pluginControls={<PluginDefaultTools pluginId={id} />}
        pluginSettings={
          <>
            <button
              onClick={() => setModalIsOpen(true)}
              className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
              data-qa="plugin-edusharing-select-content-button"
            >
              Inhalt wählen
            </button>
            {edusharingAsset.defined && !contentWidth.defined ? (
              <button
                onClick={() => {
                  if (contentWidth.defined === false) {
                    contentWidth.create('30rem')
                  }
                }}
                className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
                data-qa="plugin-edusharing-change-size-button"
              >
                Größe verändern
              </button>
            ) : null}
            {edusharingAsset.defined && contentWidth.defined ? (
              <>
                <button
                  onClick={() =>
                    contentWidth.set((previousContentWidth) =>
                      addToContentWidth(previousContentWidth, 2)
                    )
                  }
                  className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
                  data-qa="plugin-edusharing-bigger-button"
                >
                  Größer
                </button>
                <button
                  onClick={() =>
                    contentWidth.set((previousContentWidth) =>
                      addToContentWidth(previousContentWidth, -2)
                    )
                  }
                  className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
                  data-qa="plugin-edusharing-smaller-button"
                >
                  Kleiner
                </button>
              </>
            ) : null}
          </>
        }
      />
    )

    function addToContentWidth(previousContentWidth: string, value: number) {
      const contentWidthNumber = parseFloat(
        previousContentWidth.replace('rem', '')
      )
      const newContentWidthNumber = Math.max(contentWidthNumber + value, 4)
      return `${newContentWidthNumber}rem`
    }
  }

  function renderModal(ltik: string) {
    const url = new URL(window.location.origin)

    url.pathname = '/edusharing-embed/start'
    url.searchParams.append('ltik', ltik)

    return (
      <EditorModal
        isOpen={modalIsOpen}
        setIsOpen={() => setModalIsOpen(false)}
        className="top-[50%] h-full w-full max-w-[95%]"
        title="Edusharing-Inhalt auswählen"
        extraTitleClassName="sr-only"
      >
        <iframe
          src={url.href}
          className="h-full w-full"
          ref={iframeRef}
          data-qa="plugin-edusharing-selection-iframe"
        />
      </EditorModal>
    )
  }
}
