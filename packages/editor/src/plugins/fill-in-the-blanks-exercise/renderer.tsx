// import { DndContext, UniqueIdentifier } from '@dnd-kit/core'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import * as t from 'io-ts'
import { type ReactNode, useMemo, useState } from 'react'

import type { BlankId, DraggableId, FillInTheBlanksMode } from '.'
import { DraggableSolution } from './components/blank-solution'
import { DraggableSolutionArea } from './components/blank-solution-area'
import { FillInTheBlanksContext } from './context/blank-context'
import { Feedback } from '../sc-mc-exercise/renderer/feedback'

// TODO: Copy of type in /src/serlo-editor/plugins/text/types/text-editor.ts
const Answer = t.type({
  answer: t.string,
})
const Blank = t.type({
  type: t.literal('textBlank'),
  children: t.unknown,
  blankId: t.string,
  correctAnswers: t.array(Answer),
})

type Blanks = t.TypeOf<typeof Blank>[]

interface FillInTheBlanksRendererProps {
  text: ReactNode
  textPluginState: {
    plugin: string
    state?: unknown
    id?: string | undefined
  }
  mode: FillInTheBlanksMode
  initialTextInBlank: 'empty' | 'correct-answer'
}

export function FillInTheBlanksRenderer(props: FillInTheBlanksRendererProps) {
  const { text, textPluginState, mode, initialTextInBlank } = props

  const exStrings = useInstanceData().strings.content.exercises

  // Used to show feedback when user clicked "Stimmts?" button
  const [showFeedback, setShowFeedback] = useState<boolean>(false)

  // Maps blankId to the learner feedback after clicking "Stimmts?" button
  // isCorrect === undefined -> no feedback
  const [feedbackForBlanks, setFeedbackForBlanks] = useState(
    new Map<BlankId, { isCorrect?: boolean }>()
  )

  /** Array of blank elements extracted from text editor state */
  const blanks: Blanks = useMemo(() => {
    return getBlanksWithinObject(textPluginState)
  }, [textPluginState])

  // Maps blankId to the text entered by the user. Modified when user types into a blank and causes rerender.
  const [textUserTypedIntoBlanks, setTextUserTypedIntoBlanks] = useState(
    new Map<BlankId, { text: string }>()
  )

  /** Maps blankId to the text that should be displayed in the blank.  */
  const textInBlanks = useMemo(() => {
    const newMap = new Map<BlankId, { text: string }>()
    blanks.forEach((blankState) => {
      const firstCorrectAnswer = blankState.correctAnswers.at(0)?.answer ?? ''
      newMap.set(blankState.blankId, {
        text: initialTextInBlank === 'correct-answer' ? firstCorrectAnswer : '',
      })
    })
    textUserTypedIntoBlanks.forEach((textUserTypedIntoBlank, blankId) =>
      newMap.set(blankId, { text: textUserTypedIntoBlank.text })
    )
    return newMap
  }, [blanks, textUserTypedIntoBlanks, initialTextInBlank])

  const draggables = useMemo(() => {
    return blanks.map((blank) => {
      return {
        draggableId: `solution-${blank.blankId}`,
        text: blank.correctAnswers[0].answer,
      }
    })
  }, [blanks])

  // Maps DraggableId to the BlankId where this draggable element is currently located
  const [locationOfDraggables, setLocationOfDraggables] = useState(
    new Map<DraggableId, BlankId>()
  )

  return (
    // Additional prop 'context={window}' prevents error with nested DndProvider components. See: https://github.com/react-dnd/react-dnd/issues/3257#issuecomment-1239254032
    // <DndProvider backend={HTML5Backend} context={window}>
    <div className="mx-side mb-block leading-[30px] [&>p]:leading-[30px]">
      <FillInTheBlanksContext.Provider
        value={{
          mode: mode,
          feedbackForBlanks: feedbackForBlanks,
          textInBlanks: textInBlanks,
          textUserTypedIntoBlanks: {
            value: textUserTypedIntoBlanks,
            set: setTextUserTypedIntoBlanks,
          },
          draggables: draggables,
          locationOfDraggables: {
            value: locationOfDraggables,
            set: setLocationOfDraggables,
          },
        }}
      >
        {text}
      </FillInTheBlanksContext.Provider>
      {mode === 'drag-and-drop' ? (
        <DraggableSolutionArea
          locationOfDraggables={{
            value: locationOfDraggables,
            set: setLocationOfDraggables,
          }}
        >
          {draggables.map((draggable, index) => {
            if (locationOfDraggables.get(draggable.draggableId)) return null
            return (
              <DraggableSolution
                key={index}
                text={draggable.text}
                draggableId={draggable.draggableId}
              />
            )
          })}
        </DraggableSolutionArea>
      ) : null}

      {/* Copied from mc-renderer.tsx */}
      <div className="mt-2 flex">
        <button
          className="serlo-button-blue mr-3 h-8"
          onClick={() => {
            checkAnswers()
            setShowFeedback(true)
          }}
        >
          {exStrings.check}
        </button>
        {showFeedback && (
          <Feedback
            correct={[...feedbackForBlanks].every(
              (entry) => entry[1].isCorrect
            )}
          />
        )}
      </div>

      {/* Only debug output from here on */}
      <div className="hidden">
        Blanks state:
        {blanks.map((blank, index) => (
          <div key={index}>{JSON.stringify(blank)}</div>
        ))}
      </div>
      <div className="hidden">
        <div>State textUserTypedIntoBlank:</div>
        {[...textUserTypedIntoBlanks].map((entry, index) => {
          const blankId = entry[0]
          const text = entry[1].text
          return (
            <div
              className="ml-5"
              key={index}
            >{`Text: ${text} | BlankId: ${blankId}`}</div>
          )
        })}
      </div>
      <div className="hidden">
        {[...locationOfDraggables].map((entry, index) => {
          return (
            <div key={index}>
              {`DraggableId: ${entry[0]} in blankId: ${entry[1]}`}
            </div>
          )
        })}
      </div>
      <div className="hidden">
        {draggables.map((draggable, index) => {
          return (
            <div key={index}>
              {`DraggableId: ${draggable.draggableId} with text: ${draggable.text}`}
            </div>
          )
        })}
      </div>
    </div>
    // </DndProvider>
  )

  function checkAnswers() {
    if (mode === 'typing') {
      const newBlankAnswersCorrectList = new Map<
        BlankId,
        { isCorrect: boolean | undefined }
      >()
      blanks.forEach((blankState) => {
        const trimmedBlankText =
          textInBlanks.get(blankState.blankId)?.text.trim() ?? ''
        const isCorrect = blankState.correctAnswers.some(
          (correctAnswer) => correctAnswer.answer === trimmedBlankText
        )
        newBlankAnswersCorrectList.set(blankState.blankId, {
          isCorrect: isCorrect,
        })
      })

      setFeedbackForBlanks(newBlankAnswersCorrectList)
    } else if (mode === 'drag-and-drop') {
      // TODO: Check answers in drag-and-drop mode
    }
  }
}

/** Searches for blank objects in text plugin state. They can be at varying depths. */
function getBlanksWithinObject(obj: object): Blanks {
  if (Blank.is(obj)) {
    return [obj]
  }

  // Recursively search this object's values for blank objects
  return Object.values(obj).reduce((blanks: Blanks, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      return [...blanks, ...getBlanksWithinObject(value)]
    }
    return blanks
  }, [])
}
