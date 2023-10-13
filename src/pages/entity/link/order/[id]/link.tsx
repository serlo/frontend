import { faGripLines, faTools } from '@fortawesome/free-solid-svg-icons'
import { arrayMoveImmutable } from 'array-move'
import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { getPreviewStringFromExercise } from '@/components/taxonomy/taxonomy-move-copy'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  TaxonomyLink,
  SingleEntityPage,
  CoursePageEntry,
  UuidType,
  StaticSlugProps,
  StaticTaxonomyPage,
} from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { staticRequestPage } from '@/fetcher/static-request-page'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useEntitySortMutation } from '@/mutations/use-entity-sort-mutation'
import {
  AnyEditorDocument,
  EditorExerciseDocument,
  EditorTemplateGroupedExerciseDocument,
} from '@/serlo-editor-integration/types/editor-plugins'
import { isTemplateExerciseGroupDocument } from '@/serlo-editor-integration/types/plugin-type-guards'

// this duplicates some code from /taxonomy/term/sort… but since this feature here is only temporary I'm okay with that

export default renderedPageNoHooks<{ pageData: SingleEntityPage }>((props) => {
  return (
    <FrontendClientBase>
      <Content {...props} />
    </FrontendClientBase>
  )
})

function Content({ pageData }: { pageData: SingleEntityPage }) {
  const sort = useEntitySortMutation()
  const router = useRouter()
  const { entityData } = pageData
  const isCourse =
    entityData.typename === UuidType.Course ||
    entityData.typename === UuidType.CoursePage
  const entityId = entityData.courseData?.id ?? entityData.id
  const [coursePages, setCoursePages] = useState<CoursePageEntry[]>(
    entityData.courseData?.pages ?? []
  )

  const getExes = () => {
    // TODO: temporary static hack
    if (
      !entityData.content ||
      !isTemplateExerciseGroupDocument(
        entityData.content as unknown as AnyEditorDocument
      )
    )
      return []
    return (
      entityData.content as unknown as EditorTemplateGroupedExerciseDocument
    ).state.exercisesWithSolutions.map(({ exercise }) => exercise)
    // const content = isExerciseDocument entityData.content as unknown as EditorTemplateGroupedExerciseDocument
    // content.state.exercisesWithSolutions
    // const group = entityData.content?.[0]
    // return group && group.type === 'exercise-group' ? group.children ?? [] : []
  }
  const [exercises, setExercises] = useState<EditorExerciseDocument[]>(
    getExes()
  )

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.taxonomyTermTools.sort

  const onSave = async () => {
    const childrenIds = isCourse
      ? coursePages.map((page) => page.id)
      : exercises.map((exercise) => exercise.serloContext?.uuid ?? 0)

    const success = await sort({
      childrenIds,
      entityId: entityId,
    })

    if (success) {
      showToastNotice(loggedInData.strings.mutations.success.generic, 'success')
      setTimeout(() => {
        void router.push(`/${entityId}`)
      }, 500)
    }
  }

  return (
    <>
      {renderBackButton()}
      <PageTitle title={loggedInStrings.title} />
      <div className="mx-side">
        {renderList()}
        {renderUpdateButton()}
      </div>
    </>
  )

  function renderList() {
    return (
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) return
          if (isCourse) {
            setCoursePages(
              arrayMoveImmutable(coursePages, source.index, destination.index)
            )
          } else {
            setExercises(
              arrayMoveImmutable(exercises, source.index, destination.index)
            )
          }
        }}
      >
        <Droppable droppableId="children">
          {(provided) => {
            return (
              <>
                <ul
                  className="mb-6 mt-0 first:mt-0 mobile:mt-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {isCourse
                    ? coursePages.map((page, i) =>
                        renderLink(
                          {
                            url: page.url,
                            title: page.title,
                            id: page.id,
                          },
                          i
                        )
                      )
                    : exercises.map((ex, i) =>
                        renderLink(
                          {
                            // TODO: Check if ex.href is important here
                            url: `/${ex.serloContext?.uuid}`,
                            title: getPreviewStringFromExercise(ex, strings),
                            id: ex.serloContext?.uuid ?? 0,
                          },
                          i
                        )
                      )}
                  {provided.placeholder}
                </ul>
              </>
            )
          }}
        </Droppable>
      </DragDropContext>
    )
  }

  function renderBackButton() {
    return (
      <Breadcrumbs
        data={[
          {
            label: strings.revisions.toContent,
            url: pageData.entityData.alias,
          },
        ]}
        asBackButton
      />
    )
  }

  function renderLink(link: TaxonomyLink, index: number) {
    if (link.unrevised) return null
    return (
      <Draggable
        key={link.url + '_' + link.title}
        draggableId={link.id.toString()}
        index={index}
      >
        {(provided) => {
          return (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="mb-3 block leading-cozy"
            >
              <button
                className="serlo-button-blue-transparent"
                {...provided.dragHandleProps}
              >
                <FaIcon icon={faGripLines} />
              </button>{' '}
              <Link
                className={clsx(
                  link.unrevised ? 'opacity-60' : undefined,
                  'text-[1.2rem]'
                )}
                href={link.url}
              >
                {link.title}
                {link.unrevised && (
                  <span
                    title={loggedInData?.strings.revisions.unrevisedTaxNote}
                  >
                    <FaIcon icon={faTools} className="ml-1 text-base" />
                  </span>
                )}
              </Link>
            </li>
          )
        }}
      </Draggable>
    )
  }

  function renderUpdateButton() {
    return (
      <button className="serlo-button-blue mt-12" onClick={onSave}>
        {loggedInStrings.saveButtonText}
      </button>
    )
  }
}

export const getStaticProps: GetStaticProps<StaticSlugProps> = async (
  context
) => {
  if (!context.params || Array.isArray(context.params.id) || !context.params.id)
    return { notFound: true }

  const pageData = await staticRequestPage(
    '/' + context.params.id,
    context.locale! as Instance
  )

  if (pageData.kind !== 'single-entity') return { notFound: true }

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as StaticTaxonomyPage, // remove undefined values
    },
    revalidate: 60 * 2, // 2 min,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
