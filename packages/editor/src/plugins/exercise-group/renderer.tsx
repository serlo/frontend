import { cn } from '@editor/utils/cn'

export interface ExerciseGroupRendererProps {
  content: JSX.Element
  exercises: ({
    element: JSX.Element
    id?: string
  } | null)[]
}

export function ExerciseGroupRenderer({
  content,
  exercises,
}: ExerciseGroupRendererProps) {
  return (
    <>
      {content}
      <ol className="mb-2.5 ml-2 bg-white pb-3.5 [counter-reset:exercises] sm:pl-12">
        {exercises.map((exercise, index) => {
          if (!exercise) return null
          const { element, id } = exercise
          return (
            <li
              key={id ?? index}
              id={id?.split('-')[0]}
              className={cn(`
                serlo-exercise-wrapper mt-6 pt-2 [counter-increment:exercises]
                before:mx-side before:mb-2.5 before:flex before:h-7 before:w-7 before:justify-center
                before:rounded-full before:bg-brand-200 before:align-middle before:text-xl
                before:font-bold before:text-brand before:content-[counter(exercises,_lower-alpha)]
                before:sm:absolute before:sm:-ml-10 before:sm:-mt-1 [&>div]:border-none
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
