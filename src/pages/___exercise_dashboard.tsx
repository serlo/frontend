import { ExerciseSubmission } from '@prisma/client'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { prisma } from '@/helper/prisma'

interface Data {
  groups: {
    date: string
    sessionsAll: number
    solvedAll: number
    entityCount: number
    timesMedianAll: number
    solvedCountAll: number
    pages: {
      path: string
      sessions: number
      solved: number
      solvedCount: Bin[]
      solvedMedian: number
      sessionTimes: Bin[]
      timesMedian: number
      contextPaths: { path: string; count: number }[]
    }[]
  }[]
}

interface Bin {
  label: string
  count: number
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const data = await prisma.exerciseSubmission.findMany()

  const groups = data.reduce((result, obj) => {
    const dateKey = obj.timestamp.toUTCString().substring(0, 16)
    ;(result[dateKey] = result[dateKey] || []).push(obj)
    return result
  }, {} as { [key: string]: ExerciseSubmission[] })

  const output: Data = { groups: [] }

  for (const group in groups) {
    const data = groups[group]

    const sessionsAll = new Set()
    data.forEach((entry) => sessionsAll.add(entry.sessionId))

    const solvedAll = new Set()
    data.forEach((entry) =>
      solvedAll.add(`${entry.sessionId}-${entry.entityId}`)
    )

    const entityAll = new Set()
    data.forEach((entry) => entityAll.add(entry.entityId))

    const sessionsTimesAllObj = data.reduce((result, obj) => {
      const key = obj.sessionId
      const ts = obj.timestamp.getTime()
      const entry = (result[key] = result[key] || { start: ts, end: ts })
      if (ts < entry.start) {
        entry.start = ts
      }
      if (ts > entry.end) {
        entry.end = ts
      }
      return result
    }, {} as { [key: string]: { start: number; end: number } })

    const sessionTimesAll = Object.values(sessionsTimesAllObj).map(
      (obj) => obj.end - obj.start
    )

    const solvedBySessionAllObj = data.reduce((result, obj) => {
      const key = obj.sessionId
      ;(result[key] = result[key] || { solved: new Set() }).solved.add(
        obj.entityId
      )
      return result
    }, {} as { [key: string]: { solved: Set<number> } })

    const solvedCountAll = Object.values(solvedBySessionAllObj).map(
      (obj) => obj.solved.size
    )

    const pagesObj = data.reduce((result, obj) => {
      const path = obj.path
      ;(result[path] = result[path] || []).push(obj)
      return result
    }, {} as { [key: string]: ExerciseSubmission[] })

    const pagesArr = Object.entries(pagesObj)

    const pages = []

    for (const page of pagesArr) {
      const sessions = new Set()
      const solved = new Set()

      const sessionTimesObj = page[1].reduce((result, obj) => {
        const key = obj.sessionId
        const ts = obj.timestamp.getTime()
        const entry = (result[key] = result[key] || { start: ts, end: ts })
        if (ts < entry.start) {
          entry.start = ts
        }
        if (ts > entry.end) {
          entry.end = ts
        }
        return result
      }, {} as { [key: string]: { start: number; end: number } })

      const sessionTimes = Object.values(sessionTimesObj).map(
        (obj) => obj.end - obj.start
      )

      const binsTime: Bin[] = [
        { label: '< 2 Minute', count: 0 },
        { label: '3-5 Minuten', count: 0 },
        { label: '6-10 Minuten', count: 0 },
        { label: '11-20 Minuten', count: 0 },
        { label: '21-60 Minuten', count: 0 },
        { label: '61+ Minuten', count: 0 },
      ]

      for (const time of sessionTimes) {
        if (time < 120000) {
          binsTime[0].count++
        } else if (time < 330000) {
          binsTime[1].count++
        } else if (time < 600000) {
          binsTime[2].count++
        } else if (time < 1200000) {
          binsTime[3].count++
        } else if (time < 3600000) {
          binsTime[4].count++
        } else {
          binsTime[5].count++
        }
      }

      //sessionTimes.sort((a, b) => b - a)

      page[1].forEach((page) => {
        sessions.add(page.sessionId)
        if (page.result === 'correct') {
          solved.add(`${page.sessionId}-${page.entityId}`)
        }
      })

      const otherPaths = data.reduce((result, obj) => {
        if (!sessions.has(obj.sessionId) || obj.path === page[0]) {
          return result
        }
        const key = obj.path
        ;(result[key] = result[key] || { ids: new Set() }).ids.add(
          obj.sessionId
        )
        return result
      }, {} as { [key: string]: { ids: Set<string> } })

      const contextPaths = Object.entries(otherPaths).map((p) => ({
        path: p[0],
        count: p[1].ids.size,
      }))

      contextPaths.sort((a, b) => b.count - a.count)

      const solvedBySessionObj = page[1].reduce((result, obj) => {
        const key = obj.sessionId
        ;(result[key] = result[key] || { solved: new Set() }).solved.add(
          obj.entityId
        )
        return result
      }, {} as { [key: string]: { solved: Set<number> } })

      const solvedCount = Object.values(solvedBySessionObj).map(
        (obj) => obj.solved.size
      )

      const bins: Bin[] = [
        { label: '0-2', count: 0 },
        { label: '3-5', count: 0 },
        { label: '6-10', count: 0 },
        { label: '11-20', count: 0 },
        { label: '21+', count: 0 },
      ]

      for (const time of solvedCount) {
        if (time <= 2) {
          bins[0].count++
        } else if (time <= 5) {
          bins[1].count++
        } else if (time <= 10) {
          bins[2].count++
        } else if (time <= 20) {
          bins[3].count++
        } else {
          bins[4].count++
        }
      }

      pages.push({
        path: page[0],
        sessions: sessions.size,
        solved: solved.size,
        solvedCount: bins,
        solvedMedian: median(solvedCount),
        sessionTimes: binsTime,
        timesMedian: Math.round(median(sessionTimes) / 1000 / 60),
        contextPaths,
      })
    }

    pages.sort((a, b) => b.solved - a.solved)

    output.groups.push({
      date: group,
      sessionsAll: sessionsAll.size,
      solvedAll: solvedAll.size,
      timesMedianAll: Math.round(median(sessionTimesAll) / 1000 / 60),
      solvedCountAll: median(solvedCountAll),
      entityCount: entityAll.size,
      pages,
    })
  }

