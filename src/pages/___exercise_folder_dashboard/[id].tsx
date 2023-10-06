/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import clsx from 'clsx'
import jsonDiff from 'json-diff'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface FolderData {
  id: number
  title: string
  versions: {
    start: string
    end: string
    content: object[]
    solved?: number
    visits?: number
    solvedByEntity: { [key: number]: number }
  }[]
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
        .then((data) => setData(data as FolderData))
    }
  }, [id])
  if (!data) {
    return <p>Lade Daten für Ordner {router.query.id}</p>
  } else {
    return (
      <>
        <Head>
          <title>Daten-Auswertung für {decodeURIComponent(data.title)}</title>
        </Head>
        <div className="bg-gray-50 py-4 pl-8 text-3xl">
          {decodeURIComponent(data.title)}
        </div>
        <div className="mx-12 my-8 flex flex-wrap">
          {data.versions.map((change, i) => {
            return (
              <div
                className={clsx(
                  'm-4 h-36 w-56 rounded-xl p-2',
                  i === start || i === end
                    ? 'bg-green-200'
                    : i >= start && i < end
                    ? 'bg-yellow-200'
                    : 'bg-gray-100'
                )}
                key={i}
              >
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
        <div className="m-4 flex">
          <div className="flex-1 border p-4">
            <p>
              <strong>Version {start + 1}</strong>
            </p>
            {renderVersion(start)}
          </div>
          <div className="flex-1 border p-4">
            <p>Änderungen</p>
            <pre className="mt-4 bg-yellow-100">
              {jsonDiff.diffString(
                data.versions[start].content,
                data.versions[end].content,
                {
                  color: false,
                }
              )}
            </pre>
          </div>
          <div className="flex-1 border p-4">
            <p>
              <strong>Version {end + 1}</strong>
            </p>
            {renderVersion(end)}
          </div>
        </div>
      </>
    )
  }

  function renderVersion(i: number) {
    if (!data) return null
    const content = data.versions[i].content
    return (
      <>
        {content.map((entry: any) => {
          if (entry.__typename === 'text-exercise') {
            return (
              <p key={entry.__id} className="my-2">
                Aufgabe {entry.__id} ({entry.current_revision_id}){' '}
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
                  Gruppe {entry.__id} ({entry.current_revision_id})
                </p>
                {entry.children
                  ? entry.children.map((child: any) => {
                      return (
                        <p key={child.__id} className="my-2 ml-5">
                          Teilaufgabe {child.__id} ({child.current_revision_id}){' '}
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
      <span>
        {' '}
        -{' '}
        <strong>
          {((solved / (data.versions[version].visits ?? 0)) * 100).toFixed(2)}%
        </strong>{' '}
        gelöst ({solved})
      </span>
    )
  }
}
