import { cn } from '@editor/utils/cn'

export function SubmitButtonAndFeedback({
  onClick,
  triesLeft,
  isSubmitting,
  dots,
}: {
  onClick: () => void
  triesLeft: number
  isSubmitting: boolean
  dots: string
}) {
  return (
    <div className="">
      <button
        onClick={() => {
          onClick()
        }}
        disabled={isSubmitting}
        className={cn(
          // Fixed width so that the button does not move when we animate the dots
          'mb-3 w-[450px] max-w-[450px] rounded-md bg-brand-600 px-16 pb-4 pt-4 font-bold text-white',
          'hover:cursor-pointer hover:bg-brand-700',
          isSubmitting && 'cursor-not-allowed bg-brand-400'
        )}
      >
        {isSubmitting
          ? `Zur Rückmeldung abschicken${dots}`
          : `Zur Rückmeldung abschicken (${triesLeft})`}
      </button>
    </div>
  )
}
