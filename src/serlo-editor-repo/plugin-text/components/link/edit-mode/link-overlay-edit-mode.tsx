import clsx from 'clsx'
import { useEffect, useState, KeyboardEvent } from 'react'

import { checkSerloIdHref } from '../utils'
import { EditModeInput } from './edit-mode-input'
import { EditModeResultEntry } from './edit-mode-result-entry'
import { QuickbarData, findResults } from '@/components/navigation/quickbar'
import { showToastNotice } from '@/helper/show-toast-notice'

// TODO: quickbar data only available in de.serlo.org! how should we handle other instances?
// TODO: quickbar data does not have type for icon

// based on Quickbar, duplicates some code

export function LinkOverlayEditMode({
  value,
  setHref,
  removeLink,
  shouldFocus,
  quickbarData,
}: {
  value: string
  setHref: (href: string) => void
  removeLink: () => void
  shouldFocus: boolean
  quickbarData: QuickbarData | null
}) {
  const [query, setQuery] = useState(value)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    setQuery(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query, quickbarData, value])

  const results = quickbarData ? findResults(quickbarData, query) : []

  function chooseEntry(index?: number) {
    const activeIndex = index ?? selectedIndex
    if (activeIndex < 0 || activeIndex > results.length) return

    const href =
      activeIndex < results.length ? `/${results[activeIndex].entry.id}` : query

    if (
      checkSerloIdHref(href) ||
      href.startsWith('http://') ||
      href.startsWith('https://')
    ) {
      setHref(href)
    } else {
      showToastNotice(
        'Hmm, das schaut leider nach einem ungültigen Link aus.',
        'warning'
      )
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    {
      if (e.key === 'Escape') {
        if (query) setQuery('')
        else removeLink()
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
        if (e.key === 'ArrowDown' && selectedIndex < results.length) {
          setSelectedIndex(selectedIndex + 1)
        }
        if (e.key === 'ArrowUp' && selectedIndex >= 0) {
          setSelectedIndex(selectedIndex - 1)
        }
        if (e.key === 'Enter') {
          chooseEntry()
        }
        e.preventDefault()
        return false
      }
    }
  }

  return (
    <>
      <label className="block px-side pt-4">
        Suche einen Serlo Inhalt oder füge einen Link ein …
      </label>
      <div className="relative w-[27rem]">
        <EditModeInput
          query={query}
          onKeyDown={onKeyDown}
          setQuery={setQuery}
          shouldFocus={shouldFocus}
          value={value}
        />
      </div>
      {query ? (
        <div className="mt-4 group">
          {results.map(({ entry }, index) => (
            <EditModeResultEntry
              key={entry.id}
              selectedIndex={selectedIndex}
              chooseEntry={chooseEntry}
              title={entry.title}
              pathHeader={entry.path.join(' > ')}
              index={index}
              href={`/${entry.id}`}
            />
          ))}
          <div
            className={clsx('text-lg mt-2 text-gray-800', {
              'bg-brand-50': selectedIndex === results.length,
            })}
          >
            <EditModeResultEntry
              selectedIndex={selectedIndex}
              chooseEntry={chooseEntry}
              title={query}
              pathHeader="Eigener Link"
              index={results.length}
              href={query}
              isCustomLink
            />
          </div>
        </div>
      ) : null}
      <br />
    </>
  )
}
