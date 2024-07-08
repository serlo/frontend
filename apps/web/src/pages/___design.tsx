import { NextPage } from 'next'

import DesignGuideSVG from '@/assets-webkit/img/design-guide/design-guide.svg'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      noIndex
      showNav={false}
      authorization={{}}
    >
      <DesignGuideSVG className="design-guide mx-auto h-auto max-w-5xl [&_text]:!whitespace-normal" />
    </FrontendClientBase>
  )
}
export default ContentPage
