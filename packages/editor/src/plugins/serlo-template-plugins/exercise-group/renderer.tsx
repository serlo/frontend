import { cn } from '@serlo/frontend/src/helper/cn'

export interface TextExerciseGroupTypeRendererProps {
  content: JSX.Element
  exercises: ({
    element: JSX.Element
    id?: string
  } | null)[]
}

function indexToLetter(index: number) {
  return String.fromCharCode('a'.charCodeAt(0) + index)
}

export function TextExerciseGroupTypeRenderer({
  content,
  exercises,
}: TextExerciseGroupTypeRendererProps) {
  return (
    <>
      {content}
      <ol className="serlo-ol-no-before mb-2.5 list-none bg-white pb-3.5 [counter-reset:exercises]">
        {exercises.map((exercise, index) => {
          if (!exercise) return null
          const { element, id } = exercise
          return (
            <li
              key={id ?? index}
              className={cn(`
                serlo-exercise-wrapper serlo-grouped-exercise-wrapper
                mt-6 flex flex-row [&>div]:border-none
              `)}
            >
              <span className="mr-2 h-6 w-6 flex-shrink-0 rounded-full bg-brand-150 text-center text-xl font-bold leading-6 text-brand-700">
                {indexToLetter(index)}
              </span>
              {element}
            </li>
          )
        })}
      </ol>
    </>
  )
}
