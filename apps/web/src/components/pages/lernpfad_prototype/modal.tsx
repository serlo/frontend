import { Exercise } from './types'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function Modal({
  exercise,
  isOpen,
  setIsOpen,
  onConfirmClick,
}: {
  exercise: Exercise
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onConfirmClick: () => void
}) {
  return (
    <ModalWithCloseButton
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={exercise.title}
      extraCloseButtonClassName="bg-brand-200"
      className="top-[12%] w-[47%] translate-y-0 overflow-y-auto p-5 pt-12"
      extraTitleClassName="border-none"
    >
      <input
        className="absolute opacity-0"
        type="checkbox"
        id="modal"
        autoFocus
      />
      <p className="serlo-p">
        <ul className="serlo-ul ml-0">
          <li>
            Du hast <b>{exercise.time} Minuten</b> Zeit.
          </li>
          <li>
            Diesen Lernschritt kannst du <b>drei Mal</b> vor der entgültigen
            Abgabe <b>bearbeiten</b>.
          </li>

          <li>
            Deine Lehrkraft hat <b>Rückmeldungen aktiviert</b>.
          </li>
        </ul>
      </p>
      <p className="serlo-p">Bewertungskriterien stehen zur Verfügung.</p>
      <div className="mx-side mb-10 flex justify-end">
        <button
          className="serlo-button-learner-primary rounded-md p-3 text-2xl font-medium"
          onClick={onConfirmClick}
        >
          Los geht&apos;s
        </button>
      </div>
    </ModalWithCloseButton>
  )
}
