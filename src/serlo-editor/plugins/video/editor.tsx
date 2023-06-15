import { VideoProps } from '.'
import { OverlayInput } from '../../core'
import { EditorInput, EditorInlineSettings } from '../../editor-ui'
import { parseVideoUrl, VideoRenderer } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { EmbedWrapper } from '@/serlo-editor/editor-ui/embed-wrapper'

export const VideoEditor = ({
  editable,
  focused,
  state,
  autofocusRef,
  renderIntoSettings,
}: VideoProps) => {
  const editorStrings = useLoggedInData()!.strings.editor

  const [iframeSrc, type] = parseVideoUrl(state.src.value)
  const couldBeValid = type !== undefined

  return (
    <>
      {editable && focused ? renderInput() : null}
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
        <div className="rounded-lg bg-editor-primary-50 py-32 text-center">
          <FaIcon
            icon={entityIconMapping['video']}
            className="text-7xl text-editor-primary-200"
          />
        </div>
      )}
      {renderIntoSettings(
        <OverlayInput
          label={editorStrings.video.description}
          value={state.alt.value}
          onChange={(e) => {
            state.alt.set(e.target.value)
          }}
        />
      )}
    </>
  )

  function renderInput() {
    return (
      <EditorInlineSettings className="mb-3">
        <EditorInput
          label={`${editorStrings.video.videoUrl}: `}
          value={state.src.value}
          onChange={(e) => {
            state.src.set(e.target.value)
          }}
          inputWidth="60%"
          width="100%"
          placeholder="(YouTube, Wikimedia Commons, Vimeo)"
          ref={autofocusRef}
          className="ml-1"
        />
      </EditorInlineSettings>
    )
  }
}
