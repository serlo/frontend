import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { Events } from '@/components/user/events'
import { UserUnrevisedRevisions } from '@/components/user/user-unrevised-revisions'
import { useInstanceData } from '@/contexts/instance-context'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  return (
    <FrontendClientBase>
      <Content />
    </FrontendClientBase>
  )
})

function Content() {
  const { strings } = useInstanceData()
  const router = useRouter()
  const username = String(router.query.username)
  const auth = useAuthentication()
  const isOwn = auth?.username === username

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const title = strings.pageTitles[
    isOwn ? 'userEditsMine' : 'userEdits'
  ].replace('%user%', username)

  const backUrl = `/user/profile/${username}`

  if (!mounted) return <>…</>

  return (
    <>
      <Breadcrumbs data={[{ label: username, url: backUrl }]} asBackButton />
      <PageTitle title={title} headTitle />
      <UserUnrevisedRevisions username={username} isOwn={isOwn} />

      <h2 className="serlo-h3" id="activities">
        {strings.eventLog.currentEvents}
      </h2>
      <Events username={username} perPage={10} moreButton />
    </>
  )
}
