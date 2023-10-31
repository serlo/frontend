// import { DndContext, UniqueIdentifier } from '@dnd-kit/core'
import * as t from 'io-ts'
import { ReactNode, useMemo, useState } from 'react'

// import { GapSolution } from './components/gap-solution'
// import { GapSolutionsArea } from './components/gap-solution-area'
import { GapStatesContext } from './context/gap-context'
import { Feedback } from '../sc-mc-exercise/renderer/feedback'
import { useInstanceData } from '@/contexts/instance-context'

// --- Drag and drop stuff
// TODO: Use Map container here as well
// export interface GapDragAndDropSolution {
//   draggableId: UniqueIdentifier
//   text: string
//   inDroppableId: UniqueIdentifier
// }
// const initialDragAndDropSolutions: GapDragAndDropSolution[] = [
//   {
//     draggableId: 'draggable-1',
//     text: 'draggable-1',
//     inDroppableId: 'gap-solutions-area',
//   },
// ]
// export const GapDragAndDropSolutions = createContext<
//   GapDragAndDropSolution[] | null
// >(null)

// TODO: Copy of type in /home/lars/frontend/src/serlo-editor/plugins/text/types/text-editor.ts
const GapState = t.type({
  type: t.literal('gap'),
  gapId: t.string,
  correctAnswer: t.string,
  alternativeSolutions: t.array(t.string),
})

type GapId = string

export function FillInTheGapRenderer(props: {
  text: ReactNode
  textPluginState: {
    plugin: string
    state?: unknown
    id?: string | undefined
  }
  mode: string
}) {
  const { text, textPluginState, mode } = props

  const exStrings = useInstanceData().strings.content.exercises

  // Used to show feedback when user clicked "Stimmts?" button
  const [showFeedback, setShowFeedback] = useState<boolean>(false)

  // Maps gapId to the learner feedback after clicking "Stimmts?" button
  // isCorrect === undefined -> no feedback
  const [gapFeedback, setGapFeedback] = useState<
    Map<GapId, { isCorrect?: boolean }>
  >(new Map<GapId, { isCorrect?: boolean }>())

  // Maps gapId to the text entered by the user
  const [textUserTypedIntoGap, setTextUserTypedIntoGap] = useState<
    Map<GapId, { text: string }>
  >(new Map<GapId, { text: string }>())

  // List of gap elements found in text editor state
  const gapStateList: t.TypeOf<typeof GapState>[] = useMemo(() => {
    // TODO: Remove entries in textUserTypedIntoGap where gapId no longer exists.
    return getGapsWithinObject(textPluginState)
  }, [textPluginState])

  // --- Drag & drop stuff
  // TODO: Should get gap solutions from text state
  // const [gapDragAndDropSolutions, setGapDragAndDropSolutions] = useState<
  //   GapDragAndDropSolution[]
  // >(initialDragAndDropSolutions)

  return (
    // <DndContext
    //   onDragEnd={(e) => {
    //     setGapDragAndDropSolutions((gapDragAndDropSolutions) => {
    //       // Draggable not dropped over droppable -> Do not change state
    //       if (!e.over) return gapDragAndDropSolutions
    //       const index = gapDragAndDropSolutions.findIndex(
    //         (draggable) => draggable.draggableId === e.active.id
    //       )
    //       if (index === -1) return gapDragAndDropSolutions
    //       // Change where this draggable is
    //       gapDragAndDropSolutions[index].inDroppableId = e.over.id
    //       return [...gapDragAndDropSolutions]
    //     })
    //   }}
    // >
    // <GapDragAndDropSolutions.Provider value={gapDragAndDropSolutions}>
    <div className="mx-side mb-block">
      <GapStatesContext.Provider
        value={{
          mode: mode,
          gapFeedback: gapFeedback,
          textUserTypedIntoGap: {
            value: textUserTypedIntoGap,
            set: setTextUserTypedIntoGap,
          },
        }}
      >
        {text}
      </GapStatesContext.Provider>
      {/* {mode === 'drag-and-drop' ? (
        <GapSolutionsArea>
          <>
            {gapDragAndDropSolutions
              .filter((entry) => entry.inDroppableId === 'gap-solutions-area')
              .map((dragAndDropSolution, index) => (
                <GapSolution
                  key={index}
                  text={dragAndDropSolution.text}
                  draggableId={dragAndDropSolution.draggableId}
                />
              ))}
          </>
        </GapSolutionsArea>
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
            correct={[...gapFeedback].every((entry) => entry[1].isCorrect)}
          />
        )}
      </div>

      {/* Only debug output from here on */}
      <div className="hidden">
        Gaps state:
        {gapStateList.map((gap, index) => (
          <div key={index}>{JSON.stringify(gap)}</div>
        ))}
      </div>
      <div className="hidden">
        <div>State textUserTypedIntoGap:</div>
        {[...textUserTypedIntoGap].map((entry, index) => {
          const gapId = entry[0]
          const text = entry[1].text
          return (
            <div
              className="ml-5"
              key={index}
            >{`Text: ${text} | GapId: ${gapId}`}</div>
          )
        })}
      </div>
      {/* <div className="hidden">
        {gapDragAndDropSolutions.map((entry, index) => (
          <div
            key={index}
          >{`DraggableId: ${entry.draggableId} | in droppableId: ${entry.inDroppableId} | containing text: ${entry.text}`}</div>
        ))}
      </div> */}
    </div>
  )

  function checkAnswers() {
    if (mode === 'fill-in-the-gap') {
      const newGapAnswersCorrectList = new Map<
        GapId,
        { isCorrect: boolean | undefined }
      >()
      gapStateList.forEach((gapState) => {
        const textUserTypedIntoThisGap =
          textUserTypedIntoGap.get(gapState.gapId)?.text ?? ''
        const isCorrect =
          textUserTypedIntoThisGap === gapState.correctAnswer ||
          textUserTypedIntoThisGap ===
            gapState.alternativeSolutions.find(
              (alternativeSolution) =>
                textUserTypedIntoThisGap === alternativeSolution
            )
        newGapAnswersCorrectList.set(gapState.gapId, {
          isCorrect: isCorrect,
        })
      })

      setGapFeedback(newGapAnswersCorrectList)
    } else if (mode === 'drag-and-drop') {
      // TODO: Check answers in drag-and-drop mode
    }
  }

  // Searches for gap objects in text plugin state. They can be at varying depths.
  function getGapsWithinObject(obj: object): t.TypeOf<typeof GapState>[] {
    if (GapState.is(obj)) {
      return [obj]
    }

    // Recursively search this object's values for gap objects
    return Object.values(obj).reduce(
      (gaps: t.TypeOf<typeof GapState>[], value: unknown) => {
        if (typeof value === 'object' && value !== null) {
          return [...gaps, ...getGapsWithinObject(value)]
        }
        return gaps
      },
      []
    )
  }
}
