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

  if (data.type === 'Profile') return renderProfileMenu()

  return (
    <AbsoluteWrapper>
      <BoxWrapper>
        {(!hideEdit || (loaded && auth.current)) && (
          <>
            {renderEdit()}
            {renderUnrevised()}
          </>
        )}
        {renderShare()}
        {renderTools()}
      </BoxWrapper>
    </AbsoluteWrapper>
  )

  function renderEdit() {
    const editHref =
      data.type == 'Page'
        ? `/page/revision/create/${data.id}/${data.revisionId || ''}`
        : data.type == 'Taxonomy'
        ? `/taxonomy/term/update/${id}`
        : `/entity/repository/add-revision/${id}`

    return (
      !showHistory && (
        <IconButton href={editHref}>
          <FontAwesomeIcon icon={faPencilAlt} size="1x" /> {strings.edit.button}
        </IconButton>
      )
    )
  }

  function renderUnrevised() {
    return (
      showHistory && (
        <IconButton href={`/entity/repository/history/${id}`}>
          <FontAwesomeIcon icon={faClock} size="1x" />{' '}
          {`${strings.edit.unrevised} (${unrevisedRevision || ''})`}
        </IconButton>
      )
    )
  }

  function renderShare() {
    return (
      <IconButton onClick={onShare} as="button">
        <FontAwesomeIcon icon={faShareAlt} size="1x" /> {strings.share.button}!
      </IconButton>
    )
  }

  function renderTools() {
    if (!(loaded && auth.current && loggedInData && data)) return null
    return (
      <Tippy
        interactive
        content={<AuthorToolsHoverMenu data={data} />}
        placement="left-end"
        delay={[0, 300]}
        interactiveBorder={40}
      >
        <IconButton as="button">
          <FontAwesomeIcon icon={faTools} size="1x" />{' '}
          {loggedInData.strings.tools}
        </IconButton>
      </Tippy>
    )
  }

  function renderProfileMenu() {
    if (!(loaded && auth.current && loggedInData)) return null
    return (
      <AbsoluteWrapper>
        <BoxWrapper>
          <IconButton href="/user/settings">
            <FontAwesomeIcon icon={faPencilAlt} size="1x" />{' '}
            {loggedInData?.strings.authorMenu.editProfile}
          </IconButton>
        </BoxWrapper>
      </AbsoluteWrapper>
    )
  }
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
