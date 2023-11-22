import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FaIcon, useEditorStrings } from '@serlo/serlo-editor'

import type { UnsupportedPluginProps } from '.'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { selectStaticDocument, store } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

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
