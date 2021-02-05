import styled from 'styled-components'

import { EventCounter } from '../event-counter'
import { PrivacyWrapper } from './privacy-wrapper'
import { submitEventWithPath } from '@/helper/submit-event'
import { ExternalProvider } from '@/helper/use-consent'
import { NodePath } from '@/schema/article-renderer'

export interface GeogebraProps {
  id: string
  path?: NodePath
}

export function Geogebra({ id, path }: GeogebraProps) {
  const appletId = id.replace('https://www.geogebra.org/m/', '')
  const url = 'https://www.geogebra.org/material/iframe/id/' + appletId
  return (
    <PrivacyWrapper
      type="applet"
      provider={ExternalProvider.GeoGebra}
      embedUrl={url}
      eventCounter={<EventCounter prefix="loadgeogebra" path={path} />}
      onLoad={() => {
        submitEventWithPath('loadgeogebra', path)
      }}
    >
      <GeogebraContainer>
        <GeogebraFrame title={appletId} scrolling="no" src={url} />
      </GeogebraContainer>
    </PrivacyWrapper>
  )
}

const GeogebraFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 6;
  background-color: rgba(0, 0, 0, 0.3);
`

const GeogebraContainer = styled.div`
  padding: 0;
  display: block;
  height: 0;
  overflow: hidden;
`
