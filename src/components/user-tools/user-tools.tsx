import {
  faClock,
  faPencilAlt,
  faShareAlt,
  faTools,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import React from 'react'
import styled from 'styled-components'

import {
  makeGreenTransparentButton,
  makeGreenButton,
  inputFontReset,
} from '../../helper/css'
import {
  AuthorToolsHoverMenu,
  AuthorToolsData,
} from './author-tools-hover-menu'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UserRoles } from '@/data-types'
import { theme } from '@/theme'

interface UserToolsProps {
  id: number
  onShare?: () => void
  hideEdit: boolean
  data: AuthorToolsData
  unrevisedRevision?: number
  aboveContent?: boolean
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
  aboveContent,
}: UserToolsProps) {
  const { strings } = useInstanceData()
  const auth = useAuth()
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    setLoaded(true)
  }, [])
  const loggedInData = useLoggedInData()
  const showHistory = unrevisedRevision !== undefined && unrevisedRevision > 0

  function getBrowserWidth() {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    )
  }

  if (data.type === 'Profile') return renderProfileMenu()

  return (
    <AbsoluteWrapper hideOnLarge={aboveContent}>
      <BoxWrapper>{renderButtons()}</BoxWrapper>
    </AbsoluteWrapper>
  )

  function renderButtons() {
    return (
      <>
        {(!hideEdit || (loaded && auth.current)) && (
          <>
            {renderEdit()}
            {renderUnrevised()}
          </>
        )}
        {renderShare()}
        {renderExtraTools()}
      </>
    )
  }

  function renderEdit() {
    if (
      loaded &&
      (auth.current === null ||
        auth.current?.roles.indexOf(UserRoles.PageBuilder) > -1)
    ) {
      return null
    }

    const editHref =
      data.type == 'Page'
        ? `/page/revision/create/${data.id}/${data.revisionId || ''}`
        : data.type == 'Taxonomy'
        ? `/taxonomy/term/update/${id}`
        : `/entity/repository/add-revision/${id}`

    return (
      !showHistory && (
        <IconButton href={editHref} hideOnSmall>
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

  function renderExtraTools() {
    if (!(loaded && auth.current && loggedInData && data)) return null
    const supportedTypes = [
      'Page',
      'Article',
      'Video',
      'Applet',
      'Event',
      'CoursePage',
      'Taxonomy',
      '_ExerciseInline',
      '_ExerciseGroupInline',
      '_SolutionInline',
    ]
    if (supportedTypes.indexOf(data.type) === -1) return null

    const isLargeScreen = getBrowserWidth() > theme.breakpointsInt.lg

    return (
      <Tippy
        interactive
        content={<AuthorToolsHoverMenu data={data} />}
        placement={isLargeScreen ? 'left-end' : 'bottom'}
        delay={[0, 300]}
        interactiveBorder={isLargeScreen ? 40 : 10}
      >
        <IconButton as="button" hideOnSmall>
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

const AbsoluteWrapper = styled.nav<{ hideOnLarge?: boolean }>`
  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    position: absolute;
    right: 32px;
    bottom: 32px;
    height: 100%;
    align-items: flex-end;
    display: ${(props) => (props.hideOnLarge ? 'none' : 'flex')};
  }
`

const BoxWrapper = styled.div`
  @media (max-width: ${(props) => props.theme.breakpointsMax.lg}) {
    display: block;
    margin-right: 16px;
    margin-top: -15px;
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-end;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    position: sticky;
    bottom: 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`

const IconButton = styled.a<{ hideOnSmall?: boolean }>`
  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
    display: ${(props) => (props.hideOnSmall ? 'none' : 'block')} !important;
  }

  @media (max-width: ${(props) => props.theme.breakpointsMax.lg}) {
    ${makeGreenButton}

    font-size: 0.9rem;
    margin: 2px;
    margin-left: 3px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    ${makeGreenTransparentButton}
    ${inputFontReset}
    padding-top: 4px;
    padding-bottom: 4px;
    margin: 4px;
    svg {
      margin-right: 2px;
    }
  }
`
