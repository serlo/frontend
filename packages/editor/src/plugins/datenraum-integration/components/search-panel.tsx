import { H5pRenderer } from '@editor/plugins/h5p/renderer'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface SearchPanelProps {
  onSelect: () => void
}

export function SearchPanel({ onSelect }: SearchPanelProps) {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!loading) {
      setLoading(true)
      await search(query)
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      void handleSearch()
    }
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type="text"
          className="block w-full rounded-md border-2 border-gray-300 py-2 pl-4 pr-10 focus:border-indigo-500 focus:outline-none"
          placeholder="Suchbergriff eingeben..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 rounded-md bg-indigo-500 px-4 text-white"
          onClick={handleSearch}
        >
          Suchen
        </button>
      </div>

      {loading && <FontAwesomeIcon icon={faSpinner} spin />}

      {showResults && (
        <div onClick={onSelect} className="cursor-pointer">
          <div className="pointer-events-none">
            <H5pRenderer url="https://app.lumi.education/run/J3j0eR" />
          </div>
        </div>
      )}
    </div>
  )

  async function search(query: string) {
    const response = await fetch(
      `/api/experimental/search-datenraum?q=${query}`
    )

    if (!response.ok) {
      alert('Failed to fetch search results: ' + (await response.text()))
      setShowResults(false)
      return
    }

    setShowResults(true)
  }
}
