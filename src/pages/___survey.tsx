import { TestSurvey } from '@prisma/client'
import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { prisma } from '@/helper/prisma'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface SurveyProps {
  shown: number
  exit: number
  yes: number
  rarely: number
  no: number
  noStudent: number
}

export default renderedPageNoHooks<SurveyProps>(
  ({ shown, exit, yes, rarely, no, noStudent }) => {
    const unknown = shown - exit - yes - rarely - no - noStudent

    function showNumAndPercent(num: number) {
      return (
        <>
          {num} ({Math.round((num / shown) * 100)}%)
        </>
      )
    }
    return (
      <FrontendClientBase entityId={-1} authorization={{}}>
        <h1 className="serlo-h1 mt-12" itemProp="name">
          Schnell-Auswertung Umfrage
        </h1>
        <div className="min-h-1/4">
          <p>Anzeigen: {shown}</p>
          <p>Exit: {showNumAndPercent(exit)}</p>
          <p>Ja: {showNumAndPercent(yes)}</p>
          <p>Selten: {showNumAndPercent(rarely)}</p>
          <p>Nein: {showNumAndPercent(no)}</p>
          <p>Keine Schüler*in: {showNumAndPercent(noStudent)}</p>
          <p className="text-gray-600">
            Sonstiges: {showNumAndPercent(unknown)}
          </p>
        </div>
      </FrontendClientBase>
    )
  }
)

export const getServerSideProps: GetServerSideProps<SurveyProps> = async () => {
  const data = await prisma.testSurvey.findMany()
  if (!data) {
    return { notFound: true }
  }

  const startDate = new Date('2023-05-16T00:00:00+02:00')
  const endDate = new Date('2023-05-17T00:00:00+02:00')

  const timeboxedData = data.filter(
    (entry) =>
      entry.timestamp.getTime() >= startDate.getTime() &&
      entry.timestamp.getTime() < endDate.getTime() &&
      entry.isProduction
  )

  function buildStats(data: TestSurvey[]) {
    let shown = 0,
      exit = 0,
      yes = 0,
      rarely = 0,
      no = 0,
      noStudent = 0

    data.forEach((entry) => {
      if (entry.isProduction) {
        if (entry.event === 'show') {
          shown++
        } else if (entry.event === 'yes') {
          yes++
        } else if (entry.event === 'exit') {
          exit++
        } else if (entry.event === 'rarely') {
          rarely++
        } else if (entry.event === 'no') {
          no++
        } else if (entry.event === 'noStudent') {
          noStudent++
        }
      }
    })

    return {
      shown,
      exit,
      yes,
      no,
      rarely,
      noStudent,
    }
  }

  // some more internal analysis

  // hourly
  const hourly: TestSurvey[][] = Array<TestSurvey[]>(24)
    .fill([])
    .map(() => [])

  function timestampToHour(ts: number) {
    const tsOfDay = ts - startDate.getTime()
    return Math.floor(tsOfDay / 1000 / 60 / 60)
  }

  timeboxedData.forEach((entry) => {
    const hr = timestampToHour(entry.timestamp.getTime())
    hourly[hr].push(entry)
  })

  for (let i = 0; i < 24; i++) {
    const stats = buildStats(hourly[i])
    /*function toPercent(num: number) {
      return Math.round((num / stats.shown) * 1000) / 10
    }
    console.log(
      `Stunde: ${i}, Anzeigen: ${stats.shown}, Exit: ${toPercent(
        stats.exit
      )}% Yes: ${toPercent(stats.yes)}% Rarely: ${toPercent(
        stats.rarely
      )}% No: ${toPercent(stats.no)}% noStudent: ${toPercent(stats.noStudent)}%`
    )*/
    console.log(
      `${stats.exit},${
        stats.shown -
        stats.yes -
        stats.rarely -
        stats.no -
        stats.noStudent -
        stats.exit
      },${stats.yes},${stats.rarely},${stats.no},${stats.noStudent}`
    )
  }

  // sort by path

  const groupedByPath = timeboxedData.reduce((result, obj) => {
    const key = obj.path
    const entry = (result[key] = result[key] || { data: [] })
    entry.data.push(obj)
    return result
  }, {} as { [key: string]: { data: TestSurvey[] } })

  const paths = Object.entries(groupedByPath)
    .map((entry) => {
      return {
        path: entry[0],
        count:
          entry[1].data.filter(
            (entry) =>
              entry.event === 'yes' ||
              entry.event === 'no' ||
              entry.event === 'rarely' ||
              entry.event === 'noStudent'
          ).length / entry[1].data.length,
        sum: entry[1].data.length,
      }
    })
    .filter((entry) => entry.sum >= 10)

  paths.sort((a, b) => b.count - a.count)

  console.log(paths.slice(0, 20))

  return {
    props: buildStats(timeboxedData),
  }
}
