import { Blocks } from './blocks'
import { useTextAreaPluginStateValues } from './text-area-plugin-state-context'

// Schüly Ansicht
export function TextAreaExerciseRenderer() {
  const { allowShowSolution, solution } = useTextAreaPluginStateValues()

  return (
    <>
      <Blocks />
      {allowShowSolution ? <div>Solution: {solution}</div> : null}
    </>
  )
}
