import { H5pRenderer } from '@editor/plugins/h5p/renderer'
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { showToastNotice } from '@/helper/show-toast-notice'

interface SearchPanelProps {
  onSelect: () => void
}

export function SearchPanel({ onSelect }: SearchPanelProps) {
  const [query, setQuery] = useState('')

  const [results, setResults] = useState<LearningResource[] | null>(null)
  const [loading, setLoading] = useState(false)

  const inputTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = async () => {
    if (loading) return

    setLoading(true)
    await search(query)
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)

    if (inputTimeout.current) {
      clearTimeout(inputTimeout.current)
    }
    inputTimeout.current = setTimeout(() => {
      void handleSearch()
    }, 500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      void handleSearch()
    }
  }

  return (
    <div className="min-h-[100vh]">
      <h1 className="serlo-h4 mt-4">Datenraum Suche</h1>
      <div className="relative mt-8">
        <input
          type="text"
          autoFocus
          className="mx-side min-w-[80%] rounded-lg border-2 border-editor-primary-100 py-2 pl-2 pr-10 focus:border-editor-primary focus:outline-none"
          placeholder="Suchbergriff eingeben..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {loading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="mt-1 text-2xl text-editor-primary"
          />
        ) : null}
      </div>
      <div className="mx-side">
        {results && results.length > 0 ? (
          <>
            {renderEntry(<>Lumi – Dreisatz Lückentext</>)}
            {results.map((result) => {
              return renderEntry(
                <>
                  {getSource(result)} – {result.title}
                </>,
                result.url
              )
            })}
          </>
        ) : null}
        {}
        {/* {results ? results.map(() => {
          return renderEntry()
        }) : null}
          <>
            {renderEntry(<>von serlo.org – Artikel: Dreisatz</>, 1769)}
            {renderEntry(<>von serlo.org – Aufgaben: Dreisatz</>, 66809)}
            {renderEntry(<>von Lumi – Dreisatz Lückentext</>)}
            {renderEntry(
              <>von serlo.org – Video: Rechnen mit Dreisatz</>,
              121526
            )}
          </>
        ) : null} */}
      </div>
    </div>
  )

  function renderEntry(title: JSX.Element, path?: string) {
    return (
      <div
        onClick={
          path
            ? () => {
                showToastNotice(
                  'In dieser Demo klappt nur die Auswahl des H5P-Elements (Bitte ersten Treffer auswählen)'
                )
              }
            : onSelect
        }
        className="border-gray group relative mt-5 cursor-pointer border-t-2 pt-2"
      >
        <div className="flex justify-between">
          <b className="bold text-sm">{title}</b>
          <button className="serlo-button-editor-primary h-7 w-7 rounded-full group-hover:bg-editor-primary">
            <FaIcon icon={faPlus} className="-ml-0.5" />
          </button>
        </div>

        <div className="absolute right-12 z-50 hidden h-96 w-96 border border-gray-100 shadow-menu group-hover:block">
          <div className="absolute left-0 top-0 z-10 h-96 w-96">
            {path ? (
              <iframe
                src={`${path}?contentOnly`}
                className="h-[48rem] w-[48rem] origin-top-left scale-50 overflow-hidden"
                scrolling="no"
              />
            ) : (
              <H5pRenderer url="https://app.lumi.education/run/J3j0eR" />
            )}
          </div>
          <div className="relative z-0 mt-24">
            <LoadingSpinner noText />
          </div>
        </div>
      </div>
    )
  }

  async function search(query: string) {
    if (query === '') {
      setResults(null)
      return
    }

    const response = await fetch(
      `/api/experimental/search-datenraum?q=${query}`
    )

    if (!response.ok) {
      alert('Failed to fetch search results: ' + (await response.text()))
      setResults(null)
      return
    }

    setResults((await response.json()) as LearningResource[])
  }
}

function getSource(resource: LearningResource) {
  if (resource.url.includes('serlo')) {
    return 'Serlo'
  } else if (resource.url.includes('vhs')) {
    return 'VHS'
  } else {
    return 'Datenraum'
  }
}

export interface LearningResource {
  url: string
  title: string
  description: string
}
