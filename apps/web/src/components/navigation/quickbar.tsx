import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect, KeyboardEvent } from 'react'

import { FaIcon } from '../fa-icon'
import { isMac } from '@/helper/client-detection'
import { cn } from '@/helper/cn'
import { quickbarStatsSubmission } from '@/helper/quickbar-stats-submission'

export const quickbarUrl = 'https://de.serlo.org/api/stats/quickbar.json'

export interface QuickbarDataEntry {
  title: string
  id: string
  path: string[]
  isTax: boolean
  count: number // ~ visits in last 3 weeks
  pathLower: string[]
  titleLower: string
  root: string
}

export type QuickbarData = QuickbarDataEntry[]

interface QuickbarProps {
  subject?: string
  placeholder?: string
  className?: string
  customData?: QuickbarData
}

export function Quickbar({
  subject,
  className,
  placeholder,
  customData,
}: QuickbarProps) {
  const [data, setData] = useState<QuickbarData | undefined>(customData)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [selection, setSelection] = useState(-1)

  const wrapper = useRef<HTMLDivElement>(null)
  const overlayWrapper = useRef<HTMLDivElement>(null)

  const isSubject = !!subject

  useEffect(() => {
    if (query && !data) {
      fetchQuickbarData(subject)
        .then((fetchedData) => fetchedData && setData(fetchedData))
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, data, subject])

  useEffect(() => {
    //reset data when subject or customData changes
    setData(customData)
  }, [subject, customData])

  useEffect(() => {
    setSelection(0)
    setIsOpen(!!(query && data))
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

  const results = data ? findResults(data, query) : []

  const close = () =>
    setTimeout(() => {
      setIsOpen(false)
    }, 200)

  const goToSearch = () => {
    quickbarStatsSubmission(
      {
        path: router.asPath,
        query,
        target: '/search',
        isSubject,
      },
      () => {
        // not using router since the hacky search component does not refresh easily
        window.location.href = `/search?q=${encodeURIComponent(query)}`
      }
    )
  }

  const goToResult = (
    id: string,
    event:
      | KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault()
    const url = `/${id}`
    quickbarStatsSubmission({
      path: router.asPath,
      query,
      target: url,
      isSubject,
    })

    if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
      window.open(url)
    } else void router.push(url)
    close()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    {
      if (e.key === 'Escape') {
        setQuery('')
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
        if (e.key === 'ArrowDown' && selection < results.length) {
          setSelection(selection + 1)
        }
        if (e.key === 'ArrowUp' && selection >= 0) {
          setSelection(selection - 1)
        }
        if (e.key === 'Enter') {
          if (selection === results.length) goToSearch()
          if (selection >= 0 && selection < results.length) {
            goToResult(results[selection].entry.id, e)
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
        className="align-end h-12 w-full rounded-3xl border-2 border-brand-200 pl-5 pr-12 outline-none hover:shadow focus:shadow"
        value={query}
        onChange={(value) => setQuery(value.target.value)}
        placeholder={placeholder ?? '... heute lerne ich'}
        ref={inputRef}
        role="combobox"
        aria-haspopup="listbox"
        // aria-owns and aria-controls may not be needed as our DOM hierarchy is
        // structured quite well. Would need to check with some screen-readers
        // to make sure that they make the association automatically.
        aria-owns="quickbar-listbox"
        aria-controls="quickbar-listbox"
        aria-expanded={isOpen}
        aria-activedescendant={
          selection !== -1 ? `quickbar-option-${selection}` : undefined
        }
        onBlur={close}
        onFocus={() => {
          if (query && data) setIsOpen(true)
        }}
        onKeyDown={onKeyDown}
        data-qa="quickbar-input"
      />
    )
  }
  function renderResetButton() {
    return (
      <div
        className="absolute bottom-0 right-0 top-0 flex w-12 cursor-pointer items-center justify-center text-gray-300"
        onClick={() => {
          setQuery('')
          setTimeout(() => {
            inputRef.current?.focus()
          })
        }}
      >
        <FaIcon icon={faXmark} />
      </div>
    )
  }
  function renderOverlay() {
    return (
      <div
        ref={overlayWrapper}
        role="listbox"
        id="quickbar-listbox"
        data-qa="quickbar-combobox-overlay"
        className={cn(
          `absolute left-side right-side z-[100] ml-2 mt-2
            max-w-2xl rounded-xl border bg-white px-5 pb-2 shadow
          `,
          isOpen ? '' : 'hidden'
        )}
      >
        {isOpen && (
          <>
            {results.map((x, index) => (
              <a
                key={index}
                role="option"
                id={`quickbar-option-${index}`}
                // Ensures that the item can't be tapped which causes the input
                // field to lose focus and the modal to get closed immediately
                tabIndex={-1}
                aria-selected={index === selection}
                className="group serlo-link cursor-pointer hover:no-underline"
                onClick={(e) => goToResult(x.entry.id, e)}
                href={`/${x.entry.id}`}
                data-qa={`quickbar-option-${index}`}
              >
                <p
                  className={cn('my-2', {
                    'bg-brand-50': index === selection,
                  })}
                >
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
              className={cn('mt-2 text-lg text-gray-800', {
                'bg-brand-50': selection === results.length,
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
}

export async function fetchQuickbarData(subject?: string) {
  const req = await fetch(quickbarUrl)
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
