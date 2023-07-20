import { Editor } from 'slate'

import { BoxProps } from '.'
import { BoxType, types } from './renderer'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/editor-ui/plugin-toolbar/dropdown/default-controls'
import { PluginToolbarTextControls } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/plugin-toolbar-text-controls'
import { ControlButton } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface BoxToolbarProps {
  controls: ControlButton[]
  editor: Editor
}

export const BoxToolbar = ({
  id,
  state,
  controls,
  editor,
}: BoxProps & BoxToolbarProps) => {
  const boxStrings = useEditorStrings().plugins.box
  const { strings } = useInstanceData()

  return (
    <PluginToolbar
      pluginId={id}
      pluginType={EditorPluginType.Box}
      contentControls={
        <PluginToolbarTextControls controls={controls} editor={editor} />
      }
      pluginSettings={
        <>
          <div className="serlo-tooltip-trigger">
            <EditorTooltip
              text={boxStrings.typeTooltip}
              className="-ml-4 !pb-1"
            />
            <select
              onChange={(e) => state.type.set(e.target.value)}
              className={tw`
                mr-2 cursor-pointer rounded-md !border border-gray-500 bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
                hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `}
              value={state.type.value}
            >
              {types.map((type) => {
                return (
                  <option
                    key={type}
                    value={type}
                    // className="capitalize"
                  >
                    {strings.content.boxTypes[type as BoxType]}
                  </option>
                )
              })}
            </select>
          </div>
        </>
      }
      pluginControls={<DefaultControls pluginId={id} />}
    />
  )
}
