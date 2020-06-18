import { faPencilAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { makeGreenButton } from '../../helper/css'

interface UserToolsProps {
  editHref?: string
  onShare?: () => void
  hideEdit: boolean
}

export function UserTools({ editHref, onShare, hideEdit }: UserToolsProps) {
  return (
    <AbsoluteWrapper>
      <BoxWrapper>
        {!hideEdit && (
          <IconButton href={editHref}>
            <FontAwesomeIcon icon={faPencilAlt} size="1x" /> Inhalt überarbeiten
          </IconButton>
        )}
        <IconButton onClick={onShare}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen!
        </IconButton>
      </BoxWrapper>
    </AbsoluteWrapper>
  )
}

const AbsoluteWrapper = styled.nav`
  position: absolute;
  right: 32px;
  bottom: 32px;
  height: 100%;
  display: flex;
  align-items: flex-end;
`

const BoxWrapper = styled.div`
  position: sticky;
  bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    display: none;
  }
`

const IconButton = styled.a`
  ${makeGreenButton}
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
  margin: 4px;
  svg {
    margin-right: 2px;
  }
`
