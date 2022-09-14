import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle'

import type { MoreAuthorToolsProps } from '../more-author-tools/more-author-tools'
import { UserToolsItem } from '../user-tools-item'
import { CheckoutRejectButtons } from './checkout-reject-buttons'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { getHistoryUrl } from '@/helper/urls/get-history-url'

export function RevisionTools({ data, aboveContent }: MoreAuthorToolsProps) {
  const { lang, strings } = useInstanceData()
  // const canDo = useCanDo()
  // const canCheckoutAndReject =
  //   canDo(Entity.checkoutRevision) && canDo(Entity.rejectRevision)

  if (!data) return null

  return (
    <>
      {/* {data.checkoutRejectButtons &&
        cloneElement(data.checkoutRejectButtons, {
          buttonStyle: buttonClassName(),
        })} */}
      <CheckoutRejectButtons data={data} />
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
