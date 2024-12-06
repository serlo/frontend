import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { SwitchButton } from '@editor/editor-ui/switch-button'
import { EditorTextArea } from '@editor/plugins/text-area-exercise/editor-text-area'
import { faArrowRight, faCog } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export function StickyHeader({ allowEdit }: { allowEdit: boolean }) {
  const [showModal, setShowModal] = useState(false)
  const [closeAfterTimeLimit, setCloseAfterTimeLimit] = useState(false)

  return (
    <>
      {showModal ? null : (
        <div className="sticky top-2 z-50 m-5 flex w-full flex-col items-center">
          <div className="mb-5 flex flex-row gap-3 rounded-lg bg-white p-2 shadow-plugin-focus">
            <span>Write an opinion</span>
            <span>|</span>
            <span>15 Minuten Bearbeitungszeit</span>
            <span>|</span>
            <span>3 Wiederholungen</span>
            {allowEdit ? (
              <button
                onClick={() => setShowModal(true)}
                className="mx-2 rounded-md border-gray-500 bg-editor-primary-100 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
              >
                <FaIcon className="" icon={faCog} />
              </button>
            ) : null}
          </div>
        </div>
      )}
      <EditorModal
        isOpen={showModal}
        setIsOpen={(shouldShow) => {
          setShowModal(shouldShow)
        }}
        title="Lernschritt"
        extraTitleClassName="serlo-h3 mt-4"
        extraOverlayClassName="blur"
        className="top-8 w-[40rem] translate-y-0 sm:top-20"
      >
        <div className="w-full px-[16px]">
          <div className="flex flex-col gap-8">
            <div>
              <div>Welchen Titel soll der Lernschritt haben?</div>
              <EditorTextArea showAiGenerateIcon={false} />
            </div>

            <div>
              <div>
                Wie viel Bearbeitungszeit haben die Lernenden für diesen
                Lernschritt?
              </div>
              <div className="w- flex flex-row items-center justify-start gap-3">
                <EditorTextArea
                  className="w-16"
                  showMicrophoneIcon={false}
                  showAiGenerateIcon={false}
                />
                Minuten
              </div>
              <div className="flex flex-row gap-3">
                Lernschritt nach Ablaufen der Zeit automatisch schließen?
                <SwitchButton
                  isOn={closeAfterTimeLimit}
                  onClick={() =>
                    setCloseAfterTimeLimit((oldValue) => !oldValue)
                  }
                />
              </div>
            </div>

            <div>
              <div>
                Wie oft darf dieser Lernschritt vor der finalen Abgabe widerholt
                werden?
              </div>
              <div className="flex flex-row items-center justify-start gap-3">
                <EditorTextArea
                  placeholder="∞"
                  className="w-14"
                  showMicrophoneIcon={false}
                  showAiGenerateIcon={false}
                />
              </div>
            </div>

            <div className="flex flex-col items-end">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md bg-editor-primary-100 px-16 pb-4 pt-4 hover:cursor-pointer hover:bg-editor-primary-200"
              >
                zum Lernmaterial-Editor{' '}
                <FaIcon className="mx-3" icon={faArrowRight} />
              </button>
            </div>

            {/* <OverlayInput
              label=""
              autoFocus
              placeholder="Test"
              value=""
              disabled
              onChange={(e) => null}
            /> */}
          </div>
        </div>
      </EditorModal>
    </>
  )
}
