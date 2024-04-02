import { SelfEvaluationExercise } from './self-evaluation-exercise'

export function IceCreamShop() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return null
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={() => {
        return (
          <>
            <h2 className="text-2xl">
              In der besten Eisdiele Bayern gibt es {4} Sorten Eis, die alle
              gleich beliebt sind. Berechne die Wahrscheinlichkeit dafür, dass
              zwei Kunden die gleiche Zusammenstellung für zwei Kugeln Eis
              wählen.
            </h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              test
            </span>
            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </>
        )
      }}
      renderSolution={() => {
        return <>hi</>
      }}
      renderHint={() => {
        return <>Hi</>
      }}
      centAmount={35}
    />
  )
}
