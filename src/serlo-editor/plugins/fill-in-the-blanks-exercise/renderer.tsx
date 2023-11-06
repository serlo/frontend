// import { DndContext, UniqueIdentifier } from '@dnd-kit/core'
import * as t from 'io-ts'
import { ReactNode, useMemo, useState } from 'react'

// import { BlankSolution } from './components/blank-solution'
// import { BlankSolutionsArea } from './components/blank-solution-area'
import { BlankStatesContext } from './context/blank-context'
import { Feedback } from '../sc-mc-exercise/renderer/feedback'
import { useInstanceData } from '@/contexts/instance-context'

// --- Drag and drop stuff
// TODO: Use Map container here as well
// export interface BlankDragAndDropSolution {
//   draggableId: UniqueIdentifier
//   text: string
//   inDroppableId: UniqueIdentifier
// }
// const initialDragAndDropSolutions: BlankDragAndDropSolution[] = [
//   {
//     draggableId: 'draggable-1',
//     text: 'draggable-1',
//     inDroppableId: 'blank-solutions-area',
//   },
// ]
// export const BlankDragAndDropSolutions = createContext<
//   BlankDragAndDropSolution[] | null
// >(null)

// TODO: Copy of type in /src/serlo-editor/plugins/text/types/text-editor.ts
const BlankState = t.type({
  type: t.literal('blank'),
  blankId: t.string,
  correctAnswer: t.string,
  alternativeSolutions: t.array(t.string),
})

type BlankStates = t.TypeOf<typeof BlankState>[]

type BlankId = string

interface FillInTheBlanksRendererProps {
  text: ReactNode
  textPluginState: {
    plugin: string
    state?: unknown
    id?: string | undefined
  }
  mode: string
}

export function FillInTheBlanksRenderer(props: FillInTheBlanksRendererProps) {
  const { text, textPluginState, mode } = props

  const exStrings = useInstanceData().strings.content.exercises

  // Used to show feedback when user clicked "Stimmts?" button
  const [showFeedback, setShowFeedback] = useState<boolean>(false)

  // Maps blankId to the learner feedback after clicking "Stimmts?" button
  // isCorrect === undefined -> no feedback
  const [blanksFeedback, setBlanksFeedback] = useState(
    new Map<BlankId, { isCorrect?: boolean }>()
  )

  // Maps blankId to the text entered by the user
  const [textUserTypedIntoBlank, setTextUserTypedIntoBlank] = useState(
    new Map<BlankId, { text: string }>()
  )

  // List of blank elements found in text editor state
  const blankStateList: BlankStates = useMemo(() => {
    // TODO: Remove entries in textUserTypedIntoBlank where blankId no longer exists.
    return getBlanksWithinObject(textPluginState)
  }, [textPluginState])

  // --- Drag & drop stuff
  // TODO: Should get blank solutions from text state
  // const [blankDragAndDropSolutions, setBlankDragAndDropSolutions] = useState<
  //   BlankDragAndDropSolution[]
  // >(initialDragAndDropSolutions)

  return (
    // <DndContext
    //   onDragEnd={(e) => {
    //     setBlankDragAndDropSolutions((blankDragAndDropSolutions) => {
    //       // Draggable not dropped over droppable -> Do not change state
    //       if (!e.over) return blankDragAndDropSolutions
    //       const index = blankDragAndDropSolutions.findIndex(
    //         (draggable) => draggable.draggableId === e.active.id
    //       )
    //       if (index === -1) return blankDragAndDropSolutions
    //       // Change where this draggable is
    //       blankDragAndDropSolutions[index].inDroppableId = e.over.id
    //       return [...blankDragAndDropSolutions]
    //     })
    //   }}
    // >
    // <BlankDragAndDropSolutions.Provider value={blankDragAndDropSolutions}>
    <div className="mx-side mb-block leading-[30px] [&>p]:leading-[30px]">
      <BlankStatesContext.Provider
        value={{
          mode: mode,
          blanksFeedback: blanksFeedback,
          textUserTypedIntoBlank: {
            value: textUserTypedIntoBlank,
            set: setTextUserTypedIntoBlank,
          },
        }}
      >
        {text}
      </BlankStatesContext.Provider>
      {/* {mode === 'drag-and-drop' ? (
        <BlankSolutionsArea>
          <>
            {blankDragAndDropSolutions
              .filter((entry) => entry.inDroppableId === 'blank-solutions-area')
              .map((dragAndDropSolution, index) => (
                <BlankSolution
                  key={index}
                  text={dragAndDropSolution.text}
                  draggableId={dragAndDropSolution.draggableId}
                />
              ))}
          </>
        </BlankSolutionsArea>
      ) : null} */}

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
            correct={[...blanksFeedback].every((entry) => entry[1].isCorrect)}
          />
        )}
      </div>

      {/* Only debug output from here on */}
      <div className="hidden">
        Blanks state:
        {blankStateList.map((blank, index) => (
          <div key={index}>{JSON.stringify(blank)}</div>
        ))}
      </div>
      <div className="hidden">
        <div>State textUserTypedIntoBlank:</div>
        {[...textUserTypedIntoBlank].map((entry, index) => {
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
      {/* <div className="hidden">
        {blankDragAndDropSolutions.map((entry, index) => (
          <div
            key={index}
          >{`DraggableId: ${entry.draggableId} | in droppableId: ${entry.inDroppableId} | containing text: ${entry.text}`}</div>
        ))}
      </div> */}
    </div>
  )

  function checkAnswers() {
    if (mode === 'fill-in-the-blanks') {
      const newBlankAnswersCorrectList = new Map<
        BlankId,
        { isCorrect: boolean | undefined }
      >()
      blankStateList.forEach((blankState) => {
        const textUserTypedIntoThisBlank =
          textUserTypedIntoBlank.get(blankState.blankId)?.text.trim() ?? ''
        const isCorrect =
          textUserTypedIntoThisBlank === blankState.correctAnswer.trim() ||
          textUserTypedIntoThisBlank ===
            blankState.alternativeSolutions.find(
              (alternativeSolution) =>
                textUserTypedIntoThisBlank === alternativeSolution.trim()
            )
        newBlankAnswersCorrectList.set(blankState.blankId, {
          isCorrect: isCorrect,
        })
      })

      setBlanksFeedback(newBlankAnswersCorrectList)
    } else if (mode === 'drag-and-drop') {
      // TODO: Check answers in drag-and-drop mode
    }
  }
}

// Searches for blank objects in text plugin state. They can be at varying depths.
function getBlanksWithinObject(obj: object): BlankStates {
  if (BlankState.is(obj)) {
    return [obj]
  }

  // Recursively search this object's values for blank objects
  return Object.values(obj).reduce((blanks: BlankStates, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      return [...blanks, ...getBlanksWithinObject(value)]
    }
    return blanks
  }, [])
}
