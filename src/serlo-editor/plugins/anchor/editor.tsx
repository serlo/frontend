import { faLink } from '@fortawesome/free-solid-svg-icons'

import { AnchorProps } from '.'
import { AnchorRenderer } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const AnchorEditor = (props: AnchorProps) => {
  const { editable, focused, state, id } = props

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
                placeholder={editorStrings.plugins.anchor.identifier}
                value={state.value}
                onChange={(e) => {
                  state.set(e.target.value)
                }}
                ref={props.autofocusRef}
                className={tw`
                mr-2 cursor-pointer rounded-md !border border-gray-500
              bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
              hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `}
              />
            </label>
          }
        />
      ) : null}
      {editable ? <FaIcon icon={faLink} className="mr-[5px]" /> : null}
      <AnchorRenderer {...props} />
    </>
  )
}
