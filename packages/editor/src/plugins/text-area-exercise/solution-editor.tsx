import { SwitchButton } from '@editor/editor-ui/switch-button'
import { useContext } from 'react'

import { EditorTextArea } from './editor-text-area'
import { TextAreaEditorContext } from './text-area-exercise-props-context'

export function Solution() {
  const textAreaPluginStateContext = useContext(TextAreaEditorContext)
  if (!textAreaPluginStateContext) throw new Error('Missing text area context')

  const {
    allowShowSolution,
    solution,
    allowShowSolutionStrategy,
    solutionStrategy,
  } = textAreaPluginStateContext.state
  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-3">
          <label className="mr-5">
            <b>Musterlösung</b>
          </label>
          <div className="flex flex-row gap-3">
            <span>( anzeigen</span>
            <SwitchButton
              isOn={allowShowSolution.value}
              onClick={() => allowShowSolution.set((old) => !old)}
            />
            <span>)</span>
          </div>
        </div>
        <EditorTextArea
          placeholder="Musterlösung"
          onChange={(e) => solution.set(e.target.value)}
          value={solution.value}
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
      <div>
        <div className="flex flex-row items-center gap-3">
          <label className="mr-5">
            <b>Lösungsstrategie</b>
          </label>
          <div className="flex flex-row gap-3">
            <span>( anzeigen</span>
            <SwitchButton
              isOn={allowShowSolutionStrategy.value}
              onClick={() => allowShowSolutionStrategy.set((old) => !old)}
            />
            <span>)</span>
          </div>
        </div>
        <EditorTextArea
          placeholder="Lösungsstrategie"
          onChange={(e) => solutionStrategy.set(e.target.value)}
          value={solutionStrategy.value}
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
    </>
  )
}
