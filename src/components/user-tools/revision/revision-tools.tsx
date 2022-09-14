import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle'
// import { cloneElement } from 'react'

import type { AuthorToolsData } from '../more-autor-tools/author-tools-hover-menu'
import { UserToolsItem } from '../user-tools-item'
import { CheckoutRejectButtons } from './checkout-reject-buttons'
// import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { getHistoryUrl } from '@/helper/urls/get-history-url'

export interface RevisionToolsProps {
  data?: AuthorToolsData
  aboveContent?: boolean
}

export function RevisionTools({ data, aboveContent }: RevisionToolsProps) {
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
