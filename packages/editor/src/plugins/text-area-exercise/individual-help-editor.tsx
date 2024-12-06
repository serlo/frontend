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
        <div className="flex flex-row items-center gap-3">
          <label className="mr-5">Schreibassistenz zur Verfügung stellen</label>
          <SwitchButton
            isOn={allowWritingAssistance.value}
            onClick={() => allowWritingAssistance.set((old) => !old)}
          />
        </div>
      </div>

      <div>
        <div className="flex flex-row items-center gap-3">
          <label className="mr-5">
            Individuelle KI-Hilfestellungen aktivieren
          </label>
          <SwitchButton
            isOn={allowAiFeedback.value}
            onClick={() => allowAiFeedback.set((old) => !old)}
          />
        </div>
        <EditorTextArea
          placeholder="Welche Hinweise hast du für die Hilfestellungen der KI?"
          onChange={(e) => additionalInfoForAi.set(e.target.value)}
          value={additionalInfoForAi.value}
          className="my-3"
        />
      </div>

      <div className="flex w-full flex-col gap-3">
        <div className="font-bold">
          Wann sollen die Hilfestellungen verfügbar sein?
        </div>
        <div className="flex flex-row items-center gap-3">
          <label className="mr-5">
            In jedem Absatz innerhalb der (Teil-) Aufgabe
          </label>
          <SwitchButton
            isOn={allowParagraphFeedback.value}
            onClick={() => allowParagraphFeedback.set((old) => !old)}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <label className="mr-5">
            Als Rückmeldung nach fertiger Bearbeitung
          </label>
          <SwitchButton
            isOn={allowSubmitFeedback.value}
            onClick={() => allowSubmitFeedback.set((old) => !old)}
          />
        </div>
      </div>
    </>
  )
}
