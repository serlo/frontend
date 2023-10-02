import { tw } from '@/helper/tw'

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
      <ol className="mb-2.5 ml-2 bg-white pb-3.5 [counter-reset:exercises] sm:pl-12">
        {exercises.map((exercise) => {
          if (!exercise) return null
          const { element, id } = exercise
          return (
            <li
              key={id}
              className={tw`
                serlo-exercise-wrapper serlo-grouped-exercise-wrapper
                mt-12 pt-2 [&>div]:border-none
              `}
            >
              {element}
            </li>
          )
        })}
      </ol>
    </>
  )
}
