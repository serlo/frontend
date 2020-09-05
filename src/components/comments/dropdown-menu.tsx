import { faCheck, faFlag, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from 'styled-components'

import { useInstanceData } from '@/contexts/instance-context'
import { makeTransparentButton } from '@/helper/css'

export function DropdownMenu({
  isParent,
  eventDate,
}: {
  isParent?: boolean
  eventDate: Date
}) {
  const { lang, strings } = useInstanceData()

  return (
    <DropContent>
      <DropContentButton>
        <FontAwesomeIcon icon={faFlag} /> {strings.comments.reportComment}
      </DropContentButton>
      {isParent && (
        <DropContentButton>
          <FontAwesomeIcon icon={faCheck} /> {strings.comments.archiveThread}
        </DropContentButton>
      )}
      <DropContentButton>
        <FontAwesomeIcon icon={faTrash} />{' '}
        {isParent
          ? strings.comments.deleteThread
          : strings.comments.deleteComment}
      </DropContentButton>
      <Time>
        {strings.comments.postedOn} {eventDate.toLocaleString(lang)}
      </Time>
    </DropContent>
  )
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
`

const Time = styled.span`
  display: block;
  font-size: 0.8rem;
  margin-top: 15px;
  color: ${(props) => props.theme.colors.gray};
`
