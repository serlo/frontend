import {
  faCheck,
  faPaperclip,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from 'styled-components'

import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { UserRoles } from '@/data-types'
import { makeTransparentButton } from '@/helper/css'

export function DropdownMenu({
  isParent,
  id,
  date,
  highlight,
}: {
  isParent?: boolean
  date: Date
  id: number
  highlight: (id: number) => void
}) {
  const { lang, strings } = useInstanceData()
  const auth = useAuth()
  const isAllowed =
    auth.current !== null &&
    (auth.current?.roles.indexOf(UserRoles.Moderator) > -1 ||
      auth.current?.roles.indexOf(UserRoles.Admin) > -1)

  return (
    <DropContent>
      {isAllowed && (
        <>
          {isParent && (
            <DropContentButton>
              <FontAwesomeIcon icon={faCheck} />{' '}
              {strings.comments.archiveThread}
            </DropContentButton>
          )}
          <DropContentButton>
            <FontAwesomeIcon icon={faTrash} />{' '}
            {isParent
              ? strings.comments.deleteThread
              : strings.comments.deleteComment}
          </DropContentButton>
        </>
      )}
      <DropContentButton onClick={onLinkToComment}>
        <FontAwesomeIcon icon={faPaperclip} /> {strings.comments.linkToComment}
      </DropContentButton>
      <Time>
        {strings.comments.postedOn} {date.toLocaleString(lang)}
      </Time>
    </DropContent>
  )

  function onLinkToComment() {
    highlight(id)
    history.replaceState(null, '', `#comment-${id}`)
  }
}

const DropContent = styled.div`
  text-align: right;
  background-color: ${(props) => props.theme.colors.lightBackground};
  padding: 12px 15px 12px 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  max-width: 250px;
  border-radius: 10px;
`

const DropContentButton = styled.button`
  ${makeTransparentButton}
  margin-bottom: 0.2rem;
  font-size: 1rem;
  font-weight: normal;
`

const Time = styled.span`
  display: block;
  font-size: 0.8rem;
  margin-top: 15px;
  color: ${(props) => props.theme.colors.gray};
`
