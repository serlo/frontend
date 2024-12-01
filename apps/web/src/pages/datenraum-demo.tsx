import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SearchModal } from '@/components/datenraum/search-modal'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Instance } from '@/fetcher/graphql-types/operations'
import { createPlugins } from '@/serlo-editor-integration/create-plugins'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

export default function Home() {
  editorRenderers.init(createRenderers())
  editorPlugins.init(createPlugins({ lang: Instance.De }))

  return (
    <FrontendClientBase noContainers serloEntityData={{ entityId: 123 }}>
      <div className="min-h-screen p-8 pb-20 sm:p-20">
        {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}
        <SearchModal />
        {/* </main> */}
      </div>
    </FrontendClientBase>
  )
}
