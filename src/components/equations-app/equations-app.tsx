/* eslint-disable @next/next/no-img-element */
import { ComputeEngine } from '@cortex-js/compute-engine'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import {
  faCircleCheck,
  faPlay,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons'
import * as confetti from 'canvas-confetti' // why is this throwing warnings? sigh ..
import { Expression } from 'mathlive'
import { useEffect, useRef, useState } from 'react'
import { v4 } from 'uuid'

import { MathField } from './math-field'
import { MathField2 } from './math-field-2'
import { FaIcon } from '../fa-icon'

type Mode = 'done' | 'input' | 'choose'
type InputState =
  | 'error'
  | 'ok'
  | 'empty'
  | 'var-mismatch'
  | 'left-mismatch'
  | 'right-mismatch'

export function EquationsApp() {
  const ce = new ComputeEngine()

  const [sessionId] = useState(v4())

  function safeParse(latex: string) {
    return ce.parse(latex.replaceAll('{,}', '.'))
  }
  try {
    window.MathfieldElement.decimalSeparator = ','
  } catch (e) {
    //
  }
  const [description, setDescription] = useState(
    'Löse die Gleichung und bestimme die Lösungsmenge.'
  )
  const [edit, setEdit] = useState(false)

  const [mode, setMode] = useState<Mode>('choose')
  const [inputState, setInputState] = useState<InputState>('empty')

  const [list, setList] = useState<string[]>(['4x + 3 = 11'])
  const [actions, setActions] = useState<Action[]>([])

  const [solution, setSolution] = useState('')

  const lastScrollPosition = useRef(-1)

  const scrollDiv = useRef<HTMLDivElement>(null)

  const variableSymbol = Array.from(
    extractSymbols(safeParse(list[list.length - 1]).json).values()
  )[0]

  const [refLeft, setRefLeft] = useState('')
  const [refRight, setRefRight] = useState('')

  const currentLatex = useRef('')

  let options: Action[] = []

  if (mode === 'choose') {
    //console.log('regen choices', JSON.stringify(list))
    const json = safeParse(list[list.length - 1]).json
    try {
      options = findActions(
        json,
        variableSymbol,
        list[list.length - 1].replaceAll('{,}', '.')
      )
      //console.log(options)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
  const rejectReason = useRef('')

  const solved = useRef<Set<string>>(new Set())

  const [showOverview, setShowOverview] = useState(true)

  useEffect(() => {
    if (showOverview && lastScrollPosition.current > 0) {
      window.document.documentElement.scrollTop = lastScrollPosition.current
    }
  }, [showOverview])

  useEffect(() => {
    submit({ event: 'visit', latex: '', sessionId })
    const handlePopstate = () => {
      setShowOverview(true)
    }

    window.addEventListener('popstate', handlePopstate)

    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (showOverview) {
    return (
      <div className="flex flex-col">
        <div className="flex grow-0 items-baseline justify-between bg-gray-100 pb-1">
          <div className="mt-1 flex items-baseline">
            <h1 className="text-bold my-2 ml-3 text-xl">
              <img
                src="/_assets/favicon.ico"
                className="-mt-1 mr-3 inline-block h-6"
                alt=""
              />
              Serlo Gleichungs-App
            </h1>
          </div>
          <div className="mr-3"></div>
        </div>
        <div className="shrink grow overflow-auto" ref={scrollDiv}>
          <div className="overview mx-auto mt-7 max-w-[600px] px-4 [&>h3]:mt-8 [&>h3]:text-lg [&>h3]:font-bold">
            <div className="rounded border-2 border-orange-300 p-2">
              Diese App befindet sich aktuell im Beta-Test.
              <br />
              <a
                href="https://forms.gle/PFUYn8fn5zAkzpqe8"
                target="_blank"
                rel="noreferrer"
                className="serlo-link"
              >
                Wir freuen uns über dein Feedback
              </a>
              .
            </div>
            <h3>Serlo 26258 - Aufgaben zu linearen Gleichungen</h3>
            {renderExample('x+1=4')}
            {renderExample('2x=8')}
            {renderExample('4x=3x+5')}
            {renderExample('0x=7')}
            {renderExample('4x+4=3x+3')}
            {renderExample('5x-2=x+6')}
            {renderExample('3x=x+5')}
            {renderExample('2x=4')}
            {renderExample('7x-9=2x+5')}
            {renderExample('\\frac{1}{12}x - 5 = 3')}
            {renderExample('-8x + 5 = -5')}
            {renderExample('x + 4 = 9x - (5 - x)')}
            {renderExample('\\frac{1}{24} x = 0')}
            {renderExample('3(a-4)=1-\\frac15(2-a)' /*, 'HN Multiplikation?'*/)}
            {renderExample('3(4x-3)=4(3x-4)')}
            {renderExample('3(4x+4)=4(3-4x)')}
            <h3>Studyflix - einfache Gleichungen</h3>
            {renderExample('5=2+3')}
            {renderExample('6=2+3')}
            {renderExample('x+4=6')}
            {renderExample('x-2=8')}
            {renderExample('5y+3=18')}
            {renderExample('4(x+1)+3=7x-5')}
            {renderExample('3x-1=8')}
            {renderExample('2x-1=4x+3')}
            {renderExample('3x+5=14')}
            {renderExample('\\frac{x+5}{8}=2-2x')}
            {renderExample('x+5=8')}
            {renderExample('x-x=0')}
            {renderExample('x=x+1')}
            <h3>Lernkompass - S-Blatt01-lineare-Gleichungen</h3>
            {renderExample('3x=21')}
            {renderExample('-6x=48')}
            {renderExample('12x=-60')}
            {renderExample('7x=63')}
            {renderExample('-8x=-56')}
            {renderExample('10x=36')}
            {renderExample('x+3=-12')}
            {renderExample('x-7=25')}
            {renderExample('x+4=16')}
            {renderExample('5-x=17')}
            {renderExample('13=3+x')}
            {renderExample('12-x=27')}

            {renderExample('21-2x=6x+5')}
            {renderExample('15-5x=2x-20')}
            {renderExample('9x+14=2+5x')}
            {renderExample('3x+7=11+19x')}
            {renderExample('41-3x=9+5x')}
            {renderExample('17x-21=6x+45')}
            {renderExample('x-3=5x-11')}
            {renderExample('-44-12x=-5x+12')}

            {renderExample('\\frac13 x = 9')}
            {renderExample('\\frac25 x = 10')}
            {renderExample('-2x = \\frac27')}
            {renderExample('5x=- \\frac{10}{35}')}
            {renderExample('-2{,}5x + 5{,}75 = 7{,}5x+1{,}75')}
            {renderExample('8{,}3-1{,}2x=4{,}7+1{,}8x')}
            {renderExample('\\frac23 x + \\frac12 = \\frac32 x + \\frac56')}
            {renderExample('\\frac34x-\\frac25 = \\frac13+\\frac45 x')}

            {renderExample('15+11x=2(3+x)')}
            {renderExample('3(x+6)=4(2+x)')}
            {renderExample('5(2-3x)+x=2(-6+4x)')}
            {renderExample('6(4x+8)-12=-3(3-2x)')}
            {renderExample('10-(7x-5)=2-2(x+6)')}
            {renderExample('12-(-3x+6)=18-(9+3x)')}
            {renderExample('2-7(2x+5)-3(2x-4)=19')}

            <div className="text-center">
              {' '}
              <button
                className="ml-3 mt-12 rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                onClick={() => {
                  setShowOverview(false)
                  setEdit(true)
                  setInputState('ok')
                  setMode('done')
                }}
              >
                eigene Aufgabe erstellen
              </button>
            </div>
            <div className="mb-6 mt-[200px] text-center">
              <a
                href="https://de.serlo.org/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Datenschutz
              </a>
              <span className="mx-5 inline-block">|</span>
              <a
                href="https://de.serlo.org/legal"
                target="_blank"
                rel="noreferrer"
              >
                Impressum
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderExample(latex: string, warning?: string) {
    const isSolved = solved.current.has(latex)
    return (
      <div className="my-4 flex h-14 items-baseline justify-between">
        <div className="flex items-baseline text-xl">
          <MathField readonly key={latex} value={latex} lazy />
          {isSolved && (
            <FaIcon
              icon={faCircleCheck}
              className="ml-2 text-base text-green-500"
            />
          )}
        </div>
        <div>
          <span className="mr-3 text-sm text-yellow-600">{warning}</span>
          {isSolved ? (
            <button
              className="text-gray-700 hover:text-black hover:underline"
              onClick={() => {
                setShowOverview(false)
                setList([latex])
                setMode('choose')
                setInputState('empty')
                setActions([])
                setEdit(false)
                setSolution('')
                lastScrollPosition.current =
                  window.document.scrollingElement?.scrollTop ?? -1

                window.scrollTo(0, 0)
                window.history.pushState(null, '', null)
              }}
            >
              erneut starten
            </button>
          ) : (
            <button
              className="rounded bg-green-200 px-2 py-1 hover:bg-green-300"
              onClick={() => {
                setShowOverview(false)
                setList([latex])
                setMode('choose')
                setInputState('empty')
                setActions([])
                setEdit(false)
                setSolution('')
                lastScrollPosition.current =
                  window.document.scrollingElement?.scrollTop ?? -1

                window.scrollTo(0, 0)
                window.history.pushState(null, '', null)
                submit({ event: 'start', latex, sessionId })
              }}
            >
              <FaIcon icon={faPlay} className="mr-2 text-sm" />
              Starten
            </button>
          )}
        </div>
      </div>
    )
  }

  const output = `\\begin{align}${list
    .map((line, i) => {
      const parts = line.split('=')
      return `${parts[0]} &= ${parts[1]} && ${
        actions.length > i
          ? actions[i].type === 'simplify'
            ? ' \\Leftrightarrow'
            : ` \\vert ${actions[i].displayLatex}`
          : mode === 'done'
          ? ' '
          : ' \\boxed{\\textcolor{orange}{?}}'
      }`
    })
    .join('\\\\\n')}\\end{align}`

  return (
    <div className="flex flex-col">
      <div className="flex grow-0 items-baseline justify-between bg-gray-100 pb-1">
        <div className="mt-1 flex items-baseline">
          <h1 className="text-bold my-2 ml-3 text-xl">
            <img
              src="/_assets/favicon.ico"
              className="-mt-1 mr-3 inline-block h-6"
              alt=""
            />
            Serlo Gleichungs-App
          </h1>
        </div>
        <div className="mr-3">
          {edit ? (
            <>
              <button
                className="mr-5 hover:underline"
                onClick={() => {
                  setShowOverview(true)
                }}
              >
                abbrechen
              </button>
              <button
                className="rounded bg-green-200 px-2 py-1 hover:bg-green-300 disabled:cursor-not-allowed"
                disabled={mode !== 'done'}
                onClick={() => {
                  setEdit(false)
                  setMode('choose')
                  setActions([])
                  setList([list[0]])
                }}
              >
                Starten
              </button>
            </>
          ) : (
            mode !== 'done' && (
              <button
                className="rounded bg-pink-300 px-2 py-1 hover:bg-pink-400"
                onClick={() => {
                  setShowOverview(true)
                  window.mathVirtualKeyboard.hide()
                }}
              >
                zurück
              </button>
            )
          )}
        </div>
      </div>
      <div className="shrink grow overflow-auto">
        <div className="mx-auto mb-[500px] mt-7 max-w-[600px] px-4">
          {edit ? (
            <>
              <p>
                <textarea
                  className="h-24 w-full border-2"
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  defaultValue={description}
                ></textarea>
              </p>
              <div className="rounded border-2 text-xl">
                <MathField2
                  value={list[0]}
                  onChange={(latex) => {
                    try {
                      const input = safeParse(latex)

                      if (!input.isValid) {
                        setInputState('error')
                        setMode('input')
                      } else {
                        const { json } = input
                        const result = validateInput(json)
                        if (result === true) {
                          setInputState('ok')
                          setMode('done')
                          setList([latex])
                          return
                        }
                        rejectReason.current = result
                      }
                      setMode('input')
                      setInputState('error')
                    } catch (e) {
                      setMode('input')
                      setInputState('error')
                    }
                  }}
                />
              </div>
              {inputState === 'error' && <div>{rejectReason.current}</div>}
            </>
          ) : (
            <>
              <p className="mb-3 mb-7 mt-8">{description}</p>

              <div className="text-xl">
                <MathField readonly key={output} value={output} />
              </div>
              {mode === 'choose' && (
                <div>
                  <p className="mt-6 text-base font-bold text-gray-700">
                    Klicke auf eine der Optionen:
                  </p>
                  <div className="mt-4 flex flex-wrap justify-start">
                    {options.map((op, i) => {
                      if (op.type === 'simplify') {
                        return (
                          <button
                            className="mr-6 mt-3 rounded border bg-gray-50 px-3 py-1 hover:bg-gray-100"
                            key={i}
                            onClick={() => {
                              setActions((acs) => [...acs, op])
                              setMode('input')
                              setInputState('empty')
                              const parts = list[list.length - 1].split('=')
                              setRefLeft(parts[0])
                              setRefRight(parts[1])
                            }}
                          >
                            Vereinfachen
                          </button>
                        )
                      }
                      if (op.type === 'equiv-add' || op.type === 'equiv-raw') {
                        return (
                          <button
                            className="relative mr-6 mt-3 rounded border bg-gray-50 px-2 py-1 text-xl hover:bg-gray-100"
                            key={i}
                          >
                            <MathField
                              key={op.latex}
                              readonly
                              value={`\\vert ${op.displayLatex ?? op.latex}`}
                            />
                            <span
                              className="absolute inset-0 opacity-0"
                              onClick={() => {
                                setActions((acs) => [...acs, op])
                                setMode('input')
                                setInputState('empty')
                                // console.log('debug', JSON.stringify(list))
                                const parts = list[list.length - 1].split('=')
                                setRefLeft(combineRef(parts[0], op))
                                setRefRight(combineRef(parts[1], op))
                              }}
                            ></span>
                          </button>
                        )
                      }
                      if (op.type === 'solution') {
                        return (
                          <button
                            className="relative mr-6 mt-3 rounded bg-green-200 px-2 py-1 text-xl hover:bg-green-300"
                            key={i}
                          >
                            <MathField
                              key={op.displayLatex}
                              readonly
                              value={op.displayLatex}
                            />
                            <span
                              className="absolute inset-0 opacity-0"
                              onClick={() => {
                                /*setActions((acs) => [...acs, op])
                                setMode('input')
                                setInputState('empty')
                                const parts = list[list.length - 1].split('=')
                                setRefLeft(combineRef(parts[0], op))
                                setRefRight(combineRef(parts[1], op))*/
                                try {
                                  void confetti.default()
                                } catch (e) {
                                  // don't care
                                }

                                submit({
                                  event: 'done',
                                  latex: list[0],
                                  sessionId,
                                })
                                setMode('done')
                                setSolution(op.displayLatex!)
                                solved.current.add(list[0])
                              }}
                            ></span>
                          </button>
                        )
                      }
                    })}
                  </div>
                </div>
              )}

              {mode === 'input' && (
                <div className="mt-3 flex items-baseline text-xl">
                  <div className="grow">
                    <div className="mb-2 flex items-baseline justify-between">
                      <div className="pt-3 text-base font-bold text-gray-700 ">
                        {actions[actions.length - 1].type === 'simplify'
                          ? 'Terme in Gleichung vereinfachen:'
                          : 'Forme auf beiden Seiten um:'}
                      </div>
                      <button
                        className="text-sm text-gray-600 hover:text-black"
                        onClick={() => {
                          setActions((acc) => acc.slice(0, -1))
                          setMode('choose')
                          if (list.length === actions.length + 1) {
                            setList((l) => l.slice(0, -1))
                          }
                        }}
                      >
                        <FaIcon
                          icon={faRotateLeft}
                          className="text-base sm:text-xs"
                        />
                        <span className="hidden sm:inline">
                          &nbsp;rückgängig
                        </span>
                      </button>
                    </div>
                    <div className="rounded border-2">
                      <MathField2
                        onChange={(latex) => {
                          setTimeout(() => {
                            try {
                              if (!latex) {
                                setInputState('empty')
                                return
                              }
                              const parsed = safeParse(latex)

                              if (!parsed.isValid) {
                                setInputState('error')
                                return
                              }

                              const symbols = extractSymbols(parsed.json)

                              // console.log(symbols)

                              // console.log(symbols, variableSymbol)
                              if (
                                (!symbols.has(variableSymbol) &&
                                  symbols.size > 0) ||
                                // (variableSymbol && symbols.size == 0) ||
                                symbols.size > 1
                              ) {
                                setInputState('var-mismatch')
                                return
                              }

                              const parts = latex.split('=')

                              if (parts.length < 2) {
                                setInputState('error')
                                return
                              }

                              for (let i = -4; i <= 4; i++) {
                                if (variableSymbol) {
                                  ce.assign(variableSymbol, i)
                                }

                                const termL = `( ${refLeft} ) - ( ${parts[0]} )`
                                const valueL = safeParse(termL).N()
                                  .value as number

                                const termR = `( ${refRight} ) - ( ${parts[1]} )`
                                const valueR = safeParse(termR).N()
                                  .value as number

                                // console.log(termL, valueL, '\n', termR, valueR)

                                if (
                                  typeof valueL !== 'number' ||
                                  Math.abs(valueL) > 0.00001
                                ) {
                                  setInputState('left-mismatch')
                                  return
                                }
                                if (
                                  typeof valueR !== 'number' ||
                                  Math.abs(valueR) > 0.00001
                                ) {
                                  setInputState('right-mismatch')
                                  return
                                }
                                //if (symbols.size == 0) break
                              }

                              currentLatex.current = latex
                              setInputState('ok')
                            } catch (e) {
                              // eslint-disable-next-line no-console
                              console.log(e)
                              setMode('input')
                              setInputState('error')
                            }
                          }, 0)
                        }}
                        onEnter={() => {
                          if (inputState === 'ok') {
                            setList((list) => [...list, currentLatex.current])
                            setMode('choose')
                            window.mathVirtualKeyboard.hide()
                          }
                        }}
                      />
                    </div>
                    <div className="ml-1 mt-2 text-base">
                      {inputState === 'empty' && (
                        <span>
                          Erwarte Eingabe der Form{' '}
                          <FaIcon
                            icon={faSquare}
                            className="text-sm text-blue-400"
                          />
                          &nbsp;=&nbsp;
                          <FaIcon
                            icon={faSquare}
                            className="text-sm text-blue-400"
                          />
                        </span>
                      )}
                      {inputState === 'error' && (
                        <span>Fehler bei der Eingabe</span>
                      )}
                      {inputState === 'var-mismatch' && (
                        <span>Variablen passen nicht</span>
                      )}
                      {inputState === 'left-mismatch' && (
                        <span>
                          Term auf der linken Seite der Gleichung ist nicht
                          passend
                        </span>
                      )}
                      {inputState === 'right-mismatch' && (
                        <span>
                          Term auf der rechten Seite der Gleichung ist nicht
                          passend
                        </span>
                      )}
                      {inputState === 'ok' && (
                        <div className="flex items-baseline justify-between">
                          <span className="text-green-600">Super!</span>
                          <button
                            className="ml-3 inline-block rounded bg-green-200 px-2 py-1 hover:bg-green-300"
                            onClick={() => {
                              setList((list) => [...list, currentLatex.current])
                              setMode('choose')
                              window.mathVirtualKeyboard.hide()
                            }}
                          >
                            Weiter
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {mode === 'done' && (
                <>
                  <div className="mt-2 flex items-baseline justify-start">
                    <div className="text-xl">
                      <MathField readonly key={solution} value={solution} />
                    </div>
                    <div className="ml-8 text-green-500">
                      <FaIcon
                        icon={faCircleCheck}
                        className="-mb-0.5 mr-1 inline-block"
                      />{' '}
                      Stark!
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      className="mx-auto mt-6 rounded bg-blue-200 px-5 py-2 hover:bg-blue-300 "
                      onClick={() => {
                        setShowOverview(true)
                        window.mathVirtualKeyboard.hide()
                      }}
                    >
                      weiter
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )

  function extractSymbols(json: Expression): Set<string> {
    const output = new Set<string>()

    function runInner(json: Expression) {
      if (Array.isArray(json)) {
        json.slice(1).map(runInner)
      }
      if (typeof json === 'string' && json !== 'Half') {
        output.add(json)
      }
    }

    runInner(json)
    return output
  }

  function combineRef(latex: string, op: Action): string {
    if (op.type === 'equiv-raw') {
      return `( ${latex} ) ${op.latex}`
    }
    if (op.type === 'equiv-add') {
      return `( ${latex} ) + ( ${op.latex} )`
    }
    return latex
  }

  function validateInput(json: Expression): true | string {
    // console.log('MathJSON:', json)
    if (Array.isArray(json) && json.length === 3 && json[0] === 'Equal') {
      const symbols = extractSymbols(json)
      if (symbols.size <= 1) {
        return true
      }
    }
    return 'Eingabe keine Gleichung'
  }
}

interface Action {
  type: 'simplify' | 'equiv-add' | 'solution' | 'equiv-raw'
  displayLatex?: string
  latex: string
}

function findActions(
  input: Expression,
  variableSymbol: string,
  sourceLatex: string
): Action[] {
  const ce = new ComputeEngine()
  const output: Action[] = []

  // console.log('actions', input)

  function negateAndShowOp(t: any) {
    if (typeof t === 'number' && t === 0) return
    // komplexere Terme ausschließen?
    const rawLatex = ce
      .box(['Negate', t])
      .latex.replaceAll('\\frac{-', '-\\frac{')
    output.push({
      type: 'equiv-add',
      displayLatex: rawLatex.startsWith('-') ? rawLatex : `+ ${rawLatex}`,
      latex: rawLatex,
    })
  }

  function forInput(t: Expression) {
    if (Array.isArray(t)) {
      if (t[0] === 'Add') {
        t.slice(1).forEach(negateAndShowOp)
      }
      if (t[0] === 'Subtract') {
        negateAndShowOp(t[1])
        negateAndShowOp(['Negate', t[2]])
      }
      if (t[0] === 'Multiply') {
        t.slice(1).forEach((t) => {
          if (typeof t === 'number' && t !== 0) {
            if (t > 0) {
              output.push({
                type: 'equiv-raw',
                displayLatex: `: ${t}`,
                latex: `\\div ${t}`,
              })
            } else {
              output.push({
                type: 'equiv-raw',
                displayLatex: `: ( ${t} )`,
                latex: `\\div ${t}`,
              })
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          if (isRational(t)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (t[1] > 0) {
              output.push({
                type: 'equiv-raw',
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                displayLatex: `: ${ce.box(t).latex}`,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                latex: `\\div ${ce.box(t).latex}`,
              })
            } else {
              output.push({
                type: 'equiv-raw',
                displayLatex: `: (${ce
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  .box(t)
                  .latex.replaceAll('\\frac{-', '-\\frac{')})`,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                latex: `\\div ${ce.box(t).latex}`,
              })
            }
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (typeof t[1] === 'number' || isRational(t[1])) {
          if (t[2] === variableSymbol && t[1] !== 0) {
            negateAndShowOp(t)
          }
        }
      }
      if (t[0] === 'Divide') {
        if (typeof t[2] === 'number') {
          const latex = `\\cdot ${t[2] > 0 ? t[2] : `(${t[2]})`}`
          output.push({
            type: 'equiv-raw',
            displayLatex: latex,
            latex,
          })
        }
      }
      if (t[0] === 'Negate' && t.length === 2 && t[1] === variableSymbol) {
        output.push({
          type: 'equiv-raw',
          displayLatex: `\\cdot (-1)`,
          latex: `\\cdot (-1)`,
        })
      }
    }
    if (typeof t === 'number') {
      negateAndShowOp(t)
    }
    if (t === variableSymbol) {
      negateAndShowOp(t)
    }
  }

  if (Array.isArray(input)) {
    if (input[0] === 'Equal' && input.length === 3) {
      if (isDone(input) || isDoneRational(input)) {
        const parts = sourceLatex.trim().split('=')
        const result = parts[0] === variableSymbol ? parts[1] : parts[0]
        const resultJSON = ce.parse(result, { canonical: false }).json
        let outputValue = ''
        if (typeof resultJSON === 'number' || resultJSON === 'Half') {
          outputValue = result
        }
        if (Array.isArray(resultJSON) && isDivide(resultJSON)) {
          const z = resultJSON[1] as number
          const n = resultJSON[2] as number
          if (Math.abs(gcd(z, n)) === 1) {
            outputValue = result
          }
        }
        if (
          Array.isArray(resultJSON) &&
          resultJSON.length === 2 &&
          resultJSON[0] === 'Negate' &&
          isDivide(resultJSON[1])
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const z = (resultJSON as any)[1][1] as number
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const n = (resultJSON as any)[1][2] as number
          if (Math.abs(gcd(z, n)) === 1) {
            outputValue = result
          }
        }
        if (outputValue) {
          output.push({
            type: 'solution',
            displayLatex: `\\mathbb{L} = \\left\\{ ${outputValue} \\right\\}`,
            latex: '',
          })
        }
      }
      /*if (isDoneRational(input)) {
        console.log('source', sourceLatex)
        const value = isRational(input[1]) ? input[1] : input[2]
        output.push({
          type: 'solution',
          displayLatex: `\\mathbb{L} = \\left\\{ ${
            ce.box(value).latex
          } \\right\\}`,
          latex: '',
        })
      }*/
      if (typeof input[1] === 'number' && typeof input[2] === 'number') {
        if (input[1] === input[2]) {
          output.push({
            type: 'solution',
            displayLatex: `\\mathbb{L} = \\mathbb{Q}`,
            latex: '',
          })
        } else {
          output.push({
            type: 'solution',
            displayLatex: `\\mathbb{L} = \\{ \\}`,
            latex: '',
          })
        }
      }
      if (output.length === 0) {
        output.push({ type: 'simplify', latex: '' })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        forInput(input[1])
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        forInput(input[2])
      }
      const existingOps = new Set<string>()
      return output
        .map((op) => {
          if (op.displayLatex) {
            op.displayLatex = op.displayLatex.replaceAll('.', '{,}')
            const key = op.displayLatex + '²²' + op.type
            if (existingOps.has(key)) return null
            existingOps.add(key)
          }
          return op
        })
        .filter((x) => x !== null) as Action[]
    }
  }
  throw new Error('invalid input')

  function isDone(json: Expression) {
    // console.log('is done?', json)
    if (
      Array.isArray(json) &&
      json.length === 3 &&
      json[0] === 'Equal' &&
      ((json[1] === variableSymbol && typeof json[2] === 'number') ||
        (json[2] === variableSymbol && typeof json[1] === 'number'))
    ) {
      return true
    }
    return false
  }

  function isDoneRational(json: Expression) {
    // console.log('is done?', json)
    if (
      Array.isArray(json) &&
      json.length === 3 &&
      json[0] === 'Equal' &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ((json[1] === variableSymbol && isRational(json[2])) ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        (json[2] === variableSymbol && isRational(json[1])))
    ) {
      return true
    }
    return false
  }

  function isRational(json: Expression) {
    if (json === 'Half') return true
    if (Array.isArray(json)) {
      if (
        json[0] === 'Rational' &&
        json.length === 3 &&
        typeof json[1] === 'number' &&
        typeof json[2] === 'number'
      ) {
        return true
      }
    }
    return false
  }
  function isDivide(json: Expression) {
    if (Array.isArray(json)) {
      if (
        json[0] === 'Divide' &&
        json.length === 3 &&
        typeof json[1] === 'number' &&
        typeof json[2] === 'number'
      ) {
        return true
      }
    }
    return false
  }
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

interface EquationsAppstatsData {
  event: string
  latex: string
  sessionId: string
}

function submit(data: EquationsAppstatsData) {
  void (async () => {
    await fetch('/api/frontend/equations-app-stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
  })()
}
