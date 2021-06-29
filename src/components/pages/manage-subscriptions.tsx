import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  subscriptions: [
    {
      object: QueryResponse
      sendEmail: boolean
    }
  ]
}) {
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  const setSubscription = useSubscriptionSetMutation()

  if (!loggedInData || !subscriptions) return null
  const loggedInStrings = loggedInData.strings.subscriptions

  return (
    <table className="serlo-table">
      <thead>
        <tr>
          <th className="serlo-th">{strings.entities.content}</th>
          <th className="serlo-th">{loggedInStrings.mail}</th>
          <th className="serlo-th">{loggedInStrings.subscription}</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions.map(({ object, sendEmail }) => {
          console.log(sendEmail)
          const entityString = getEntityStringByTypename(
            object.__typename,
            strings
          )
          const title = getRawTitle(object, 'de') ?? entityString
          const icon = getIconByTypename(object.__typename)

          return (
            <tr key={object.id}>
              <td className="serlo-td">
                <span title={entityString}>
                  {' '}
                  <FontAwesomeIcon className="text-brand" icon={icon} />{' '}
                </span>
                <Link href={object.alias ?? ''}>{title}</Link>
              </td>
              <td className="serlo-td text-center">
                {/* TODO: We need info from the API how this is currently set */}
                <button
                  className="serlo-button serlo-make-interactive-light mx-0 my-auto text-base"
                  onClick={() => {
                    void setSubscription({
                      id: [object.id],
                      subscribe: true,
                      sendEmail: false,
                    })
                  }}
                >
                  {loggedInStrings.noMails}
                </button>
              </td>
              <td className="serlo-td text-center">
                <button
                  className="serlo-button serlo-make-interactive-light mx-0 my-auto text-base"
                  onClick={() => {
                    void setSubscription({
                      id: [object.id],
                      subscribe: false,
                      sendEmail: false,
                    })
                  }}
                >
                  {loggedInStrings.noNotifications}
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
