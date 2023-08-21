import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import { FrontendClientBase } from '@/components/frontend-client-base'
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
}

export const ABResults: NextPage<ABResultsProps> = ({
  experiment,
  groupA,
  groupB,
}) => {
  return (
    <>
      <Head>
        <title>A/B-Test Dashboard</title>
      </Head>
      <FrontendClientBase>
        <div>
          <h1 className="serlo-h1">A/B-Test Dashboard für {experiment}</h1>
          <div className="serlo-h2">Bewertung</div>
          <div className="mx-side">
            A (Original): Ø {groupA.avg.toFixed(2)}, {groupA.ratingCount}{' '}
            Bewertungen
          </div>
          <div className="mx-side">
            B (Variante): Ø {groupB.avg.toFixed(2)}, {groupB.ratingCount}{' '}
            Bewertungen
          </div>
          <div className="serlo-h2">Bounce-Rate</div>
          <div className="mx-side mb-block">
            Anteil Seitenaufrufe, die zu keiner Interaktion wie Eingabe prüfen
            oder Lösung anzeigen mit den Aufgaben führen (niedriger Prozentsatz
            ist besser).
          </div>
          <div className="mx-side">A (Original): xxx.xx % von xx Aufrufen</div>
          <div className="mx-side">B (Variante): xxx.xx % von xx Aufrufen</div>
          <div className="serlo-h2">Nutzungseffizienz</div>
          <div className="mx-side mb-block">
            Anteil Aufrufe, die zu 3 bearbeiteten Aufgaben führen und die
            Median-Zeit dafür (niedrigere Zeit ist besser).
          </div>
          <div className="mx-side">A (Original): xxx.xx % mit xxx min</div>
          <div className="mx-side">B (Variante): xxx.xx % mit xxx min</div>
          <div></div>
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
  // quite stupid to use fetchPageData here, why not calling requestPage directly?
  const experiment = context.params?.id as string

  const intermediate: { a: IntermediateData; b: IntermediateData } = {
    a: { ratings: [] },
    b: { ratings: [] },
  }

  const data = await prisma.aBTestingData.findMany({ where: { experiment } })

  for (const entry of data) {
    const group = entry.group as 'a' | 'b'
    if (entry.type === 'rating') {
      intermediate[group].ratings.push(parseInt(entry.result))
    }
  }

  return {
    props: {
      experiment,
      groupA: {
        avg: average(intermediate.a.ratings),
        ratingCount: intermediate.a.ratings.length,
      },
      groupB: {
        avg: average(intermediate.b.ratings),
        ratingCount: intermediate.b.ratings.length,
      },
    },
  }
}

// it could be that this page is only working on staging because of the amount of data?
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const average = (arr: number[]) =>
  arr.reduce((p, c) => p + c, 0) / arr.length || 0
