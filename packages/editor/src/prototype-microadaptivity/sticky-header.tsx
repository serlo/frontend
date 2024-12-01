import { EditorModal } from '@editor/editor-ui/editor-modal'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { OverlayInput } from '@editor/editor-ui/overlay-input'
import { SwitchButton } from '@editor/editor-ui/switch-button'
import { faArrowRight, faCog } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export function StickyHeader({ allowEdit }: { allowEdit: boolean }) {
  const [showModal, setShowModal] = useState(false)
  const [closeAfterTimeLimit, setCloseAfterTimeLimit] = useState(false)

  return (
    <>
      <div className="sticky top-2 z-50 m-5 flex w-full flex-col items-center">
        <div className="mb-5 rounded-lg bg-white p-2 shadow-plugin-focus">
          Titel des Lernschritts | 20 Minuten Bearbeitungszeit | 3
          Wiederholungen
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
      <EditorModal
        isOpen={showModal}
        setIsOpen={(shouldShow) => {
          setShowModal(shouldShow)
        }}
        title="Lernschritt 8"
        extraTitleClassName="serlo-h3 mt-4"
        className="top-8 w-[50rem] translate-y-0 leading-8 sm:top-20"
      >
        <div className="w-full px-[16px]">
          <div className="flex flex-col gap-6">
            <div>
              <div>Welchen Titel soll der Lernschritt haben?</div>
              <textarea className="text-area-chrome-autogrow min-w-96 resize-none rounded-xl border-2 border-editor-primary-200 bg-editor-primary-100 px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none"></textarea>
            </div>

            <div>
              <div>
                Wie viel Bearbeitungszeit haben die Lernenden für diesen
                Lernschritt?
              </div>
              <div className="flex flex-row items-center justify-start gap-3">
                <textarea
                  cols={5}
                  rows={1}
                  className="resize-none rounded-xl border-2 border-editor-primary-200 bg-editor-primary-100 px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none"
                ></textarea>
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
                Wie oft darf dieses Lernmaterial vor der finalen Abgabe
                widerholt werden?
              </div>
              <div className="flex flex-row items-center justify-start gap-3">
                <textarea
                  placeholder="∞"
                  cols={5}
                  rows={1}
                  className="resize-none rounded-xl border-2 border-editor-primary-200 bg-editor-primary-100 px-2.5 py-[3px] text-almost-black focus:border-editor-primary focus:outline-none"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <button
                onClick={() => setShowModal(false)}
                className=" my-8 rounded-md bg-editor-primary-100 px-16 pb-4 pt-4 hover:cursor-pointer hover:bg-editor-primary-200"
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
