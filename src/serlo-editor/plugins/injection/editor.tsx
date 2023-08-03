import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

import { InjectionProps } from '.'
import { InjectionRenderer } from './renderer'
import { InjectionToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'
import { renderArticle } from '@/schema/article-renderer'
import { PreviewOverlay } from '@/serlo-editor/editor-ui'

export function InjectionEditor(props: InjectionProps) {
  const { domFocusWithin, state, editable } = props

  const [cache, setCache] = useState(state.value)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [previewActive, setPreviewActive] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setCache(state.value), 2000)
    return () => clearTimeout(timeout)
  }, [domFocusWithin, state.value])

  if (!editable) {
    return <InjectionRenderer href={state.value} renderNested={renderArticle} />
  }

  return (
    <>
      {domFocusWithin && (
        <InjectionToolbar
          {...props}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      )}
      {cache ? (
        <PreviewOverlay showOverlay={previewActive || !domFocusWithin}>
          <InjectionRenderer href={cache} renderNested={renderArticle} />
        </PreviewOverlay>
      ) : (
        <div
          className="cursor-pointer rounded-lg bg-editor-primary-50 py-32 text-center"
          onClick={() => setShowSettingsModal(true)}
        >
          <FaIcon
            icon={faSquarePlus}
            className="text-7xl text-editor-primary-200"
          />
        </div>
      )}
    </>
  )
}
