import {
  selectIsFocused,
  selectStaticDocument,
  useAppSelector,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { EditorFillInTheBlanksExerciseDocument } from '@editor/types/editor-plugins'
import { useMemo, useState } from 'react'

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

  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

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

  const childPluginConfig = useMemo(() => {
    if (childPluginState.plugin === EditorPluginType.Text)
      return { placeholder: blanksExerciseStrings.placeholder }
    if (childPluginState.plugin === EditorPluginType.SerloTable)
      return { allowBlanks: true }
  }, [childPluginState.plugin, blanksExerciseStrings.placeholder])

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
            childPlugin={childPlugin.render({ config: childPluginConfig })}
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
