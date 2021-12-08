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
  if (mode == 'inactive') {
    return (
      <span
        className={clsx(
          'w-20 border-black border rounded bg-gray-50',
          'inline-block h-6 mx-1 -mb-1.5 cursor-pointer '
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
          'h-6 mx-1 px-2 select-none cursor-pointer mb-2'
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
            if (onFeedback) onFeedback(filled.every((v, i) => v == i))
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

export function Gappy({ index }: GappyProps) {
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
