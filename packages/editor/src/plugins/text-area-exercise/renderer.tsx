import { cn } from '@editor/utils/cn'
import { useState } from 'react'

import { Blocks } from './blocks'
import { useTextAreaPluginStateValues } from './use-text-area-plugin-state-values'

// Schüly Ansicht
export function TextAreaExerciseRenderer() {
  const { solutionStrategy, allowShowSolutionStrategy } =
    useTextAreaPluginStateValues()
  const [showStrategy, setShowStrategy] = useState(false)

  return (
    <>
      <Blocks />
      {allowShowSolutionStrategy ? (
        <>
          <button
            className={cn(
              'serlo-button-learner-transparent mb-4 ml-side mr-auto pr-2 text-base hover:bg-brand-100 hover:text-brand-700',
              showStrategy && 'bg-brand text-white'
            )}
            onClick={() => {
              setShowStrategy((previousValue) => !previousValue)
            }}
          >
            <span className="mr-1 w-3.5">
              <span
                className={cn(
                  'inline-block transition-transform duration-300',
                  showStrategy && 'translate-y-[1px] rotate-180'
                )}
              >
                ▾
              </span>
              &nbsp;
            </span>
            Lösungsstrategie
          </button>
          {showStrategy ? (
            <div className="serlo-solution-box p-3">
              <div className="solution">{solutionStrategy}</div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  )
}
