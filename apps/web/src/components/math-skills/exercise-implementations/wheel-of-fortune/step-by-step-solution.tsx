import { faFilm } from '@fortawesome/free-solid-svg-icons'
import * as confetti from 'canvas-confetti'
import { useState } from 'react'

import { type WofData } from './wheel-of-fortune-step-by-step'
import { animalsData } from '../../utils/animal-data'
import { getGcd } from '../../utils/get-gcd'
import { buildBlock, buildFrac } from '../../utils/math-builder'
import { useMathSkillsStorage } from '../../utils/math-skills-data-context'
import { FaIcon } from '@/components/fa-icon'
import { arrayOfLength } from '@/helper/array-of-length'
import { cn } from '@/helper/cn'

// const correctStrings = [
//   'Genau!',
//   'Super.',
//   'Richtig!',
//   'Genau so!',
//   'Top 👌',
//   'Läuft bei dir.',
// ]
function reduceFrac(numbers: [number, number]) {
  const gcd = getGcd(numbers[0], numbers[1])
  return [numbers[0] / gcd, numbers[1] / gcd]
}

export function StepByStepFeedback({ data }: { data: WofData }) {
  const [feedback, setFeedback] = useState<{
    element: JSX.Element | null | string
    isCorrect?: boolean
  }>({ element: null })
  const [step, setStep] = useState(0)
  const { animal, name } = useMathSkillsStorage().data
  const { sections } = data

  const yellow = sections.filter(Boolean).length
  const blue = sections.length - yellow
  const result = [
    yellow * yellow + blue * blue,
    sections.length * sections.length,
  ]
  const resultSimplified = reduceFrac([result[0], result[1]])

  return (
    <div>
      <div className="mx-side py-6 text-lg">
        <b>✌️ Schritt für Schritt</b>

        {step === 0 ? (
          <>
            <h2 className="mr-12 mt-2 pb-5 text-2xl text-almost-black">
              Wir fangen ganz einfach an und sammeln alle Infos die wir
              brauchen:
            </h2>
            <p>Wie viele Felder hat das Rad?</p>

            <div className="my-4 flex items-center">
              {arrayOfLength(8).map((_, index) => {
                return renderSegmentAnswerOption(index + 1, sections.length)
              })}
            </div>
            {renderFeedback()}
          </>
        ) : null}

        {step === 1 ? (
          <>
            <h2 className="mr-12 mt-2 pb-5 text-2xl text-almost-black">
              Genau!
              <ul className="serlo-ul">
                <li>{sections.length} Felder auf dem Rad.</li>
              </ul>
            </h2>
            <p>
              Und wie viele Felder haben den <b>gelben Preis</b>?
            </p>

            <div className="my-4 flex items-center">
              {arrayOfLength(sections.length).map((_, index) => {
                return renderSegmentAnswerOption(index + 1, yellow)
              })}
            </div>
            {renderFeedback()}
          </>
        ) : null}

        {step === 2 || step === 3 ? (
          <>
            <h2 className="mr-12 mt-2 pb-5 text-2xl text-almost-black">
              Merkliste:
              <ul className="serlo-ul">
                <li>
                  <b>{sections.length} Felder</b> auf dem Rad
                </li>
                <li>
                  <b>{yellow} gelbe Felder</b>
                </li>
              </ul>
            </h2>
            <p>
              Als ersten wollen wir nur rausfinden, wie wahrscheinlich es ist
              beim ersten Drehen auf einem <b>gelben Feld</b> zu landen.
              <br /> <br />
              Jedes mal Drehen entspricht einem{' '}
              <a
                className="serlo-link"
                href="https://de.serlo.org/mathe/142018/laplace-experiment"
                target="_blank"
                rel="noreferrer"
              >
                Laplace-Experiment <FaIcon icon={faFilm} />
              </a>
              .<br />
              Das heißt es gilt diese Formel:
              {buildBlock(
                'gray',
                <>
                  P(gelb) ={' '}
                  {buildFrac(
                    <>Anzahl der gesuchten Ereignisse</>,
                    <>
                      {step === 2
                        ? 'Anzahl aller möglichen Ereignisse'
                        : sections.length}
                    </>
                  )}
                </>
              )}
              <br />
              <br />
              <p>
                {step === 2 ? (
                  <>
                    Was musst du für die{' '}
                    <b>Anzahl aller möglichen Ereignisse</b> einsetzen?
                  </>
                ) : (
                  <>
                    Genau! Jedes der {sections.length} Felder kann vom Rad
                    ausgewählt werden.
                    <br />
                    <br />
                    Bleibt nur noch die Frage, was die{' '}
                    <b>Anzahl der gesuchten Ereignisse</b> ist.
                    <br />
                  </>
                )}
              </p>
            </p>

            <div className="my-4 flex items-center">
              {step === 2 ? (
                arrayOfLength(8).map((_, index) => {
                  return renderSegmentAnswerOption(index + 1, sections.length)
                })
              ) : (
                <>
                  {renderAnswerOption(
                    <>
                      {sections.length}
                      <br />
                      (Alle Felder)
                    </>
                  )}
                  {renderAnswerOption(
                    <>
                      {yellow}
                      <br />
                      (Anzahl der gelben Felder)
                    </>,
                    true
                  )}
                  {renderAnswerOption(
                    <>
                      {blue}
                      <br />
                      (Anzahl der blauen Felder)
                    </>
                  )}
                </>
              )}
            </div>
            {renderFeedback()}
          </>
        ) : null}

        {step === 4 ? (
          <>
            <h2 className="mr-12 mt-2 pb-5 text-2xl text-almost-black">
              Merkliste:
              <ul className="serlo-ul">
                <li>
                  <b>{sections.length} Felder</b> auf dem Rad
                </li>
                <li>
                  <b>{yellow} gelbe Felder</b>
                </li>
                <li>
                  {buildBlock(
                    'gray',
                    <>P(gelb) = {buildFrac(yellow, sections.length)}</>
                  )}
                </li>
              </ul>
            </h2>
            <p>
              Perfekt! Jetzt weiß du wie wahrscheinlich ein gelbes Feld beim
              ersten Drehen ist 🎉.
              <br /> <br />
              Mit welcher Formel kannst du ausrechnen wie wahrscheinlich bei{' '}
              <b>zweimal drehen beide Male auf einem gelben Feld</b> zu landen?
              <br />
            </p>
            <div className="my-4 flex items-center">
              {renderAnswerOption(
                <>
                  {buildFrac(yellow, sections.length)} ·{' '}
                  {buildFrac(yellow, sections.length)}
                </>,
                true,
                <></>
              )}
              {blue !== yellow
                ? renderAnswerOption(
                    <>
                      {buildFrac(yellow, sections.length)} ·{' '}
                      {buildFrac(blue, sections.length)}
                    </>,
                    false,
                    <>
                      Leider nein. Denk dran, dass der Wahrscheinlichkeiten bei
                      Laplace-Experimenten <b>jedes mal gleich sind</b>, egal
                      wie der vorherige Versuch ausgegangen ist.
                    </>
                  )
                : null}
              {renderAnswerOption(
                <>
                  {buildFrac(yellow, sections.length)} ·{' '}
                  {buildFrac(yellow - 1 ?? 1, sections.length)}
                </>,
                false,
                <>
                  Leider nein. Denk dran, dass der Wahrscheinlichkeiten bei
                  Laplace-Experimenten <b>jedes mal gleich sind</b>, egal wie
                  der vorherige Versuch ausgegangen ist.
                </>
              )}
            </div>
            {renderFeedback()}
          </>
        ) : null}

        {step === 5 ? (
          <>
            <h2 className="mr-12 mt-2 pb-5 text-2xl text-almost-black">
              Merkliste:
              <ul className="serlo-ul">
                <li>
                  <b>{sections.length} Felder</b> auf dem Rad
                </li>
                <li>
                  <b>{yellow} gelbe Felder</b>
                </li>
                <li>
                  {buildBlock(
                    'gray',
                    <>
                      P(gelb; gelb) = {buildFrac(yellow, sections.length)} ·{' '}
                      {buildFrac(yellow, sections.length)}
                    </>
                  )}
                </li>
              </ul>
            </h2>
            <p>
              Genau{name ? ' ' + name : ''}!
              <br />
              <br />
              Jetzt wird noch mal bisschen knifflig, wie lautet die Formel für
              die Wahrscheinlichkeit, dass das Rad beide Male auf einem{' '}
              <b>blauen Feld</b> landet?
            </p>
            <div className="my-4 flex items-center">
              {yellow !== blue
                ? renderAnswerOption(
                    <>
                      {buildFrac(yellow, sections.length)} ·{' '}
                      {buildFrac(yellow, sections.length)}
                    </>,
                    false,
                    'Leider nein. Das ist die Formel für die gelben Felder. Setze jeweils die Anzahl der blauen Felder ein, dann hast du die Lösung.'
                  )
                : null}
              {renderAnswerOption(
                <>
                  {buildFrac(blue, sections.length)} ·{' '}
                  {buildFrac(blue, sections.length)}
                </>,
                true,
                <></>
              )}
              {yellow !== blue
                ? renderAnswerOption(
                    <>
                      {buildFrac(blue, sections.length)} ·{' '}
                      {buildFrac(yellow, sections.length)}
                    </>,
                    false,
                    <>
                      Leider nein. Damit könntest du Ausrechnen wie
                      wahrscheinlich es ist erst auf Blau und dann auf Gelb zu
                      landen. Das wird später bestimmt auch noch kommen 🙃
                    </>
                  )
                : null}
              {renderAnswerOption(
                <>
                  {buildFrac(blue + 1, sections.length)} ·{' '}
                  {buildFrac(blue + 1, sections.length)}
                </>,
                false,
                <>
                  Leider nein. Die Anzahl der blauen Felder muss zweimal
                  vorkommen in der Formel.
                </>
              )}
            </div>
            {renderFeedback()}
          </>
        ) : null}

        {step === 6 ? (
          <>
            <h2 className="mr-12 mt-2 pb-5 text-2xl text-almost-black">
              {buildBlock(
                'gray',
                <>
                  P(beide gleich) = {buildFrac(yellow, sections.length)} ·{' '}
                  {buildFrac(yellow, sections.length)} +{' '}
                  {buildFrac(blue, sections.length)} ·{' '}
                  {buildFrac(blue, sections.length)}
                </>
              )}
            </h2>
            <p>
              Jetzt hast du&lsquo;s fast geschafft!
              <br />
              <br />
              Die einzigen Möglichkeiten für zwei gleiche Preise (gelb; gelb)
              und (blau; blau) hast du jetzt vorbereitet und musst die nur noch
              zusammenzählen um auf die Antwort zu kommen.
              <br />
              <br />
              Eine Möglichkeit ist z.B. erst zu multiplizieren, dann wäre die
              richige Antwort:
            </p>
            <div className="my-4 flex items-center">
              {renderAnswerOption(
                <>
                  {buildFrac(
                    yellow + yellow,
                    sections.length * sections.length
                  )}{' '}
                  + {buildFrac(blue + blue, sections.length * sections.length)}
                </>,
                false,
                <>
                  Denk dran, wenn du Brücke multiplizierst musst du{' '}
                  <b>Nenner und Zähler jeweils miteinander multiplizieren</b>.
                </>
              )}
              {renderAnswerOption(
                <>
                  {buildFrac(yellow * yellow, sections.length)} +{' '}
                  {buildFrac(blue * blue, sections.length)}
                </>,
                false,
                <>
                  Denk dran, wenn du Brücke multiplizierst musst du{' '}
                  <b>Nenner und Zähler jeweils miteinander multiplizieren</b>.
                </>
              )}
              {renderAnswerOption(
                <>
                  {buildFrac(
                    yellow * yellow,
                    sections.length * sections.length
                  )}{' '}
                  + {buildFrac(blue * blue, sections.length * sections.length)}
                </>,
                true,
                <></>
              )}
            </div>
            {renderFeedback()}
          </>
        ) : null}

        {step === 7 ? (
          <>
            <h2 className="mr-12 mt-2 pb-5 text-2xl text-almost-black">
              {buildBlock(
                'gray',
                <>
                  P(beide gleich) ={' '}
                  {buildFrac(
                    yellow * yellow,
                    sections.length * sections.length
                  )}
                  {' + '}
                  {buildFrac(blue * blue, sections.length * sections.length)}
                </>
              )}
            </h2>
            <p className="xl">
              Super!
              <br />
              Jetzt nur noch addieren
              {result[0] !== resultSimplified[0] ? 'und vereinfachen ' : ''}.
            </p>
            <div className="my-4 flex items-center">
              {result[0] !== resultSimplified[0]
                ? renderAnswerOption(
                    <>{buildFrac(result[0], result[1])}</>,
                    false,
                    <>
                      Das stimmt! Aber kannst du den Bruch noch mal
                      vereinfachen?
                    </>
                  )
                : null}
              {renderAnswerOption(
                <>{buildFrac(resultSimplified[0], resultSimplified[1])}</>,
                true,
                <>
                  {name ? name + ' ' : ''}Du hast es geschafft!
                  <br />
                  Trage dein Ergebnis jetzt oben bei der Aufgabe ein.
                </>,
                true
              )}
              {renderAnswerOption(
                <>{buildFrac(result[0] + 1, result[1])}</>,
                false,
                <>
                  Das stimmt leider nur fast{' '}
                  <span className="not-italic">🙃</span>
                </>
              )}
            </div>
            {renderFeedback()}
          </>
        ) : null}
      </div>
    </div>
  )

  function renderFeedback() {
    return (
      <div className="text-lg">
        {feedback.element ? (
          <span
            className={cn(
              'inline-block',
              feedback.isCorrect ? 'animate-jump' : 'animate-shake'
            )}
          >
            {animalsData[animal].emoji} <i>{feedback.element}</i>
          </span>
        ) : (
          <>&nbsp;</>
        )}
      </div>
    )
  }

  function renderSegmentAnswerOption(amount: number, correctAmount: number) {
    return (
      <button
        className={cn(
          'mr-3 inline-flex aspect-square items-center justify-around rounded-lg text-center font-bold',
          'w-12 bg-gray-200 outline outline-[3px] outline-animal hover:opacity-80'
        )}
        onClick={() => {
          setFeedback({ element: null })
          setTimeout(() => {
            if (amount === correctAmount) {
              setFeedback({ element: null })
              setStep(step + 1)
            }
            if (amount < correctAmount) {
              setFeedback({
                element: "So wenige? Zähl' in der Darstellung noch mal nach.",
              })
            }
            if (amount > correctAmount) {
              setFeedback({
                element: "So viele? Zähl' in der Darstellung noch mal nach.",
              })
            }
          })
        }}
      >
        {amount}
      </button>
    )
  }

  function renderAnswerOption(
    text: string | JSX.Element,
    isCorrect?: boolean,
    feedback?: string | JSX.Element,
    final?: boolean
  ) {
    return (
      <button
        className={cn(
          'mr-3 inline-flex items-center justify-around rounded-lg px-3 text-center font-bold',
          'bg-gray-200 outline outline-[3px] outline-animal hover:opacity-80'
        )}
        onClick={() => {
          setFeedback({ element: null })
          setTimeout(() => {
            if (isCorrect && !final) {
              setFeedback({ element: null })
              setStep(step + 1)
            } else {
              setFeedback({
                element:
                  feedback ??
                  `Stimmt nicht. Damit würdest du nicht ausrechnen, wie wahrscheinlich das Rad auf einem gelben Feld stehenbleibt.`,
                isCorrect,
              })
              if (final && isCorrect) {
                void confetti.default()
              }
            }
          })
        }}
      >
        {text}
      </button>
    )
  }
}
