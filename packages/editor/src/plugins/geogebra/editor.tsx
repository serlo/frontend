import { EmbedWrapper } from '@editor/editor-ui/embed-wrapper'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { entityIconMapping } from '@serlo/frontend/src/helper/icon-by-entity-type'
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
          className={!focused ? 'pointer-events-none' : ''}
        >
          <GeogebraRenderer geogebraId={cleanId} />
        </EmbedWrapper>
      ) : (
        <div
          className="mx-side cursor-pointer rounded-lg bg-editor-primary-50 py-32 text-center"
          data-qa="plugin-geogebra-placeholder"
          onClick={() => setShowSettingsModal(true)}
        >
          <FaIcon
            icon={entityIconMapping['applet']}
            className="text-7xl text-editor-primary-200"
          />
        </div>
      )}
    </>
  )
}
