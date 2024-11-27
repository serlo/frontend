export function TextAreaExerciseRenderer({
  scaffoldingEnabled,
}: {
  scaffoldingEnabled: boolean
}) {
  return (
    <>
      <textarea
        rows={3}
        className="mx-side my-5 w-full resize-y rounded-xl border border-brand bg-brand-50 p-2"
      ></textarea>
      <div>Scaffolding {scaffoldingEnabled ? '✅' : '❌'}</div>
    </>
  )
}
