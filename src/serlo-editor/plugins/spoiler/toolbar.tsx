import type { SpoilerProps } from '.'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { ParentButton } from '@/serlo-editor/editor-ui/plugin-toolbar/parent-button'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const SpoilerToolbar = ({ domFocus, id }: SpoilerProps) => {
  const spoilerStrings = useEditorStrings().plugins.spoiler

  return (
    <>
      {domFocus ? (
        <PluginToolbar
          pluginType={EditorPluginType.Spoiler}
          pluginControls={<PluginDefaultTools pluginId={id} />}
        />
      ) : null}
      <ParentButton domFocus={domFocus} title={spoilerStrings.title} />
    </>
  )
}
