import { useState } from 'react'

import { FaIcon } from '../fa-icon'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import type { UuidWithRevType } from '@/data-types'
import { getRawTitle } from '@/fetcher/create-title'
import {
  type GetSubscriptionsQuery,
  Instance,
} from '@/fetcher/graphql-types/operations'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { useSubscriptionSetMutation } from '@/mutations/use-subscription-set-mutation'

export type SubscriptionNode =
  GetSubscriptionsQuery['subscription']['getSubscriptions']['nodes'][0]

export function ManageSubscriptions({
  subscriptions,
}: {
  subscriptions: SubscriptionNode[]
}) {
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  const setSubscription = useSubscriptionSetMutation()
  const [hidden, setHidden] = useState<number[]>([])
  const [mailOverwrite, setMailOverwrite] = useState<Record<number, boolean>>(
    {}
  )

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
        {subscriptions.map((subscription) => renderLine(subscription))}
      </tbody>
    </table>
  )

  function onAction(id: number, subscribe: boolean, sendEmail: boolean) {
    void setSubscription({
      id: [id],
      subscribe,
      sendEmail,
    })
    // hide immediately
    if (!subscribe) setHidden([...hidden, id])
    if (subscribe) setMailOverwrite({ ...mailOverwrite, [id]: sendEmail })
  }

  function renderLine({ object, sendEmail }: SubscriptionNode) {
    if (hidden.includes(object.id)) return null
    const typename = object.__typename as UuidWithRevType
    const entityString = getEntityStringByTypename(typename, strings)
    const title = getRawTitle(object, Instance.De) ?? entityString
    const icon = getIconByTypename(typename)
    const sendEmailOverwrite = mailOverwrite[object.id] ?? sendEmail

    return (
      <tr key={object.id}>
        <td className="serlo-td">
          <span title={entityString}>
            {' '}
            <FaIcon className="text-brand" icon={icon} />{' '}
          </span>
          <Link href={object.alias}>{title}</Link>
        </td>
        <td className="serlo-td text-center">
          <button
            className="serlo-button-light mx-0 my-auto text-base"
            onClick={() => onAction(object.id, true, !sendEmailOverwrite)}
          >
            {sendEmailOverwrite
              ? loggedInStrings.noMails
              : loggedInStrings.getMails}
          </button>
        </td>
        <td className="serlo-td text-center">
          <button
            className="serlo-button-light mx-0 my-auto text-base"
            onClick={() => onAction(object.id, false, false)}
          >
            {loggedInStrings.noNotifications}
          </button>
        </td>
      </tr>
    )
  }
}
