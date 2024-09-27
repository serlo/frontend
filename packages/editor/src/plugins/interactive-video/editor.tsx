import { useAppSelector, selectStaticDocument } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { EditorInteractiveVideoDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import type { InteractiveVideoProps } from '.'
import { MarksList } from './editor/marks-list'
import { OverlayContentModal } from './editor/overlay-content-modal'
import { PlayerTools } from './editor/player-tools'
import { InteractiveVideoRenderer } from './renderer'
import { InteractiveVideoStaticRenderer } from './static'
import { InteractiveVideoToolbar } from './toolbar'
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

          {showOverlayContentIndex === null ? null : (
            <OverlayContentModal
              onClose={() => setShowOverlayContentIndex(null)}
              mark={marks[showOverlayContentIndex]}
            />
          )}

          <MarksList marks={marks} onMarkClick={setShowOverlayContentIndex} />
        </>
      )}
    </>
  )
}
