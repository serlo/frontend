/* eslint-disable @next/next/no-img-element */
import { ComputeEngine } from '@cortex-js/compute-engine'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import {
  faCaretLeft,
  faCaretRight,
  faCheck,
  faCircleCheck,
  faDeleteLeft,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons'
import * as confetti from 'canvas-confetti'
import { Expression, MathfieldElement, Selector } from 'mathlive'
import { ReactNode, useRef, useState } from 'react'

import { MathField2 } from './math-field-2'
import { ReadonlyMathField } from './readonly-math-field'
import { FaIcon } from '../fa-icon'
import { LinearEquationTask } from '@/data/de/gleichungs-app'
import { cn } from '@/helper/cn'

interface EquationTaskProps {
  data: LinearEquationTask
  onSolve: (n: number) => void
  onBack: () => void
}

type Mode = 'done' | 'input' | 'choose'
type InputState =
  | 'error'
  | 'ok'
  | 'empty'
  | 'var-mismatch'
  | 'left-mismatch'
  | 'right-mismatch'

export function EquationTask({ data, onSolve, onBack }: EquationTaskProps) {
  try {
    window.MathfieldElement.decimalSeparator = ','
  } catch (e) {
    //
  }
  const ce = new ComputeEngine()

  function safeParse(latex: string) {
    return ce.parse(latex.replaceAll('{,}', '.'))
  }

  const [mode, setMode] = useState<Mode>('choose')
  const [inputState, setInputState] = useState<InputState>('empty')

  const [list, setList] = useState<string[]>([data.latex])
  const [actions, setActions] = useState<Action[]>([])

  const [solution, setSolution] = useState('')

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
    <div className="mb-[500px]">
      <h2 className={cn('mt-6 text-xl')}>
        <span
          className={cn(
            data.isGolden && 'rounded bg-yellow-400 px-2 py-1 font-bold'
          )}
        >
          Aufgabe {data.number}
        </span>
      </h2>
      <div className="mt-4">
        Löse die Gleichung schrittweise und bestimme die Lösungsmenge.
      </div>
      <div className="mt-6 text-xl">
        <ReadonlyMathField key={output} value={output} />
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
                    <ReadonlyMathField
                      key={op.latex}
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
                    <ReadonlyMathField
                      key={op.displayLatex}
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

                        /*submit({
                          event: 'done',
                          latex: list[0],
                          sessionId,
                        })*/
                        setMode('done')
                        setSolution(op.displayLatex!)
                        onSolve(data.number)
                        //solved.current.add(list[0])
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
        <>
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
                  <span className="hidden sm:inline">&nbsp;rückgängig</span>
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
                          (!symbols.has(variableSymbol) && symbols.size > 0) ||
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
                          const valueL = safeParse(termL).N().value as number

                          const termR = `( ${refRight} ) - ( ${parts[1]} )`
                          const valueR = safeParse(termR).N().value as number

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
                    }
                  }}
                />
              </div>
              <div className="ml-1 mt-2 text-base">
                {inputState === 'empty' && (
                  <span>
                    Erwarte Eingabe der Form{' '}
                    <FaIcon icon={faSquare} className="text-sm text-blue-400" />
                    &nbsp;=&nbsp;
                    <FaIcon icon={faSquare} className="text-sm text-blue-400" />
                  </span>
                )}
                {inputState === 'error' && <span>Fehler bei der Eingabe</span>}
                {inputState === 'var-mismatch' && (
                  <span>Variablen passen nicht</span>
                )}
                {inputState === 'left-mismatch' && (
                  <span>
                    Term auf der linken Seite der Gleichung ist nicht passend
                  </span>
                )}
                {inputState === 'right-mismatch' && (
                  <span>
                    Term auf der rechten Seite der Gleichung ist nicht passend
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
                      }}
                    >
                      Weiter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-slate-300">
            <div className="mx-auto max-w-[1024px]">
              <div className="flex justify-center">
                {renderButton(
                  <span style={{ fontFamily: 'KaTeX_Main' }} className="italic">
                    x
                  </span>,
                  ['insert', 'x']
                )}
                {renderButton(
                  <span style={{ fontFamily: 'KaTeX_Main' }} className="italic">
                    y
                  </span>,
                  ['insert', 'y']
                )}
                <div className="flex-1"></div>
                {renderButton('7', ['insert', '7'])}
                {renderButton('8', ['insert', '8'])}
                {renderButton('9', ['insert', '9'])}
                {renderButton('÷', ['insert', '\\div'])}
                <div className="flex-1"></div>
                {renderButton(
                  <img
                    src="/_assets/img/gleichungs-app/frac.png"
                    alt="Bruch einfügen"
                    className="mx-auto h-full"
                  />,
                  ['insert', '\\frac{#@}{#0}']
                )}
                {renderButton('')}
                {renderButton('')}
              </div>
              <div className="flex justify-center">
                {renderButton(
                  <span style={{ fontFamily: 'KaTeX_Main' }} className="italic">
                    a
                  </span>,
                  ['insert', 'a']
                )}
                {renderButton(
                  <span style={{ fontFamily: 'KaTeX_Main' }} className="italic">
                    b
                  </span>,
                  ['insert', 'b']
                )}
                <div className="flex-1"></div>
                {renderButton('4', ['insert', '4'])}
                {renderButton('5', ['insert', '5'])}
                {renderButton('6', ['insert', '6'])}
                {renderButton('×', ['insert', '\\cdot'])}
                <div className="flex-1"></div>
                {renderButton('')}
                {renderButton('')}
                {renderButton('')}
              </div>
              <div className="flex justify-center">
                {renderButton('(', ['insert', '('])}
                {renderButton(')', ['insert', ')'])}
                <div className="flex-1"></div>
                {renderButton('1', ['insert', '1'])}
                {renderButton('2', ['insert', '2'])}
                {renderButton('3', ['insert', '3'])}
                {renderButton('-', ['insert', '-'])}
                <div className="flex-1"></div>
                {renderButton('')}
                {renderButton('')}
                {renderButton(
                  <FaIcon icon={faDeleteLeft} />,
                  ['deleteBackward'],
                  {
                    specialCommand: true,
                  }
                )}
              </div>
              <div className="flex justify-center">
                {renderButton('')}
                {renderButton('')}
                <div className="flex-1"></div>
                {renderButton('0', ['insert', '0'])}
                {renderButton(',', ['insertDecimalSeparator'])}
                {renderButton('=', ['insert', '='])}
                {renderButton('+', ['insert', '+'])}
                <div className="flex-1"></div>
                {renderButton(
                  <FaIcon icon={faCaretLeft} />,
                  ['moveToPreviousChar'],
                  {
                    specialCommand: true,
                  }
                )}
                {renderButton(
                  <FaIcon icon={faCaretRight} />,
                  ['moveToNextChar'],
                  {
                    specialCommand: true,
                  }
                )}
                {renderButton(<FaIcon icon={faCheck} />, ['commit'], {
                  specialCommand: inputState === 'ok' ? 'submit' : true,
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {mode === 'done' && (
        <>
          <div className="mt-2 flex items-baseline justify-start">
            <div className="text-xl">
              <ReadonlyMathField key={solution} value={solution} />
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
                //setShowOverview(true)
                //window.mathVirtualKeyboard.hide()
                onBack()
              }}
            >
              weiter
            </button>
          </div>
        </>
      )}
    </div>
  )

  function renderButton(
    label: ReactNode,
    command?: Selector | [Selector, ...any[]],
    opts?: { specialCommand: boolean | 'submit' }
  ) {
    return (
      <button
        onClick={() => {
          const mf = document.getElementById('math-input-field') as
            | MathfieldElement
            | undefined

          if (mf && command) {
            mf.focus()
            mf.executeCommand(command)
          }
        }}
        onMouseDown={(e) => {
          e.preventDefault()
        }}
        disabled={!command}
        className={cn(
          `
            mx-0.5 my-0.5 h-10 flex-[2_2_0%] rounded text-lg shadow-sm disabled:invisible 
            mobileExt:mx-1 mobileExt:my-1 mobileExt:h-14 mobileExt:text-2xl
          `,
          opts?.specialCommand === 'submit'
            ? 'bg-green-300 hover:bg-green-400'
            : opts?.specialCommand
              ? 'bg-slate-500 hover:bg-slate-400'
              : 'bg-white hover:bg-gray-100'
        )}
      >
        {label}
      </button>
    )
  }

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        forInput(input[1])
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        forInput(input[2])

        output.push({ type: 'simplify', latex: '' })
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
