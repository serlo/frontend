import { cn } from '@editor/utils/cn'

import type { TextAreaExerciseProps } from '.'
import { TextAreaExerciseRenderer } from './renderer'
import { TextAreaExerciseToolbar } from './toolbar'

export function TextAreaExerciseEditor(props: TextAreaExerciseProps) {
  return (
    <>
      <TextAreaExerciseToolbar {...props} />
      <TextAreaExerciseRenderer
        scaffoldingEnabled={props.state.scaffoldingEnabled.value}
      />
      <button className={cn('serlo-button-edit-primary', 'mr-2')}>
        Musterlösung hinzufügen
      </button>
    </>
  )
}
