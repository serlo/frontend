import { VideoProps } from '.'
import { parseVideoUrl, VideoRenderer } from './renderer'
import { EditorInput } from '../../editor-ui'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { PluginToolbar } from '@/serlo-editor/core/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/core/plugin-toolbar/dropdown/default-controls'
import { EmbedWrapper } from '@/serlo-editor/editor-ui/embed-wrapper'
import { OverlayInput } from '@/serlo-editor/plugin/plugin-toolbar'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const VideoEditor = ({
  id,
  editable,
  focused,
  state,
  autofocusRef,
  renderIntoSettings,
}: VideoProps) => {
  const videoStrings = useEditorStrings().plugins.video

  const [iframeSrc, type] = parseVideoUrl(state.src.value)
  const couldBeValid = type !== undefined

  return (
    <>
      {focused && (
        <PluginToolbar
          pluginId={id}
          pluginType={EditorPluginType.Video}
          contentControls={<></>}
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
      {editable && focused ? renderInput() : null}

      {renderIntoSettings(
        <OverlayInput
          label={videoStrings.description}
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
      <div className="mx-side mb-3 mt-4">
        <EditorInput
          label={`${videoStrings.videoUrl}: `}
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
      </div>
    )
  }
}
