import { Exercise } from './types'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function Modal({
  exercise,
  isOpen,
  setIsOpen,
  onConfirmClick,
  setStartToDone,
}: {
  exercise: Exercise
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onConfirmClick: () => void
  setStartToDone: () => void
}) {
  const isStart = exercise.type === 'start'
  return (
    <ModalWithCloseButton
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={isStart ? '' : exercise.title}
      extraCloseButtonClassName="bg-brand-200"
      className="top-[12%] w-[47%] translate-y-0 overflow-y-auto p-5 pt-12"
      extraTitleClassName="border-none serlo-h3"
    >
      <input
        className="absolute opacity-0"
        type="checkbox"
        id="modal"
        autoFocus
      />
      {isStart ? renderStartContent() : renderDefaultContent()}
    </ModalWithCloseButton>
  )

  function renderDefaultContent() {
    return (
      <>
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
            <li>
              <b>Bewertungskriterien</b> stehen zur Verfügung.
            </li>
          </ul>
        </p>
        <div className="mx-side mb-10 flex justify-end">
          <button
            className="serlo-button-learner-primary rounded-md p-3 text-2xl font-medium"
            onClick={onConfirmClick}
          >
            Los geht&apos;s
          </button>
        </div>
      </>
    )
  }
  function renderStartContent() {
    return (
      <>
        <h3 className="serlo-h3">
          Hi Simon 👋
          <br /> Schön dass du da bist.
        </h3>
        <p className="serlo-p">
          Heute lernst du, wie Du deine persönliche Meinung auf Englisch
          ausdrückst.
        </p>

        <ul className="serlo-ul text-lg">
          <li>
            Lernpfad-Titel: <b>Giving an opinion for or against something</b>
          </li>
          <li>
            Gesamtbearbeitungszeit: <b>45 Min</b>
          </li>
        </ul>
        <p className="serlo-p font-bold">Viel Erfolg!</p>

        <div className="mx-side mb-10 flex justify-end">
          <button
            className="serlo-button-learner-primary rounded-md p-3 text-2xl font-medium"
            onClick={setStartToDone}
          >
            Los geht&apos;s
          </button>
        </div>
      </>
    )
  }
}
