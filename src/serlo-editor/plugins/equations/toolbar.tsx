import { useEditorStrings, tw } from '@serlo/serlo-editor'

import type { EquationsProps } from '.'
import { TransformationTarget } from './editor/editor-renderer'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

export const EquationsToolbar = ({ id, state }: EquationsProps) => {
  const equationsStrings = useEditorStrings().plugins.equations

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Equations}
      pluginSettings={
        <select
          onChange={(e) => state.transformationTarget.set(e.target.value)}
          className={tw`
                mr-2 cursor-pointer rounded-md !border border-gray-500
              bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
              hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `}
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
