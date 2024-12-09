import { initialMapItemsData } from './const'
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
  const isPathFork = forkId === 'fork2'

  return (
    <ModalWithCloseButton
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={
        isPathFork ? 'Welchen Weg willst du gehen?' : 'Lust auf einen Exkurs?'
      }
      extraCloseButtonClassName="bg-brand-200"
      className="top-[12%] w-[47%] translate-y-0 overflow-y-auto p-5 pt-12"
      extraTitleClassName="border-none serlo-h3"
    >
      {isPathFork ? renderPathFork() : renderExcursionFork()}
    </ModalWithCloseButton>
  )

  function renderExcursionFork() {
    const excursionId = fork.nextExercises[0]
    const nextId = fork.nextExercises[1]
    const excursion = initialMapItemsData[excursionId]

    return (
      <>
        <p className="serlo-p">
          Du kannst entweder einen Exkurs zum Thema <br />
          {/* @ts-expect-error 123*/}
          <b>{excursion.title}</b> ({excursion.time} min)
          <br />
          machen oder direkt mit dem nächsten Lernschritt weitermachen.
        </p>
        <div className="mx-side">
          <button
            className="serlo-button-learner-primary mr-2 rounded-md p-3 text-xl font-medium"
            onClick={() => onClick(forkId, nextId)}
          >
            Zum Exkurs
          </button>
          <button
            className="serlo-button-learner-primary rounded-md p-3 text-xl font-medium"
            onClick={() => onClick(forkId, excursionId)}
          >
            Direkt weiter
          </button>
        </div>
      </>
    )
  }

  function renderPathFork() {
    const easyId = fork.nextExercises[0]
    const hardId = fork.nextExercises[1]
    console.log(easyId)
    return (
      <>
        <p className="serlo-p">
          Wenn dir heute mehr Hilfe möchtest kannst du den <b>einfachen Weg</b>{' '}
          gehen.
          <br />
          Für ein bisschen mehr Herausforderung gibt es den{' '}
          <b>fortgeschritten Weg</b>.
        </p>
        <div className="mx-side">
          <button
            className="serlo-button-learner-primary mr-2 rounded-md p-3 text-xl font-medium"
            onClick={() => onClick(forkId, easyId)}
          >
            Einfach ✌️
          </button>
          <button
            className="serlo-button-learner-primary rounded-md p-3 text-xl font-medium"
            onClick={() => onClick(forkId, hardId)}
          >
            Fortgeschritten 🌶
          </button>
        </div>
      </>
    )
  }
}
