import { cn } from '@serlo/frontend/src/helper/cn'

export interface TextExerciseGroupTypeRendererProps {
  content: JSX.Element
  exercises: ({
    element: JSX.Element
    id?: string
  } | null)[]
}

export function TextExerciseGroupTypeRenderer({
  content,
  exercises,
}: TextExerciseGroupTypeRendererProps) {
  return (
    <>
      {content}
      <ol className="serlo-ol-no-absolute-before mb-2.5 list-none bg-white pb-3.5 [counter-reset:exercises]">
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
              {element}
            </li>
          )
        })}
      </ol>
    </>
  )
}
