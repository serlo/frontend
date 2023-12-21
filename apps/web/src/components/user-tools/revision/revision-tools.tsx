import { faList, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Entity } from '@serlo/authorization'
import dynamic from 'next/dynamic'

import type { CheckoutRejectButtonsProps } from './checkout-reject-buttons'
import type { MoreAuthorToolsProps } from '../foldout-author-menus/more-author-tools'
import { UserToolsItem } from '../user-tools-item'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { getHistoryUrl } from '@/helper/urls/get-history-url'

const CheckoutRejectButtons = dynamic<CheckoutRejectButtonsProps>(() =>
  import('@/components/user-tools/revision/checkout-reject-buttons').then(
    (mod) => mod.CheckoutRejectButtons
  )
)

export function RevisionTools({ data, aboveContent }: MoreAuthorToolsProps) {
  const { lang, strings } = useInstanceData()
  const canDo = useCanDo()

  if (!data) return null

  const canCheckoutAndReject =
    canDo(Entity.checkoutRevision) && canDo(Entity.rejectRevision)

  return (
    <>
      {canCheckoutAndReject ? (
        <CheckoutRejectButtons data={data} aboveContent={aboveContent} />
      ) : null}
      <UserToolsItem
        title={strings.pageTitles.revisionHistory}
        href={getHistoryUrl(data.id)}
        aboveContent={aboveContent}
        icon={faList}
      />
      {lang === Instance.De && (
        <UserToolsItem
          title={strings.revisions.helpLink}
          href="/community/140473/hilfeseiten-für-reviewer"
          aboveContent={aboveContent}
          icon={faQuestionCircle}
        />
      )}
    </>
  )
}
