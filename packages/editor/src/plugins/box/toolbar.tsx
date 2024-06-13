import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { PluginToolbar, ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { BoxProps } from '.'
import { types } from './renderer'

export const BoxToolbar = ({ id, state }: BoxProps) => {
  const boxStrings = useEditorStrings().plugins.box
  const { strings } = useInstanceData()

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Box}
      pluginSettings={
        <>
          <div className="serlo-tooltip-trigger">
            <EditorTooltip
              text={boxStrings.typeTooltip}
              className="-ml-4 !pb-1"
            />
            <ToolbarSelect
              tooltipText=""
              value={state.type.value}
              changeValue={(value) => state.type.set(value)}
              dataQa="plugin-box-type-chooser"
              options={types.map((type) => ({
                value: type,
                text: strings.content.boxTypes[type],
                dataQa: `plugin-box-type-chooser-option-${type}`,
              }))}
            />
          </div>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
    />
  )
}
