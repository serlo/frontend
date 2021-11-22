import clsx from 'clsx'
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Fragment,
  useEffect,
} from 'react'

import { Feedback } from '../components/content/exercises/feedback'
import { ExerciseNumbering } from '@/components/content/exercises/exercise-numbering'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { shuffleArray } from '@/helper/shuffle-array'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  return (
    <>
      <h1 className="serlo-h1 mt-16 mb-20">Lückentext</h1>
      <ExerciseNumbering index={0} href="" />
      <GapEx choices={['Prozentpunkte', 'Prozent']} count={1}>
        <p className="serlo-p mb-block">Ergänze folgende Lücke:</p>
        <p className="serlo-p mb-block">
          Im Jahr 2007 wurde die Umsatzsteuer von 16% auf 19% erhöht. Die Steuer
          stieg also um 3 <Gappy index={0} />.
        </p>
      </GapEx>
      <div className="h-12" />
      <ExerciseNumbering index={1} href="" />
      <GapEx
        choices={['42', '10', '45', '15', '450', '440', '0,772', '0,75', '700']}
      >
        <p className="serlo-p mb-block">Ergänze folgende Lücke:</p>
        <table className="serlo-table serlo-p">
          <tbody>
            <tr>
              <th className="serlo-th">Prozentsatz</th>
              <th className="serlo-th">Prozentwert</th>
              <th className="serlo-th">Grundwert</th>
            </tr>
            <tr>
              <td className="serlo-td">28%</td>
              <td className="serlo-td">
                <Gappy index={0} /> €
              </td>
              <td className="serlo-td">150 €</td>
            </tr>
            <tr>
              <td className="serlo-td">12,5 %</td>
              <td className="serlo-td">
                <Gappy index={1} /> kg
              </td>
              <td className="serlo-td">80 kg</td>
            </tr>
            <tr>
              <td className="serlo-td">
                <Gappy index={2} /> %
              </td>
              <td className="serlo-td">162 cm</td>
              <td className="serlo-td">360 cm</td>
            </tr>
            <tr>
              <td className="serlo-td">
                <Gappy index={3} /> %
              </td>
              <td className="serlo-td">6,81 €</td>
              <td className="serlo-td">45,40 €</td>
            </tr>
            <tr>
              <td className="serlo-td">18 %</td>
              <td className="serlo-td">81 cm</td>
              <td className="serlo-td">
                <Gappy index={4} /> cm
              </td>
            </tr>
            <tr>
              <td className="serlo-td">37,5 %</td>
              <td className="serlo-td">165 g</td>
              <td className="serlo-td">
                <Gappy index={5} /> g
              </td>
            </tr>
            <tr>
              <td className="serlo-td">0,8 %</td>
              <td className="serlo-td">
                <Gappy index={6} /> cm²
              </td>
              <td className="serlo-td">96,5 cm²</td>
            </tr>
            <tr>
              <td className="serlo-td">
                <Gappy index={7} /> %
              </td>
              <td className="serlo-td">16,5 €</td>
              <td className="serlo-td">2200 €</td>
            </tr>
            <tr>
              <td className="serlo-td">120 %</td>
              <td className="serlo-td">840 g</td>
              <td className="serlo-td">
                <Gappy index={8} /> g
              </td>
            </tr>
          </tbody>
        </table>
      </GapEx>
      <div className="h-12" />
      <ExerciseNumbering index={2} href="" />
      <p className="serlo-p">Fülle die Lücken</p>
      <div className="mt-12 ml-16">
        <ExerciseNumbering isChild index={0} href="" />
        <GapEx choices={['Grundwert', 'Prozentwert', 'Prozentsatz']}>
          <p className="serlo-p mb-block">
            Von 500 Nüssen, die ein Wichhörnchen vergräbt, sind 200 davon
            Haselnüsse. Das sind 40% der Nüsse.
          </p>
          <p className="serlo-p mb-block">
            500 Nüsse ≙ <Gappy index={0} />
          </p>
          <p className="serlo-p mb-block">
            200 Haselnüsse ≙ <Gappy index={1} />
          </p>
          <p className="serlo-p mb-block">
            40 % ≙ <Gappy index={2} />
          </p>
        </GapEx>
        <div className="h-12" />
        <ExerciseNumbering isChild index={1} href="" />
        <GapEx choices={['Prozentwert', 'Grundwert', 'Prozentsatz']}>
          <p className="serlo-p mb-block">
            Von 200 Haselnüssen findet das Eichhörnchen 180 wieder. Das sind
            90%.
          </p>
          <p className="serlo-p mb-block">
            180 Haselnüsse ≙ <Gappy index={0} />
          </p>
          <p className="serlo-p mb-block">
            200 Haselnüsse ≙ <Gappy index={1} />
          </p>
          <p className="serlo-p mb-block">
            90 % ≙ <Gappy index={2} />
          </p>
        </GapEx>
        <div className="h-12" />
        <ExerciseNumbering isChild index={2} href="" />
        <GapEx
          choices={[
            'Grundwert',
            '(ohne Fachbegriff)',
            'Prozentwert',
            'Prozentsatz',
          ]}
        >
          <p className="serlo-p mb-block">
            Im Jahr darauf hat das Eichhörnchen 400 Nüsse als Wintervorrat
            vergrabe. 500 Nüsse findet es. 100 Nüsse sind vom Vorjahr oder
            anderen Eichhörnchen. Das Eichhörnchen hat also 125% der Nüsse
            wiedergefunden.
          </p>
          <p className="serlo-p mb-block">
            400 Nüsse ≙ <Gappy index={0} />
          </p>
          <p className="serlo-p mb-block">
            100 Nüsse ≙ <Gappy index={1} />
          </p>
          <p className="serlo-p mb-block">
            500 Nüsse ≙ <Gappy index={2} />
          </p>
          <p className="serlo-p mb-block">
            125 % ≙ <Gappy index={3} />
          </p>
        </GapEx>
      </div>
      <div className="h-12" />
      <ExerciseNumbering index={3} href="" />
      <GapEx
        choices={['25', '9,60', '117,60', '33', '12,80', '588', '120']}
        count={3}
      >
        <p className="serlo-p mb-block">Ergänze die Lücken.</p>
        <p className="serlo-p mb-block">
          Maria möchte sich von ihren Ersparnissen ein Mountainbike kaufen,
          dessen Preis von 640€ auf 480€ reduziert wurde. Der Preis wurde um
          <Gappy index={0} /> % gesenkt.
        </p>
        <p className="serlo-p mb-block">
          Maria zahlt bar und erhält 2% Skonto, also einen zusätzlichen Rabatt
          in Höhe von 2%. Sie zahlt also <Gappy index={1} /> € weniger.
        </p>
        <p className="serlo-p mb-block">
          Als Maria heimkommt, ermahne sie ihre Eltern &quot;Das Rad war aber
          ganz schön teuer! Auch mit den ganzen Rabatten hast du jetzt 80%
          deiner Ersparnisse verprasselt. Pass auf dein restliches Geld gut
          auf!&quot; Marias Ersparnisse sind noch <Gappy index={2} /> €.
        </p>
      </GapEx>
      <div className="h-12" />
      <ExerciseNumbering index={4} href="" />
      <GapEx
        choices={[
          'Prozentrechnung',
          'Kapital',
          'Zinsen',
          'Zinssatz',
          'Zinseszins',
        ]}
      >
        <p className="serlo-p mb-block">Fülle die Lücken.</p>
        <p className="serlo-p mb-block">
          Die Zinsrechnung ist eine besondere Art der <Gappy index={0} />. Der
          Grundwert heißt in der Zinsrechnung <Gappy index={1} />; der
          Prozentwert wird als <Gappy index={2} /> bezeichnet. Der Prozentsatz
          heißt hier <Gappy index={3} />. Als
          <Gappy index={4} /> bezeichnet man die Verzinsung bereits verzinsten
          Kapitals.
        </p>
      </GapEx>
    </>
  )
}

