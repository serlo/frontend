import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { StyledTable } from '../tags/styled-table'
import { StyledTd } from '../tags/styled-td'
import { StyledTh } from '../tags/styled-th'
import { StyledTr } from '../tags/styled-tr'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getRawTitle } from '@/fetcher/create-title'
import { QueryResponse } from '@/fetcher/query-types'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { useSubscriptionSetMutation } from '@/helper/mutations'

export function ManageSubscriptions({
  subscriptions,
}: {
  subscriptions: QueryResponse[]
}) {
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  const setSubscription = useSubscriptionSetMutation()

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
                  <FontAwesomeIcon className="text-brand" icon={icon} />{' '}
                </span>
                <Link href={entry.alias ?? ''}>{title}</Link>
              </StyledTd>
              <StyledTd className="text-center">
                {/* TODO: We need info from the API how this is currently set */}
                <button
                  className="serlo-button serlo-make-interactive-light mx-0 my-auto text-base"
                  onClick={() => {
                    void setSubscription({
                      id: [entry.id],
                      subscribe: true,
                      sendEmail: false,
                    })
                  }}
                >
                  {loggedInStrings.noMails}
                </button>
              </StyledTd>
              <StyledTd className="text-center">
                <button
                  className="serlo-button serlo-make-interactive-light mx-0 my-auto text-base"
                  onClick={() => {
                    void setSubscription({
                      id: [entry.id],
                      subscribe: false,
                      sendEmail: false,
                    })
                  }}
                >
                  {loggedInStrings.noNotifications}
                </button>
              </StyledTd>
            </StyledTr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}
