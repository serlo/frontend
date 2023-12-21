import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { TextAreaExerciseProps } from '.'
import { TextAreaExerciseRenderer } from './renderer'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'

export function TextAreaExerciseEditor(props: TextAreaExerciseProps) {
  const { focused } = props
  return (
    <>
      {focused && <TextAreaExerciseToolbar {...props} />}
      <TextAreaExerciseRenderer />
    </>
  )
}

function TextAreaExerciseToolbar(props: TextAreaExerciseProps) {
  return (
    <PluginToolbar
      pluginType={EditorPluginType.TextAreaExercise}
      pluginControls={<InteractiveToolbarTools id={props.id} />}
    />
  )
}
