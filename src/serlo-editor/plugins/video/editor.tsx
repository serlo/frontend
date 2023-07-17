import { useState } from 'react'

import { VideoProps } from '.'
import { parseVideoUrl, VideoRenderer } from './renderer'
import { EditorInput } from '../../editor-ui'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { PluginToolbar } from '@/serlo-editor/core/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/core/plugin-toolbar/dropdown/default-controls'
import { EmbedWrapper } from '@/serlo-editor/editor-ui/embed-wrapper'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const VideoEditor = ({
  id,
  focused,
  state,
  autofocusRef,
}: VideoProps) => {
  const editorStrings = useEditorStrings()
  const videoStrings = editorStrings.plugins.video
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [iframeSrc, type] = parseVideoUrl(state.src.value)
  const couldBeValid = type !== undefined

  return (
    <>
      {focused && (
        <PluginToolbar
          pluginId={id}
          pluginType={EditorPluginType.Video}
          pluginSettings={
            <>
              <button
                onClick={() => setShowSettingsModal(true)}
                className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
              >
                {videoStrings.videoUrl}
              </button>
              <button
                onClick={() => setShowSettingsModal(true)}
                className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
              >
                {videoStrings.videoDescription}
              </button>
              {/* In the future we want a popovers per setting, but this is faster for now */}
              {showSettingsModal ? (
                <ModalWithCloseButton
                  isOpen={showSettingsModal}
                  onCloseClick={() => setShowSettingsModal(false)}
                  className="!top-1/3 !max-w-xl"
                >
                  <h3 className="serlo-h3 mt-4">
                    {editorStrings.edtrIo.settings}: {videoStrings.title}
                  </h3>

                  <div className="mx-side mb-3">
                    <EditorInput
                      label={`${videoStrings.videoDescription}: `}
                      value={state.alt.value}
                      onChange={(e) => state.alt.set(e.target.value)}
                      width="100%"
                      inputWidth="100%"
                      // placeholder=""
                      ref={autofocusRef}
                      className="block"
                    />
                  </div>
                  <div className="mx-side mb-3">
                    <EditorInput
                      label={`${videoStrings.videoUrl}: `}
                      value={state.src.value}
                      onChange={(e) => {
                        state.src.set(e.target.value)
                      }}
                      inputWidth="100%"
                      width="100%"
                      placeholder="(YouTube, Wikimedia Commons, Vimeo)"
                      ref={autofocusRef}
                      className="block"
                    />
                  </div>
                </ModalWithCloseButton>
              ) : null}
            </>
          }
          pluginControls={<DefaultControls pluginId={id} />}
        />
      )}
      {couldBeValid ? (
        <EmbedWrapper
          type="video"
          provider={type}
          embedUrl={iframeSrc}
          className={focused ? '' : 'pointer-events-none'}
        >
          <VideoRenderer src={iframeSrc} type={type} />
        </EmbedWrapper>
      ) : (
        <div className="mx-side rounded-lg bg-editor-primary-50 py-32 text-center">
          <FaIcon
            icon={entityIconMapping['video']}
            className="text-7xl text-editor-primary-200"
          />
        </div>
      )}
    </>
  )
}
