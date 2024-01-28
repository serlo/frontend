import {
  selectDocument,
  selectIsFocused,
  selectStaticDocument,
  useAppSelector,
} from '@editor/store'
import type { EditorFillInTheBlanksExerciseDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import type { FillInTheBlanksExerciseProps, FillInTheBlanksMode } from '.'
import { FillInTheBlanksRenderer } from './renderer'
import { FillInTheBlanksStaticRenderer } from './static'
import { FillInTheBlanksToolbar } from './toolbar'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function FillInTheBlanksExerciseEditor(
  props: FillInTheBlanksExerciseProps
) {
  const { focused } = props
  const [previewActive, setPreviewActive] = useState(false)

  const isRendererTextPluginFocused = useAppSelector((storeState) => {
    return selectIsFocused(storeState, props.state.text.id)
  })

  const editorStrings = useEditorStrings()

  const hasFocus = focused || isRendererTextPluginFocused

  // Rerender if text plugin state changes
  const textPluginState = useAppSelector((state) => {
    return selectDocument(state, props.state.text.id)
  })

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(
        storeState,
        props.id
      ) as EditorFillInTheBlanksExerciseDocument
  )

  if (!textPluginState || !staticDocument) return null

  return (
    <div className="mb-12 mt-10 pt-4">
      {hasFocus ? (
        <FillInTheBlanksToolbar
          {...props}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      ) : null}

      {previewActive ? (
        <FillInTheBlanksStaticRenderer {...staticDocument} />
      ) : (
        <FillInTheBlanksRenderer
          isEditing
          text={props.state.text.render({
            config: {
              placeholder: editorStrings.plugins.blanksExercise.placeholder,
            },
          })}
          textPluginState={textPluginState}
          extraDraggableAnswers={props.state.extraDraggableAnswers}
          mode={props.state.mode.value as FillInTheBlanksMode}
          initialTextInBlank="correct-answer"
        />
      )}
      {/* Only debug views from here on */}
      <div className="hidden">{JSON.stringify(textPluginState)}</div>
    </div>
  )
}