interface GapProps {
  mode:
    | 'inactive'
    | 'selected'
    | 'filled'
    | 'filled-selected'
    | 'right'
    | 'wrong'
    | 'choice'
    | 'choice-inactive'
  text?: string
  onClick?: () => void
}

function Gap({ mode, text, onClick }: GapProps) {
  if (mode == 'inactive') {
    return (
      <span
        className={clsx(
          'w-20 border-black border rounded bg-gray-50',
          'inline-block h-6 mx-1 -mb-1.5 cursor-pointer'
        )}
        onClick={onClick}
      ></span>
    )
  }
  if (mode == 'selected') {
    return (
      <span
        className={clsx(
          'w-20 border-brand border-2 rounded bg-brand-100',
          'inline-block h-6 mx-1 -mb-1.5 animate-pulse'
        )}
      ></span>
    )
  }
  if (mode == 'choice') {
    return (
      <span
        className={clsx(
          'border-black border rounded bg-brand-100 inline-block',
          'h-6 mx-1 px-2 select-none cursor-pointer'
        )}
        onClick={onClick}
      >
        {text}
      </span>
    )
  }
  if (mode == 'choice-inactive') {
    return (
      <span
        className={clsx(
          'border-gray-200 border rounded bg-gray-100 inline-block',
          'h-6 mx-1 px-2 select-none text-gray-400 cursor-pointer'
        )}
        onClick={onClick}
      >
        {text}
      </span>
    )
  }
  if (mode == 'filled') {
    return (
      <span
        className={clsx(
          'border-black border rounded bg-brand-100 inline-block',
          'h-6 mx-1 px-2 select-none cursor-pointer'
        )}
        onClick={onClick}
      >
        {text}
      </span>
    )
  }
  if (mode == 'filled-selected') {
    return (
      <span
        className={clsx(
          'border-brand border-2 rounded bg-brand-100 inline-block',
          'h-6 mx-1 px-2 select-none cursor-pointer animate-pulse'
        )}
        onClick={onClick}
      >
        {text}
      </span>
    )
  }
  if (mode == 'right') {
    return (
      <span
        className={clsx(
          'border-black border rounded bg-green-100 inline-block',
          'h-6 mx-1 px-2 select-none'
        )}
      >
        {text}
      </span>
    )
  }
  if (mode == 'wrong') {
    return (
      <span
        className={clsx(
          'border-black border rounded bg-red-100 inline-block',
          'h-6 mx-1 px-2 select-none'
        )}
      >
        {text}
      </span>
    )
  }
  return null
}

