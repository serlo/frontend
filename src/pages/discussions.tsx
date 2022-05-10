import { CommentAreaAllThreads } from '@/components/comments/comment-area-all-threads'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { useInstanceData } from '@/contexts/instance-context'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const { strings } = useInstanceData()

  return (
    <>
      <PageTitle title={strings.entities.threads} headTitle />
      <CommentAreaAllThreads />
    </>
  )
}
