import Head from 'next/head'
import { useEffect, useState } from 'react'

import { HeadTags } from '../head-tags'
import { InstanceLandingData } from '@/data-types'

export interface LandingDEProps {
  data: InstanceLandingData
}

export function LandingDE() {
  const [data, setData] = useState<any>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    void fetch('http://arrrg.de/serlo-stats/quickbar.json')
      .then((res: any) => res.json())
      .then((data: any) => {
        setData(data)
      })
  }, [])

  const results = []

  if (data && query) {
    const keywords = query.toLowerCase().split(' ')
    for (const entry of data) {
      let score = 0
      if (entry.title.toLowerCase().includes(query.toLowerCase().trim())) {
        score += 100
      } else {
        let noHit = 0
        let kwCount = 0
        for (const keyword of keywords) {
          if (keyword) {
            kwCount++
            if (entry.title.toLowerCase().includes(keyword)) {
              score += 10
              continue
            }
            let hitContinue = false
            for (const p of entry.path) {
              if (p.toLowerCase().includes(keyword)) {
                score += 2
                hitContinue = true
                break
              }
            }
            if (hitContinue) continue
            noHit++
          }
        }
        if (kwCount > 0) {
          if (noHit >= kwCount / 2) {
            score = 0
          } else {
            score *= 1 - noHit / kwCount
          }
        }
      }
      if (score > 0) {
        score += Math.log10(entry.count)
        results.push({ entry, score })
      }
    }
    results.sort((a, b) => b.score - a.score)
  }

  return (
    <>
      <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700;800"
          rel="stylesheet"
        />
      </Head>

      <div className="max-w-xl mt-20 mx-auto px-4">
        <input
          type="text"
          className="border-2 rounded-3xl px-3 h-12 w-full text-lg mb-2"
          value={query}
          onChange={(value) => setQuery(value.target.value)}
        />
        {data && query && (
          <div className="px-3 pb-2 border rounded shadow">
            {results.slice(0, 7).map((x, i) => (
              <p key={i} className="my-2">
                <span className="text-sm text-gray-700">
                  {x.entry.path.join(' > ')}
                  {x.entry.path.length > 0 ? ' > ' : ''}
                </span>
                <a
                  className="cursor-pointer"
                  href={`https://de.serlo.org/${x.entry.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-lg text-blue-500 hover:underline">
                    {x.entry.title}
                    {x.entry.isTax ? ' >' : ''}
                  </span>
                </a>
              </p>
            ))}
            <p className="cursor-pointer text-lg mt-2 text-gray-800 hover:text-black">
              <a
                href={`https://de.serlo.org/search?q=${encodeURIComponent(
                  query
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Auf Serlo nach{' '}
                <i>
                  <strong>{query}</strong>
                </i>{' '}
                suchen ...
              </a>
            </p>
          </div>
        )}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </>
  )
}
