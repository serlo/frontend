import { Fragment, useState } from 'react'

import { Link } from '../content/link'

export interface FolderData {
  sections: {
    name: string
    folders: {
      id: number
      alias?: string
      title?: string
      top10?: boolean
      top40?: boolean
    }[]
  }[]
  nextup: { id: number; alias: string; rank: number }[]
  ignored: number[]
}

export function FolderOverview({ data }: { data: FolderData }) {
  const [filter, setFilter] = useState('')
  return (
    <>
      <h1 className="serlo-h1 mb-10 mt-8" itemProp="name">
        Übersicht aller Mathe-Aufgabenordner
      </h1>
      <div className="mx-side mb-6">
        Filter:{' '}
        <input
          className="serlo-input-font-reset ml-3 rounded-xl border-2 border-brand px-2"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
          }}
        />
      </div>
      {data.sections.map((section) => {
        const filteredFolders = section.folders.filter(
          (f) =>
            f.id !== 42 &&
            (!filter ||
              !f.title ||
              f.title?.toLowerCase().includes(filter.toLowerCase()))
        )

        if (filteredFolders.length === 0) return null

        return (
          <Fragment key={section.name}>
            <h2 className="serlo-h2">{section.name}</h2>
            <ul className="serlo-ul">
              {filteredFolders.map((folder) => (
                <li key={folder.id}>
                  <Link href={folder.alias}>{folder.title}</Link>
                  {folder.top10 && (
                    <span className="ml-3 rounded-xl bg-yellow-400 px-1 py-0.5 text-xs">
                      Top 10
                    </span>
                  )}
                  {folder.top40 && (
                    <span className="ml-3 rounded-xl bg-gray-200 px-1 py-0.5 text-xs">
                      Top 40
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Fragment>
        )
      })}

      {process.env.NODE_ENV === 'development' && (
        <>
          <h2 className="mx-side mt-24 font-bold">Noch einzusortieren</h2>
          <ul className="serlo-ul">
            {data.nextup.map((folder) => (
              <li key={folder.id}>
                <Link href={folder.alias}>
                  {decodeURIComponent(folder.alias)}
                </Link>{' '}
                (Rang {folder.rank})
              </li>
            ))}
          </ul>
          <p className="mt-24">
            Ignorierte Aufgabenorder:{' '}
            {data.ignored.map((x) => x.toString()).join(', ')}
          </p>
        </>
      )}
    </>
  )
}
