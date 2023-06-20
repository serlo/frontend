import clsx from 'clsx'
import { useEffect, useState, KeyboardEvent } from 'react'

import { EditModeInput } from './edit-mode-input'
import { EditModeResultEntry } from './edit-mode-result-entry'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { QuickbarData, findResults } from '@/components/navigation/quickbar'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useTextConfig } from '@/serlo-editor-repo/plugin-text/hooks/use-text-config'
import { TextEditorPluginConfig } from '@/serlo-editor-repo/plugin-text/types'

// based on Quickbar, duplicates some code

export function LinkOverlayEditMode({
  config,
  value,
  setHref,
  removeLink,
  shouldFocus,
  quickbarData,
}: {
  config: TextEditorPluginConfig
  value: string
  setHref: (href: string) => void
  removeLink: () => void
  shouldFocus: boolean
  quickbarData: QuickbarData | null
}) {
  const [query, setQuery] = useState(value)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const { serloLinkSearch } = useTextConfig(config)
  const { lang } = useInstanceData()

  useEffect(() => {
    setQuery(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (serloLinkSearch) setSelectedIndex(0)
  }, [query, quickbarData, value, serloLinkSearch])

  const results = quickbarData ? findResults(quickbarData, query) : []

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
      showToastNotice(config.i18n.link.invalidLinkWarning, 'warning', 5000)
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

  const isLoading = serloLinkSearch && !quickbarData

  return (
    <>
      <label className="block px-side pt-4">
        {config.i18n.link.inputLabel}
      </label>
      <div className="relative w-[27rem]">
        <EditModeInput
          query={query}
          onKeyDown={onKeyDown}
          setQuery={setQuery}
          shouldFocus={shouldFocus}
          value={value}
          placeholder={config.i18n.link.placeholder}
        />
      </div>
      {query ? (
        <div className="group mt-4">
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
            className={clsx('mt-2 text-lg text-gray-800', {
              'bg-brand-50': selectedIndex === results.length,
            })}
          >
            <EditModeResultEntry
              selectedIndex={selectedIndex}
              chooseEntry={chooseEntry}
              title={query}
              pathHeader={config.i18n.link.customLink}
              index={results.length}
              isCustomLink
            />
          </div>
          {/* link suggestion only work on de.serlo.org until we have generate the quickbar data in other instances as well */}
          {serloLinkSearch && (
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

export function getCleanUrl(inputUrl: string, instance: string) {
  const testId = parseInt(inputUrl.match(/[1-9]?[0-9]+/)?.[0] ?? 'NaN')

  const hashPart = inputUrl.split('#')[1]
  const hash = hashPart ? `#${hashPart}` : ''

  if (!isNaN(testId) && inputUrl.includes('serlo.org/'))
    return `/${testId}${hash}`

  const cleanedUrl = inputUrl
    .replace('https://serlo.org/', '')
    .replace(`https://${instance}.serlo.org/`, '')
    .replace(/^serlo\.org\//, '')

  return inputUrl !== cleanedUrl ? `/${cleanedUrl}${hash}` : inputUrl
}
