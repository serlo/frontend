import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Events } from '@/components/user/events'
import { useInstanceData } from '@/contexts/instance-context'
import { SlugProps } from '@/data-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<SlugProps>(() => {
  return (
    <FrontendClientBase>
      <Content />
    </FrontendClientBase>
  )
})

function Content() {
  const { strings } = useInstanceData()

  return (
    <>
      <PageTitle
        title={`${strings.pageTitles.eventLog} – serlo.org`}
        headTitle
      />
      {/* here: insert text that will be provided by wolfgang */}

      <Events perPage={1} moreButton />
    </>
  )
}
