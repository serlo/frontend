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
      <div className="mb-6 mt-2 max-w-[26rem] text-lg sm:leading-relaxed">
        {data?.name ? (
          <p className="sm:min-w-[420px]">
            Hallo <b>{data.name}</b>,
            <br />
            schön, dass du hier bist.
            {allPoints ? (
              <>
                <br />
                <br />
                Du hast schon{' '}
                {allPoints === 1 ? (
                  <>
                    <b>einen Skill-Punkt</b>
                  </>
                ) : (
                  <>
                    <b>{allPoints}</b> Skill-Punkte
                  </>
                )}{' '}
                gesammelt 🎉
              </>
            ) : null}
            <br />
            <br />
            {allPoints ? (
              <>
                <b>Jetzt bist du dran:</b>
                <br />
                Was magst du als Erstes probieren?
              </>
            ) : (
              <>
                <b>Jetzt geht&apos;s weiter:</b>
                <br />
                Was magst du probieren?
              </>
            )}
            {/* Zeige, welche Mathe-Skills du drauf hast! */}
          </p>
        ) : (
          <>
            <b>Willkommen!</b>
            <br />
            <br />
            Entdecke unterschiedliche Lernpfade und starte deine Reise durch
            diverse Bereiche der Mathematik.
            <br />
            <br />
            Baue dabei deine Mathe-Skills auf gewinne Sicherheit.
            <br />
            {/* <b>Willkommen!</b>
            <br />
            <br />
            Hier geht es darum, Mathe zu können und das zu zeigen. Das dürfen
            auch kleine Sachen sein.
            <br />
            Jeder Skill gibt Vertrauen, weiterzulernen.
            <br />
            Schritt für Schritt. */}
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
