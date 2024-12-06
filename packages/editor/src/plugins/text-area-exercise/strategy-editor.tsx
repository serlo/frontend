import { SwitchButton } from '@editor/editor-ui/switch-button'
import { useContext } from 'react'

import { EditorTextArea } from './editor-text-area'
import { TextAreaEditorContext } from './text-area-exercise-props-context'

export function Strategy() {
  const textAreaPluginStateContext = useContext(TextAreaEditorContext)
  if (!textAreaPluginStateContext) throw new Error('Missing text area context')

  const { allowShowEvaluationCriteria, evaluationCriteria } =
    textAreaPluginStateContext.state
  return (
    <>
      <div>
        <div>
          <div className="flex flex-row items-center gap-3">
            <label className="mr-5">
              <b>Bewertungskriterien</b>
            </label>
            <div className="flex flex-row gap-3">
              <span>( anzeigen</span>
              <SwitchButton
                isOn={allowShowEvaluationCriteria.value}
                onClick={() => allowShowEvaluationCriteria.set((old) => !old)}
              />
              <span>)</span>
            </div>
          </div>
          <EditorTextArea
            placeholder="Bewertungskriterien"
            onChange={(e) => evaluationCriteria.set(e.target.value)}
            value={evaluationCriteria.value}
            className="my-3"
          />
          {/* <div className="flex flex-row items-center gap-3">
            <button className="serlo-button-edit serlo-button-edit-primary">
              Upload
            </button>
            <button className="serlo-button-edit serlo-button-edit-primary">
              KI Copilot
            </button>
          </div> */}
        </div>
      </div>
    </>
  )
}
