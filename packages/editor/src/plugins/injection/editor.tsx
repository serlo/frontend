import { PreviewOverlay } from '@editor/editor-ui'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEffect, useState } from 'react'

import type { InjectionProps } from '.'
import { InjectionStaticRenderer } from './static'
import { InjectionToolbar } from './toolbar'

export function InjectionEditor(props: InjectionProps) {
  const { focused, state } = props

  const [cache, setCache] = useState(state.value)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setCache(state.value), 2000)
    return () => clearTimeout(timeout)
  }, [focused, state.value])

  return (
    <>
      {focused && (
        <InjectionToolbar
          {...props}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      )}
      {cache ? (
        <PreviewOverlay
          focused={focused || false}
          onChange={(nextActive) => {
            if (nextActive) setCache(state.value)
          }}
        >
          <InjectionStaticRenderer
            plugin={EditorPluginType.Injection}
            state={cache}
          />
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
