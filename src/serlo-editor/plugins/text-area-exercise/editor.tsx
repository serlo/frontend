import type { TextAreaExerciseProps } from '.'
import { TextAreaExerciseRenderer } from './renderer'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

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