  return {
    props: output,
  }
}

const Page: NextPage<Data> = ({ groups }) => {
  const [selectedGroup, setSelectedGroup] = useState(groups.length - 1)

  const data = groups[selectedGroup]

  return (
    <FrontendClientBase authorization={{}}>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Statistik gelöste Aufgaben</title>
      </Head>
      <div className="mt-8 ml-4">
        Wähle Zeitraum:
        <select
          className="p-2 ml-2"
          value={selectedGroup}
          onChange={(e) => {
            setSelectedGroup(parseInt(e.target.value))
          }}
        >
          {groups.map((group, i) => (
            <option key={group.date} value={i}>
              {group.date}
            </option>
          ))}
        </select>
      </div>
      <div className="my-12 ml-4">
        <div>
          Gelöste Aufgaben insgesamt: <strong>{data.solvedAll}</strong>
        </div>
        <div>
          Anzahl Aufgaben mit Aktivität: <strong>{data.entityCount}</strong>
        </div>
        <div>
          Aktive NutzerInnen insgesamt: <strong>{data.sessionsAll}</strong>
        </div>
        <div>
          Median gelöste Aufgaben pro NutzerIn insgesamt:{' '}
          <strong>{data.solvedCountAll}</strong>
        </div>
        <div>
          Median Bearbeitungszeit insgesamt:{' '}
          <strong>{data.timesMedianAll} Minuten</strong>
        </div>
      </div>
      <div className="mt-16">
        {data.pages.map((page) => (
          <div className="bg-brand-50 rounded-xl p-4 mb-16" key={page.path}>
            <div className="text-lg underline mb-2">
              <a
                href={`https://de.serlo.org${page.path}`}
                target="_blank"
                rel="noreferrer"
              >
                {page.path}
              </a>
            </div>
            <div>
              Gelöste Aufgaben: <strong>{page.solved}</strong>
            </div>
            <div>
              Aktive NutzerInnen: <strong>{page.sessions}</strong>
            </div>
            <div className="mt-2">
              Verteilung Anzahl gelöste Aufgaben pro NutzerIn (Median=
              <strong>{page.solvedMedian}</strong>)
            </div>
            <div className="ml-3">
              {page.solvedCount.map((bin) => (
                <div key={bin.label}>
                  {bin.label}: {bin.count}
                </div>
              ))}
            </div>
            <div className="mt-2">
              Verteilung Bearbeitungszeit pro NutzerIn (Median=
              <strong>{page.timesMedian} Minuten</strong>)
            </div>
            <div className="ml-3">
              {page.sessionTimes.map((bin) => (
                <div key={bin.label}>
                  {bin.label}: {bin.count}
                </div>
              ))}
            </div>
            {page.contextPaths.length === 0 ? (
              <div className="mt-2 italic text-gray-600">
                NutzerInnen waren nur auf dieser Seite aktiv
              </div>
            ) : (
              <>
                <div className="mt-2">NutzerInnen bearbeiteten auch:</div>
                <div className="ml-3">
                  {page.contextPaths.slice(0, 5).map((entry) => (
                    <div key={entry.path}>
                      {entry.path} (x{entry.count})
                    </div>
                  ))}
                </div>
                {page.contextPaths.length > 5 && (
                  <div className="ml-3">
                    + {page.contextPaths.length - 5} mehr
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </FrontendClientBase>
  )
}

export default Page

function median(numbers: number[]): number {
  if (numbers.length === 0) {
    return -1
  }
  const sortedNumbers = numbers.slice().sort((a, b) => a - b)
  const middleIndex = Math.floor(sortedNumbers.length / 2)
  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2
  } else {
    return sortedNumbers[middleIndex]
  }
}
