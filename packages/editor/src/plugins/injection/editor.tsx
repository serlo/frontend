import { PreviewOverlay } from '@editor/editor-ui'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { InjectionSerloStaticRenderer } from '@serlo/frontend/src/serlo-editor-integration/serlo-plugin-wrappers/injection-serlo-static-renderer'
import { useEffect, useState } from 'react'

import type { InjectionProps } from '.'
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
          <InjectionSerloStaticRenderer
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
