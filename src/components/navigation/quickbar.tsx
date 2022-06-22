import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'

import { FaIcon } from '../fa-icon'
import { isMac } from '@/helper/client-detection'
import { submitEvent } from '@/helper/submit-event'

interface QuickbarDataEntry {
  title: string
  id: string
  path: string[]
  isTax: boolean
  count: number
  pathLower: string[]
  titleLower: string
  root: string
}

type QuickbarData = QuickbarDataEntry[]

interface QuickbarProps {
  subject?: string
  placeholder?: string
  className?: string
}

export function Quickbar({ subject, className, placeholder }: QuickbarProps) {
  const [data, setData] = useState<QuickbarData | null>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [sel, setSel] = useState(-1)

  const wrapper = useRef<HTMLDivElement>(null)
  const overlayWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query && !data) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, data, subject])

  useEffect(() => {
    //reset data when subject changes
    setData(null)
  }, [subject])

  useEffect(() => {
    setSel(0)
    setOpen(!!(query && data))
    setOverlayPosition()
  }, [query, data])

  const setOverlayPosition = () => {
    if (overlayWrapper.current && wrapper.current) {
      overlayWrapper.current.style.left = `${
        wrapper.current.getBoundingClientRect().left
      }px`
    }
  }

  setOverlayPosition()

  let results: { entry: QuickbarDataEntry; score: number }[] = []

  void findResults()

  const close = () =>
    setTimeout(() => {
      setOpen(false)
    }, 200)

  const goToSearch = () => {
    submitEvent('quickbar-to-search')
    // not using router since the hacky search component does not refresh easily
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  const goToResult = (
    id: string,
    event:
      | KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    submitEvent('quickbar-direct-hit')
    const url = `/${id}`

    if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
      window.open(url)
    } else void router.push(url)
    close()
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
          if (sel == results.length) goToSearch()
          if (sel >= 0 && sel < results.length) {
            goToResult(results[sel].entry.id, e)
          }
        }
        e.preventDefault()
        return false
      }
    }
  }

  return (
    <div className={className} ref={wrapper}>
      <div className="relative">
        {renderInput()}
        {query && renderResetButton()}
      </div>
      {renderOverlay()}
    </div>
  )

  function renderInput() {
    return (
      <input
        type="text"
        className="border-2 border-brand-150 rounded-3xl pl-5 pr-12 h-12 w-full align-end hover:shadow focus:shadow outline-none"
        value={query}
        onChange={(value) => setQuery(value.target.value)}
        placeholder={placeholder ?? '... heute lerne ich'}
        ref={inputRef}
        onBlur={close}
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
        <FaIcon icon={faTimes} />
      </div>
    )
  }
  function renderOverlay() {
    return (
      <div
        ref={overlayWrapper}
        className={clsx(
          'absolute left-side right-side mt-2 ml-2 max-w-2xl',
          'px-5 pb-2 border rounded-xl shadow bg-white z-20',
          open ? '' : 'hidden'
        )}
      >
        {open && (
          <>
            {results.map((x, i) => (
              <a
                key={i}
                className="serlo-link cursor-pointer hover:no-underline group"
                onClick={(e) => goToResult(x.entry.id, e)}
              >
                <p className={clsx('my-2', { 'bg-brand-50': i == sel })}>
                  <span className="text-sm text-gray-700">
                    {x.entry.path.join(' > ')}
                    {x.entry.path.length > 0 ? ' > ' : ''}
                  </span>

                  <span className="text-lg text-brand group-hover:underline">
                    {x.entry.isTax ? (
                      <>{x.entry.title}&nbsp;&gt;</>
                    ) : (
                      x.entry.title
                    )}
                  </span>
                </p>
              </a>
            ))}
            <p
              className={clsx('text-lg mt-2 text-gray-800', {
                'bg-brand-50': sel == results.length,
              })}
            >
              <a
                className="cursor-pointer hover:text-black"
                onClick={goToSearch}
              >
                Auf Serlo nach <i className="font-bold">{query}</i> suchen ...
              </a>
            </p>
          </>
        )}
      </div>
    )
  }

  function fetchData() {
    void fetch('https://de.serlo.org/api/stats/quickbar.json')
      .then((res) => res.json())
      .then((data: QuickbarData) => {
        data.forEach((entry) => {
          entry.pathLower = entry.path.map((x) => x.toLowerCase())
          entry.titleLower = entry.title.toLowerCase()
        })

        const subjectLower = subject?.toLowerCase() ?? ''

        const filteredData = subject
          ? data.filter((entry) =>
              entry.root?.toLowerCase().startsWith(subjectLower)
            )
          : data
        submitEvent('quickbar-activated')
        setData(filteredData)
      })
  }
  function findResults() {
    if (!data || !query) return

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
}
