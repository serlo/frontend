import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import type { AudioProps } from '.'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const AudioToolbar = ({
  id,
  audioUrl,
}: AudioProps & {
  audioUrl: string
}) => {
  const audioStrings = useEditorStrings().plugins.audio

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Audio}
      pluginSettings={
        <>
          <a
            href={audioUrl}
            className="my-2 mr-4 inline-flex items-center rounded-md border border-gray-500 px-2 py-1 text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
          >
            <FaIcon icon={faArrowDown} className="mr-2" />
            {audioStrings.download}
          </a>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
