import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { selectDocument, selectIsFocused, useAppSelector } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type {
  FillInTheBlanksExerciseProps,
  FillInTheBlanksMode,
  fillInTheBlanksExercise,
} from '.'
import { FillInTheBlanksRenderer } from './renderer'
import { FillInTheBlanksStaticRenderer } from './static'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function FillInTheBlanksExerciseEditor(
  props: FillInTheBlanksExerciseProps
) {
  const { focused } = props
  const [isEditMode, setIsEditMode] = useState(true)
  const toggleRenderEditMode = () =>
    setIsEditMode((currentEditMode) => !currentEditMode)
  const editorStrings = useEditorStrings()
  const blanksExerciseStrings = editorStrings.plugins.blanksExercise

  const isRendererTextPluginFocused = useAppSelector((storeState) => {
    return selectIsFocused(storeState, props.state.text.id)
  })

  const hasFocus = focused || isRendererTextPluginFocused

  // Rerender if text plugin state changes
  const textPluginState = useAppSelector((state) => {
    return selectDocument(state, props.state.text.id)
  })

  if (!textPluginState) return null
  console.log('Editor: ', { isEditMode, textPluginState, props })

  return (
    <div className="mb-12 mt-10 pt-4">
      {hasFocus || !isEditMode ? (
        // TODO: Add button to toggle between fill-in-the-blanks and drag-and-drop
        <PluginToolbar
          pluginType={EditorPluginType.FillInTheBlanksExercise}
          className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
          pluginControls={<InteractiveToolbarTools id={props.id} />}
          pluginSettings={
            <>
              <button
                onClick={toggleRenderEditMode}
                className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
                data-qa="plugin-fill-in-the-blanks-toggle"
              >
                {isEditMode ? (
                  <>
                    <FaIcon icon={faEye} /> {blanksExerciseStrings.preview}
                  </>
                ) : (
                  <>
                    <FaIcon icon={faPen} /> {blanksExerciseStrings.edit}
                  </>
                )}
              </button>
            </>
          }
        />
      ) : null}

      {isEditMode ? (
        <FillInTheBlanksRenderer
          text={props.state.text.render({
            config: {
              placeholder: blanksExerciseStrings.placeholder,
            },
          })}
          textPluginState={textPluginState}
          mode={props.state.mode.value as FillInTheBlanksMode}
          initialTextInBlank="correct-answer"
        />
      ) : (
        <FillInTheBlanksStaticRenderer
          state={{
            text: {
              ...textPluginState,
              state:
                (
                textPluginState?.state as (typeof fillInTheBlanksExercise)['state']
                // prettier-ignore
                // @ts-ignore
              )?.value,
            },
            mode: props.state.mode.value as FillInTheBlanksMode,
          }}
          plugin={EditorPluginType.FillInTheBlanksExercise}
        />
      )}

      {/* Only debug views from here on */}
      <div className="hidden">{JSON.stringify(textPluginState)}</div>
    </div>
  )
}
