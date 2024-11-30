import { Blocks } from './blocks'
import { useTextAreaPluginStateValues } from './use-text-area-plugin-state-values'

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
