import type { EditorPluginType } from '@editor/package'
import {
  selectIsFocused,
  selectStaticDocument,
  useAppSelector,
} from '@editor/store'
import type { EditorFillInTheBlanksExerciseDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import type { FillInTheBlanksExerciseProps, FillInTheBlanksMode } from '.'
import { ExtraIncorrectAnswers } from './components/extra-incorrect-answers'
import { FillInTheBlanksRenderer } from './renderer'
import { FillInTheBlanksStaticRenderer } from './static'
import { FillInTheBlanksToolbar } from './toolbar'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function FillInTheBlanksExerciseEditor(
  props: FillInTheBlanksExerciseProps
) {
  const { focused, id, state } = props
  const { childPlugin, mode, extraDraggableAnswers } = state
  const [previewActive, setPreviewActive] = useState(false)

  const isChildPluginFocused = useAppSelector((storeState) =>
    selectIsFocused(storeState, childPlugin.id)
  )

  const editorStrings = useEditorStrings()

  const hasFocus = focused || isChildPluginFocused

  // Rerender if text plugin state changes
  const childPluginState = useAppSelector((state) => {
    return selectStaticDocument(state, childPlugin.id)
  })

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(
        storeState,
        id
      ) as EditorFillInTheBlanksExerciseDocument
  )

  if (!childPluginState || !staticDocument) return null

  return (
    <div className="mb-12 mt-10 pt-4">
      {hasFocus ? (
        <FillInTheBlanksToolbar
          {...props}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
          childPluginType={childPluginState.plugin as EditorPluginType}
        />
      ) : null}

      {previewActive ? (
        <FillInTheBlanksStaticRenderer {...staticDocument} />
      ) : (
        <div className="relative z-0 mt-12">
          <FillInTheBlanksRenderer
            isEditing
            childPlugin={childPlugin.render({
              config: {
                placeholder: editorStrings.plugins.blanksExercise.placeholder,
              },
            })}
            childPluginState={childPluginState}
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
      <div className="hidden">{JSON.stringify(childPluginState)}</div>
    </div>
  )
}
