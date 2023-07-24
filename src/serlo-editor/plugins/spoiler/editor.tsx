import { SpoilerProps } from '.'
import { SpoilerRenderer } from './renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function SpoilerEditor(props: SpoilerProps) {
  const { state, editable, autofocusRef, id, focused } = props
  const editorStrings = useEditorStrings()

  const title = editable ? (
    <input
      onChange={(e) => state.title.set(e.target.value)}
      value={state.title.value}
      placeholder={editorStrings.plugins.spoiler.enterATitle}
      ref={autofocusRef}
      className="-my-1 w-full rounded-md bg-transparent p-1 focus:bg-brand-100 focus:outline-none"
    />
  ) : (
    state.title.value
  )

  return (
    <>
      {renderPluginToolbar()}
      <SpoilerRenderer
        title={<>{title}</>}
        content={state.content.render()}
        openOverwrite={editable} // should include focused but that's unreliable atm.
      />
    </>
  )

  function renderPluginToolbar() {
    if (!focused) return null

    return (
      <PluginToolbar
        pluginId={id}
        pluginType={EditorPluginType.Spoiler}
        pluginControls={<PluginDefaultTools pluginId={id} />}
      />
    )
  }
}
