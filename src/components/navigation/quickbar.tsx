import { faXmark } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useCallback,
} from 'react'

import { FaIcon } from '../fa-icon'
import { isMac } from '@/helper/client-detection'
import { tw } from '@/helper/tw'

export interface QuickbarDataEntry {
  title: string
  id: string
  path: string[]
  isTax: boolean
  count: number
  pathLower: string[]
  titleLower: string
  root: string
}

export type QuickbarData = QuickbarDataEntry[]

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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let isCancelled = false
    if (query && !data) {
      fetchQuickbarData(subject)
        .then((fetchedData) => {
          if (!isCancelled && fetchedData) {
            setData(fetchedData)
          }
        })
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
    return () => {
      isCancelled = true
    }
  }, [query, data, subject])

  useEffect(() => {
    setData(null)
  }, [subject])

  const setOverlayPosition = useCallback(() => {
    if (overlayWrapper.current && wrapper.current) {
      overlayWrapper.current.style.left = `${
        wrapper.current.getBoundingClientRect().left
      }px`
    }
  }, [])

  useEffect(() => {
    setSel(0)
    setOpen(!!(query && data))
    setOverlayPosition()
  }, [query, data, setOverlayPosition])

  useEffect(() => setOverlayPosition(), [setOverlayPosition])

  const results = data ? findResults(data, query) : []

  const close = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setOpen(false)
    } else setTimeoutId(setTimeout(() => setOpen(false), 200))
  }

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [timeoutId])

  const goToSearch = () => {
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  const goToResult: GoToResultFunction = (id, event) => {
    event.preventDefault()
    const url = `/${id}`

    if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
      window.open(url)
    } else void router.push(url)

    close()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery('')
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
      if (e.key === 'ArrowDown' && sel < results.length) {
        setSel(sel + 1)
      }
      if (e.key === 'ArrowUp' && sel >= 0) {
        setSel(sel - 1)
      }
      if (e.key === 'Enter') {
        if (sel === results.length) {
          goToSearch()
        }
        if (sel >= 0 && sel < results.length) {
          goToResult(results[sel].entry.id, e)
        }
      }
      e.preventDefault()
    }
  }

  return (
    <div className={className} ref={wrapper}>
      <div className="relative">
        <Input
          query={query}
          setQuery={setQuery}
          placeholder={placeholder}
          close={close}
          data={data}
          onKeyDown={onKeyDown}
          inputRef={inputRef}
          setOpen={setOpen}
        />{' '}
        {query && <ResetButton setQuery={setQuery} inputRef={inputRef} />}
      </div>
      <Overlay
        overlayWrapper={overlayWrapper}
        open={open}
        results={results}
        sel={sel}
        query={query}
        goToResult={goToResult}
        goToSearch={goToSearch}
      />
    </div>
  )
}

type GoToResultFunction = (
  id: string,
  event:
    | KeyboardEvent<HTMLInputElement>
    | ReactMouseEvent<HTMLAnchorElement, MouseEvent>
) => void

export async function fetchQuickbarData(subject?: string) {
  const req = await fetch('https://de.serlo.org/api/stats/quickbar.json')
  const data = (await req.json()) as QuickbarData

  data.forEach((entry) => {
    entry.pathLower = entry.path.map((x) => x.toLowerCase())
    entry.titleLower = entry.title.toLowerCase()
  })

  const subjectLower = subject?.toLowerCase() ?? ''

  const filteredData = subject
    ? data.filter((entry) => entry.root?.toLowerCase().startsWith(subjectLower))
    : data

  return filteredData
}

export function findResults(data: QuickbarData, query: string) {
  let results: { entry: QuickbarDataEntry; score: number }[] = []

  const keywords = query.toLowerCase().split(' ')

  for (const entry of data) {
    let score = 0
    const preparedQuery = (query.charAt(0) === '/' ? query.slice(1) : query)
      .toLowerCase()
      .trim()
    if (
      entry.titleLower.includes(preparedQuery) ||
      preparedQuery === entry.id
    ) {
      score += 100
      if (entry.titleLower.startsWith(preparedQuery)) {
        score += 10
      } else if (entry.titleLower.includes(' ' + preparedQuery)) {
        score += 8
      } else if (preparedQuery.includes(entry.id)) {
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
  return results
}

interface InputProps {
  query: string
  setQuery: (value: string) => void
  placeholder?: string
  close: (withShortTimeout?: boolean) => void
  data?: QuickbarData | null
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  inputRef: React.RefObject<HTMLInputElement>
  setOpen: (value: boolean) => void
}

function Input({
  query,
  setQuery,
  placeholder,
  close,
  data,
  onKeyDown,
  inputRef,
  setOpen,
}: InputProps) {
  return (
    <input
      type="text"
      className="align-end h-12 w-full rounded-3xl border-2 border-brand-200 pl-5 pr-12 outline-none hover:shadow focus:shadow"
      value={query}
      onChange={(value) => setQuery(value.target.value)}
      placeholder={placeholder ?? '... heute lerne ich'}
      ref={inputRef}
      onBlur={() => {
        close()
      }}
      onFocus={() => {
        if (query && data) setOpen(true)
      }}
      onKeyDown={onKeyDown}
    />
  )
}

interface ResetButtonProps {
  setQuery: (value: string) => void
  inputRef: React.RefObject<HTMLInputElement>
}

function ResetButton({ setQuery, inputRef }: ResetButtonProps) {
  return (
    <div
      className="absolute bottom-0 right-0 top-0 flex w-12 cursor-pointer items-center justify-center text-gray-300"
      onClick={() => {
        setQuery('')
        setTimeout(() => {
          inputRef.current?.focus()
        }, 0)
      }}
    >
      <FaIcon icon={faXmark} />
    </div>
  )
}

interface OverlayProps {
  overlayWrapper: React.RefObject<HTMLDivElement>
  open: boolean
  results: { entry: QuickbarDataEntry; score: number }[]
  sel: number
  query: string
  goToResult: GoToResultFunction
  goToSearch: () => void
}

function Overlay({
  overlayWrapper,
  open,
  results,
  sel,
  query,
  goToResult,
  goToSearch,
}: OverlayProps) {
  return (
    <div
      ref={overlayWrapper}
      className={clsx(
        tw`
          absolute left-side right-side z-20 ml-2 mt-2
          max-w-2xl rounded-xl border bg-white px-5 pb-2 shadow
        `,
        open ? '' : 'hidden'
      )}
    >
      {open && (
        <>
          {results.map((x, i) => (
            <a
              key={i}
              tabIndex={-1}
              className="group serlo-link cursor-pointer hover:no-underline"
              onClick={(event) => goToResult(x.entry.id, event)}
              href={`/${x.entry.id}`}
            >
              <p className={clsx('my-2', { 'bg-brand-50': i === sel })}>
                <span className="text-sm text-gray-700">
                  {x.entry.path.join(' > ')}
                  {x.entry.path.length > 0 ? ' > ' : ''}
                </span>

                <span className="text-lg text-brand-700 group-hover:underline">
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
            className={clsx('mt-2 text-lg text-gray-800', {
              'bg-brand-50': sel === results.length,
            })}
          >
            <a className="cursor-pointer hover:text-black" onClick={goToSearch}>
              Auf Serlo nach <i className="font-bold">{query}</i> suchen ...
            </a>
          </p>
        </>
      )}
    </div>
  )
}
