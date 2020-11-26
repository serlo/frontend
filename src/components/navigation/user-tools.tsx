import {
  faClock,
  faPencilAlt,
  faShareAlt,
  faTools,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

import { makeGreenTransparentButton, inputFontReset } from '../../helper/css'
import {
  AuthorToolsHoverMenuProps,
  AuthorToolsData,
} from './author-tools-hover-menu'
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
  data: AuthorToolsData
  unrevisedRevision?: number
}

export interface UserToolsData {
  editHref: string
}

export function UserTools({
  id,
  onShare,
  hideEdit,
  data,
  unrevisedRevision,
}: UserToolsProps) {
  const { strings } = useInstanceData()
  const auth = useAuth()
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    setLoaded(true)
  }, [])
  const loggedInData = useLoggedInData()
  const showHistory = unrevisedRevision !== undefined && unrevisedRevision > 0

  const editHref =
    data.type == 'Page'
      ? `/page/revision/create/${data.id}/${data.revisionId || ''}`
      : data.type == 'Taxonomy'
      ? `/taxonomy/term/update/${id}`
      : `/entity/repository/add-revision/${id}`

  return (
    <AbsoluteWrapper>
      <BoxWrapper>
        {(!hideEdit || (loaded && auth.current)) && (
          <>
            {!showHistory && (
              <IconButton href={editHref}>
                <FontAwesomeIcon icon={faPencilAlt} size="1x" />{' '}
                {strings.edit.button}
              </IconButton>
            )}
            {showHistory && (
              <IconButton href={`/entity/repository/history/${id}`}>
                <FontAwesomeIcon icon={faClock} size="1x" />{' '}
                {`${strings.edit.unrevised} (${unrevisedRevision})`}
              </IconButton>
            )}
          </>
        )}
        <IconButton onClick={onShare} as="button">
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> {strings.share.button}
          !
        </IconButton>
        {loaded && auth.current && loggedInData && data && (
          <Tippy
            interactive
            content={<AuthorToolsHoverMenu data={data} />}
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
  ${makeGreenTransparentButton}
  ${inputFontReset}
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
  margin: 4px;
  svg {
    margin-right: 2px;
  }
`
