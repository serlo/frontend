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

      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center gap-3">
          <label className="font-bold">
            Individuelle KI-Hilfestellungen und Feedback
          </label>
        </div>
        <div className="flex flex-row items-center gap-3">
          <img
            className="w-[3rem]"
            src="/_assets/img/microadaptivity-inline-feedback.svg"
          />
          <label className=" w-[15rem]">
            In jedem Absatz innerhalb der (Teil-) Aufgabe
          </label>
          <SwitchButton
            isOn={allowParagraphFeedback.value}
            onClick={() => allowParagraphFeedback.set((old) => !old)}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <img
            className="w-[3rem]"
            src="/_assets/img/microadaptivity-end-feedback.svg"
          />
          <label className=" w-[15rem]">
            Als Rückmeldung nach fertiger Bearbeitung
          </label>
          <SwitchButton
            isOn={allowSubmitFeedback.value}
            onClick={() => allowSubmitFeedback.set((old) => !old)}
          />
        </div>
      </div>
      {allowParagraphFeedback.value || allowSubmitFeedback.value ? (
        <div>
          <div className="font-bold">Hinweise an die KI</div>
          <div className="text-[1rem] text-gray-600">
            Beispielsweise Fehlkonzepte oder gängige Fehler, auf welche die KI
            eingehen soll.
          </div>
          <EditorTextArea
            placeholder="Welche Hinweise hast du für die Hilfestellungen der KI?"
            onChange={(e) => additionalInfoForAi.set(e.target.value)}
            value={additionalInfoForAi.value}
            className="my-3"
          />
        </div>
      ) : null}
    </>
  )
}
