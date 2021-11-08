import clsx from 'clsx'
import { useState } from 'react'

import { ExerciseNumbering } from '@/components/content/exercises/exercise-numbering'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const [g1Mode, setG1Mode] = useState<GapProps['mode']>('inactive')
  const [g1Text, setG1Text] = useState('')

  const [c1Mode, setC1Mode] = useState<GapProps['mode']>('choice')

  const [c2Mode, setC2Mode] = useState<GapProps['mode']>('choice')

  const [g2Mode, setG2Mode] = useState<GapProps['mode']>('inactive')
  const [g2Text, setG2Text] = useState('')

  const [g3Mode, setG3Mode] = useState<GapProps['mode']>('inactive')
  const [g3Text, setG3Text] = useState('')

  const [g4Mode, setG4Mode] = useState<GapProps['mode']>('inactive')
  const [g4Text, setG4Text] = useState('')

  const [g5Mode, setG5Mode] = useState<GapProps['mode']>('inactive')
  const [g5Text, setG5Text] = useState('')

  const [g6Mode, setG6Mode] = useState<GapProps['mode']>('inactive')
  const [g6Text, setG6Text] = useState('')

  const [g7Mode, setG7Mode] = useState<GapProps['mode']>('inactive')
  const [g7Text, setG7Text] = useState('')

  const [g8Mode, setG8Mode] = useState<GapProps['mode']>('inactive')
  const [g8Text, setG8Text] = useState('')

  const [g9Mode, setG9Mode] = useState<GapProps['mode']>('inactive')
  const [g9Text, setG9Text] = useState('')

  const [g10Mode, setG10Mode] = useState<GapProps['mode']>('inactive')
  const [g10Text, setG10Text] = useState('')

  const [c3Mode, setC3Mode] = useState<GapProps['mode']>('choice')

  const [c4Mode, setC4Mode] = useState<GapProps['mode']>('choice')

  const [c5Mode, setC5Mode] = useState<GapProps['mode']>('choice')

  const [c6Mode, setC6Mode] = useState<GapProps['mode']>('choice')

  const [c7Mode, setC7Mode] = useState<GapProps['mode']>('choice')

  const [c8Mode, setC8Mode] = useState<GapProps['mode']>('choice')

  const [c9Mode, setC9Mode] = useState<GapProps['mode']>('choice')

  const [c10Mode, setC10Mode] = useState<GapProps['mode']>('choice')

  const [c11Mode, setC11Mode] = useState<GapProps['mode']>('choice')

  return (
    <>
      <h1 className="serlo-h1 mt-16 mb-20">Lückentext</h1>
      <ExerciseNumbering index={0} href="" />
      <div>
        <p className="serlo-p mb-block">Ergänze folgende Lücke:</p>
        <p className="serlo-p mb-block">
          Im Jahr 2007 wurde die Umsatzsteuer von 16% auf 19% erhöht. Die Steuer
          stieg also um 3{' '}
          <Gap
            mode={g1Mode}
            text={g1Text}
            onClick={() => {
              if (g1Mode == 'inactive') {
                setG1Mode('selected')
              }
            }}
          />
          .
        </p>
        <p className="serlo-p mb-block">
          <Gap
            mode={c1Mode}
            text="Prozentpunkte"
            onClick={() => {
              if (g1Mode == 'selected') {
                setG1Mode('filled')
                setG1Text('Prozentpunkte')
                setC1Mode('choice-inactive')
              }
            }}
          />
          <Gap
            mode={c2Mode}
            text="Prozent"
            onClick={() => {
              if (g1Mode == 'selected') {
                setG1Mode('filled')
                setG1Text('Prozent')
                setC2Mode('choice-inactive')
              }
            }}
          />
        </p>
        <button
          className={clsx(
            'serlo-button serlo-make-interactive-primary',
            'mt-4 mx-side',
            g1Mode !== 'filled' &&
              'opacity-100 bg-transparent text-gray-400 pointer-events-none'
          )}
          onPointerUp={(e) => e.currentTarget.blur()}
          onClick={() => {
            if (g1Text == 'Prozentpunkte') {
              setG1Mode('right')
            } else {
              setG1Mode('wrong')
            }
          }}
        >
          Stimmt&apos;s?
        </button>{' '}
        {(g1Mode == 'right' || g1Mode == 'wrong') && (
          <button
            onClick={() => {
              setG1Mode('inactive')
              setG1Text('')
              setC1Mode('choice')
              setC2Mode('choice')
            }}
          >
            Erneut versuchen
          </button>
        )}
      </div>
      <div className="h-12" />
      <ExerciseNumbering index={1} href="" />
      <div>
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
                <Gap
                  mode={g2Mode}
                  text={g2Text}
                  onClick={() => {
                    if (g2Mode == 'inactive') {
                      resetSelection()
                      setG2Mode('selected')
                    }
                  }}
                />{' '}
                €
              </td>
              <td className="serlo-td">150 €</td>
            </tr>
            <tr>
              <td className="serlo-td">12,5 %</td>
              <td className="serlo-td">
                <Gap
                  mode={g3Mode}
                  text={g3Text}
                  onClick={() => {
                    if (g3Mode == 'inactive') {
                      resetSelection()
                      setG3Mode('selected')
                    }
                  }}
                />{' '}
                kg
              </td>
              <td className="serlo-td">80 kg</td>
            </tr>
            <tr>
              <td className="serlo-td">
                <Gap
                  mode={g4Mode}
                  text={g4Text}
                  onClick={() => {
                    if (g4Mode == 'inactive') {
                      resetSelection()
                      setG4Mode('selected')
                    }
                  }}
                />{' '}
                %
              </td>
              <td className="serlo-td">162 cm</td>
              <td className="serlo-td">360 cm</td>
            </tr>
            <tr>
              <td className="serlo-td">
                <Gap
                  mode={g5Mode}
                  text={g5Text}
                  onClick={() => {
                    if (g5Mode == 'inactive') {
                      resetSelection()
                      setG5Mode('selected')
                    }
                  }}
                />{' '}
                %
              </td>
              <td className="serlo-td">6,81 €</td>
              <td className="serlo-td">45,40 €</td>
            </tr>
            <tr>
              <td className="serlo-td">18 %</td>
              <td className="serlo-td">81 cm</td>
              <td className="serlo-td">
                <Gap
                  mode={g6Mode}
                  text={g6Text}
                  onClick={() => {
                    if (g6Mode == 'inactive') {
                      resetSelection()
                      setG6Mode('selected')
                    }
                  }}
                />{' '}
                cm
              </td>
            </tr>
            <tr>
              <td className="serlo-td">37,5 %</td>
              <td className="serlo-td">165 g</td>
              <td className="serlo-td">
                <Gap
                  mode={g7Mode}
                  text={g7Text}
                  onClick={() => {
                    if (g7Mode == 'inactive') {
                      resetSelection()
                      setG7Mode('selected')
                    }
                  }}
                />{' '}
                g
              </td>
            </tr>
            <tr>
              <td className="serlo-td">0,8 %</td>
              <td className="serlo-td">
                <Gap
                  mode={g8Mode}
                  text={g8Text}
                  onClick={() => {
                    if (g8Mode == 'inactive') {
                      resetSelection()
                      setG8Mode('selected')
                    }
                  }}
                />{' '}
                cm²
              </td>
              <td className="serlo-td">96,5 cm²</td>
            </tr>
            <tr>
              <td className="serlo-td">
                <Gap
                  mode={g9Mode}
                  text={g9Text}
                  onClick={() => {
                    if (g9Mode == 'inactive') {
                      resetSelection()
                      setG9Mode('selected')
                    }
                  }}
                />{' '}
                %
              </td>
              <td className="serlo-td">16,5 €</td>
              <td className="serlo-td">2200 €</td>
            </tr>
            <tr>
              <td className="serlo-td">120 %</td>
              <td className="serlo-td">840 g</td>
              <td className="serlo-td">
                <Gap
                  mode={g10Mode}
                  text={g10Text}
                  onClick={() => {
                    if (g10Mode == 'inactive') {
                      resetSelection()
                      setG10Mode('selected')
                    }
                  }}
                />{' '}
                g
              </td>
            </tr>
          </tbody>
        </table>
        <p className="serlo-p mb-block">
          <Gap
            mode={c5Mode}
            text="45"
            onClick={() => {
              pushToSelected('45')
              setC5Mode('choice-inactive')
            }}
          />
          <Gap
            mode={c3Mode}
            text="42"
            onClick={() => {
              pushToSelected('42')
              setC3Mode('choice-inactive')
            }}
          />
          <Gap
            mode={c7Mode}
            text="450"
            onClick={() => {
              pushToSelected('450')
              setC7Mode('choice-inactive')
            }}
          />
          <Gap
            mode={c11Mode}
            text="700"
            onClick={() => {
              pushToSelected('700')
              setC11Mode('choice-inactive')
            }}
          />
          <Gap
            mode={c4Mode}
            text="10"
            onClick={() => {
              pushToSelected('10')
              setC4Mode('choice-inactive')
            }}
          />
          <Gap
            mode={c10Mode}
            text="0,75"
            onClick={() => {
              pushToSelected('0,75')
              setC10Mode('choice-inactive')
            }}
          />
          <Gap
            mode={c6Mode}
            text="15"
            onClick={() => {
              pushToSelected('15')
              setC6Mode('choice-inactive')
            }}
          />
          <Gap
            mode={c8Mode}
            text="440"
            onClick={() => {
              pushToSelected('440')
              setC8Mode('choice-inactive')
            }}
          />
          <Gap
            mode={c9Mode}
            text="0,772"
            onClick={() => {
              pushToSelected('0,772')
              setC9Mode('choice-inactive')
            }}
          />
        </p>
        <button
          className={clsx(
            'serlo-button serlo-make-interactive-primary',
            'mt-4 mx-side',
            !(
              g2Mode == 'filled' &&
              g3Mode == 'filled' &&
              g4Mode == 'filled' &&
              g5Mode == 'filled' &&
              g6Mode == 'filled' &&
              g7Mode == 'filled' &&
              g8Mode == 'filled' &&
              g9Mode == 'filled' &&
              g10Mode == 'filled'
            ) && 'opacity-100 bg-transparent text-gray-400 pointer-events-none'
          )}
          onPointerUp={(e) => e.currentTarget.blur()}
          onClick={() => {
            if (g2Text == '42') {
              setG2Mode('right')
            } else {
              setG2Mode('wrong')
            }
            if (g3Text == '10') {
              setG3Mode('right')
            } else {
              setG3Mode('wrong')
            }
            if (g4Text == '45') {
              setG4Mode('right')
            } else {
              setG4Mode('wrong')
            }
            if (g5Text == '15') {
              setG5Mode('right')
            } else {
              setG5Mode('wrong')
            }
            if (g6Text == '450') {
              setG6Mode('right')
            } else {
              setG6Mode('wrong')
            }
            if (g7Text == '440') {
              setG7Mode('right')
            } else {
              setG7Mode('wrong')
            }
            if (g8Text == '0,772') {
              setG8Mode('right')
            } else {
              setG8Mode('wrong')
            }
            if (g9Text == '0,75') {
              setG9Mode('right')
            } else {
              setG9Mode('wrong')
            }
            if (g10Text == '700') {
              setG10Mode('right')
            } else {
              setG10Mode('wrong')
            }
          }}
        >
          Stimmt&apos;s?
        </button>
        {(g2Mode == 'right' || g2Mode == 'wrong') && (
          <button
            onClick={() => {
              setG2Mode('inactive')
              setG3Mode('inactive')
              setG4Mode('inactive')
              setG5Mode('inactive')
              setG6Mode('inactive')
              setG7Mode('inactive')
              setG8Mode('inactive')
              setG9Mode('inactive')
              setG10Mode('inactive')
              setG2Text('')
              setG3Text('')
              setG4Text('')
              setG5Text('')
              setG6Text('')
              setG7Text('')
              setG8Text('')
              setG9Text('')
              setG10Text('')
              setC3Mode('choice')
              setC4Mode('choice')
              setC5Mode('choice')
              setC6Mode('choice')
              setC7Mode('choice')
              setC8Mode('choice')
              setC9Mode('choice')
              setC10Mode('choice')
              setC11Mode('choice')
            }}
          >
            Erneut versuchen
          </button>
        )}
      </div>
    </>
  )

  function resetSelection() {
    if (g2Mode == 'selected') {
      setG2Mode('inactive')
    }
    if (g3Mode == 'selected') {
      setG3Mode('inactive')
    }
    if (g4Mode == 'selected') {
      setG4Mode('inactive')
    }
    if (g5Mode == 'selected') {
      setG5Mode('inactive')
    }
    if (g6Mode == 'selected') {
      setG6Mode('inactive')
    }
    if (g7Mode == 'selected') {
      setG7Mode('inactive')
    }
    if (g8Mode == 'selected') {
      setG8Mode('inactive')
    }
    if (g9Mode == 'selected') {
      setG9Mode('inactive')
    }
    if (g10Mode == 'selected') {
      setG10Mode('inactive')
    }
  }

  function pushToSelected(val: string) {
    if (g2Mode == 'selected') {
      setG2Mode('filled')
      setG2Text(val)
    }
    if (g3Mode == 'selected') {
      setG3Mode('filled')
      setG3Text(val)
    }
    if (g4Mode == 'selected') {
      setG4Mode('filled')
      setG4Text(val)
    }
    if (g5Mode == 'selected') {
      setG5Mode('filled')
      setG5Text(val)
    }
    if (g6Mode == 'selected') {
      setG6Mode('filled')
      setG6Text(val)
    }
    if (g7Mode == 'selected') {
      setG7Mode('filled')
      setG7Text(val)
    }
    if (g8Mode == 'selected') {
      setG8Mode('filled')
      setG8Text(val)
    }
    if (g9Mode == 'selected') {
      setG9Mode('filled')
      setG9Text(val)
    }
    if (g10Mode == 'selected') {
      setG10Mode('filled')
      setG10Text(val)
    }
  }
}

interface GapProps {
  mode:
    | 'inactive'
    | 'selected'
    | 'filled'
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
          'h-6 mx-1 px-2 select-none text-gray-400'
        )}
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
          'h-6 mx-1 px-2 select-none'
        )}
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
