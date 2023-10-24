import {
  DndContext,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { createContext, useState } from 'react'

import { GapModeContext } from './context/gap-mode'
import { Feedback } from '../sc-mc-exercise/renderer/feedback'
import { useInstanceData } from '@/contexts/instance-context'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'

export interface GapSolution {
  draggableId: UniqueIdentifier
  text: string
  inDroppableId: UniqueIdentifier
}

const initialGapSolutionList: GapSolution[] = [
  {
    draggableId: 'draggable-1',
    text: 'draggable-1',
    inDroppableId: 'gap-solutions-area',
  },
]

export const GapSolutionList = createContext<GapSolution[] | null>(null)

export function FillInTheGapRenderer(props: {
  text: {
    plugin: string
    state?: unknown
    id?: string | undefined
  }
  mode: string
}) {
  const { text, mode } = props
  // Get gap solutions from text state and initialize content.solutionArea
  const [gapSolutionList, setGapSolutionList] = useState<GapSolution[]>(
    initialGapSolutionList
  )
  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const exStrings = useInstanceData().strings.content.exercises

  return (
    <DndContext
      onDragEnd={(evt) => {
        setGapSolutionList((draggableList) => {
          // Change nothing
          if (!evt.over) return draggableList
          const index = draggableList.findIndex(
            (draggable) => draggable.draggableId === evt.active.id
          )
          if (index === -1) return draggableList
          draggableList[index].inDroppableId = evt.over.id
          return [...draggableList]
        })
      }}
      onDragStart={(evt) => {
        evt.active.id
      }}
    >
      <GapModeContext.Provider value={mode}>
        <GapSolutionList.Provider value={gapSolutionList}>
          <StaticRenderer document={text} />
        </GapSolutionList.Provider>
      </GapModeContext.Provider>
      {mode === 'drag-and-drop' ? (
        <GapSolutionsArea>
          <>
            {gapSolutionList
              .filter(
                (gapSolution) =>
                  gapSolution.inDroppableId === 'gap-solutions-area'
              )
              .map((gapSolution, index) => (
                <GapSolution
                  key={index}
                  text={gapSolution.text}
                  draggableId={gapSolution.draggableId}
                />
              ))}
          </>
        </GapSolutionsArea>
      ) : null}
      {/* Copied from mc-renderer.tsx */}
      <div className="mt-2 flex">
        <button
          className="serlo-button-blue mr-3 h-8"
          onClick={() => {
            setShowFeedback(true)
          }}
        >
          {exStrings.check}
        </button>
        {showFeedback && <Feedback correct />}
      </div>
    </DndContext>
  )
}

export function GapSolution(props: {
  text: string
  draggableId: UniqueIdentifier
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.draggableId,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="inline-block h-full rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2"
    >
      {props.text}
    </div>
  )
}

function GapSolutionsArea(props: { children: JSX.Element }) {
  const { setNodeRef } = useDroppable({
    id: 'gap-solutions-area',
  })

  return (
    <div className="min-h-8 w-full rounded-full bg-slate-100" ref={setNodeRef}>
      {props.children}
    </div>
  )
}
