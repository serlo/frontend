import {
  selectDocument,
  selectStaticDocument,
  useAppSelector,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { EditorFillInTheBlanksExerciseDocument } from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'

import type { FillInTheBlanksExerciseProps, FillInTheBlanksMode } from '.'
import { ExtraIncorrectAnswers } from './components/extra-incorrect-answers'
import { FillInTheBlanksRenderer } from './renderer'
import { FillInTheBlanksStaticRenderer } from './static'
import { FillInTheBlanksToolbar } from './toolbar'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function FillInTheBlanksExerciseEditor(
  props: FillInTheBlanksExerciseProps
) {
  const { id, state } = props
  const { text, mode, extraDraggableAnswers } = state
  const [previewActive, setPreviewActive] = useState(false)

  // const isRendererTextPluginFocused = useAppSelector((storeState) => {
  //   return selectIsFocused(storeState, text.id)
  // })

  const editorStrings = useEditorStrings()

  // TODO: update focus within check to include table
  const hasFocus = true // focused || isRendererTextPluginFocused

  // Rerender if text plugin state changes
  const textPluginState = useAppSelector((state) => {
    return selectDocument(state, text.id)
  })

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(
        storeState,
        id
      ) as EditorFillInTheBlanksExerciseDocument
  )

  // test with table
  useEffect(() => {
    if (textPluginState?.plugin !== EditorPluginType.SerloTable) {
      text.replace(EditorPluginType.SerloTable)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <div className="relative z-0 mt-12">
          <FillInTheBlanksRenderer
            isEditing
            text={text.render({
              config: {
                placeholder: editorStrings.plugins.blanksExercise.placeholder,
              },
            })}
            textPluginState={textPluginState}
            extraDraggableAnswers={staticDocument.state.extraDraggableAnswers}
            mode={mode.value as FillInTheBlanksMode}
            initialTextInBlank="correct-answer"
          />

          {mode.value === 'drag-and-drop' ? (
            <ExtraIncorrectAnswers
              extraDraggableAnswers={extraDraggableAnswers}
            />
          ) : null}
        </div>
      )}
      {/* Only debug views from here on */}
      <div className="hidden">{JSON.stringify(textPluginState)}</div>
    </div>
  )
}
