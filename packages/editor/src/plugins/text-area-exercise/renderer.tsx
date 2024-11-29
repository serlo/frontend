import { Blocks } from './blocks'

// Schüly Ansicht
export function TextAreaExerciseRenderer({
  scaffoldingEnabled,
}: {
  scaffoldingEnabled: boolean
}) {
  return (
    <>
      <Blocks />
      {/* <div>Scaffolding {scaffoldingEnabled ? '✅' : '❌'}</div> */}
    </>
  )
}
