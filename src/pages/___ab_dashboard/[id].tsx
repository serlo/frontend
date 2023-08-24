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

  // calculate significance for bounce
  const bounceNiveau = confidence(
    groupA.visits,
    groupB.visits,
    groupA.notBounced,
    groupB.notBounced
  )

  const reached3Niveau = confidence(
    groupA.visits,
    groupB.visits,
    groupA.reached3count,
    groupB.reached3count
  )

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
          <div className="mx-side mt-3">Konfidenz: {bounceNiveau} %</div>
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
          <div className="mx-side mt-3">Konfidenz: {reached3Niveau} %</div>
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

function confidence(a: number, b: number, c: number, d: number) {
  const x = a - c
  const y = b - d
  let chi = NaN
  if (x + y === 0) {
    chi =
      Math.pow(c - (a * (c + d)) / (a + b), 2) / ((a * (c + d)) / (a + b)) +
      Math.pow(d - (b * (c + d)) / (a + b), 2) / ((b * (c + d)) / (a + b))
  } else if (c + d === 0) {
    chi =
      Math.pow(x - (a * (x + y)) / (a + b), 2) / ((a * (x + y)) / (a + b)) +
      Math.pow(y - (b * (x + y)) / (a + b), 2) / ((b * (x + y)) / (a + b))
  } else {
    chi =
      Math.pow(x - (a * (x + y)) / (a + b), 2) / ((a * (x + y)) / (a + b)) +
      Math.pow(y - (b * (x + y)) / (a + b), 2) / ((b * (x + y)) / (a + b)) +
      Math.pow(c - (a * (c + d)) / (a + b), 2) / ((a * (c + d)) / (a + b)) +
      Math.pow(d - (b * (c + d)) / (a + b), 2) / ((b * (c + d)) / (a + b))
  }
  let niveau = 50
  const chidisp = [
    0.48, 0.5, 0.52, 0.55, 0.57, 0.6, 0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8,
    0.84, 0.87, 0.91, 0.95, 0.99, 1.03, 1.07, 1.12, 1.17, 1.22, 1.27, 1.32,
    1.38, 1.44, 1.5, 1.57, 1.64, 1.72, 1.8, 1.88, 1.97, 2.07, 2.18, 2.29, 2.42,
    2.55, 2.71, 2.87, 3.06, 3.28, 3.54, 3.84, 4.22, 4.71, 5.41, 6.63,
  ]
  const niveaus = [
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  ]
  for (let index = 0; index < chidisp.length; index++) {
    if (chi >= chidisp[index]) {
      niveau = niveaus[index]
    }
  }
  return niveau
}
