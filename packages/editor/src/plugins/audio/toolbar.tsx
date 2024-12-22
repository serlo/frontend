import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import type { AudioProps } from '.'
import { FaIcon } from '../../editor-ui/fa-icon'
import { PluginToolbar } from '../../editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '../../editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '../../i18n/edit-strings-provider'
import { EditorPluginType } from '../../types/editor-plugin-type'

export const AudioToolbar = ({
  id,
  audioUrl,
}: AudioProps & {
  audioUrl: string
}) => {
  const audioStrings = useEditStrings().plugins.audio

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
