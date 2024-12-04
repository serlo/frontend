import { EditorMetaContext } from '@editor/core/contexts/editor-meta-context'
import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { SubmitButtonAndFeedback } from '@editor/plugins/rows/submit-button-and-feedback'
import { StickyHeaderLearner } from '@editor/prototype-microadaptivity/sticky-header-learner'
import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import NextAdapterPages from 'next-query-params/pages'
import { mergeDeepRight } from 'ramda'
import { useState } from 'react'
import { QueryParamProvider } from 'use-query-params'

import { GetAiFeedbackButton } from '../../../../packages/editor/src/prototype-microadaptivity/get-ai-feedback-button'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { useInstanceData } from '@/contexts/instance-context'
import { microadaptivityState } from '@/data/microadaptivity-state'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { createPlugins } from '@/serlo-editor-integration/create-plugins'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase
      noContainers
      noHeaderFooter
      noIndex
      loadLoggedInData /* warn: enables preview editor without login */
      serloEntityData={{ entityId: props.id }}
    >
      <div className="relative">
        <QueryParamProvider adapter={NextAdapterPages}>
          <Content />
        </QueryParamProvider>
      </div>
    </FrontendClientBase>
  )
})

function Content() {
  const { lang } = useInstanceData()

  const [previewState] = useState(microadaptivityState)

  // simplest way to provide plugins to editor that can also easily be adapted by edusharing
  editorPlugins.init(createPlugins({ lang }))

  editorRenderers.init(createRenderers())

  return (
    <EditStringsProvider
      value={
        lang === 'de'
          ? mergeDeepRight(editStringsEn, editStringsDe)
          : editStringsEn
      }
    >
      <EditorMetaContext.Provider
        value={{ editorVariant: 'serlo-org', userId: 'serlo-preview-user' }}
      >
        <div className="flex flex-row">
          <aside className="flex-shrink flex-grow basis-0"></aside>
          {/* To change content width, change both max-w and basis */}
          <main
            id="content"
            className="mb-[50%] max-w-[min(100%,60rem)] flex-shrink flex-grow basis-[60rem]"
          >
            <StickyHeaderLearner />
            <section className="min-h-screen border-4">
              <div className="mt-[3rem]">
                <EditorRenderer document={parseDocumentString(previewState)} />
                {/* HACK: Microadaptivity prototype */}
                <SubmitButtonAndFeedback />
              </div>
            </section>
          </main>
          <aside className="flex-shrink flex-grow basis-0">
            <GetAiFeedbackButton />
          </aside>
        </div>
      </EditorMetaContext.Provider>
    </EditStringsProvider>
  )
}
