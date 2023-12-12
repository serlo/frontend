import { faGripLines, faTools } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { isSolutionDocument } from '@serlo/editor/src/types/plugin-type-guards'
import { cn } from '@serlo/tailwind/helper/cn'
import { arrayMoveImmutable } from 'array-move'
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
  TopicCategoryType,
  TopicCategoryCustomType,
} from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { requestPage } from '@/fetcher/request-page'
import { categoryIconMapping } from '@/helper/icon-by-entity-type'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useTaxonomyTermSortMutation } from '@/mutations/taxonomyTerm'

export const allCategories = [
  TopicCategoryType.articles,
  TopicCategoryType.videos,
  TopicCategoryType.applets,
  TopicCategoryType.courses,
  TopicCategoryType.events,
  TopicCategoryType.exercises,
  TopicCategoryCustomType.exercisesContent,
  TopicCategoryCustomType.subterms,
  // we exclude folders because they are nested and don't appear on top level
] as const

type Category = (typeof allCategories)[number]

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

  const data = pageData.taxonomyData
  const taxUrl = `/${data.id}`

  const { strings } = useInstanceData()

  const [itemsByCategory, setItemsByCategory] = useState<
    Record<Category, TaxonomyLink[]>
  >({
    [TopicCategoryType.articles]: data.articles,
    [TopicCategoryType.videos]: data.videos,
    [TopicCategoryType.applets]: data.applets,
    [TopicCategoryType.courses]: data.courses,
    [TopicCategoryType.events]: data.events,
    [TopicCategoryType.exercises]: data.exercises,
    [TopicCategoryCustomType.exercisesContent]: exercisesContentToTaxonomyLinks(
      data.exercisesContent
    ),
    [TopicCategoryCustomType.subterms]: data.subterms,
  })

  const loggedInData = useLoggedInData()
  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.taxonomyTermTools.sort

  function exercisesContentToTaxonomyLinks(
    exercisesContent: TaxonomyPage['taxonomyData']['exercisesContent']
  ): TaxonomyLink[] {
    return exercisesContent
      .map((exercise, index) => {
        if (isSolutionDocument(exercise)) return null
        const url = `/${exercise.serloContext?.uuid ?? 0}`
        const title = `(${index + 1}) ${getPreviewStringFromExercise(
          exercise,
          strings
        )}`
        return { title, url, id: exercise.serloContext?.uuid ?? 0 }
      })
      .filter(Boolean) as TaxonomyLink[]
  }

  const onSave = async () => {
    const childrenIds = allCategories.flatMap((category) =>
      itemsByCategory[category].map(({ id }) => id)
    )

    const success = await sortTerm({ childrenIds, taxonomyTermId: data.id })

    if (success) {
      showToastNotice(loggedInData.strings.mutations.success.generic, 'success')
      setTimeout(() => {
        void router.push(taxUrl)
      }, 500)
    }
  }

  const backButtonData = [{ label: strings.revisions.toContent, url: taxUrl }]

  return (
    <>
      <Breadcrumbs data={backButtonData} asBackButton />
      <PageTitle title={loggedInStrings.title} />
      <div className="mx-side">
        {renderCategories()}
        <button className="serlo-button-blue mt-12" onClick={onSave}>
          {loggedInStrings.saveButtonText}
        </button>
      </div>
    </>
  )

  function renderCategories() {
    return allCategories.map((category) => {
      const links = itemsByCategory[category]
      if (!links || !Array.isArray(links) || !links.length) return null
      return renderCategory(category, links as unknown as TaxonomyLink[])
    })
  }

  function renderCategory(category: Category, links: TaxonomyLink[]) {
    if (!links.filter((link) => !link.unrevised).length) return null

    return (
      <DragDropContext
        key={category}
        onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) return
          const category = source.droppableId as (typeof allCategories)[number]

          setItemsByCategory({
            ...itemsByCategory,
            [category]: arrayMoveImmutable(
              itemsByCategory[category],
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
        {(provided, snapshot) => {
          return (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={cn(
                'mb-1 block w-max rounded-sm p-1 leading-cozy',
                snapshot.isDragging && 'bg-brand-100'
              )}
            >
              <span className="serlo-button-blue-transparent">
                <FaIcon icon={faGripLines} />
              </span>{' '}
              <Link
                className={cn(
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
