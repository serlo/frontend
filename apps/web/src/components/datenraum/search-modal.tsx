'use client'

import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { DogIcon } from 'lucide-react'
import { useState } from 'react'

import SearchCard, { LearningResource, typeTitleMap } from './search-card'
import { FaIcon } from '../fa-icon'
import { Card, CardHeader, CardTitle } from '../ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Input } from '@/components/ui/input'
import { entityIconMapping } from '@/helper/icon-by-entity-type'

export function SearchModal({
  noNew,
  onImport,
}: {
  noNew?: boolean
  onImport?: (state?: unknown) => void
}) {
  const [liveQuery, setLiveQuery] = useState('')
  const query = useDebounce(liveQuery, 500)

  const { data, isFetching } = useQuery({
    queryKey: ['datenraumSearch', query],
    queryFn: search,
    enabled: query.length > 0,
  })

  const [typeFilterValue, setTypeFilterValue] = useState<
    LearningResource['type'] | 'All'
  >('All')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') setLiveQuery(liveQuery)
  }

  const filteredResults = data?.filter(
    (result) => result.type === typeFilterValue || typeFilterValue === 'All'
  )
  const newTypes = ['Article', 'Course', 'Exercise'] as const

  return (
    <div className="container mx-auto py-8">
      {noNew ? null : (
        <>
          <h1 className="mb-8 text-3xl font-bold">Neuer Inhalt</h1>
          <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {newTypes.map(renderNewCard)}
          </div>
        </>
      )}

      <h1 className="mb-8 text-3xl font-bold">Suche im Datenraum</h1>
      <div className="mb-8 flex gap-4 space-y-4">
        <Input
          className="py-0"
          type="text"
          placeholder="Suchbergriff eingeben..."
          value={liveQuery}
          onChange={(e) => setLiveQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Select
          onValueChange={(type) =>
            setTypeFilterValue(type as LearningResource['type'])
          }
        >
          <SelectTrigger className="!mt-0 w-[180px]">
            <SelectValue placeholder="Inhaltstyp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All" defaultChecked>
              Alle Inhalte
            </SelectItem>
            <SelectItem value="Article">{typeTitleMap.Article}</SelectItem>
            <SelectItem value="Exercise">{typeTitleMap.Exercise}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isFetching ? (
        <DogIcon className="mt-12 h-12 w-12 animate-spin text-sky-300" />
      ) : data?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResults?.map((entry) => (
            <SearchCard key={entry.url} entry={entry} onImport={onImport} />
          ))}
        </div>
      ) : query.length && data ? (
        'Keine Ergebnisse gefunden'
      ) : null}
    </div>
  )

  function renderNewCard(type: keyof typeof typeTitleMap) {
    const title = typeTitleMap[type]
    const href = `/entity/create/${type}/1377`
    const icon =
      entityIconMapping[type.toLowerCase() as keyof typeof entityIconMapping]

    return (
      <Card className="flex cursor-pointer flex-col justify-between bg-sky-50">
        <a href={href}>
          <CardHeader className="flex flex-row items-center gap-2">
            <CardTitle className="text-lg">
              <FaIcon icon={icon} /> {title}
            </CardTitle>
          </CardHeader>
        </a>
      </Card>
    )
  }

  async function search({ queryKey }: { queryKey: string[] }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, query] = queryKey

    const response = await fetch(`/api/datenraum/search?q=${query}`)

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(
        'Failed to fetch search results: ' + (await response.text())
      )
      return []
    }

    return (await response.json()) as LearningResource[]
  }
}
