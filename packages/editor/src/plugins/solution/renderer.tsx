import { useState } from 'react'

import { BoxRenderer } from '../box/renderer'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { cn } from '@serlo/frontend/src/helper/cn'

interface SolutionRendererProps {
  prerequisite: JSX.Element | null
  strategy: JSX.Element | null
  steps: JSX.Element | null
  solutionVisibleOnInit: boolean
  hideToggle?: boolean
  onSolutionOpen?: () => void
  elementAfterToggle?: JSX.Element | null
  elementBeforePrerequisite?: JSX.Element | null
}

export function SolutionRenderer({
  prerequisite,
  strategy,
  steps,
  solutionVisibleOnInit,
  hideToggle,
  onSolutionOpen,
  elementAfterToggle,
  elementBeforePrerequisite,
}: SolutionRendererProps) {
  const { strings } = useInstanceData()

  const [solutionVisible, setSolutionVisible] = useState(solutionVisibleOnInit)

  return (
    <>
      <div className="flex">
        {renderSolutionToggle()}
        {elementAfterToggle}
      </div>
      {solutionVisible && renderSolutionContent()}
    </>
  )

  function renderSolutionContent() {
    return (
      <div className="serlo-solution-box">
        {elementBeforePrerequisite}
        {prerequisite ? (
          <p className="serlo-p">
            {strings.content.exercises.prerequisite} {prerequisite}
          </p>
        ) : null}
        {strategy ? (
          <BoxRenderer boxType="approach" anchorId="strategy">
            <>{strategy}</>
          </BoxRenderer>
        ) : null}
        {steps}
      </div>
    )
  }

  function renderSolutionToggle() {
    if (hideToggle) return null

    return (
      <button
        className={cn(
          'serlo-button-blue-transparent mb-4 ml-side mr-auto pr-2 text-base',
          solutionVisible && 'bg-brand text-white'
        )}
        onClick={() => {
          setSolutionVisible(!solutionVisible)
          if (!solutionVisible && onSolutionOpen) onSolutionOpen()
        }}
      >
        <span className="w-3.5">{solutionVisible ? '▾' : '▸'}&nbsp;</span>
        {
          strings.content.exercises[
            solutionVisible ? 'hideSolution' : 'showSolution'
          ]
        }
      </button>
    )
  }
}
