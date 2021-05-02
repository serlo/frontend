import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

import { HeadTags } from '../head-tags'
import { InstanceLandingData } from '@/data-types'

export interface LandingDEProps {
  data: InstanceLandingData
}

export function LandingDE() {
  const [data, setData] = useState<any>(null)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const [sel, setSel] = useState(-1)

  useEffect(() => {
    void fetch('https://arrrg.de/serlo-stats/quickbar.json')
      .then((res: any) => res.json())
      .then((data: any) => {
        data.forEach((entry: any) => {
          entry.pathLower = entry.path.map((x: any) => x.toLowerCase())
          entry.titleLower = entry.title.toLowerCase()
        })
        setData(data)
      })
  }, [])

  useEffect(() => {
    setSel(-1)
  }, [query])

  let results: any[] = []

  if (data && query) {
    const keywords = query.toLowerCase().split(' ')
    for (const entry of data) {
      let score = 0
      if (entry.titleLower.includes(query.toLowerCase().trim())) {
        score += 100
      } else {
        let noHit = 0
        let kwCount = 0
        for (const keyword of keywords) {
          if (keyword) {
            kwCount++
            if (entry.titleLower.includes(keyword)) {
              score += 10
              continue
            }
            let hitContinue = false
            for (const p of entry.pathLower) {
              if (p.includes(keyword)) {
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
        results.sort((a, b) => b.score - a.score)
        results = results.slice(0, 7)
      }
    }
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

      <div className="max-w-2xl mt-20 mx-auto px-4">
        <div className="relative">
          <input
            type="text"
            className="border-2 rounded-3xl pl-5 pr-12 h-12 w-full text-lg hover:shadow focus:shadow outline-none"
            value={query}
            onChange={(value) => setQuery(value.target.value)}
            placeholder="... heute lerne ich"
            ref={inputRef}
            onKeyDown={(e) => {
              if (
                e.key == 'ArrowDown' ||
                e.key == 'ArrowUp' ||
                e.key == 'Enter'
              ) {
                if (e.key == 'ArrowDown' && sel < results.length) {
                  setSel(sel + 1)
                }
                if (e.key == 'ArrowUp' && sel >= 0) {
                  setSel(sel - 1)
                }
                if (e.key == 'Enter') {
                  if (sel == results.length) {
                    window.location.href = `https://de.serlo.org/search?q=${encodeURIComponent(
                      query
                    )}`
                  }
                  if (sel >= 0 && sel < results.length) {
                    console.log(results[sel])
                    window.location.href = `https://de.serlo.org/${results[sel].entry.id}`
                  }
                }
                e.preventDefault()
                return false
              }
            }}
          />
          {query && (
            <div
              className="absolute top-0 right-0 bottom-0 flex items-center justify-center w-12 cursor-pointer text-gray-300"
              onClick={() => {
                setQuery('')
                setTimeout(() => {
                  inputRef.current?.focus()
                }, 0)
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          )}
          {data && query && (
            <div className="px-5 pb-2 border rounded-xl shadow absolute top-14 w-full">
              {results.map((x, i) => (
                <p
                  key={i}
                  className={clsx('my-2', { 'bg-brand-50': i == sel })}
                >
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
                    <span className="text-lg text-homepage-blue hover:underline">
                      {x.entry.isTax ? (
                        <>{x.entry.title}&nbsp;&gt;</>
                      ) : (
                        x.entry.title
                      )}
                    </span>
                  </a>
                </p>
              ))}
              <p
                className={clsx('text-lg mt-2 text-gray-800', {
                  'bg-brand-50': sel == results.length,
                })}
              >
                <a
                  href={`https://de.serlo.org/search?q=${encodeURIComponent(
                    query
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer hover:text-black"
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
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </>
  )
}
