import {
  faPencilAlt,
  faShareAlt,
  faTools,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

import { makeGreenButton, inputFontReset } from '../../helper/css'
import { AuthorToolsHoverMenuProps } from './author-tools-hover-menu'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const AuthorToolsHoverMenu = dynamic<AuthorToolsHoverMenuProps>(() =>
  import('./author-tools-hover-menu').then((mod) => mod.AuthorToolsHoverMenu)
)

interface UserToolsProps {
  id: number
  onShare?: () => void
  hideEdit: boolean
}

export interface UserToolsData {
  editHref: string
}

export function UserTools({ id, onShare, hideEdit }: UserToolsProps) {
  const { strings } = useInstanceData()
  const auth = useAuth()
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    setLoaded(true)
  }, [])
  const loggedInData = useLoggedInData()
  return (
    <AbsoluteWrapper>
      <BoxWrapper>
        {(!hideEdit || (loaded && auth.current)) && (
          <IconButton href={`/entity/repository/add-revision/${id}`}>
            <FontAwesomeIcon icon={faPencilAlt} size="1x" />{' '}
            {strings.edit.button}
          </IconButton>
        )}
        <IconButton onClick={onShare} as="button">
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> {strings.share.button}
          !
        </IconButton>
        {loaded && auth.current && loggedInData && (
          <Tippy
            interactive
            content={<AuthorToolsHoverMenu id={id} />}
            placement="left-end"
          >
            <IconButton as="button">
              <FontAwesomeIcon icon={faTools} size="1x" />{' '}
              {loggedInData.strings.tools}
            </IconButton>
          </Tippy>
        )}
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
  ${inputFontReset}
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
  margin: 4px;
  svg {
    margin-right: 2px;
  }
`
