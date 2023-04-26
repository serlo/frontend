import { GetStaticPaths, GetStaticProps } from 'next'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Topic } from '@/components/taxonomy/topic'
import {
  ExerciseFolderStatsData,
  ExerciseFolderStatsProvider,
} from '@/contexts/exercise-folder-stats-context'
import { SlugProps } from '@/data-types'
import { Instance, TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { prettifyLinks } from '@/fetcher/prettify-links'
import { requestPage } from '@/fetcher/request-page'
import { FrontendNodeType } from '@/frontend-node-types'
import { prisma } from '@/helper/prisma'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface DetailsProps {
  pageData: SlugProps['pageData']
  exerciseStatsData: ExerciseFolderStatsData
}

export default renderedPageNoHooks<DetailsProps>(
  ({ pageData, exerciseStatsData }) => {
    if (
      pageData.kind !== 'taxonomy' ||
      pageData.taxonomyData.taxonomyType !== TaxonomyTermType.ExerciseFolder
    ) {
      return (
        <FrontendClientBase>
          <div className="mt-4">
            Details sind nur für Aufgabenordner verfügbar.
          </div>
          <div className="mt-2">
            <Link href={'/___exercise_dashboard/' + exerciseStatsData.date}>
              zurück
            </Link>
          </div>
        </FrontendClientBase>
      )
    }
    return (
      <FrontendClientBase
        entityId={pageData.taxonomyData.id}
        authorization={pageData.authorization}
      >
        <ExerciseFolderStatsProvider value={exerciseStatsData}>
          <Topic data={pageData.taxonomyData} />
        </ExerciseFolderStatsProvider>
      </FrontendClientBase>
    )
  }
)

export const getStaticProps: GetStaticProps<DetailsProps> = async (context) => {
  // quite stupid to use fetchPageData here, why not calling requestPage directly?
  const id = parseInt(context.params?.id as string)
  const pageData = await requestPage(`/${id}`, context.locale! as Instance)

  // we only support theses three kinds - 404 for everything else
  if (
    pageData.kind !== 'taxonomy' &&
    pageData.kind !== 'redirect' &&
    pageData.kind !== 'single-entity'
  ) {
    return { notFound: true }
  }

  await prettifyLinks(pageData)

  const date = (context.params?.date as string) ?? ''

  const ids = []
  const revisions: number[] = []

  const times: string[] = []

  if (pageData.kind === 'taxonomy') {
    for (const ex of pageData.taxonomyData.exercisesContent) {
      if (ex.type === FrontendNodeType.Exercise) {
        ids.push(ex.context.id)
      } else {
        for (const child of ex.children ?? []) {
          ids.push(child.context.id)
        }
      }
    }
  }

  const relevantData = await prisma.exerciseSubmission.findMany({
    where: { AND: { entityId: { in: ids } } },
  })

  relevantData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

  const sessions = new Set()

  const data = relevantData.reduce((result, obj) => {
    if (date !== 'all') {
      const mydate = obj.timestamp
        .toLocaleDateString('de-DE', {
          timeZone: 'Europe/Berlin',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .replace(/\./g, '-')

      if (mydate !== date) {
        return result
      }
    }
    if (!(obj.path.includes(`/${id}/`) || obj.path === `/${id}`)) {
      return result
    }

    if (!sessions.has(obj.sessionId)) {
      times.push(
        obj.timestamp.toLocaleTimeString('de-DE', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    }

    const key = obj.entityId
    const entry = (result[key] = result[key] ?? {
      correct: new Set(),
      wrong: new Set(),
    })
    if (obj.result === 'correct') {
      entry.correct.add(obj.sessionId)
    }
    if (obj.result === 'wrong') {
      entry.wrong.add(obj.sessionId)
    }
    sessions.add(obj.sessionId)
    revisions.push(obj.revisionId)
    return result
  }, {} as { [key: string]: { correct: Set<string>; wrong: Set<string> } })

  const output: ExerciseFolderStatsData['data'] = {}

  for (const key in data) {
    const intersection = new Set(
      [...data[key].correct].filter((x) => data[key].wrong.has(x))
    )
    output[key] = {
      correct: data[key].correct.size - intersection.size,
      wrong: data[key].wrong.size - intersection.size,
      afterTrying: intersection.size,
    }
  }

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SlugProps['pageData'], // remove undefined values
      exerciseStatsData: {
        data: output,
        fullCount: sessions.size,
        date,
        revisions,
        times,
      },
    },
    revalidate: 60 * 10, // 10 min,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
