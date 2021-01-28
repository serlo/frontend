import { faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { StyledTd } from '../tags/styled-td'
import { StyledTh } from '../tags/styled-th'
import { StyledTr } from '../tags/styled-tr'
import { UserLink } from '../user/user-link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import type { HistoryRevisionsData } from '@/data-types'
import { makeLightButton, makeMargin } from '@/helper/css'

export interface RevisionHistoryProps {
  data?: HistoryRevisionsData
}

export function RevisionHistory({ data }: RevisionHistoryProps) {
  const { strings } = useInstanceData()
  if (!data) return null

  return (
    <Table>
      <thead>
        <StyledTr>
          <StyledTh>{strings.revisionHistory.changes}</StyledTh>
          <StyledTh style={{ minWidth: '90px' }}>
            {strings.revisionHistory.author}
          </StyledTh>
          <StyledTh>{strings.revisionHistory.date}</StyledTh>
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
                  <span title={strings.revisions.thisIsCurrentVersion}>
                    ✅{' '}
                  </span>
                )}
                <b>{entry.changes}</b>
              </StyledTd>
              <StyledTd>
                <UserLink user={entry.author} />
              </StyledTd>
              <StyledTd>
                <TimeAgo datetime={new Date(entry.date)} dateAsTitle />
              </StyledTd>
              <StyledTd>
                <Button
                  href={`/entity/repository/compare/${data.id}/${entry.id}`}
                >
                  <FontAwesomeIcon icon={faEye} size="1x" />
                </Button>
              </StyledTd>
              <StyledTd>
                <Button
                  title={strings.revisionHistory.createNew}
                  href={`/entity/repository/add-revision/${data.id}/${entry.id}`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                </Button>
              </StyledTd>
            </StyledTr>
          )
        })}
      </tbody>
    </Table>
  )
}

const Button = styled.a`
  ${makeLightButton}
  margin: 0 auto;
  font-size: 1rem;
`

export const Table = styled.table`
  ${makeMargin}
  border-collapse: collapse;
  width: 100%;
`
