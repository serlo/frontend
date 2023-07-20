import { Editor } from 'slate'

import { EquationsProps } from '.'
import { TransformationTarget } from './editor/editor-renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { DefaultControls } from '@/serlo-editor/editor-ui/plugin-toolbar/dropdown/default-controls'
import { PluginToolbarTextControls } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/plugin-toolbar-text-controls'
import { ControlButton } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

interface EquationsToolbarProps {
  controls: ControlButton[]
  editor: Editor
}

export const EquationsToolbar = ({
  id,
  state,
  controls,
  editor,
}: EquationsProps & EquationsToolbarProps) => {
  const equationsStrings = useEditorStrings().plugins.equations

  return (
    <PluginToolbar
      pluginId={id}
      pluginType={EditorPluginType.Equations}
      contentControls={
        <PluginToolbarTextControls controls={controls} editor={editor} />
      }
      pluginSettings={
        <>
          <select
            id="transformationTarget"
            onChange={(e) => state.transformationTarget.set(e.target.value)}
            className={tw`
                mr-2 cursor-pointer rounded-md !border border-gray-500 bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
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
        </>
      }
      pluginControls={<DefaultControls pluginId={id} />}
    />
  )
}
