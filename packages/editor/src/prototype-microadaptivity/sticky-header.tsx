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
            <span>Writing your opinion</span>
            <span>|</span>
            <span>20 Minuten Bearbeitungszeit</span>
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
        title="Lernpfad-Schritt"
        extraTitleClassName="serlo-h3 mt-4"
        extraOverlayClassName="blur"
        className="top-8 w-[46rem] translate-y-0 sm:top-20"
      >
        <div className="w-full px-[16px]">
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-1">
                Welchen <span className="font-bold">Titel</span> soll der
                Lernpfad-Schritt haben?
              </div>
              <EditorTextArea showAiGenerateIcon={false} />
            </div>

            <div>
              <div className="mb-1">
                Wie viel <span className="font-bold">Bearbeitungszeit</span>{' '}
                haben die Lernenden für diesen Lernpfad-Schritt?
              </div>
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="flex flex-row items-center ">
                  <EditorTextArea
                    className="w-16"
                    showMicrophoneIcon={false}
                    showAiGenerateIcon={false}
                  />
                  Minuten
                </div>
                <span></span>
                <div className="">
                  <span className="mr-2">
                    Nach Ablaufen der Zeit automatisch schließen?
                  </span>
                  <SwitchButton
                    isOn={closeAfterTimeLimit}
                    onClick={() =>
                      setCloseAfterTimeLimit((oldValue) => !oldValue)
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <div>
                Wie viele <span className="font-bold">Wiederholungen</span>{' '}
                dieses Lernpfad-Schritts sind vor der finalen Abgabe erlaubt?
              </div>
              <div className="mt-1 flex flex-row items-center justify-start gap-3">
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
