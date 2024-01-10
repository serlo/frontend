import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorFillInTheBlanksExerciseDocument } from '@editor/types/editor-plugins'

import type { FillInTheBlanksMode } from '.'
import { FillInTheBlanksRenderer } from './renderer'

export function FillInTheBlanksStaticRenderer(
  props: EditorFillInTheBlanksExerciseDocument
) {
  const { text } = props.state
  console.log('text in FillInTheBlanksStaticRenderer: ', text)
  return (
    <FillInTheBlanksRenderer
      text={<StaticRenderer document={text} />}
      textPluginState={text}
      mode={props.state.mode as FillInTheBlanksMode}
      initialTextInBlank="empty"
    />
  )
}
