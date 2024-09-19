import { OverlayInput } from '@editor/editor-ui/overlay-input'
import { useAppSelector, selectStaticDocument } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { InteractiveVideoProps } from '.'
import { PlayerTools } from './editor/player-tools'
import { InteractiveVideoRenderer } from './renderer'
import { InteractiveVideoStaticRenderer } from './static'
import { InteractiveVideoToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function InteractiveVideoEditor(props: InteractiveVideoProps) {
  const { focused, state, id } = props
  const [previewActive, setPreviewActive] = useState(false)

  const [showOverlayContentIndex, setShowOverlayContentIndex] = useState<
    null | number
  >(null)

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorInteractiveVideoDocument
  )

  function addOverlayContent(startTime: number) {
    state.marks.insert(undefined, {
      title: '',
      child: { plugin: EditorPluginType.Exercise },
      startTime: startTime,
      endTime: startTime + 5,
      autoOpen: true,
      mandatory: false,
      timeAfterFail: undefined,
    })
    setTimeout(() => setShowOverlayContentIndex(state.marks.length))
  }

  function openOverlayByStartTime(startTime: number) {
    const index = state.marks.findIndex(
      (mark) => mark.startTime.value === startTime
    )
    if (index === -1) return
    setShowOverlayContentIndex(index)
  }

  const cues = state.marks.map((mark) => ({
    startTime: mark.startTime.value,
    endTime: mark.endTime.value,
    text: mark.title.value || 'Inhalt',
  }))

  return (
    <>
      {focused && (
        <InteractiveVideoToolbar
          {...props}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      )}

      {previewActive ? (
        <InteractiveVideoStaticRenderer {...staticDocument} />
      ) : (
        <>
          <InteractiveVideoRenderer
            chapterContent={{ cues }}
            tools={
              <PlayerTools
                addOverlayContent={addOverlayContent}
                openOverlayByStartTime={openOverlayByStartTime}
              />
            }
          />

          <div className="mx-side">
            <ul>
              {state.marks.map((mark, index) => {
                const title = mark.title.value.length
                  ? mark.title.value
                  : 'type'
                return (
                  <li key={index} className="mb-3 flex gap-1">
                    <span>{mark.startTime.value}</span>
                    <b className="grow">{title}</b>
                    <button
                      className="serlo-button-editor-secondary"
                      onClick={() => {
                        setShowOverlayContentIndex(index)
                      }}
                    >
                      <span className="sr-only">Edit</span>
                      <FaIcon icon={faPencilAlt} />
                    </button>
                    <button
                      className="serlo-button-editor-secondary"
                      onClick={() => state.marks.remove(index)}
                    >
                      <span className="sr-only">Trash</span>
                      <FaIcon icon={faTrash} />
                    </button>
                  </li>
                )
              })}
            </ul>
            {renderOverlayContentModal()}
          </div>
        </>
      )}
    </>
  )

  function renderOverlayContentModal() {
    if (showOverlayContentIndex === null) return null

    const { title, autoOpen, mandatory, child } =
      state.marks[showOverlayContentIndex]
    return (
      <ModalWithCloseButton
        isOpen
        setIsOpen={() => setShowOverlayContentIndex(null)}
        className="bottom-24 top-side h-auto w-full max-w-4xl translate-y-0 overflow-x-auto"
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold">Inhalt bearbeiten</h2>
          <p className="mt-4">
            <OverlayInput
              label="Titel"
              value={title.value}
              onChange={(e) => title.set(e.target.value)}
            />
          </p>
          <p className="mt-4">
            <label>
              <span>Automatisch öffnen</span>
              <input
                type="checkbox"
                checked={autoOpen.value}
                onChange={(e) => autoOpen.set(e.target.checked)}
              />
            </label>
          </p>
          <p className="mt-4">
            <label>
              <span>Muss gelöst werden</span>
              <input
                className=""
                type="checkbox"
                checked={mandatory.value}
                onChange={(e) => mandatory.set(e.target.checked)}
              />
            </label>
          </p>

          <p className="mt-12">{child.render()}</p>
        </div>
      </ModalWithCloseButton>
    )
  }
}
