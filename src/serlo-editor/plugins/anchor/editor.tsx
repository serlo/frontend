import { faLink } from '@fortawesome/free-solid-svg-icons'

import { AnchorProps } from '.'
import { AnchorRenderer } from './renderer'
import { EditorInput } from '../../editor-ui'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/editor-ui/plugin-toolbar/dropdown/default-controls'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const AnchorEditor = (props: AnchorProps) => {
  const { editable, focused, state, id } = props

  const editorStrings = useEditorStrings()

  return (
    <>
      {renderPluginToolbar()}
      {editable ? <FaIcon icon={faLink} className="mr-[5px]" /> : null}
      <AnchorRenderer {...props} />
      {focused ? (
        <EditorInput
          label={editorStrings.plugins.anchor.identifier}
          placeholder={editorStrings.plugins.anchor.anchorId}
          value={state.value}
          onChange={(e) => {
            state.set(e.target.value)
          }}
          ref={props.autofocusRef}
        />
      ) : null}
    </>
  )

  function renderPluginToolbar() {
    if (!focused) return null

    return (
      <PluginToolbar
        pluginId={id}
        pluginType={EditorPluginType.Anchor}
        pluginControls={<DefaultControls pluginId={id} />}
      />
    )
  }
}
