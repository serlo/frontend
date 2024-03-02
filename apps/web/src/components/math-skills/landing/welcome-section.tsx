import { LandingAnimal } from '../landing-animal'
import { NameInput } from '../name-input'
import { getPointsAmount } from '../utils/get-points-amount'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'

export function WelcomeSection() {
  const { data } = useMathSkillsStorage()
  const allPoints = [...data.exercises.values()].reduce((all, current) => {
    return (all += getPointsAmount(current.skillCent))
  }, 0)

  return (
    <>
      <LandingAnimal />
      <div className="mx-auto mb-6 mt-2 text-lg sm:mx-0 sm:w-[26rem] sm:leading-relaxed">
        {data?.name ? (
          <>
            Hallo <b>{data.name}</b>,
            <br />
            schön, dass du hier bist.
            {allPoints ? (
              <>
                <br />
                <br />
                Du hast schon <b>{allPoints}</b> Skill-Punkte gesammelt 🎉
              </>
            ) : null}
            <br />
            <br />
            <b>{allPoints ? "Jetzt geht's weiter" : 'Jetzt bist du dran'}:</b>
            <br />
            Zeige, welche Mathe-Skills du drauf hast!
          </>
        ) : (
          <>
            <b>Willkommen!</b>
            <br />
            <br />
            Hier geht es darum, Mathe zu können und das zu zeigen. Das dürfen
            auch kleine Sachen sein.
            <br />
            Jeder Skill gibt Vertrauen, weiterzulernen.
            <br />
            Schritt für Schritt.
            <br />
            <br />
            <b>Wie heißt du?</b>
            <NameInput />
          </>
        )}
      </div>
    </>
  )
}
