import { faGripLines, faTools } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { arrayMoveImmutable } from 'array-move'
import clsx from 'clsx'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { getPreviewStringFromExercise } from '@/components/taxonomy/taxonomy-move-copy/get-preview-string-from-exercise'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  SlugProps,
  TaxonomyLink,
  TaxonomyPage,
  SingleEntityPage,
  UuidType,
} from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { requestPage } from '@/fetcher/request-page'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useEntitySortMutation } from '@/mutations/use-entity-sort-mutation'
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
  const { typename, courseData, staticContent } = entityData
  const isCourse =
    typename === UuidType.Course || typename === UuidType.CoursePage
  const entityId = courseData?.id ?? entityData.id

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

  const courseChildren =
    courseData?.pages.map(({ url, title, id }) => {
      return { url, title, id }
    }) ?? []

  const exercises =
    staticContent &&
    !Array.isArray(staticContent) &&
    isTemplateExerciseGroupDocument(staticContent)
      ? staticContent.state.exercises
      : []

  const exerciseChildren = exercises.map((exercise, index) => {
    return {
      url: `/${exercise.serloContext?.uuid}`,
      title:
        `(${index + 1}) ` + getPreviewStringFromExercise(exercise, strings),
      id: exercise.serloContext?.uuid ?? 0,
    }
  })

  const [children, setChildren] = useState<TaxonomyLink[]>(
    isCourse ? courseChildren : exerciseChildren
  )

  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.taxonomyTermTools.sort

  const onSave = async () => {
    const childrenIds = children.map(({ id }) => id)

    const success = await sort({ childrenIds, entityId })

    if (success) {
      showToastNotice(loggedInData.strings.mutations.success.generic, 'success')
      setTimeout(() => {
        void router.push(`/${entityId}`)
      }, 500)
    }
  }

  const backButtonData = [
    { label: strings.revisions.toContent, url: entityData.alias },
  ]

  return (
    <>
      <Breadcrumbs data={backButtonData} asBackButton />
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
          setChildren(
            arrayMoveImmutable(children, source.index, destination.index)
          )
        }}
      >
        <Droppable droppableId="children">
          {(provided) => {
            return (
              <ul
                className="mb-6 mt-0 first:mt-0 mobile:mt-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {children.map(renderLink)}
                {provided.placeholder}
              </ul>
            )
          }}
        </Droppable>
      </DragDropContext>
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

export const getStaticProps: GetStaticProps<SlugProps> = async (context) => {
  if (!context.params || Array.isArray(context.params.id) || !context.params.id)
    return { notFound: true }

  const pageData = await requestPage(
    '/' + context.params.id,
    context.locale! as Instance
  )

  if (pageData.kind !== 'single-entity') return { notFound: true }

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as TaxonomyPage, // remove undefined values
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
