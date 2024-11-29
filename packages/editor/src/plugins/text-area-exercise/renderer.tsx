import { useRef, useState } from 'react'

import { Blocks } from './blocks'
import { createFeedbackBlock } from './feedback-block'
import { StateContext } from './state-context'
import { createTextBlock } from './text-block'

// Schüly Ansicht
export function TextAreaExerciseRenderer({
  scaffoldingEnabled,
}: {
  scaffoldingEnabled: boolean
}) {
  // Global state
  const [state, setState] = useState({
    blocks: [createTextBlock()],
    // silentMode: boolean,
    // ...
  })

  return (
    <>
      {/* Like global state for all child components to use */}
      <StateContext.Provider value={{ state, setState }}>
        <Blocks />
        <div>Scaffolding {scaffoldingEnabled ? '✅' : '❌'}</div>
      </StateContext.Provider>
    </>
  )
}
