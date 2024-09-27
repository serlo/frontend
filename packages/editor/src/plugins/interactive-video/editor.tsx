import { useAppSelector, selectStaticDocument } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { InteractiveVideoProps } from '.'
import { OverlayContentModal } from './editor/overlay-content-modal'
import { PlayerTools } from './editor/player-tools'
import { InteractiveVideoRenderer } from './renderer'
import { InteractiveVideoStaticRenderer } from './static'
import { InteractiveVideoToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

const defaultMarkTime = 5

export function InteractiveVideoEditor(props: InteractiveVideoProps) {
  const { focused, state, id } = props
  const { marks } = state
  const [previewActive, setPreviewActive] = useState(false)

  const pluginStrings = useEditorStrings().plugins.interactiveVideo

  const [showOverlayContentIndex, setShowOverlayContentIndex] = useState<
    null | number
  >(null)

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorInteractiveVideoDocument
  )

  function addOverlayContent(startTime: number) {
    marks.insert(undefined, {
      title: '',
      child: { plugin: EditorPluginType.Exercise },
      startTime: startTime,
      autoOpen: true,
      mandatory: false,
      forceRewatch: false,
    })
    setTimeout(() => setShowOverlayContentIndex(marks.length))
  }

  function openOverlayByStartTime(startTime: number) {
    const index = marks.findIndex((mark) => mark.startTime.value === startTime)
    if (index === -1) return
    setShowOverlayContentIndex(index)
  }

  const cues = marks.map((mark) => ({
    startTime: mark.startTime.value,
    endTime: mark.startTime.value + defaultMarkTime,
    text: mark.title.value || pluginStrings.defaultTitle,
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
              {marks.map((mark, index) => {
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
                      onClick={() => marks.remove(index)}
                    >
                      <span className="sr-only">Trash</span>
                      <FaIcon icon={faTrash} />
                    </button>
                  </li>
                )
              })}
            </ul>
            {showOverlayContentIndex === null ? null : (
              <OverlayContentModal
                onClose={() => setShowOverlayContentIndex(null)}
                mark={marks[showOverlayContentIndex]}
              />
            )}
          </div>
        </>
      )}
    </>
  )
}
