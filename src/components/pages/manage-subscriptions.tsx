import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import { StyledTable } from '../tags/styled-table'
import { StyledTd } from '../tags/styled-td'
import { StyledTh } from '../tags/styled-th'
import { StyledTr } from '../tags/styled-tr'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { EntityTypes } from '@/data-types'
import { getRawTitle } from '@/fetcher/create-title'
import { QueryResponse } from '@/fetcher/query'
import { makeLightButton } from '@/helper/css'
import { entityIconMapping } from '@/helper/icon-by-entity-type'

export function ManageSubscriptions({
  subscriptions,
}: {
  subscriptions: QueryResponse[]
}) {
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.subscriptions

  return (
    <StyledTable>
      <thead>
        <StyledTr>
          <StyledTh>{strings.entities.content}</StyledTh>
          <StyledTh>{loggedInStrings.mail}</StyledTh>
          <StyledTh>{loggedInStrings.subscription}</StyledTh>
        </StyledTr>
      </thead>
      <tbody>
        {subscriptions.map((entry) => {
          const typenameCamelCase = (entry.__typename.charAt(0).toLowerCase() +
            entry.__typename.slice(1)) as keyof typeof strings.entities

          const title =
            getRawTitle(entry, 'de') ?? strings.entities[typenameCamelCase]

          const icon =
            entityIconMapping[typenameCamelCase as EntityTypes] ?? faCircle

          return (
            <StyledTr key={entry.id}>
              <StyledTd>
                <span title={strings.entities[typenameCamelCase]}>
                  {' '}
                  <StyledIcon icon={icon} />{' '}
                </span>
                <Link href={entry.alias ?? ''}>{title}</Link>
              </StyledTd>
              <CenteredTd>
                <Button
                  href={`https://de.serlo.org/subscription/update/${entry.id}/0`}
                >
                  {loggedInStrings.noMails}
                </Button>
              </CenteredTd>
              <CenteredTd>
                <Button
                  href={`https://de.serlo.org/subscription/update/${entry.id}/1`}
                >
                  {loggedInStrings.noNotifications}
                </Button>
              </CenteredTd>
            </StyledTr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

const CenteredTd = styled(StyledTd)`
  text-align: center;
`

const Button = styled.a`
  ${makeLightButton}
  margin: 0 auto;
  font-size: 1rem;
`

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.brand};
`
