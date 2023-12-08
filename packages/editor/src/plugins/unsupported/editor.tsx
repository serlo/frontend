import { faWarning } from '@fortawesome/free-solid-svg-icons'

import type { UnsupportedPluginProps } from '.'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { selectStaticDocument, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

export const UnsupportedEditor: React.FunctionComponent<
  UnsupportedPluginProps
> = (props) => {
  const unsupportedStrings = useEditorStrings().plugins.unsupported

  const unsupportedType = selectStaticDocument(store.getState(), props.id)
    ?.plugin
  const { focused, id } = props

  return (
    <>
      {focused ? (
        <PluginToolbar
          pluginType={EditorPluginType.Unsupported}
          pluginControls={<PluginDefaultTools pluginId={id} />}
        />
      ) : null}
      <div className="my-8 rounded-2xl bg-gray-100 p-4">
        <b>
          <FaIcon icon={faWarning} /> {unsupportedStrings.notSupported} [
          {unsupportedType}]
        </b>
        <p className="mb-1 mt-3">{unsupportedStrings.explanation}</p>
      </div>
    </>
  )
}
