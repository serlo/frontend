import { faGripLines, faTools } from '@fortawesome/free-solid-svg-icons'
import { Instance } from '@serlo/api'
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
  SlugProps,
  TaxonomyLink,
  TaxonomyPage,
  TaxonomyData,
  TopicCategoryTypes,
  SingleEntityPage,
  FrontendExerciseNode,
  FrontendExerciseGroupNode,
} from '@/data-types'
import { requestPage } from '@/fetcher/request-page'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { categoryIconMapping } from '@/helper/icon-by-entity-type'
import { useEntitySortMutation } from '@/helper/mutations/taxonomyTerm'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { showToastNotice } from '@/helper/show-toast-notice'

// this duplicates some from /taxonomy/term/sort… but since this feature here is only temporary I'm okay with that

export default renderedPageNoHooks<{ pageData: SingleEntityPage }>((props) => {
  return (
    <FrontendClientBase>
      <Content {...props} />
    </FrontendClientBase>
  )
})

function Content({ pageData }: { pageData: SingleEntityPage }) {
  const sort = useEntitySortMutation

  const { entityData } = pageData
  const isCourse = entityData.typename === 'Course'

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.taxonomyTermTools.sort

  const onSave = async () => {
    console.log('saving…')
    // const childrenIds = allCategories.reduce<number[]>((idArray, category) => {
    //   if (!taxonomyData[category] || !taxonomyData[category].length)
    //     return idArray

    //   return [
    //     ...idArray,
    //     ...taxonomyData[category].map((entity) => {
    //       if (hasOwnPropertyTs(entity, 'id')) {
    //         return entity.id
    //       }

    //       return entity.context.id
    //     }),
    //   ]
    // }, [])

    // const success = await sortTerm({
    //   childrenIds,
    //   taxonomyTermId: taxonomyData.id,
    // })
    // if (success) {
    //   showToastNotice(loggedInData.strings.mutations.success.generic, 'success')
    //   setTimeout(() => {
    //     void router.push(taxUrl)
    //   }, 500)
    // }
  }

  return (
    <>
      {renderBackButton()}
      <PageTitle title={loggedInStrings.title} />
      <div className="mx-side">
        {isCourse ? renderCoursePages() : renderExercises()}
        {renderUpdateButton()}
      </div>
    </>
  )

  function renderExercises() {
    if (entityData.typename !== 'ExerciseGroup') return

    const exGroup = entityData.content?.[0] as FrontendExerciseGroupNode

    return (
      <DragDropContext
        //   key={category}
        onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) return
          // const category = source.droppableId as Exclude<
          //   TopicCategoryTypes,
          //   'folders'
          // >
          // setTaxonomyData({
          //   ...taxonomyData,
          //   [category]: arrayMoveImmutable(
          //     taxonomyData[category],
          //     source.index,
          //     destination.index
          //   ),
          // })
        }}
      >
        <Droppable droppableId="exerciseGroups">
          {(provided) => {
            return (
              <>
                <h4 className="text-truegray-900 text-lg mb-4 font-bold">
                  {strings.entities.coursePage}{' '}
                  <FaIcon icon={categoryIconMapping['courses']} />
                </h4>
                <ul
                  className="first:mt-0 mb-6 mt-0 mobile:mt-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {exGroup.children?.map((ex, i) =>
                    renderLink(
                      {
                        url: ex.href ?? `/${ex.context.id}`,
                        title: getPreviewStringFromExercise(ex, strings),
                        id: ex.context.id,
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
  function renderCoursePages() {
    if (entityData.typename !== 'Course') return
    return 123
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
              className="block mb-3 leading-cozy"
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
      <button className="mt-12 serlo-button-blue" onClick={() => {}}>
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
