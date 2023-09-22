import type { CustomElement } from '@/serlo-editor/plugins/text'
import type { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export interface Question {
  plugin: EditorPluginType.Rows
  state: Array<{
    plugin: EditorPluginType.Text
    state: Array<CustomElement>
    id: string
  }>
  id: string
}

export interface ScMcExerciseState {
  content: Question
  interactive: {
    plugin: EditorPluginType.ScMcExercise
    state: {
      isSingleChoice: boolean
      answers: Array<{
        content: {
          plugin: EditorPluginType.Text
          state: Array<CustomElement>
          id: string
        }
        isCorrect: boolean
        feedback?: {
          plugin: EditorPluginType.Text
          state: CustomElement
          id: string
        }
      }>
    }
  }
}

export interface InputExerciseState {
  content: Question
  interactive: {
    plugin: EditorPluginType.InputExercise
    state: {
      unit: string
      type: string
      answers: Array<{
        value: string
        isCorrect: boolean
        feedback?: {
          plugin: EditorPluginType.Text
          state: CustomElement
          id: string
        }
      }>
    }
    id: string
  }
}

export interface TypeTextExercise {
  plugin: 'type-text-exercise'
  state: {
    changes: ''
    content: {
      plugin: 'exercise'
      state: ScMcExerciseState | InputExerciseState
    }
    id: 0
    revision: 0
    'text-solution': null
  }
}

export type TypeTextExerciseState = TypeTextExercise['state']

export interface TypeTextExerciseGroup {
  plugin: 'type-text-exercise-group'
  state: {
    changes: ''
    content: {
      state: Question
    }
    id: 0
    revision: 0
    'grouped-text-exercise': Array<TypeTextExerciseState>
  }
}
