import { useRouter } from 'next/router'
import NextAdapterPages from 'next-query-params/pages'
import { useMemo } from 'react'
import { debounce } from 'ts-debounce'
import {
  QueryParamProvider,
  StringParam,
  useQueryParam,
  withDefault,
} from 'use-query-params'

import { MathSpan } from '@/components/content/math-span'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { Editor } from '@/serlo-editor/core'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'
import {
  AnyEditorPlugin,
  StaticRenderer,
} from '@/serlo-editor/static-renderer/static-renderer'
import { createPlugins } from '@/serlo-editor-integration/create-plugins'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import { showToastNotice } from '@/helper/show-toast-notice'

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase
      noContainers
      noHeaderFooter
      loadLoggedInData /* warn: enables preview editor without login */
      entityId={props.id}
    >
      <div className="relative">
        <QueryParamProvider adapter={NextAdapterPages}>
          <Content />
        </QueryParamProvider>
      </div>
    </FrontendClientBase>
  )
})

const emptyState = JSON.stringify({
  plugin: EditorPluginType.Rows,
  state: [
    {
      plugin: EditorPluginType.Text,
      state: [],
    },
  ],
})

function Content() {
  const [previewState, setPreviewState] = useQueryParam(
    'name',
    withDefault(StringParam, emptyState)
  )

  const isNotEmpty = previewState !== emptyState

  const { lang } = useInstanceData()
  const routerAsPath = useRouter().asPath

  const debouncedSetState = debounce(
    (state?: string | null) => setPreviewState(state ?? emptyState),
    40
  )
  const editor = useMemo(
    () => (
      <Editor
        initialState={JSON.parse(previewState) as AnyEditorPlugin}
        editable
        onChange={({ changed, getDocument }) => {
          if (!changed) return
          void debouncedSetState(JSON.stringify(getDocument()))
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNotEmpty]
  )

  const loggedInData = useLoggedInData()
  if (!loggedInData)
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    )
  const editorStrings = loggedInData.strings.editor

  // simplest way to provide plugins to editor that can also easily be adapted by edusharing
  editorPlugins.init(
    createPlugins({
      editorStrings,
      instance: lang,
      parentType: 'Article',
      allowExercises: true,
    })
  )

  // simplest way to provide renderers to editor that can also easily be adapted by edusharing
  editorRenderers.init(
    createRenderers({ instance: lang, isRevisionView: false, routerAsPath })
  )

  return (
    <main id="content" className="flex">
      <section className="min-h-screen w-[50vw] border-4 border-r-0 border-editor-primary">
        <header className="mx-side flex justify-between align-middle font-bold">
          <h2 className="text-editor-primary">Edit</h2>
          <div>
            <button
              onClick={() => {
                void navigator.clipboard.writeText(previewState)
                showToastNotice('state copied to clipboard', 'success')
              }}
              className="mt-0.5 text-sm"
            >
              copy
            </button>{' '}
            |{' '}
            <button
              onClick={() => setPreviewState(emptyState)}
              className="mt-0.5 text-sm"
            >
              reset
            </button>
          </div>
        </header>
        <div className="controls-portal pointer-events-none sticky top-0 z-[90] bg-white md:bg-transparent" />
        <div className="serlo-editor-hacks mb-24 max-w-[816px] px-2">
          <MathSpan formula="" /> {/* preload formula plugin */}
          {editor}
        </div>
      </section>
      <section className="min-h-screen w-[50vw] border-4 border-editor-primary">
        <h2 className="mx-side font-bold text-editor-primary">Preview</h2>
        <div className="serlo-content-with-spacing-fixes mt-[3rem]">
          <StaticRenderer state={JSON.parse(previewState) as AnyEditorPlugin} />
        </div>
      </section>
    </main>
  )
}
