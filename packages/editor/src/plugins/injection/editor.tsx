import { PreviewOverlay } from '@editor/editor-ui'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { InjectionProps } from '.'
import { InjectionStaticRenderer } from './static'
import { InjectionToolbar } from './toolbar'

export function InjectionEditor(props: InjectionProps) {
  const { focused, state } = props

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const injectionStrings = useEditStrings().plugins.injection

  return (
    <>
      {focused && (
        <InjectionToolbar
          {...props}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      )}
      {state.value ? (
        <PreviewOverlay focused={focused || false}>
          <InjectionStaticRenderer
            plugin={EditorPluginType.Injection}
            state={state.value}
            errorBox={
              <div className="my-12 rounded-2xl bg-gray-100 p-4 font-bold">
                {injectionStrings.errorLoading}{' '}
                <small className="float-right mt-0.5">
                  <a className="serlo-link" href={state.value}>
                    Link
                  </a>
                </small>
              </div>
            }
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
