import { faWarning } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import {
  EditorPlugin,
  EditorPluginProps,
  object,
  scalar,
  string,
} from '@/serlo-editor/plugin'
import { selectSerializedDocument, store } from '@/serlo-editor/store'

const unsupportedState = object({
  plugin: string(),
  state: scalar<unknown>({}),
})

export const unsupportedPlugin: EditorPlugin<typeof unsupportedState> = {
  Component: UnsupportedRenderer,
  state: unsupportedState,
  config: {},
}

export type UnsupportedPluginState = typeof unsupportedState

function UnsupportedRenderer(props: EditorPluginProps<UnsupportedPluginState>) {
  const unsupportedStrings = useEditorStrings().plugins.unsupported

  const unsupportedType = selectSerializedDocument(
    store.getState(),
    props.id
  )?.plugin

  return (
    <div className="my-8 rounded-2xl bg-gray-100 p-4">
      <b>
        <FaIcon icon={faWarning} /> {unsupportedStrings.notSupported} [
        {unsupportedType}]
      </b>
      <p className="mt-3 mb-1">{unsupportedStrings.explanation}</p>
    </div>
  )
}