interface GapContext {
  selected: number
  choices: string[]
  filled: number[]
  checked: boolean
  select: (i: number) => void
  deselect: (i: number) => void
}

const GapContext = createContext<GapContext | null>(null)

interface GapExProps {
  choices: string[]
  children: ReactNode
  count?: number
}

function GapEx({ choices, children, count }: GapExProps) {
  const gapCount = count ?? choices.length

  const [selected, setSelected] = useState(-1)
  const [filled, setFilled] = useState<number[]>(Array(gapCount).fill(-1))
  const [checked, setChecked] = useState(false)

  const [sortedChoices, setSortedChoices] = useState(() => {
    const copy = choices.slice(0)
    copy.sort()
    return copy
  })

  useEffect(() => {
    setSortedChoices(shuffleArray(sortedChoices))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function select(i: number) {
    setSelected(i)
  }

  function deselect(i: number) {
    setSelected(i)
    const filledCopy = filled.slice(0)
    filledCopy[i] = -1
    setFilled(filledCopy)
  }

  const alright = checked && filled.every((v, i) => v == i)

  const allfilled = filled.every((i) => i >= 0)

  return (
    <GapContext.Provider
      value={{ selected, choices, filled, checked, select, deselect }}
    >
      {children}
      <p className="serlo-p mb-block">
        {sortedChoices.map((c) => {
          return (
            <Fragment key={c}>
              <Gap
                text={c}
                mode={
                  filled.some((i) => choices[i] == c) || allfilled
                    ? 'choice-inactive'
                    : 'choice'
                }
                onClick={() => {
                  if (selected == -1 && allfilled) return

                  let toFill = selected
                  if (toFill < 0) {
                    toFill = 0
                    while (filled[toFill] >= 0) toFill++
                  }

                  const filledCopy = filled.slice(0)
                  const choiceIndex = choices.indexOf(c)
                  if (filledCopy.indexOf(choiceIndex) >= 0) {
                    filledCopy[filledCopy.indexOf(choiceIndex)] = -1
                  }
                  filledCopy[toFill] = choiceIndex

                  setFilled(filledCopy)

                  if (allfilled) {
                    if (filledCopy.every((x) => x >= 0)) {
                      setSelected(-1)
                      return
                    }
                  }

                  let next = toFill
                  do {
                    next++
                    if (next >= gapCount) {
                      next = 0
                    }
                    if (next == toFill) {
                      setSelected(-1)
                      return
                    }
                  } while (filledCopy[next] >= 0)
                  setSelected(next)
                }}
              />
            </Fragment>
          )
        })}
      </p>
      {checked && (
        <div className="mx-side">
          {' '}
          <Feedback correct={alright}>
            {alright
              ? 'Super! Du hast die Aufgabe richtig gelöst!'
              : 'Leider noch nicht richtig. Versuch es nochmal!'}
          </Feedback>
        </div>
      )}
      <button
        className={clsx(
          'serlo-button serlo-make-interactive-primary',
          'mt-4 mx-side',
          !allfilled &&
            'opacity-100 bg-transparent text-gray-400 pointer-events-none'
        )}
        onPointerUp={(e) => e.currentTarget.blur()}
        onClick={() => {
          if (checked) {
            setChecked(false)
            setFilled(filled.map(() => -1))
            setSelected(0)
          } else {
            setChecked(true)
          }
        }}
      >
        {checked ? 'Erneut versuchen' : "Stimmt's?"}
      </button>
    </GapContext.Provider>
  )
}

interface GappyProps {
  index: number
}

function Gappy({ index }: GappyProps) {
  const context = useContext(GapContext)

  if (context) {
    if (context.checked) {
      return (
        <Gap
          mode={context.filled[index] == index ? 'right' : 'wrong'}
          text={context.choices[context.filled[index]]}
        />
      )
    } else {
      if (context.selected === index && context.filled[index] < 0) {
        return <Gap mode="selected" />
      } else if (context.filled[index] >= 0) {
        return (
          <Gap
            mode={context.selected === index ? 'filled-selected' : 'filled'}
            text={context.choices[context.filled[index]]}
            onClick={() => {
              context.select(index)
            }}
          />
        )
      } else {
        return (
          <Gap
            mode="inactive"
            onClick={() => {
              context.select(index)
            }}
          />
        )
      }
    }
  }

  return <>Fehler</>
}
