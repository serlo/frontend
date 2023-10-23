import Head from 'next/head'
import { useState, useEffect } from 'react'

type OverviewData = {
  id: number
  title: string
  changesCount: number
  visitCount: number
  solvedCount: number
}[]

type Sorts = 'most-edited' | 'most-viewed' | 'most-solved'

export default function Overview() {
  const [sort, setSort] = useState<Sorts | null>(null)

  const [sortedData, setData] = useState<OverviewData | null>(null)

  useEffect(() => {
    void fetch(
      `https://serlo.github.io/data-pipeline-interactive-exercises/folderData/overview.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data as OverviewData)
        setSort(
          (sessionStorage.getItem(
            '___exercise_folder_dashboard__sort'
          ) as Sorts) || 'most-solved'
        )
      })
  }, [])

  useEffect(() => {
    sessionStorage.setItem('___exercise_folder_dashboard__sort', sort ?? '')
    if (sortedData) {
      if (sort === 'most-edited') {
        const newData = sortedData.slice()
        newData.sort((a, b) => b.changesCount - a.changesCount)
        setData(newData)
      }
      if (sort === 'most-viewed') {
        const newData = sortedData.slice()
        newData.sort((a, b) => b.visitCount - a.visitCount)
        setData(newData)
      }
      if (sort === 'most-solved') {
        const newData = sortedData.slice()
        newData.sort((a, b) => b.solvedCount - a.solvedCount)
        setData(newData)
      }
    }
  }, [sortedData, sort])

  if (!sortedData || !sort) return <p>wird geladen ...</p>

  return (
    <div className="mx-auto max-w-[800px] pt-16">
      <Head>
        <title>Aufgabenordner Übersicht</title>
      </Head>
      <h1 className="mb-4 text-3xl">Aufgabenordner Übersicht</h1>
      <div className="text-right">
        Sortierung:{' '}
        <select
          className="p-2"
          value={sort}
          onChange={(e) => {
            if (e.target.value === 'most-edited') {
              setSort('most-edited')
              const newData = sortedData.slice()
              newData.sort((a, b) => b.changesCount - a.changesCount)
              setData(newData)
            }
            if (e.target.value === 'most-viewed') {
              setSort('most-viewed')
              const newData = sortedData.slice()
              newData.sort((a, b) => b.visitCount - a.visitCount)
              setData(newData)
            }
            if (e.target.value === 'most-solved') {
              setSort('most-solved')
              const newData = sortedData.slice()
              newData.sort((a, b) => b.solvedCount - a.solvedCount)
              setData(newData)
            }
          }}
        >
          <option value="most-edited">meiste Bearbeitungen</option>
          <option value="most-viewed">meiste Aufrufe</option>
          <option value="most-solved">meist gelöste Aufgaben</option>
        </select>
      </div>
      {sortedData.map(
        ({ id, title, changesCount, visitCount, solvedCount }) => {
          return (
            <div key={id} className="my-6">
              <a
                href={`/___exercise_folder_dashboard/${id}`}
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                {decodeURIComponent(title)}
              </a>
              <p className="text-sm text-gray-700">
                {changesCount} Bearbeitung{changesCount !== 1 ? 'en' : ''} •{' '}
                {visitCount} Aufruf{visitCount !== 1 ? 'e' : ''} • {solvedCount}{' '}
                gelöste Aufgabe{solvedCount !== 1 ? 'n' : ''}
              </p>
            </div>
          )
        }
      )}
    </div>
  )
}
