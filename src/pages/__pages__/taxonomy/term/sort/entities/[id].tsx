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
  SlugProps,
  TaxonomyLink,
  TaxonomyPage,
  TaxonomyData,
  TopicCategoryType,
  TopicCategoryCustomType,
  TaxonomySubTerm,
} from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { requestPage } from '@/fetcher/request-page'
import {
  FrontendExerciseGroupNode,
  FrontendExerciseNode,
  FrontendNodeType,
} from '@/frontend-node-types'
import { categoryIconMapping } from '@/helper/icon-by-entity-type'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useTaxonomyTermSortMutation } from '@/mutations/taxonomyTerm'

export const allCategories = [
  TopicCategoryType.applets,
  TopicCategoryType.articles,
  TopicCategoryType.courses,
  TopicCategoryType.events,
  TopicCategoryType.exercises,
  TopicCategoryType.videos,
  TopicCategoryCustomType.exercisesContent,
  TopicCategoryCustomType.subterms,
  // we exclude folders because they are nested and don't appear on top level
] as const

export default renderedPageNoHooks<{ pageData: TaxonomyPage }>((props) => {
  return (
    <FrontendClientBase>
      <Content {...props} />
    </FrontendClientBase>
  )
})

function Content({ pageData }: { pageData: TaxonomyPage }) {
  const sortTerm = useTaxonomyTermSortMutation()
  const router = useRouter()
  const [taxonomyData, setTaxonomyData] = useState(pageData.taxonomyData)
  const taxUrl = `/${taxonomyData.id}`

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.taxonomyTermTools.sort

  const onSave = async () => {
    const childrenIds = allCategories.reduce<number[]>((idArray, category) => {
      if (!taxonomyData[category] || !taxonomyData[category].length)
        return idArray

      return [
        ...idArray,
        ...taxonomyData[category].map((entity) => {
          if (Object.hasOwn(entity, 'id')) {
            return entity.id
          }

          return entity.context.id
        }),
      ]
    }, [])

    const success = await sortTerm({
      childrenIds,
      taxonomyTermId: taxonomyData.id,
    })
    if (success) {
      showToastNotice(loggedInData.strings.mutations.success.generic, 'success')
      setTimeout(() => {
        void router.push(taxUrl)
      }, 500)
    }
  }

  return (
    <>
      {renderBackButton()}
      <PageTitle title={loggedInStrings.title} />
      <div className="mx-side">
        {renderCategories()}
        {renderUpdateButton()}
      </div>
    </>
  )

  function renderBackButton() {
    return (
      <Breadcrumbs
        data={[
          {
            label: strings.revisions.toContent,
            url: taxUrl,
          },
        ]}
        asBackButton
      />
    )
  }

  function renderCategories() {
    return [...allCategories].map((category) => {
      if (!(category in taxonomyData)) return null
      const links = taxonomyData[category]
      if (!links || !links.length || typeof links === 'boolean') return null

      return renderCategory(category, exToTaxonomyLinks(links))
    })
  }

  function exToTaxonomyLinks(
    links:
      | TaxonomyLink[]
      | TaxonomySubTerm[]
      | (FrontendExerciseNode | FrontendExerciseGroupNode)[]
  ): TaxonomyLink[] {
    if (
      Object.hasOwn(links[0], 'type') &&
      (links[0].type === FrontendNodeType.ExerciseGroup ||
        links[0].type === FrontendNodeType.Exercise)
    ) {
      return (links as unknown as TaxonomyData['exercisesContent']).map(
        (exNode) => {
          const url = exNode.href ?? `/${exNode.context.id}`
          const pos =
            exNode.positionOnPage !== undefined ? exNode.positionOnPage + 1 : ''
          const title = `(${pos}) ${getPreviewStringFromExercise(
            exNode,
            strings
          )}`
          return { title, url, id: exNode.context.id }
        }
      )
    }
    return links as unknown as TaxonomyLink[]
  }

  function renderCategory(
    category: (typeof allCategories)[number],
    links: TaxonomyLink[]
  ) {
    if (
      links.length === 0 ||
      links.filter((link) => !link.unrevised).length === 0
    )
      return null

    return (
      <DragDropContext
        key={category}
        onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) return
          const category = source.droppableId as (typeof allCategories)[number]

          setTaxonomyData({
            ...taxonomyData,
            [category]: arrayMoveImmutable(
              exToTaxonomyLinks(taxonomyData[category]),
              source.index,
              destination.index
            ),
          })
        }}
      >
        <Droppable droppableId={category}>
          {(provided) => {
            const categoryAdapted =
              category === 'subterms'
                ? 'folders'
                : category === 'exercisesContent'
                ? 'exercises'
                : category

            return (
              <ul
                key={category}
                className="mb-6 mt-0 first:mt-0 mobile:mt-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h4 className="mb-4 text-lg font-bold text-gray-900">
                  {strings.categories[categoryAdapted]}{' '}
                  <FaIcon icon={categoryIconMapping[categoryAdapted]} />
                </h4>

                {links.map(renderLink)}
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

  if (pageData.kind !== 'taxonomy') return { notFound: true }

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
