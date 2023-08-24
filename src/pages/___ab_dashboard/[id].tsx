import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { experiments } from '@/contexts/ab'
import { prisma } from '@/helper/prisma'

interface ABResultsProps {
  experiment: string
  groupA: GroupData
  groupB: GroupData
}

interface GroupData {
  avg: number
  ratingCount: number
  bounceRate: number
  visits: number
  reached3solvesPercentage: number
  reached3solvesTime: number
  reached3count: number
  solved: number
  timeOnPage: number
  notBounced: number
}

export const ABResults: NextPage<ABResultsProps> = ({
  experiment,
  groupA,
  groupB,
}) => {
  const expData = experiments.find((x) => x.experiment === experiment)!
  return (
    <>
      <Head>
        <title>A/B-Test Dashboard</title>
        <meta name="robots" content="noindex" />
      </Head>
      <FrontendClientBase>
        <div>
          <h1 className="serlo-h1">A/B-Test Dashboard für {experiment}</h1>
          <div className="mx-side my-5">
            Aufgabenordner: {JSON.stringify(expData.ids)}, Start:{' '}
            {new Date(expData.start).toISOString()}, Ende:{' '}
            {new Date(expData.end).toISOString()}
          </div>
          <div className="serlo-h2">Bewertung</div>
          <div className="mx-side">
            A (Original): Ø {groupA.avg ? groupA.avg.toFixed(2) : '--'},{' '}
            {groupA.ratingCount} Bewertungen
          </div>
          <div className="mx-side">
            B (Variante): Ø {groupB.avg ? groupB.avg.toFixed(2) : '--'},{' '}
            {groupB.ratingCount} Bewertungen
          </div>
          <div className="serlo-h2">Bounce-Rate</div>
          <div className="mx-side mb-block">
            Anteil Seitenaufrufe, die zu keiner Interaktion wie Eingabe prüfen
            oder Lösung anzeigen mit den Aufgaben führen (niedriger Prozentsatz
            ist besser).
          </div>
          <div className="mx-side">
            A (Original): {(groupA.bounceRate * 100).toFixed(2)} % von{' '}
            {groupA.visits} Aufrufen
          </div>
          <div className="mx-side">
            B (Variante): {(groupB.bounceRate * 100).toFixed(2)} % von{' '}
            {groupB.visits} Aufrufen
          </div>
          <div className="serlo-h2">Nutzungseffizienz</div>
          <div className="mx-side mb-block">
            Anteil Aufrufe, die zu 3 bearbeiteten Aufgaben führen und die
            Median-Zeit dafür (kürzere Zeit ist besser).
          </div>
          <div className="mx-side">
            A (Original): {(groupA.reached3solvesPercentage * 100).toFixed(2)} %
            mit {(groupA.reached3solvesTime / 60000).toFixed(1)} min (
            {groupA.reached3count} Sessions)
          </div>
          <div className="mx-side">
            B (Variante): {(groupB.reached3solvesPercentage * 100).toFixed(2)} %
            mit {(groupB.reached3solvesTime / 60000).toFixed(1)} min (
            {groupB.reached3count} Sessions)
          </div>
          <div className="serlo-h2">Engagement</div>
          <div className="mx-side mb-block">
            Betrachtet werden Sessions, die nicht gebounced sind (A:{' '}
            {groupA.notBounced} Sessions / B: {groupB.notBounced} Sessions).
          </div>
          <div className="mx-side mb-4 font-bold">
            Anzahl gelöster Aufgaben (median):
          </div>
          <div className="mx-side">A (Original): {groupA.solved}</div>
          <div className="mx-side">B (Variante): {groupB.solved}</div>
          <div className="mx-side mb-4 mt-block font-bold">
            Verweildauer (median):
          </div>
          <div className="mx-side">
            A (Original): {(groupA.timeOnPage / 1000 / 60).toFixed(1)} min
          </div>
          <div className="mx-side">
            B (Variante): {(groupB.timeOnPage / 1000 / 60).toFixed(1)} min
          </div>
          <div className="h-24"></div>
        </div>
      </FrontendClientBase>
    </>
  )
}

export default ABResults

interface IntermediateData {
  ratings: number[]
}

