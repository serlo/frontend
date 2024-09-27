import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { cn } from '@editor/utils/cn'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import type { AnchorProps } from '.'

export const AnchorEditor = (props: AnchorProps) => {
  const { focused, state, id } = props

  const editorStrings = useEditorStrings()

  return (
    <>
      {focused ? (
        <PluginToolbar
          pluginType={EditorPluginType.Anchor}
          pluginControls={<PluginDefaultTools pluginId={id} />}
          pluginSettings={
            <label className="serlo-tooltip-trigger">
              <EditorTooltip text={editorStrings.plugins.anchor.anchorId} />
              <input
                autoFocus
                placeholder={editorStrings.plugins.anchor.identifier}
                value={state.value}
                onChange={(e) => {
                  state.set(e.target.value)
                }}
                className={cn(`
                  mr-2 cursor-pointer rounded-md !border border-gray-500
                bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
                hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
                `)}
              />
            </label>
          }
        />
      ) : null}
      <FaIcon icon={faLink} className="mr-[5px]" />
      <a className="invisible" id={props.state.value} />
    </>
  )
}
