import { H5pRenderer } from '@editor/plugins/h5p/renderer'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'

interface SearchPanelProps {
  onSelect: () => void
}

export function SearchPanel({ onSelect }: SearchPanelProps) {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const inputTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = () => {
    if (!loading) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setShowResults(true)
      }, 500)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)

    if (inputTimeout.current) {
      clearTimeout(inputTimeout.current)
    }
    inputTimeout.current = setTimeout(() => {
      handleSearch()
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
        {showResults ? (
          <>
            {renderEntry(<>von serlo.org – Artikel: Dreisatz</>, 1769)}
            {renderEntry(<>von serlo.org – Aufgaben: Dreisatz</>, 66809)}
            {renderEntry(<>von Lumi – Dreisatz Lückentext</>)}
            {renderEntry(
              <>von serlo.org – Video: Rechnen mit Dreisatz</>,
              121526
            )}
          </>
        ) : null}
      </div>
    </div>
  )

  function renderEntry(title: JSX.Element, id?: number) {
    return (
      <div
        onClick={onSelect}
        className="border-gray group relative mt-5 cursor-pointer border-t-2 pt-2"
      >
        <div className="flex justify-between">
          <b className="bold text-sm">{title}</b>
          <button className="serlo-button-editor-primary h-7 w-7 rounded-full group-hover:bg-editor-primary">
            +
          </button>
        </div>

        <div className="absolute right-12 z-50 hidden h-96 w-96 border border-gray-100 shadow-menu group-hover:block">
          {id ? (
            <iframe
              src={`https://de.serlo.org/${id}?contentOnly`}
              className="h-[48rem] w-[48rem] origin-top-left scale-50 overflow-hidden"
              scrolling="no"
            />
          ) : (
            <H5pRenderer url="https://app.lumi.education/run/J3j0eR" />
          )}
        </div>
      </div>
    )
  }
}
