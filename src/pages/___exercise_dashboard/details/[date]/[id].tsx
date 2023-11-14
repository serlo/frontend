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

const median = (arr: number[]) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b)
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}

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

  let start: Date | null = null
  let end: Date | null = null

  if (date.includes('to')) {
    const parts = date.split('to')
    start = new Date(parts[0])
    end = new Date(new Date(parts[1]).getTime() + 24 * 60 * 60 * 1000)
  } else if (date !== 'all') {
    start = new Date(date.split('-').reverse().join('-'))
    end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
  }

  const res = await fetch(`https://de.serlo.org/${id}`)
  const alias = res.url.replace('https://de.serlo.org', '')

  const relevantData = await prisma.exerciseSubmission.findMany({
    where: {
      AND: {
        path: alias,
        ...(start && end ? { timestamp: { gt: start, lt: end } } : {}),
      },
    },
  })

  relevantData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

  const sessions = new Set()
  const interactiveSessions = new Set()

  const journeys: { [key: string]: number[] } = {}

  const sessionsByDate: {
    [key: string]: {
      sessions: Set<string>
      ts: number
      sessionTs: { [key: string]: { ts: number[] } }
      medianTime?: number
    }
  } = {}

  const data = relevantData.reduce((result, obj) => {
    /*if (start && end) {
      const ts = new Date(obj.timestamp).getTime()
      if (ts < start.getTime() || ts > end.getTime()) {
        return result
      }
    }*/

    const date = obj.timestamp.toLocaleDateString('de-DE', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    const entryByDate = (sessionsByDate[date] = sessionsByDate[date] || {
      sessions: new Set(),
      ts: obj.timestamp.getTime(),
      sessionTs: {},
    })

    entryByDate.sessions.add(obj.sessionId)

    if (!entryByDate.sessionTs[obj.sessionId]) {
      entryByDate.sessionTs[obj.sessionId] = { ts: [] }
    }

    entryByDate.sessionTs[obj.sessionId].ts.push(obj.timestamp.getTime())

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
      open: new Set(),
      ivals: [],
    })
    if (obj.result === 'correct') {
      entry.correct.add(obj.sessionId)

      if (!journeys[obj.sessionId]) {
        journeys[obj.sessionId] = []
      }
      if (!journeys[obj.sessionId].includes(obj.entityId)) {
        journeys[obj.sessionId].push(obj.entityId)
      }
    }
    if (obj.result === 'wrong') {
      entry.wrong.add(obj.sessionId)
    }
    if (obj.result === 'open') {
      entry.open.add(obj.sessionId)
    }
    if (obj.type === 'ival') {
      entry.ivals.push(obj.result)
    }
    sessions.add(obj.sessionId)
    revisions.push(obj.revisionId)
    if (obj.result !== 'open') {
      interactiveSessions.add(obj.sessionId)
    }
    return result
  }, {} as { [key: string]: { correct: Set<string>; wrong: Set<string>; open: Set<string>; ivals: string[] } })

  const output: ExerciseFolderStatsData['data'] = {}

  for (const key in data) {
    const intersection = new Set(
      [...data[key].correct].filter((x) => data[key].wrong.has(x))
    )
    output[key] = {
      correct: data[key].correct.size - intersection.size,
      wrong: data[key].wrong.size - intersection.size,
      afterTrying: intersection.size,
      solutionOpen: data[key].open.size,
      ivals: data[key].ivals,
    }
  }

  for (const date in sessionsByDate) {
    const entry = sessionsByDate[date]

    const times: number[] = []
    Object.entries(entry.sessionTs).forEach((entry) => {
      const sessionTimes = entry[1].ts
      sessionTimes.sort((a, b) => a - b)
      times.push(sessionTimes[sessionTimes.length - 1] - sessionTimes[0])
    })
    entry.medianTime = median(times)
  }

  const entries = Object.entries(sessionsByDate)

  entries.sort((a, b) => a[1].ts - b[1].ts)

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SlugProps['pageData'], // remove undefined values
      exerciseStatsData: {
        data: output,
        fullCount: sessions.size,
        interactiveCount: interactiveSessions.size,
        date,
        revisions,
        times,
        sessionsByDay: entries.map((entry) => ({
          date: entry[0],
          count: entry[1].sessions.size,
          medianTime: entry[1].medianTime || 0,
        })),
        journeys,
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
