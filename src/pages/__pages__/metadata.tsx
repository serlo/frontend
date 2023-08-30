import { FrontendClientBase } from '@/components/frontend-client-base'
import { MetadataApiPresentation } from '@/components/pages/metadata-api/metadata-api-presentation'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  return (
    <FrontendClientBase noContainers>
      <MetadataApiPresentation />
    </FrontendClientBase>
  )
})
