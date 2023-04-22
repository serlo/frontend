import { ExerciseSubmission } from '@prisma/client'
import request from 'graphql-request'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { idsQuery } from '@/fetcher/query-ids'
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
  dateString: string
}

interface Bin {
  label: string
  count: number
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Data> = async () => {
  const data = await prisma.exerciseSubmission.findMany()

  const ids: number[] = []

  for (const entry of data) {
    if (/^\/[\d]+$/.test(entry.path)) {
      ids.push(parseInt(entry.path.substring(1)))
    }
  }

  try {
    const result = await request<{
      [key: string]: {
        alias: string
        instance: string
      }
    }>(endpoint, idsQuery([...new Set(ids)]))
    for (const entry of data) {
      if (/^\/[\d]+$/.test(entry.path)) {
        const key = `uuid${entry.path.substring(1)}`
        if (result[key]) {
          entry.path = result[key].alias
        }
      }
    }
  } catch (e) {
    //
  }

  const groups = data.reduce((result, obj) => {
    const dateKey = obj.timestamp.toLocaleDateString('de-DE', {
      timeZone: 'Europe/Berlin',
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    ;(result[dateKey] = result[dateKey] || []).push(obj)
    return result
  }, {} as { [key: string]: ExerciseSubmission[] })

  const output: Data = {
    groups: [],
    dateString: new Date().toLocaleString('de-DE', {
      timeZone: 'Europe/Berlin',
    }),
  }

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

      page[1].forEach((entry) => {
        if (entry.result === 'correct') {
          sessions.add(entry.sessionId)
          solved.add(`${entry.sessionId}-${entry.entityId}`)
        }
      })

      if (solved.size === 0) continue

      const sessionTimesObj = page[1].reduce((result, obj) => {
        const key = obj.sessionId
        const ts = obj.timestamp.getTime()
        const entry = (result[key] = result[key] || {
          start: ts,
          end: ts,
        })
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
        { label: '0 - 1 Minute', count: 0 },
        { label: '2 - 4 Minuten', count: 0 },
        { label: '5 - 9 Minuten', count: 0 },
        { label: '10 - 19 Minuten', count: 0 },
        { label: '20 -59 Minuten', count: 0 },
        { label: '60+ Minuten', count: 0 },
      ]

      for (const time of sessionTimes) {
        if (time < 1000 * 60 * 2) {
          binsTime[0].count++
        } else if (time < 1000 * 60 * 5) {
          binsTime[1].count++
        } else if (time < 1000 * 60 * 10) {
          binsTime[2].count++
        } else if (time < 1000 * 60 * 20) {
          binsTime[3].count++
        } else if (time < 1000 * 60 * 60) {
          binsTime[4].count++
        } else {
          binsTime[5].count++
        }
      }

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
        const entry = (result[key] = result[key] || { solved: new Set() })
        if (obj.result !== 'correct') {
          return result
        }
        entry.solved.add(obj.entityId)
        return result
      }, {} as { [key: string]: { solved: Set<number> } })

      const solvedCount = Object.values(solvedBySessionObj).map(
        (obj) => obj.solved.size
      )

      const bins: Bin[] = [
        { label: '1-2', count: 0 },
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

  output.groups.reverse()

  return {
    props: output,
    revalidate: 10 * 60, // 10 minutes
  }
}

const Page: NextPage<Data> = ({ groups, dateString }) => {
  const [selectedGroup, setSelectedGroup] = useState(0)

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
      <div className="mt-8 rounded-lg bg-yellow-100 p-4">
        Dieses Dashboard wertet korrekt gelöste interaktive Aufgaben aus. Das
        beinhaltet Single/Multiple-Choice, Input und H5P. Aufgaben ohne
        interaktives Element werden nicht betrachtet.
        <br />
        <br />
        Aktive NutzerInnen haben mindestens eine Aufgabe korrekt gelöst. Die
        Bearbeitungszeit startet mit der ersten korrekten Lösung und endet mit
        der letzten korrekten Lösung.
        <br />
        <br />
        Wenn eine NutzerIn eine Aufgabe mehrfach löst, wird das nur einmalig zur
        Zahl der gelösten Aufgaben hinzugerechnet.
      </div>
      <div className="ml-4 mt-3">
        <small>
          Dashboard generiert um {dateString}, Updates alle 10 Minuten. Lade
          Seite neu für aktuellere Version falls verfügbar.
        </small>
      </div>
      <div className="mt-16">
        {data.pages.map((page, i) => (
          <div
            className="bg-brand-50 rounded-xl p-4 mb-16 relative"
            key={page.path}
          >
            <div className="absolute -right-2 -top-2 w-14 h-14 bg-brand rounded-full flex justify-center items-center">
              <span className="text-white font-bold text-xl">{i + 1}</span>
            </div>
            <div className="text-lg mb-4 mr-12">
              <a
                href={`https://de.serlo.org${page.path}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline font-bold"
              >
                {page.path}
              </a>{' '}
              <Link
                href={`/___exercise_dashboard/details/${(() => {
                  const match = page.path.match(/\/(\d+)\/(.+)/)
                  if (!match) return 1553
                  return match[1]
                })()}`}
                className="text-black"
              >
                <span className="px-2 py-1 rounded-full bg-fuchsia-300 ml-3">
                  Details
                </span>
              </Link>
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
                      <a
                        href={`https://de.serlo.org${entry.path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {entry.path}
                      </a>{' '}
                      (x{entry.count})
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
