import { EmbedWrapper } from '@editor/editor-ui/embed-wrapper'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faCubes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { GeogebraProps } from '.'
import { GeogebraRenderer, parseId } from './renderer'
import { GeogebraToolbar } from './toolbar'

export function GeogebraEditor(props: GeogebraProps) {
  const { focused, state } = props
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const { cleanId, url } = parseId(state.value)
  const couldBeValidId = cleanId.length === 8

  return (
    <>
      {focused && (
        <GeogebraToolbar
          {...props}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      )}
      {couldBeValidId ? (
        <EmbedWrapper
          type="applet"
          provider="GeoGebra"
          embedUrl={url}
          className={cn(!focused && 'pointer-events-none')}
        >
          <GeogebraRenderer geogebraId={cleanId} />
        </EmbedWrapper>
      ) : (
        <div
          className="mx-side cursor-pointer rounded-lg bg-editor-primary-50 py-32 text-center"
          data-qa="plugin-geogebra-placeholder"
          onClick={() => setShowSettingsModal(true)}
        >
          <FaIcon icon={faCubes} className="text-7xl text-editor-primary-200" />
        </div>
      )}
    </>
  )
}
