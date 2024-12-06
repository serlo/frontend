import { SwitchButton } from '@editor/editor-ui/switch-button'
import { useContext } from 'react'

import { EditorTextArea } from './editor-text-area'
import { TextAreaEditorContext } from './text-area-exercise-props-context'

export function IndividualHelpEditor() {
  const textAreaPluginStateContext = useContext(TextAreaEditorContext)
  if (!textAreaPluginStateContext) throw new Error('Missing text area context')

  const {
    allowWritingAssistance,
    allowAiFeedback,
    allowParagraphFeedback,
    allowSubmitFeedback,
    additionalInfoForAi,
  } = textAreaPluginStateContext.state
  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-2">
          <label className="font-bold">Schreibassistenz</label>
          <SwitchButton
            isOn={allowWritingAssistance.value}
            onClick={() => allowWritingAssistance.set((old) => !old)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-3">
          <label className="font-bold">Individuelle KI-Hilfestellungen</label>
          <SwitchButton
            isOn={allowAiFeedback.value}
            onClick={() => allowAiFeedback.set((old) => !old)}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <label className="">
            In jedem Absatz innerhalb der (Teil-) Aufgabe
          </label>
          <SwitchButton
            isOn={allowParagraphFeedback.value}
            onClick={() => allowParagraphFeedback.set((old) => !old)}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <label className="">Als Rückmeldung nach fertiger Bearbeitung</label>
          <SwitchButton
            isOn={allowSubmitFeedback.value}
            onClick={() => allowSubmitFeedback.set((old) => !old)}
          />
        </div>
      </div>

      <div>
        <div className="font-bold">Hinweise an die KI</div>
        <EditorTextArea
          placeholder="Welche Hinweise hast du für die Hilfestellungen der KI?"
          onChange={(e) => additionalInfoForAi.set(e.target.value)}
          value={additionalInfoForAi.value}
          className="my-3"
        />
      </div>
    </>
  )
}
