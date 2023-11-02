import clsx from 'clsx'
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Fragment,
  useEffect,
} from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { shuffleArray } from '@/helper/shuffle-array'
import { Feedback } from '@/serlo-editor/plugins/sc-mc-exercise/renderer/feedback'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  return <>nope</>
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
  if (mode === 'inactive') {
    return (
      <span
        className={clsx(
          'w-20 rounded border border-black bg-gray-50',
          'mx-1 -mb-1.5 inline-block h-7 cursor-pointer '
        )}
        onClick={onClick}
      ></span>
    )
  }
  if (mode === 'selected') {
    return (
      <span
        className={clsx(
          'w-20 rounded border-2 border-brand bg-brand-100',
          'mx-1 -mb-1.5 inline-block h-7 animate-pulse'
        )}
      ></span>
    )
  }
  if (mode === 'choice') {
    return (
      <span
        className={clsx(
          'inline-block rounded border border-black bg-brand-100',
          'mx-1 mb-2 h-7 cursor-pointer select-none px-2'
        )}
        onClick={onClick}
      >
        {text}
      </span>
    )
  }
  if (mode === 'choice-inactive') {
    return (
      <span
        className={clsx(
          'inline-block rounded border border-gray-200 bg-gray-100',
          'mx-1 h-7 cursor-pointer select-none px-2 text-gray-400'
        )}
        onClick={onClick}
      >
        {text}
      </span>
    )
  }
  if (mode === 'filled') {
    return (
      <span
        className={clsx(
          'inline-block rounded border border-black bg-brand-100',
          'mx-1 h-7 cursor-pointer select-none px-2'
        )}
        onClick={onClick}
      >
        {text}
      </span>
    )
  }
  if (mode === 'filled-selected') {
    return (
      <span
        className={clsx(
          'inline-block rounded border-2 border-brand bg-brand-100',
          'mx-1 h-7 animate-pulse cursor-pointer select-none px-2'
        )}
        onClick={onClick}
      >
        {text}
      </span>
    )
  }
  if (mode === 'right') {
    return (
      <span
        className={clsx(
          'bg-brandgreen-lighter inline-block rounded border border-black',
          'mx-1 h-7 select-none px-2'
        )}
      >
        {text}
      </span>
    )
  }
  if (mode === 'wrong') {
    return (
      <span
        className={clsx(
          'inline-block rounded border border-black bg-red-100',
          'mx-1 h-7 select-none px-2'
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
  onFeedback?: (success: boolean) => void
}

export function GapEx({ choices, children, count, onFeedback }: GapExProps) {
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

  const alright = checked && filled.every((v, i) => v === i)

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
                  filled.some((i) => choices[i] === c) || allfilled
                    ? 'choice-inactive'
                    : 'choice'
                }
                onClick={() => {
                  if (selected === -1 && allfilled) return

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
                    if (next === toFill) {
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
        <div>
          {' '}
          <Feedback correct={alright}>
            {alright ? (
              <>&nbsp;Super! Du hast die Aufgabe richtig gelöst!&nbsp;</>
            ) : (
              <>&nbsp;Leider noch nicht richtig. Versuch es nochmal!&nbsp;</>
            )}
          </Feedback>
        </div>
      )}
      <button
        className={clsx(
          'serlo-button',
          'mx-side mt-4',
          !allfilled &&
            'pointer-events-none bg-transparent text-gray-400 opacity-100',
          alright
            ? 'serlo-make-interactive-light'
            : 'serlo-make-interactive-primary'
        )}
        onPointerUp={(e) => e.currentTarget.blur()}
        onClick={() => {
          if (checked) {
            setChecked(false)
            setFilled(filled.map(() => -1))
            setSelected(0)
          } else {
            setChecked(true)
            if (onFeedback) onFeedback(filled.every((v, i) => v === i))
          }
        }}
      >
        {checked ? 'Nochmal versuchen' : "Stimmt's?"}
      </button>
    </GapContext.Provider>
  )
}

interface GappyProps {
  index: number
}

export function Gappy({ index }: GappyProps) {
  const context = useContext(GapContext)

  if (context) {
    if (context.checked) {
      return (
        <Gap
          mode={context.filled[index] === index ? 'right' : 'wrong'}
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
