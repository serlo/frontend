import { SwitchButton } from '@editor/editor-ui/switch-button'
import { useContext } from 'react'

import { EditorTextArea } from './editor-text-area'
import { TextAreaEditorContext } from './text-area-exercise-props-context'

export function Solution() {
  const textAreaPluginStateContext = useContext(TextAreaEditorContext)
  if (!textAreaPluginStateContext) throw new Error('Missing text area context')

  const { allowShowSolution, allowShowEvaluationCriteria } =
    textAreaPluginStateContext.state
  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-3">
          <label className="mr-5">Musterlösung anzeigen</label>
          <SwitchButton
            isOn={allowShowSolution.value}
            onClick={() => allowShowSolution.set((old) => !old)}
          />
        </div>
        <EditorTextArea placeholder="Musterlösung" />
        <div className="flex flex-row items-center gap-3">
          <button className="serlo-button-edit serlo-button-edit-primary">
            Upload
          </button>
          <button className="serlo-button-edit serlo-button-edit-primary">
            KI Copilot
          </button>
        </div>
      </div>

      <div>
        <div className="flex flex-row items-center gap-3">
          <label className="mr-5">Bewertungskriterien anzeigen</label>
          <SwitchButton
            isOn={allowShowEvaluationCriteria.value}
            onClick={() => allowShowEvaluationCriteria.set((old) => !old)}
          />
        </div>
        <EditorTextArea placeholder="Bewertungskriterien" />
        <div className="flex flex-row items-center gap-3">
          <button className="serlo-button-edit serlo-button-edit-primary">
            Upload
          </button>
          <button className="serlo-button-edit serlo-button-edit-primary">
            KI Copilot
          </button>
        </div>
      </div>
    </>
  )
}
