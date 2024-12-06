import { useContext } from 'react'

import { EditorTextArea } from './editor-text-area'
import { TextAreaEditorContext } from './text-area-exercise-props-context'
import { TextAreaTitleAndEnableSwitch } from './text-area-title-and-enable-switch'

export function EvaluationCriteriaEditor() {
  const textAreaPluginStateContext = useContext(TextAreaEditorContext)
  if (!textAreaPluginStateContext) throw new Error('Missing text area context')

  const { allowShowEvaluationCriteria, evaluationCriteria } =
    textAreaPluginStateContext.state
  return (
    <>
      <div>
        <div>
          <div className="flex flex-row items-center gap-5">
            <TextAreaTitleAndEnableSwitch
              title="Musterlösung"
              switchEnabled={allowShowEvaluationCriteria.value}
              toggleSwitch={() =>
                allowShowEvaluationCriteria.set((old) => !old)
              }
            />
          </div>
          <EditorTextArea
            placeholder="Bewertungskriterien"
            onChange={(e) => evaluationCriteria.set(e.target.value)}
            value={evaluationCriteria.value}
            className="my-3"
          />
        </div>
      </div>
    </>
  )
}
