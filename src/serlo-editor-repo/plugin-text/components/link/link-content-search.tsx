import {
  faExternalLink,
  faNewspaper,
  faPencilAlt,
  faTrashAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useEffect, useRef, useState, KeyboardEvent } from 'react'

import { FaIcon } from '@/components/fa-icon'
import {
  QuickbarData,
  fetchQuickbarData,
  findResults,
} from '@/components/navigation/quickbar'
import { showToastNotice } from '@/helper/show-toast-notice'

// TODO: quickbar data only available in de.serlo.org! how should we handle other instances?
// TODO: quickbar data does not have type for icon

// based on Quickbar, duplicates some code

export function LinkContentSearch({
  value,
  setValue,
  removeLink,
  shouldFocus,
}: {
  value: string
  setValue: (href: string) => void
  removeLink: () => void
  shouldFocus: boolean
}) {
  const [data, setData] = useState<QuickbarData | null>(null)
  const [query, setQuery] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const [sel, setSel] = useState(-1)
  const [isEditMode, setIsEditMode] = useState(value.length === 0)

  useEffect(() => {
    setIsEditMode(value.length === 0)
    setQuery(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (!shouldFocus) return

    const timeout = setTimeout(() => {
      if (shouldFocus && inputRef.current) inputRef.current.focus()
    })

    return () => {
      timeout && clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (query && !data) {
      fetchQuickbarData()
        .then((fetchedData) => fetchedData && setData(fetchedData))
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, data])

  useEffect(() => {
    setSel(0)
  }, [query, data, value])

  const results = data ? findResults(data, query) : []

  function setHref(index?: number) {
    const activeIndex = index ?? sel
    if (activeIndex < 0 || activeIndex > results.length) return

    const href =
      activeIndex < results.length ? `/${results[activeIndex].entry.id}` : query

    if (
      checkSerloHref(href) ||
      href.startsWith('http://') ||
      href.startsWith('https://')
    ) {
      setValue(href)
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
        if (e.key === 'ArrowDown' && sel < results.length) {
          setSel(sel + 1)
        }
        if (e.key === 'ArrowUp' && sel >= 0) {
          setSel(sel - 1)
        }
        if (e.key === 'Enter') {
          setHref()
        }
        e.preventDefault()
        return false
      }
    }
  }

  return (
    <>
      {isEditMode ? (
        <>
          <label className="block px-side pt-4">
            Suche einen Serlo Inhalt oder füge einen Link ein …
          </label>
          <div className="relative w-[27rem]">
            {renderInput()}
            {query && renderResetButton()}
          </div>
          {renderResults()} <br />
        </>
      ) : (
        <>{renderSetEntry()}</>
      )}
    </>
  )

  function renderInput() {
    return (
      <input
        type="text"
        className="mx-side w-[25rem] border-3 border-editor-primary-50 bg-editor-primary-100 rounded-xl mt-2 pl-3 pr-12 h-12 align-end hover:border-editor-primary-100 focus:border-editor-primary-200 outline-none"
        value={query}
        onChange={(value) => setQuery(value.target.value)}
        placeholder="Stichwort oder Link"
        ref={inputRef}
        onKeyDown={onKeyDown}
      />
    )
  }
  function renderResetButton() {
    return (
      <div
        className="absolute top-4 right-6 flex items-center justify-center w-8 h-8 serlo-button-editor-secondary cursor-pointer text-gray-700"
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
  function renderResults() {
    if (!query) return null
    return (
      <div className="mt-4 group">
        <>
          {results.map(({ entry }, i) =>
            renderEntry(entry.title, i, `/${entry.id}`, entry.path.join(' > '))
          )}
          <div
            className={clsx('text-lg mt-2 text-gray-800', {
              'bg-brand-50': sel === results.length,
            })}
          >
            {renderEntry(query, results.length, query, 'Eigener Link', true)}
          </div>
        </>
      </div>
    )
  }
  function renderEntry(
    title: string,
    index: number,
    href: string,
    line1?: string,
    isCustomLink?: boolean
  ) {
    return (
      <a
        key={index}
        className={clsx(
          'serlo-link cursor-pointer flex px-side py-2 bg-white',
          { 'bg-editor-primary-100 group-hover:bg-white': index === sel },
          'hover:!no-underline hover:!bg-editor-primary-100'
        )}
        onClick={(e) => {
          e.preventDefault()
          setHref(index)
        }}
        href={href}
      >
        <span
          className={clsx(
            'block w-12 h-12 bg-editor-primary-50 text-center pt-3',
            isCustomLink ? 'text-gray-800' : 'text-brand-800'
          )}
        >
          <FaIcon icon={isCustomLink ? faExternalLink : faNewspaper} />
        </span>

        <p className="text-lg leading-cozy ml-3 whitespace-normal">
          <span className="text-gray-700">{line1}</span>
          <span
            className={clsx(
              'font-bold block',
              isCustomLink ? 'text-gray-800' : 'text-brand-800'
            )}
          >
            {title}
          </span>
        </p>
      </a>
    )
  }

  function checkSerloHref(input: string) {
    return input.startsWith('/') && input.slice(1).match(/^\d+$/)
  }

  function renderSetEntry() {
    const serloId = checkSerloHref(value) ? value.slice(1) : undefined

    const entry = data?.find((entry) => entry.id === serloId)
    const isCustomLink = !serloId && !value.includes('serlo.org/')

    return (
      <div className="flex items-center px-side py-2">
        <a
          href={value}
          target="_blank"
          className={clsx(
            'serlo-link font-bold whitespace-normal max-w-[27rem]',
            isCustomLink ? '!text-gray-800' : 'text-brand'
          )}
          rel="noreferrer"
        >
          <FaIcon
            icon={isCustomLink ? faExternalLink : faNewspaper}
            className="mr-2"
          />
          {entry ? (
            <>
              {entry.title} ({value})
            </>
          ) : (
            value
          )}
        </a>
        <button
          onClick={() => setIsEditMode(true)}
          className="serlo-button-editor-secondary w-10 h-10 ml-4"
        >
          <FaIcon icon={faPencilAlt} />
          <span className="sr-only">Edit</span>
        </button>
        <button
          onClick={removeLink}
          className="serlo-button-editor-secondary w-10 h-10 ml-2"
        >
          <FaIcon icon={faTrashAlt} />
          <span className="sr-only">Remove Link</span>
        </button>
      </div>
    )
  }
}
