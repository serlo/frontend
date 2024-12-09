import { Fork } from './types'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function ForkModal({
  forkId,
  fork,
  isOpen,
  setIsOpen,
  onClick,
}: {
  forkId: string
  fork: Fork
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onClick: (forkId: string, nextExerciseId: string) => void
}) {
  return (
    <ModalWithCloseButton
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Choose your path"
      extraCloseButtonClassName="bg-brand-200"
      className="top-[12%] w-[47%] translate-y-0 overflow-y-auto p-5 pt-12"
      extraTitleClassName="border-none"
    >
      <div className="flex items-center justify-around">
        {fork.nextExercises.map((nextExerciseId) => (
          <button
            key={nextExerciseId}
            className="serlo-button-learner-primary rounded-md p-3 text-2xl font-medium"
            onClick={() => onClick(forkId, nextExerciseId)}
          >
            {nextExerciseId}
          </button>
        ))}
      </div>
    </ModalWithCloseButton>
  )
}
