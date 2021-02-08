import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { StyledTable } from '../tags/styled-table'
import { StyledTd } from '../tags/styled-td'
import { StyledTh } from '../tags/styled-th'
import { StyledTr } from '../tags/styled-tr'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getRawTitle } from '@/fetcher/create-title'
import { QueryResponse } from '@/fetcher/query-types'
import { makeLightButton } from '@/helper/css'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

export function ManageSubscriptions({
  subscriptions,
}: {
  subscriptions: QueryResponse[]
}) {
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData || !subscriptions) return null
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
          const entityString = getEntityStringByTypename(
            entry.__typename,
            strings
          )
          const title = getRawTitle(entry, 'de') ?? entityString
          const icon = getIconByTypename(entry.__typename)

          return (
            <StyledTr key={entry.id}>
              <StyledTd>
                <span title={entityString}>
                  {' '}
                  <StyledIcon icon={icon} />{' '}
                </span>
                <Link href={entry.alias ?? ''}>{title}</Link>
              </StyledTd>
              <CenteredTd>
                {/* TODO: We need info from the API how this is currently set */}
                <Button href={`/subscription/update/${entry.id}/0`}>
                  {loggedInStrings.noMails}
                </Button>
              </CenteredTd>
              <CenteredTd>
                <Button href={`/unsubscribe/${entry.id}`}>
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
