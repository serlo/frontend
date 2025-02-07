import * as t from 'io-ts'

import type { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Guard } from '@/components/guard'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { EditorPageData, fetchEditorData } from '@/fetcher/fetch-editor-data'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { loadEditorState } from '@/pages/api/datenraum/node'
import { UuidType } from '@/data-types'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

const Plugin = t.type({ plugin: t.string })

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase
      noContainers
      noIndex
      loadLoggedInData /* warn: enables preview editor without login */
      serloEntityData={{ entityId: props.id }}
    >
      <div className="relative">
        <MaxWidthDiv>
          <main>
            <Guard needsAuth={isProduction ? true : undefined} data>
              <AddRevision {...props} />
            </Guard>
          </main>
        </MaxWidthDiv>
      </div>
    </FrontendClientBase>
  )
})

export const getServerSideProps: GetServerSideProps<EditorPageData> = async (
  context
) => {
  const id = context.params?.id?.[0]

  if (!id) return { notFound: true }

  const result = await loadEditorState(id)

  if (!result.success) return { notFound: true }

  const node = result.node
  const content = node.metadata.SerloEditorContent

  if (!Plugin.is(content)) return { notFound: true }

  const uuidType = (() => {
    if (content.plugin === 'article') return UuidType.Article
    if (content.plugin === 'course') return UuidType.Course
    if (content.plugin === 'exercise') return UuidType.Exercise
    if (content.plugin === 'exerciseGroup') return UuidType.ExerciseGroup

    return null
  })()

  if (!uuidType) return { notFound: true }

  const randomIntId = Math.floor(Math.random() * 10000000000) + 10000000000

  return {
    props: {
      initialState: {
        plugin: TemplatePluginType[uuidType],
        state: { content: JSON.stringify(content), title: node.title },
      },
      type: uuidType,
      errorType: 'none',
      id: randomIntId,
    },
  }
}
