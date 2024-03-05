import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { ExStatus, ExerciseFeedback } from '../feedback/execise-feedback'
import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

interface MultipleChoiceOption {
  title: string
  isCorrect: boolean
}

interface MultipleChoiceExerciseProps {
  generator: () => { options: MultipleChoiceOption[] }
  centAmount?: number
}

export function MultipleChoiceExercise({
  generator,
  centAmount,
}: MultipleChoiceExerciseProps) {
  const [data, setData] = useState(generator())
  const [exStatus, setExStatus] = useState<ExStatus>('fresh')
  const { options } = data
  const [selection, setSelection] = useState<boolean[]>(
    options.map(() => false)
  )
  const noUserInput = selection.every((val) => val === false)

  const exIsCorrect = selection.every(
    (selected, i) => options[i].isCorrect === selected
  )

  return (
    <>
      <h2 className="pb-8 text-left text-2xl font-bold text-almost-black">
        Welche Antworten stimmen?{' '}
        {/* TODO: Task. <span className="text-newgreen">
          {data.options.map(({ title }) => (
            <>{title}, </>
          ))}
        </span> */}
      </h2>
      <div id="multiple-choice-wrapper" className="text-2xl font-bold">
        {options.map(({ title }, i) => {
          const isTicked = selection[i]
          const isCorrect = isTicked === options[i].isCorrect

          return (
            <label key={title + i} className="group mb-2 block cursor-pointer">
              <input
                className="appearance-none opacity-0"
                type="checkbox"
                disabled={exStatus === 'correct' || exStatus === 'revealed'}
                name="mcExercise"
                value={title}
                checked={isTicked}
                onChange={() => {
                  const newSelection = [...selection]
                  newSelection[i] = !newSelection[i]
                  setSelection(newSelection)
                  if (exStatus === 'incorrect') setExStatus('fresh')
                }}
              />
              <span
                className={cn(
                  'mx-0.25 inline-block min-w-[30px] rounded-md border-2 p-1.5 transition-all',
                  'border-opacity-10 group-focus-within:!border-opacity-100',
                  getColorClasses(isCorrect, isTicked),
                  exStatus === 'revealed' && !isCorrect && 'opacity-60'
                )}
              >
                <FaIcon
                  icon={isTicked ? faCheckSquare : faSquare}
                  className="text-newgreen opacity-60"
                />{' '}
                {title}
              </span>
            </label>
          )
        })}
      </div>

      <ExerciseFeedback
        noUserInput={noUserInput}
        noUserInputText={<>Wähle eine Stelle aus</>}
        exStatus={exStatus}
        setExStatus={setExStatus}
        isCorrect={exIsCorrect}
        shakeElementQuery="#multiple-choice-wrapper"
        focusElementQuery="#multiple-choice-wrapper input"
        onNewExecise={() => {
          setData(generator())
          setSelection(selection.map(() => false))
        }}
        centAmount={centAmount}
      />
    </>
  )

  function getColorClasses(isCorrect: boolean, isTicked: boolean) {
    // revealed: actually correct:
    if (exStatus === 'revealed' && isCorrect) {
      return cn('border-newgreen-600 bg-newgreen bg-opacity-20')
    }
    if (!isTicked) {
      return 'border-gray-200 bg-gray-50'
    }
    return cn(
      // default selection
      exStatus === 'fresh' && 'border-newgreen-600 bg-newgreen bg-opacity-10',
      exStatus === 'correct' && 'border-newgreen-600 bg-newgreen bg-opacity-50',
      (exStatus === 'incorrect' || exStatus === 'revealed') &&
        'border-red-300 bg-red-100'
    )
  }
}
