'use client'

import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { useQuery } from '@tanstack/react-query'
import { ImportIcon, NewspaperIcon, SquareCheckBigIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

const iconMap = {
  Article: NewspaperIcon,
  Exercise: SquareCheckBigIcon,
}

export const typeTitleMap = {
  Article: 'Artikel',
  Exercise: 'Aufgabe',
  Course: 'Kurs',
} as const

export interface LearningResource {
  url: string
  title: string
  description: string
  type: 'Article' | 'Exercise'
}

async function fetchContent({ queryKey }: { queryKey: string[] }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, url] = queryKey

  const id = url.replace('https://serlo.org/', '')

  const fetchUrl = `/api/frontend/injection-content?href=${id}`
  try {
    const result = await fetch(fetchUrl)
    const stateString = (await result.json()) as AnyEditorDocument[]
    return stateString
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching content:', error)
    throw new Error('Error fetching content')
  }
}

export default function SearchCard({
  entry,
  onImport,
}: {
  entry: LearningResource
  onImport?: (state?: unknown) => void
}) {
  const router = useRouter()

  const id = entry.url.replace('https://serlo.org/', '')

  const IconComponent = iconMap[entry.type]

  const [enabled, setEnabled] = useState(false)

  const { data } = useQuery({
    queryKey: ['contentState', entry.url],
    queryFn: fetchContent,
    enabled,
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          key={entry.url}
          className="flex cursor-pointer flex-col justify-between"
          onClick={() => setEnabled(true)}
          onMouseEnter={() => setEnabled(true)}
        >
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <CardTitle className="text-lg">{entry.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex flex-wrap gap-2">{renderBadges()}</div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="z-[1000] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{entry.title}</DialogTitle>
          <DialogDescription className="py-3 text-gray-800">
            {/* {entry.description} */}
          </DialogDescription>
          <div className="flex flex-wrap justify-between">
            <a
              href={entry.url}
              target="_blank"
              className="text-sm font-bold text-gray-400"
              rel="noreferrer"
            >
              {entry.url}
            </a>
            <div className="flex gap-2">{renderBadges()}</div>
          </div>
        </DialogHeader>
        <div>
          <span className="text-sm  font-bold text-sky-300">Vorschau:</span>
          <div className="max-h-[60vh] overflow-y-auto border-y-2 border-sky-200 ">
            <div className="w-[125%] origin-top-left scale-75 pt-5">
              <EditorRenderer document={data} />
            </div>
          </div>
        </div>
        <Button
          className="mt-3 w-full bg-sky-300 font-bold text-stone-800 hover:bg-orange-200"
          onClick={() => {
            if (onImport) onImport(data)
            else void router.push(`/entity/repository/add-revision/${id}`)
          }}
        >
          <ImportIcon /> Importieren
        </Button>
      </DialogContent>
    </Dialog>
  )

  function renderBadges() {
    return (
      <>
        <Badge
          variant="secondary"
          className="bg-sky-200 text-sky-700 hover:bg-sky-200"
        >
          {getSource(entry)}
        </Badge>
        <Badge variant="secondary">
          {IconComponent ? (
            <IconComponent className="mr-1 h-4 w-4 text-gray-400" />
          ) : null}{' '}
          {typeTitleMap[entry.type]}
        </Badge>
      </>
    )
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
