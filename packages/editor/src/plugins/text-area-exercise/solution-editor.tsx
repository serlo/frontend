import { useContext } from 'react'

import { EditorTextArea } from './editor-text-area'
import { TextAreaEditorContext } from './text-area-exercise-props-context'
import { TextAreaTitleAndEnableSwitch } from './text-area-title-and-enable-switch'

export function SolutionEditor() {
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
          <TextAreaTitleAndEnableSwitch
            title="Musterlösung"
            switchEnabled={allowShowSolution.value}
            toggleSwitch={() => allowShowSolution.set((old) => !old)}
          />
        </div>
        <EditorTextArea
          placeholder="Musterlösung"
          onChange={(e) => solution.set(e.target.value)}
          value={solution.value}
          className="my-3"
        />
      </div>
      <div>
        <div className="flex flex-row items-center gap-3">
          <TextAreaTitleAndEnableSwitch
            title="Lösungshinweise"
            switchEnabled={allowShowSolutionStrategy.value}
            toggleSwitch={() => allowShowSolutionStrategy.set((old) => !old)}
          />
        </div>
        <EditorTextArea
          placeholder="Lösungshinweise"
          onChange={(e) => solutionStrategy.set(e.target.value)}
          value={solutionStrategy.value}
          className="my-3"
        />
      </div>
    </>
  )
}
