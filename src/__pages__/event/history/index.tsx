import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Events } from '@/components/user/events'
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
  const { strings, lang } = useInstanceData()

  return (
    <>
      <PageTitle
        title={`${strings.pageTitles.eventLog} – serlo.org`}
        headTitle
      />

      <p className="serlo-p">
        {strings.eventLog.globalDescription.replace('%lang%', lang)}
      </p>

      <Events perPage={30} moreButton />
    </>
  )
}
