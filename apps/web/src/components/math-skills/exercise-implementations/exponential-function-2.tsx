import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NameInput } from '../name-input'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { buildFrac } from '../utils/math-builder'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomIntBetween } from '@/helper/random-int-between'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function ExponentialFunctionTime() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useMathSkillsStorage()
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          Jahr_Anlage: randomIntBetween(1995, 2006),
          Geld_Ende: randomIntBetween(60, 75) * 100,
          Zins: randomIntBetween(3, 6),
          Money_Start: randomIntBetween(45, 55) * 100,
        }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={({ Jahr_Anlage, Money_Start, Zins, Geld_Ende }) => {
        return (
          <>
            <h2 className="text-2xl">Rechnen mit der Exponentialfunktion</h2>
            <br />
            <br />
            {data.name} hat {Money_Start} € im Jahr {Jahr_Anlage} angelegt.
            Jedes Jahr wurde das Kapital mit {Zins} % verzinst, sodass das
            Kapital am Ende {Geld_Ende} € betragen hat.
            <br />
            <br />
            Berechne, wie viele Jahre das Geld angelegt wurde.
            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderSolution={({ Jahr_Anlage }) => {
        return <></>
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderHint={() => {
        return (
          <>
            Das angelegte Geld kann mit einer Exponentialfunktion beschrieben
            werden.
          </>
        )
      }}
      centAmount={35}
    />
  )
}
