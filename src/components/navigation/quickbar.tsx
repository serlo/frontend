import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'

import { Link } from '../content/link'

interface QuickbarDataEntry {
  title: string
  id: string
  path: string[]
  isTax: boolean
  count: number
  pathLower: string[]
  titleLower: string
}

type QuickbarData = QuickbarDataEntry[]

export function Quickbar({ subject }: { subject?: string }) {
  const [data, setData] = useState<QuickbarData | null>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [sel, setSel] = useState(-1)

  const host =
    typeof window === 'undefined'
      ? 'https://de.serlo.org'
      : window.location.host

  useEffect(() => {
    if (query && !data) {
      void fetch('https://de.serlo.org/api/stats/quickbar.json')
        .then((res) => res.json())
        .then((data: QuickbarData) => {
          data.forEach((entry) => {
            entry.pathLower = entry.path.map((x) => x.toLowerCase())
            entry.titleLower = entry.title.toLowerCase()
          })
          const filteredData = subject
            ? data.filter(
                (entry) =>
                  entry.titleLower.includes(subject) ||
                  (entry.path.length > 0 &&
                    entry.pathLower[0].includes(subject))
              )
            : data
          setData(filteredData)
        })
    }
  }, [query, data, subject])

  useEffect(() => {
    setSel(-1)
    setOpen(query && data ? true : false)
  }, [query, data])

  let results: { entry: QuickbarDataEntry; score: number }[] = []

  if (data && query) {
    const keywords = query.toLowerCase().split(' ')
    for (const entry of data) {
      let score = 0
      const preparedQuery = query.toLowerCase().trim()
      if (entry.titleLower.includes(preparedQuery)) {
        score += 100
        if (entry.titleLower.startsWith(preparedQuery)) {
          score += 10
        } else if (entry.titleLower.includes(' ' + preparedQuery)) {
          score += 8
        }
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

  function close() {
    setOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    {
      if (e.key == 'Escape') {
        setQuery('')
      }
      if (e.key == 'ArrowDown' || e.key == 'ArrowUp' || e.key == 'Enter') {
        if (e.key == 'ArrowDown' && sel < results.length) {
          setSel(sel + 1)
        }
        if (e.key == 'ArrowUp' && sel >= 0) {
          setSel(sel - 1)
        }
        if (e.key == 'Enter') {
          if (sel == results.length) {
            window.location.href = `//${host}/search?q=${encodeURIComponent(
              query
            )}`
          }
          if (sel >= 0 && sel < results.length) {
            window.location.href = `//${host}/${results[sel].entry.id}`
          }
        }
        e.preventDefault()
        return false
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 text-left font-normal">
      <div className="relative">
        {renderInput()}
        {query && renderResetButton()}
        {open && renderOverlay()}
      </div>
    </div>
  )

  function renderInput() {
    return (
      <input
        type="text"
        className="border-2 rounded-3xl pl-5 pr-12 h-12 w-full text-lg hover:shadow focus:shadow outline-none"
        value={query}
        onChange={(value) => setQuery(value.target.value)}
        placeholder="... heute lerne ich"
        ref={inputRef}
        onBlur={() => {
          setTimeout(() => {
            close()
          }, 200)
        }}
        onFocus={() => {
          if (query && data) setOpen(true)
        }}
        onKeyDown={onKeyDown}
      />
    )
  }
  function renderResetButton() {
    return (
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
    )
  }
  function renderOverlay() {
    return (
      <div className="px-5 pb-2 border rounded-xl shadow absolute top-14 w-full bg-white z-20">
        {results.map((x, i) => (
          <Link
            key={i}
            className="hover:no-underline group"
            href={`/${x.entry.id}`}
          >
            <p className={clsx('my-2', { 'bg-brand-50': i == sel })}>
              <span className="text-sm text-gray-700">
                {x.entry.path.join(' > ')}
                {x.entry.path.length > 0 ? ' > ' : ''}
              </span>

              <span className="text-lg text-brand group-hover:underline">
                {x.entry.isTax ? <>{x.entry.title}&nbsp;&gt;</> : x.entry.title}
              </span>
            </p>
          </Link>
        ))}
        <p
          className={clsx('text-lg mt-2 text-gray-800', {
            'bg-brand-50': sel == results.length,
          })}
        >
          <a
            href={`//${host}/search?q=${encodeURIComponent(query)}`}
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
    )
  }
}
