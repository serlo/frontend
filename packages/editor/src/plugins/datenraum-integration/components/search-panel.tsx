import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as t from 'io-ts'
import { Relay } from 'nostr-tools/relay'
import { useRef, useState, useEffect, useCallback } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { showToastNotice } from '@/helper/show-toast-notice'

interface SearchPanelProps {
  onSelect: () => void
}

export enum License {
  CC0 = 'CC0',
  CC_BY = 'CC_BY',
  CC_BY_SA = 'CC_BY_SA',
  OTHER = 'OTHER',
}

function toLicenseString(license: License): string {
  switch (license) {
    case License.CC0:
      return '(CC0)'
    case License.CC_BY:
      return '(CC BY)'
    case License.CC_BY_SA:
      return '(CC BY-SA)'
    default:
      return ''
  }
}

const NostrEvent = t.type({
  kind: t.literal(30142),
  tags: t.array(t.array(t.string)),
})

const NostrResource = t.intersection([
  t.type({
    id: t.string,
    image: t.string,
    name: t.string,
  }),
  t.partial({
    license: t.string,
  }),
])

export function SearchPanel({ onSelect }: SearchPanelProps) {
  const [query, setQuery] = useState('')

  const [resources, setResources] = useState<LearningResource[] | null>(null)
  const [results, setResults] = useState<LearningResource[] | null>(null)
  const [loading, setLoading] = useState(true)

  const lastInputChange = useRef<number | null>(null)

  const handleSearch = useCallback(
    (_query = query) => {
      if (resources === null) return

      if (query.trim() === '') {
        setResults(resources)
        return
      } else {
        const searchQuery = query.trim().toLowerCase()
        const searchResults = resources?.filter((resource) =>
          resource.name.toLowerCase().includes(searchQuery)
        )

        setResults(searchResults)
      }
    },
    [query, resources]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    const currentTime = Date.now()

    setTimeout(() => {
      if (lastInputChange.current === currentTime) {
        void handleSearch(e.target.value)
      }
    }, 500)

    lastInputChange.current = currentTime
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      void handleSearch()
    }
  }

  useEffect(() => {
    if (resources !== null) return

    void loadResources()

    async function loadResources() {
      const relay = new Relay('wss://relay.sc24.steffen-roertgen.de')
      const resourcesFromRelay: LearningResource[] = []

      try {
        await relay.connect()

        const sub = relay.subscribe([{ kinds: [30142] }], {})

        sub.onevent = (event) => {
          if (!NostrEvent.is(event)) return

          const basicResource = Object.fromEntries(
            event.tags.map(([x, y]) => [x, y])
          )

          console.log(basicResource)

          if (!NostrResource.is(basicResource)) return

          if (resourcesFromRelay.find((x) => x.url === basicResource.id)) return

          resourcesFromRelay.push({
            ...basicResource,
            image: basicResource.name.includes('Serlo')
              ? 'https://de.serlo.org/_assets/apple-touch-icon.png'
              : basicResource.image,
            license: basicResource.license
              ? getLicense(basicResource.license)
              : License.OTHER,
            url: basicResource.id,
          })
        }

        sub.oneose = () => {
          resourcesFromRelay.push({
            name: 'Lumi – Vokabeln A1 Deutsch als Fremdsprache Lückentext',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/H5P_Logo.png/240px-H5P_Logo.png',
            license: License.CC_BY,
            url: 'https://app.lumi.education/run/J3j0eR',
          })

          setResources(resourcesFromRelay)
          setResults(resourcesFromRelay)
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [resources, handleSearch, query])

  return (
    <div className="min-h-[100vh]">
      <h1 className="serlo-h4 mt-4">Bildungs-Feed Suche</h1>
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
            {results.map((result) => {
              return renderEntry(
                <div className="flex gap-2">
                  <img src={result.image} className="block w-12" />
                  <div>
                    {result.name} {toLicenseString(result.license)}
                  </div>
                </div>,
                result
              )
            })}
          </>
        ) : query ? (
          'Keine Ergebnisse gefunden'
        ) : null}
        {}
      </div>
    </div>
  )

  function renderEntry(title: JSX.Element, resource: LearningResource) {
    return (
      <div
        onClick={
          !resource.url.includes('lumi')
            ? () => {
                showToastNotice(
                  'Bitte klicke auf das H5P-Element für diese Demo'
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
      </div>
    )
  }
}

export interface LearningResource {
  url: string
  name: string
  image: string
  license: License
}

function getLicense(license: string): License {
  const lowerCaseLicense = license.toLowerCase()

  if (
    lowerCaseLicense.includes('cc0') ||
    lowerCaseLicense.includes('publicdomain')
  ) {
    return License.CC0
  } else if (lowerCaseLicense.includes('by-sa')) {
    return License.CC_BY_SA
  } else if (lowerCaseLicense.includes('cc-by')) {
    return License.CC_BY
  } else {
    return License.OTHER
  }
}
