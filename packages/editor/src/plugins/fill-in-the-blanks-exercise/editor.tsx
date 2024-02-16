import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
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
import { cn } from '@/helper/cn'

const headerTextFormattingOptions = [
  TextEditorFormattingOption.code,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.textBlank,
]

const cellTextFormattingOptions = [
  TextEditorFormattingOption.code,
  TextEditorFormattingOption.colors,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.lists,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.richTextBold,
  TextEditorFormattingOption.richTextItalic,
  TextEditorFormattingOption.textBlank,
]

export function FillInTheBlanksExerciseEditor(
  props: FillInTheBlanksExerciseProps
) {
  const { focused, id, state } = props
  const { childPlugin, mode, extraDraggableAnswers } = state
  const [previewActive, setPreviewActive] = useState(false)

  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  const isChildPluginFocused = useAppSelector((storeState) =>
    selectIsFocused(storeState, childPlugin.id)
  )

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
      return { headerTextFormattingOptions, cellTextFormattingOptions }
  }, [childPluginState.plugin, blanksExerciseStrings.placeholder])

  if (!childPluginState || !staticDocument) return null

  return (
    <div
      className={cn(
        'group/blanks-exercise mb-12 mt-10 pb-6 pt-4',
        'rounded-b-xl border-3 border-transparent focus-within:rounded-tl-xl focus-within:border-gray-100',
        focused && '!border-gray-100'
      )}
      data-qa="plugin-fill-in-the-blanks-exercise"
    >
      {focused ? (
        <FillInTheBlanksToolbar
          {...props}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
          childPluginType={childPluginState.plugin as EditorPluginType}
        />
      ) : (
        <button
          className={cn(`
            absolute right-0 top-[-23px] z-[22] hidden h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold
            hover:bg-editor-primary-100 group-focus-within/blanks-exercise:block
          `)}
          data-qa="plugin-exercise-parent-button"
        >
          {blanksExerciseStrings.title}
        </button>
      )}

      {previewActive ? (
        <FillInTheBlanksStaticRenderer {...staticDocument} />
      ) : (
        <div className="relative z-0 mt-12">
          <FillInTheBlanksRenderer
            isEditing
            childPlugin={
              <>
                {isChildPluginFocused ? (
                  <PluginToolbar
                    pluginType={EditorPluginType.Text}
                    className="!-top-12 !left-0"
                    noWhiteShadow
                  />
                ) : null}
                {childPlugin.render({ config: childPluginConfig })}
              </>
            }
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
