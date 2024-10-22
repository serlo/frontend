import { TemplatePluginType } from '@editor/types/template-plugin-type'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Guard } from '@/components/guard'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { UuidType } from '@/data-types'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'

// TODO: investigate if we still need this or if /add-revision is a good home
// (would need changes, currently add-revision expects a taxonomy id in the url)

export default renderedPageNoHooks(() => {
  const addRevisionProps = {
    initialState: {
      plugin: TemplatePluginType.Page,
    },
    type: UuidType.Page,
    errorType: 'none',
  } as const

  return (
    <FrontendClientBase
      noContainers
      noIndex
      loadLoggedInData={!isProduction} // warn: enables preview editor without login
    >
      <div className="relative">
        <MaxWidthDiv>
          <main>
            <Guard needsAuth={isProduction ? true : undefined} data>
              <AddRevision {...addRevisionProps} />
            </Guard>
          </main>
        </MaxWidthDiv>
      </div>
    </FrontendClientBase>
  )
})
