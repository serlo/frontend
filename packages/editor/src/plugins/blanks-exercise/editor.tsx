import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import {
  selectIsFocused,
  selectStaticDocument,
  useAppSelector,
} from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { EditorBlanksExerciseDocument } from '@editor/types/editor-plugins'
import { cn } from '@editor/utils/cn'
import { useState } from 'react'

import type { BlanksExerciseProps, BlanksExerciseMode } from '.'
import { ChildPluginSelection } from './components/child-plugin-selection'
import { ExtraIncorrectAnswers } from './components/extra-incorrect-answers'
import { BlanksExerciseRenderer } from './renderer'
import { BlanksExerciseStaticRenderer } from './static'
import { BlanksExerciseToolbar } from './toolbar'
import { useIsPreviewActive } from '../exercise/context/preview-context'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'

export function BlanksExerciseEditor(props: BlanksExerciseProps) {
  const { focused, id, state } = props
  const { text: childPlugin, mode, extraDraggableAnswers } = state
  const previewActive = useIsPreviewActive()

  const editorStrings = useEditStrings()
  const blanksExerciseStrings = editorStrings.plugins.blanksExercise

  const isChildPluginFocused = useAppSelector((storeState) =>
    selectIsFocused(storeState, childPlugin.id)
  )

  // Rerender if text plugin state changes
  const childPluginState = useAppSelector((state) => {
    return selectStaticDocument(state, childPlugin.id)
  })

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorBlanksExerciseDocument
  )

  const [showChildPluginSelection, setShowChildPluginSelection] = useState(
    isEmptyTextDocument(staticDocument.state.text)
  )

  const placeholder =
    childPluginState.plugin === EditorPluginType.Text
      ? blanksExerciseStrings.placeholder
      : undefined

  if (!childPluginState || !staticDocument) return null

  const showToolbar =
    isChildPluginFocused && childPluginState.plugin === EditorPluginType.Text

  return (
    <div
      className={cn(
        'group/blanks-exercise mb-12 pb-6',
        'border-3 border-transparent focus-within:rounded-xl focus-within:border-gray-100',
        focused && '!border-gray-100'
      )}
      data-qa="plugin-blanks-exercise"
    >
      <BlanksExerciseToolbar
        {...props}
        childPluginType={childPluginState.plugin as EditorPluginType}
        showSelection={showChildPluginSelection}
      />

      {previewActive ? (
        <BlanksExerciseStaticRenderer {...staticDocument} />
      ) : showChildPluginSelection ? (
        renderChildPluginSelection()
      ) : (
        renderEditView()
      )}
    </div>
  )

  function renderEditView() {
    return (
      <div className="relative mt-12">
        <BlanksExerciseRenderer
          isEditing
          childPlugin={
            <div className="[&_.plugin-toolbar]:!-top-12 [&_.plugin-toolbar]:!left-0">
              {showToolbar ? (
                <PluginToolbar
                  pluginType={EditorPluginType.Text}
                  noWhiteShadow
                />
              ) : null}
              {childPlugin.render({
                config: placeholder ? { placeholder } : undefined,
              })}
            </div>
          }
          childPluginState={childPluginState}
          extraDraggableAnswers={staticDocument.state.extraDraggableAnswers}
          mode={mode.value as BlanksExerciseMode}
          initialTextInBlank="correct-answer"
        />

        {mode.value === 'drag-and-drop' ? (
          <ExtraIncorrectAnswers
            extraDraggableAnswers={extraDraggableAnswers}
          />
        ) : null}
      </div>
    )
  }

  function renderChildPluginSelection() {
    return (
      <ChildPluginSelection
        childPlugin={childPlugin}
        setShowSelection={setShowChildPluginSelection}
      />
    )
  }
}
