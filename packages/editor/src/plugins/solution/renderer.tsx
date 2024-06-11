import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useState } from 'react'

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

  const [visible, setVisible] = useState<false | 'solution' | 'strategy'>(
    solutionVisibleOnInit ? 'solution' : false
  )

  return (
    <>
      <nav>
        {hideToggle ? null : (
          <>
            {strategy ? renderToggle('strategy') : null}{' '}
            {renderToggle('solution')}
          </>
        )}
        {elementAfterToggle}
      </nav>
      <div className={cn('serlo-solution-box', visible ? '' : 'hidden')}>
        <div className={cn(visible === 'solution' ? '' : 'hidden')}>
          {renderSolutionContent()}
        </div>
        <div className={cn(visible === 'strategy' ? '' : 'hidden')}>
          {strategy}
        </div>
      </div>
    </>
  )

  function renderSolutionContent() {
    return (
      <>
        {elementBeforePrerequisite}
        {prerequisite ? (
          <p className="serlo-p">
            {strings.content.exercises.prerequisite} {prerequisite}
          </p>
        ) : null}
        {steps}
      </>
    )
  }

  function renderToggle(type: 'solution' | 'strategy') {
    const isVisible = visible === type
    return (
      <button
        className={cn(
          'serlo-button-blue-transparent mb-4 ml-side mr-auto pr-2 text-base hover:bg-brand-100 hover:text-brand-700',
          isVisible && 'bg-brand text-white'
        )}
        onClick={() => {
          if (isVisible) setVisible(false)
          else {
            setVisible(type)
            if (type === 'solution' && onSolutionOpen) onSolutionOpen()
          }
        }}
      >
        <span className="w-3.5">
          <span
            className={cn(
              'inline-block transition-transform duration-300',
              isVisible && 'translate-y-[1px] rotate-180'
            )}
          >
            ▾
          </span>
          &nbsp;
        </span>
        {strings.content.exercises[type]}
      </button>
    )
  }
}
