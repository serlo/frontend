import * as t from 'io-ts'
import { useContext, useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'

import type { EdusharingAssetProps } from '.'
import { LtikContext } from './ltik-context'
import { EdusharingAssetRenderer } from './renderer'
import { PluginToolbar } from '../../editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '../../editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

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
  const pluginStrings = useEditorStrings().plugins.edusharingAsset
  const { edusharingAsset, contentWidth } = state

  useEffect(() => {
    function handleIFrameEvent({ data, source }: MessageEvent) {
      if (source !== iframeRef.current?.contentWindow) return

      if (typeof data === 'object' && EdusharingAssetDecoder.is(data)) {
        const newEdusharingAsset = {
          nodeId: data.nodeId,
          repositoryId: data.repositoryId,
        }

        if (state.edusharingAsset.defined === false) {
          state.edusharingAsset.create(newEdusharingAsset)
        } else {
          state.edusharingAsset.nodeId.set(newEdusharingAsset.nodeId)
          state.edusharingAsset.repositoryId.set(
            newEdusharingAsset.repositoryId
          )
        }

        setModalIsOpen(false)
      }
    }

    window.addEventListener('message', handleIFrameEvent)

    return () => window.removeEventListener('message', handleIFrameEvent)
  }, [state.edusharingAsset])

  const ltik = useContext(LtikContext)
  if (!ltik) return <p>Error: ltik missing</p>

  return (
    <>
      {renderPluginToolbar()}
      {renderModal(ltik)}
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
    </>
  )

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
    if (!modalIsOpen) return

    // See https://reactcommunity.org/react-modal/accessibility/
    Modal.setAppElement(document.getElementsByTagName('body')[0])

    const url = new URL(window.location.origin)

    url.pathname = '/lti/start-edusharing-deeplink-flow'
    url.searchParams.append('ltik', ltik)

    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            width: '80%',
            height: '80vh',
            top: '50%',
            left: '50%',
            bottom: 'auto',
            right: 'auto',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            zIndex: 100,
          },
        }}
      >
        <iframe
          src={url.href}
          className="edusharing-h-full edusharing-w-full"
          ref={iframeRef}
        />
      </Modal>
    )
  }
}
