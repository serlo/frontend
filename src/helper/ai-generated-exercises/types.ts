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

export interface OutputScMcExercise {
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

export interface OutputInputExercise {
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
