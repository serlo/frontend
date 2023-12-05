/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import jsonDiff from 'json-diff'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

interface FolderData {
  id: number
  title: string
  versions: {
    start: string
    end: string
    content: object[]
    solved?: number
    visits?: number
    medianTime?: number
    medianTimeCount?: number
    solvedByEntity: { [key: number]: number }
  }[]
}

interface ChangesRevisions {
  [key: string]: 'added' | 'removed' | 'changed'
}

export default function Page() {
  const router = useRouter()

  const [data, setData] = useState<FolderData | null>(null)

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(1)

  const id = parseInt(router.query.id as string)
  useEffect(() => {
    if (id) {
      void fetch(
        `https://serlo.github.io/data-pipeline-interactive-exercises/folderData/${id}.json`
      )
        .then((res) => res.json())
        .then((d) => {
          const data = d as FolderData
          setData(data)
          // calculate start and end.
          const last = data.versions.findLastIndex((x) => x.visits)
          if (
            data.versions.length <= 1 ||
            !data.versions.some((x) => x.visits) ||
            last <= 0
          ) {
            setStart(0)
            setEnd(0)
          } else {
            let previous = last - 1
            while (previous > 0) {
              if (data.versions[previous].visits) {
                break
              } else {
                previous--
              }
            }
            setStart(previous)
            setEnd(last)
          }
        })
    }
  }, [id])
  if (!data) {
    return <p>Lade Daten für Ordner {router.query.id}</p>
  } else {
    const diff = jsonDiff.diffString(
      data.versions[start].content,
      data.versions[end].content,
      {
        color: false,
      }
    )
    const changedRevisions: ChangesRevisions = {}
    diff.split('\n').forEach((line) => {
      if (line.includes('current_revision_id')) {
        const lastSpace = line.lastIndexOf(' ')
        const id = parseInt(line.substring(lastSpace).trim())
        if (!changedRevisions[id]) {
          if (line.startsWith('+')) {
            changedRevisions[id] = 'added'
          } else {
            changedRevisions[id] = 'removed'
          }
        } else {
          changedRevisions[id] = 'changed'
        }
      }
    })
    return (
      <>
        <Head>
          <title>Daten-Auswertung für {decodeURIComponent(data.title)}</title>
        </Head>
        <div className="flex items-baseline justify-between bg-gray-50 py-4 pl-8">
          <a
            href={data.title}
            target="_blank"
            rel="noreferrer"
            className="text-3xl"
          >
            {decodeURIComponent(data.title)}
          </a>
          <Link
            href="/___exercise_folder_dashboard/overview"
            className="mr-4 inline-block"
          >
            Aufgabenordner Übersicht
          </Link>
        </div>
        <div className="mx-12 my-8 flex flex-wrap">
          {data.versions.map((change, i) => {
            return (
              <div
                className={cn(
                  'relative m-4 h-36 w-56 rounded-xl p-2',
                  i === start || i === end
                    ? 'bg-green-200'
                    : i >= start && i < end
                    ? 'bg-yellow-200'
                    : 'bg-gray-100'
                )}
                key={i}
              >
                {i === data.versions.length - 1 && (
                  <div className="absolute right-3 top-2">
                    <a
                      href={`https://frontend-git-2321-prototyping-dashboard-serlo.vercel.app/___exercise_dashboard/details/${change.start}to${change.end}/${data.id}`}
                      className="serlo-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaIcon icon={faMagnifyingGlass} /> Details
                    </a>
                  </div>
                )}
                <p>Version {i + 1}</p>
                <p>Start: {change.start}</p>
                <p className="mb-2">Ende: {change.end}</p>
                {change.start === change.end ? (
                  <p>
                    <i>Keine Daten</i>
                  </p>
                ) : (
                  <>
                    <p>Aufrufe: {change.visits}</p>
                    <p>gelöste Aufgaben: {change.solved}</p>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-6 w-full text-center">
          Vergleiche{' '}
          <select
            className="p-2"
            value={start}
            onChange={(e) => {
              const newStart = parseInt(e.target.value)
              setStart(newStart)
              if (newStart >= end) {
                setEnd(newStart + 1)
              }
            }}
          >
            {data.versions.map((_, i) => {
              if (i + 1 === data.versions.length) return null
              return (
                <option key={i} value={i}>
                  Version {i + 1}
                </option>
              )
            })}
          </select>{' '}
          mit{' '}
          <select
            className="p-2"
            value={end}
            onChange={(e) => {
              const newEnd = parseInt(e.target.value)
              setEnd(newEnd)
              if (start >= newEnd) {
                setStart(newEnd - 1)
              }
            }}
          >
            {data.versions.map((_, i) => {
              if (i === 0) return null
              if (i <= start) return null
              return (
                <option key={i} value={i}>
                  Version {i + 1}
                </option>
              )
            })}
          </select>
        </div>
        <div className="ml-8">
          <p>
            Lösungsraten berechnen sich aus Anzahl korrekte Lösungen / Anzahl
            Aufrufe.
          </p>
          <p>
            Arbeitszeit wird gemessen zwischen der ersten und letzten korrekt
            gelösten Aufgabe.
          </p>
        </div>
        <div className="m-4 flex">
          <div className="flex-1 border p-4">
            <p>
              <strong>Version {start + 1}</strong>
              {data.versions[start].visits !== undefined &&
                data.versions[start].solved !== undefined && (
                  <span className="ml-4 text-sm text-gray-500">
                    Gesamtquote:{' '}
                    {(
                      (data.versions[start].solved! /
                        data.versions[start].visits!) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                )}
              {data.versions[start].medianTime !== undefined &&
                data.versions[start].medianTimeCount !== undefined && (
                  <span className="ml-4 text-sm text-gray-500">
                    Median Arbeitszeit:{' '}
                    {Math.round(data.versions[start].medianTime! / 1000 / 60)}{' '}
                    min ({data.versions[start].medianTimeCount})
                  </span>
                )}
            </p>
            {renderVersion(start, changedRevisions)}
          </div>
          <div className="flex-1 border p-4">
            <p>Änderungen</p>
            <pre className="mt-4 bg-yellow-100">{diff}</pre>
          </div>
          <div className="flex-1 border p-4">
            {start === end ? (
              <p>keine weitere Version</p>
            ) : (
              <>
                <p>
                  <strong>Version {end + 1}</strong>
                  {data.versions[end].visits !== undefined &&
                    data.versions[end].solved !== undefined && (
                      <span className="ml-4 text-sm text-gray-500">
                        Gesamtquote:{' '}
                        {(
                          (data.versions[end].solved! /
                            data.versions[end].visits!) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    )}
                  {data.versions[end].medianTime !== undefined &&
                    data.versions[end].medianTimeCount !== undefined && (
                      <span className="ml-4 text-sm text-gray-500">
                        Median Arbeitszeit:{' '}
                        {Math.round(data.versions[end].medianTime! / 1000 / 60)}{' '}
                        min ({data.versions[end].medianTimeCount})
                      </span>
                    )}
                </p>
                {renderVersion(end, changedRevisions)}
              </>
            )}
          </div>
        </div>
        <iframe
          src={`https://serlo.github.io/visits-dashboard/visits_${data.id}`}
          className="mx-auto mt-6"
          height={1000}
          width={1400}
        ></iframe>
      </>
    )
  }

  function renderVersion(i: number, cr: ChangesRevisions) {
    if (!data) return null
    const content = data.versions[i].content
    return (
      <>
        {content.map((entry: any) => {
          if (entry.__typename === 'text-exercise') {
            return (
              <p key={entry.__id} className="my-2">
                Aufgabe {entry.__id} (
                <a
                  href={`/${entry.current_revision_id}`}
                  target="_blank"
                  className={cn(
                    'hover:underline',
                    cr[entry.current_revision_id] === 'added' &&
                      'text-green-600',
                    cr[entry.current_revision_id] === 'removed' &&
                      'text-red-600',
                    cr[entry.current_revision_id] === 'changed' &&
                      'text-yellow-600'
                  )}
                  rel="noreferrer"
                >
                  {entry.current_revision_id}
                </a>
                ){' '}
                {renderSolved(
                  entry.__id,
                  data.versions[i].start,
                  data.versions[i].end,
                  i
                )}
              </p>
            )
          } else if (entry.__typename === 'text-exercise-group') {
            return (
              <div key={entry.__id} className="my-2">
                <p className="my-2">
                  {' '}
                  Gruppe {entry.__id} (
                  <a
                    href={`/${entry.current_revision_id}`}
                    target="_blank"
                    className={cn(
                      'hover:underline',
                      cr[entry.current_revision_id] === 'added' &&
                        'text-green-600',
                      cr[entry.current_revision_id] === 'removed' &&
                        'text-red-600',
                      cr[entry.current_revision_id] === 'changed' &&
                        'text-yellow-600'
                    )}
                    rel="noreferrer"
                  >
                    {entry.current_revision_id}
                  </a>
                  )
                </p>
                {entry.children
                  ? entry.children.map((child: any) => {
                      return (
                        <p key={child.__id} className="my-2 ml-5">
                          Teilaufgabe {child.__id} (
                          <a
                            href={`/${child.current_revision_id}`}
                            target="_blank"
                            className={cn(
                              'hover:underline',
                              cr[child.current_revision_id] === 'added' &&
                                'text-green-600',
                              cr[child.current_revision_id] === 'removed' &&
                                'text-red-600',
                              cr[child.current_revision_id] === 'changed' &&
                                'text-yellow-600'
                            )}
                            rel="noreferrer"
                          >
                            {child.current_revision_id}
                          </a>
                          ){' '}
                          {renderSolved(
                            child.__id,
                            data.versions[i].start,
                            data.versions[i].end,
                            i
                          )}
                        </p>
                      )
                    })
                  : null}
              </div>
            )
          }
        })}
      </>
    )
  }

  function renderSolved(
    entityId: number,
    start: string,
    end: string,
    version: number
  ) {
    if (!data) return null
    const solved = data.versions[version].solvedByEntity[entityId]
    if (!solved) return null
    return (
      <span className="ml-4 inline-block">
        <strong>
          {((solved / (data.versions[version].visits ?? 0)) * 100).toFixed(2)}%
        </strong>{' '}
        gelöst ({solved})
      </span>
    )
  }
}
