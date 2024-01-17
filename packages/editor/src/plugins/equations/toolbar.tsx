import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar/components/toolbar-select'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { EquationsProps } from '.'
import { TransformationTarget } from './editor/editor-renderer'

export const EquationsToolbar = ({ id, state }: EquationsProps) => {
  const equationsStrings = useEditorStrings().plugins.equations

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Equations}
      pluginSettings={
        <ToolbarSelect
          tooltipText=""
          value={state.transformationTarget.value}
          changeValue={(value) => state.transformationTarget.set(value)}
          options={[
            {
              value: TransformationTarget.Equation,
              text: equationsStrings.transformationOfEquations,
            },
            {
              value: TransformationTarget.Term,
              text: equationsStrings.transformationOfTerms,
            },
          ]}
        />
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
