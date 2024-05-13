import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

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
