import { useEffect, useState, KeyboardEvent } from 'react'
import { useHotkeysContext } from 'react-hotkeys-hook'

import { EditModeInput } from './edit-mode-input'
import { EditModeResultEntry } from './edit-mode-result-entry'
import { getCleanUrl } from '../../../utils/link'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { QuickbarData, findResults } from '@/components/navigation/quickbar'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'
import { showToastNotice } from '@/helper/show-toast-notice'

// based on Quickbar, duplicates some code

interface LinkOverlayEditModeProps {
  isSerloLinkSearchActive: boolean
  value: string
  setHref: (href: string) => void
  removeLink: () => void
  shouldFocus: boolean
  quickbarData: QuickbarData | null
}

export function LinkOverlayEditMode({
  isSerloLinkSearchActive,
  value,
  setHref,
  removeLink,
  shouldFocus,
  quickbarData,
}: LinkOverlayEditModeProps) {
  const [query, setQuery] = useState(value)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const { lang } = useInstanceData()
  const overlayStrings = useEditorStrings().plugins.text.linkOverlay

  useEffect(() => {
    setQuery(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const { enableScope, disableScope } = useHotkeysContext()

  useEffect(() => {
    if (isSerloLinkSearchActive) setSelectedIndex(0)
  }, [query, quickbarData, value, isSerloLinkSearchActive])

  const results = quickbarData ? findResults(quickbarData, query) : []
  useEffect(() => {
    disableScope('root-up-down-enter')

    return () => enableScope('root-up-down-enter')
  }, [enableScope, disableScope])

  function chooseEntry(index?: number) {
    const activeIndex = index ?? selectedIndex
    if (activeIndex < 0 || activeIndex > results.length) return

    const href =
      activeIndex < results.length ? `/${results[activeIndex].entry.id}` : query
    const cleanUrl = getCleanUrl(href, lang)

    if (
      cleanUrl.startsWith('/') ||
      cleanUrl.startsWith('#') ||
      cleanUrl.startsWith('http://') ||
      cleanUrl.startsWith('https://')
    ) {
      setHref(cleanUrl)
    } else {
      showToastNotice(overlayStrings.invalidLinkWarning, 'warning', 5000)
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

  const isLoading = isSerloLinkSearchActive && !quickbarData

  return (
    <>
      <label className="block px-side pt-4">{overlayStrings.inputLabel}</label>
      <div className="relative w-[27rem]">
        <EditModeInput
          query={query}
          onKeyDown={onKeyDown}
          setQuery={setQuery}
          shouldFocus={shouldFocus}
          value={value}
          placeholder={overlayStrings.placeholder}
        />
      </div>
      {query ? (
        <div className="group mt-4" role="listbox">
          {isLoading ? <LoadingSpinner /> : null}
          {results.map(({ entry }, index) => (
            <EditModeResultEntry
              key={entry.id}
              selectedIndex={selectedIndex}
              chooseEntry={chooseEntry}
              title={entry.title}
              pathHeader={entry.path.join(' > ')}
              index={index}
            />
          ))}
          <div
            className={cn('mt-2 text-lg text-gray-800', {
              'bg-brand-50': selectedIndex === results.length,
            })}
          >
            <EditModeResultEntry
              selectedIndex={selectedIndex}
              chooseEntry={chooseEntry}
              title={query}
              pathHeader={overlayStrings.customLink}
              index={results.length}
              isCustomLink
            />
          </div>
          {/* link suggestion only work on de.serlo.org until we generate the quickbar data in other instances as well */}
          {isSerloLinkSearchActive && (
            <p className="mx-side mt-5 whitespace-normal border-t-2 border-gray-100 pt-3 text-sm text-gray-600">
              Manche Inhalte lassen sich über die Suche nicht finden. <br />
              In dem Fall{' '}
              <a href="/search" target="_blank" rel="noreferrer">
                suche den Inhalt
              </a>{' '}
              und füge die URL hier ein.
            </p>
          )}
        </div>
      ) : null}
      <br />
    </>
  )
}
