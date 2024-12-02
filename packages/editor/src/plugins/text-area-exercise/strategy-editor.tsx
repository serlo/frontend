import { SwitchButton } from '@editor/editor-ui/switch-button'
import { useContext } from 'react'

import { EditorTextArea } from './editor-text-area'
import { TextAreaEditorContext } from './text-area-exercise-props-context'

export function Strategy() {
  const textAreaPluginStateContext = useContext(TextAreaEditorContext)
  if (!textAreaPluginStateContext) throw new Error('Missing text area context')

  const { allowShowSolutionStrategy, solutionStrategy } =
    textAreaPluginStateContext.state
  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-3">
          <label className="mr-5">Lösungsstrategie anzeigen</label>
          <SwitchButton
            isOn={allowShowSolutionStrategy.value}
            onClick={() => allowShowSolutionStrategy.set((old) => !old)}
          />
        </div>
        <EditorTextArea
          placeholder="Lösungsstrategie"
          onChange={(e) => solutionStrategy.set(e.target.value)}
          value={solutionStrategy.value}
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
