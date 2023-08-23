import type { SpoilerProps } from '.'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { DomFocus } from '@/serlo-editor/core/sub-document/editor'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { ParentButton } from '@/serlo-editor/editor-ui/plugin-toolbar/parent-button'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const SpoilerToolbar = ({ domFocusState, id }: SpoilerProps) => {
  const spoilerStrings = useEditorStrings().plugins.spoiler

  const shouldShowToolbar = domFocusState === DomFocus.focus

  return (
    <>
      {shouldShowToolbar ? (
        <PluginToolbar
          pluginType={EditorPluginType.Spoiler}
          pluginControls={<PluginDefaultTools pluginId={id} />}
        />
      ) : null}
      <ParentButton show={!shouldShowToolbar} title={spoilerStrings.title} />
    </>
  )
}
