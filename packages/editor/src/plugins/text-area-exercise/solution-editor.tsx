import { SwitchButton } from '@editor/editor-ui/switch-button'
import { useContext } from 'react'

import { EditorTextArea } from './editor-text-area'
import { ExercisePluginStateContext } from './exercise-plugin-state-context'
import { PrototypeStateStore } from './prototype-state'
import { TextAreaEditorContext } from './text-area-exercise-props-context'

export function Solution() {
  const textAreaPluginStateContext = useContext(TextAreaEditorContext)
  if (!textAreaPluginStateContext) throw new Error('Missing text area context')

  const {
    allowShowSolution,
    allowShowEvaluationCriteria,
    solution,
    evaluationCriteria,
  } = textAreaPluginStateContext.state
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
        <EditorTextArea
          placeholder="Musterlösung"
          onChange={(e) => {
            solution.set(e.target.value)
            PrototypeStateStore.update((s) => {
              s.textAreaPlugins[textAreaPluginStateContext.id].solution =
                e.target.value
            })
          }}
          value={solution.value}
        />
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
        <EditorTextArea
          placeholder="Bewertungskriterien"
          onChange={(e) => {
            evaluationCriteria.set(e.target.value)
            PrototypeStateStore.update((s) => {
              s.textAreaPlugins[
                textAreaPluginStateContext.id
              ].evaluationCriteria = e.target.value
            })
          }}
          value={evaluationCriteria.value}
        />
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
