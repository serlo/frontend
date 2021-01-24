import { faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { StyledTable } from '../tags/styled-table'
import { StyledTd } from '../tags/styled-td'
import { StyledTh } from '../tags/styled-th'
import { StyledTr } from '../tags/styled-tr'
// import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { makeLightButton } from '@/helper/css'
import { HistoryRevisionsData } from '@/pages/entity/repository/history/[id]'

export interface RevisionHistoryProps {
  data?: HistoryRevisionsData
}

export function RevisionHistory({ data }: RevisionHistoryProps) {
  // const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData || !data) return null
  // const loggedInStrings = loggedInData.strings.revisions

  return (
    <StyledTable>
      <thead>
        <StyledTr>
          <StyledTh>Changes</StyledTh>
          <StyledTh>Author</StyledTh>
          <StyledTh>Date</StyledTh>
          <StyledTh>&nbsp;</StyledTh>
          <StyledTh>&nbsp;</StyledTh>
        </StyledTr>
      </thead>
      <tbody>
        {data.revisions.nodes.map((entry) => {
          return (
            <StyledTr key={entry.id}>
              <StyledTd>
                {entry.id === data.currentRevision.id && (
                  <span title="This revision is currently checked out">
                    ✅{' '}
                  </span>
                )}
                <b>{entry.changes}</b>
              </StyledTd>
              <StyledTd>{entry.author.username}</StyledTd>
              <StyledTd>{entry.date}</StyledTd>
              <StyledTd>
                <Button
                  href={`/entity/repository/compare/${data.id}/${entry.id}`}
                >
                  <FontAwesomeIcon icon={faEye} size="1x" />
                </Button>
              </StyledTd>
              <StyledTd>
                <Button
                  title="Create a new revision starting from this specific revision"
                  href={`/entity/repository/add-revision/${data.id}/${entry.id}`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                </Button>
              </StyledTd>
            </StyledTr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

const Button = styled.a`
  ${makeLightButton}
  margin: 0 auto;
  font-size: 1rem;
`
