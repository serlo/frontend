import React from 'react'
import styled from 'styled-components'

import { PrivacyWrapper } from './privacy-wrapper'
import { ExternalProvider } from '@/helper/use-consent'

export interface GeogebraProps {
  id: string
}

export function Geogebra({ id }: GeogebraProps) {
  const appletId = id.replace('https://www.geogebra.org/m/', '')
  const url = 'https://www.geogebra.org/material/iframe/id/' + appletId
  return (
    <PrivacyWrapper
      type="applet"
      provider={ExternalProvider.GeoGebra}
      embedUrl={url}
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