export const getStaticProps: GetStaticProps<ABResultsProps> = async (
  context
) => {
  const experiment = context.params?.id as string

  const intermediate: { a: IntermediateData; b: IntermediateData } = {
    a: { ratings: [] },
    b: { ratings: [] },
  }

  const data = await prisma.aBTestingData.findMany({
    where: { experiment, isProduction: true },
    orderBy: { timestamp: 'asc' },
  })

  const bySession: {
    [key: string]: {
      events: (typeof data)[number][]
      firstStart: number
      solved: Set<number>
      reached3solved: number
      group: string
    }
  } = {}

  for (const entry of data) {
    const group = entry.group as 'a' | 'b'
    if (entry.type === 'rating') {
      intermediate[group].ratings.push(parseInt(entry.result))
    }
    const key = entry.sessionId
    const val = (bySession[key] = bySession[key] || {
      events: [],
      firstStart: -1,
      solved: new Set(),
      reached3solved: -1,
      group: '',
    })
    if (!val.group) {
      val.group = group
    }
    if (val.firstStart === -1) {
      val.firstStart = entry.timestamp.getTime()
    }
    if (entry.result === 'correct') {
      val.solved.add(entry.entityId)
      if (val.solved.size === 3 || val.reached3solved === -1) {
        val.reached3solved = entry.timestamp.getTime()
      }
    }
    if (entry.type === 'visit') {
      if (val.events.every((entry) => entry.type !== 'visit')) {
        val.events.push(entry)
      }
    } else {
      val.events.push(entry)
    }
  }

  const sessions = Object.values(bySession)

  const sessionsA = sessions.filter((a) => a.group === 'a')
  const sessionsB = sessions.filter((a) => a.group === 'b')

  const visitsA = sessionsA.length
  const visitsB = sessionsB.length

  const bouncedSessionsA = sessionsA.filter((s) => s.events.length <= 1).length
  const bouncedSessionsB = sessionsB.filter((s) => s.events.length <= 1).length

  const notBouncedSessionsA = sessionsA.filter((s) => s.events.length > 1)
  const notBouncedSessionsB = sessionsB.filter((s) => s.events.length > 1)

  const reached3A = sessionsA.filter((s) => s.reached3solved >= 0).length
  const reached3B = sessionsB.filter((s) => s.reached3solved >= 0).length

  const reached3TimesA = sessionsA
    .filter((s) => s.reached3solved >= 0)
    .map((s) => s.reached3solved - s.firstStart)
  const reached3TimesB = sessionsB
    .filter((s) => s.reached3solved >= 0)
    .map((s) => s.reached3solved - s.firstStart)

  const reached3solvesTimeA = median(reached3TimesA)
  const reached3solvesTimeB = median(reached3TimesB)

  return {
    props: {
      experiment,
      groupA: {
        avg: average(intermediate.a.ratings),
        ratingCount: intermediate.a.ratings.length,
        visits: visitsA,
        bounceRate: bouncedSessionsA / visitsA || 0,
        reached3solvesTime: reached3solvesTimeA || 0,
        reached3solvesPercentage: reached3A / visitsA || 0,
        reached3count: reached3A,
        solved: median(notBouncedSessionsA.map((s) => s.solved.size)) || 0,
        timeOnPage:
          median(
            notBouncedSessionsA.map(
              (s) =>
                s.events[s.events.length - 1].timestamp.getTime() -
                s.events[0].timestamp.getTime()
            )
          ) || 0,
        notBounced: visitsA - bouncedSessionsA,
      },
      groupB: {
        avg: average(intermediate.b.ratings),
        ratingCount: intermediate.b.ratings.length,
        visits: visitsB,
        bounceRate: bouncedSessionsB / visitsB || 0,
        reached3solvesTime: reached3solvesTimeB || 0,
        reached3solvesPercentage: reached3B / visitsB || 0,
        reached3count: reached3B,
        solved: median(notBouncedSessionsB.map((s) => s.solved.size)) || 0,
        timeOnPage:
          median(
            notBouncedSessionsB.map(
              (s) =>
                s.events[s.events.length - 1].timestamp.getTime() -
                s.events[0].timestamp.getTime()
            )
          ) || 0,
        notBounced: visitsB - bouncedSessionsB,
      },
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length

function median(arr: number[]) {
  arr.sort((a, b) => a - b)
  const middle = Math.floor(arr.length / 2)
  if (arr.length % 2 === 0) {
    return (arr[middle - 1] + arr[middle]) / 2
  } else {
    return arr[middle]
  }
}
