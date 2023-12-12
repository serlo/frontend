import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/tailwind/helper/cn'

import type { EquationsProps } from '.'
import { TransformationTarget } from './editor/editor-renderer'

export const EquationsToolbar = ({ id, state }: EquationsProps) => {
  const equationsStrings = useEditorStrings().plugins.equations

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Equations}
      pluginSettings={
        <select
          onChange={(e) => state.transformationTarget.set(e.target.value)}
          className={cn(`
                mr-2 cursor-pointer rounded-md !border border-gray-500
              bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
              hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `)}
          value={state.transformationTarget.value}
        >
          <option value={TransformationTarget.Equation}>
            {equationsStrings.transformationOfEquations}
          </option>
          <option value={TransformationTarget.Term}>
            {equationsStrings.transformationOfTerms}
          </option>
        </select>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
