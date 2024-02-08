import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { SerloAddButton } from '@editor/plugin/helpers/serlo-editor-button'
import { LinkOverlayEditMode } from '@editor/plugins/text/components/link/edit-mode/link-overlay-edit-mode'
import { LinkOverlayWithHref } from '@editor/plugins/text/components/link/link-overlay-with-href'
import { faCircleArrowUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useRef, useState } from 'react'

import type { ArticleProps } from '..'
import { buttonClass } from '../const/button-class'
import { cn } from '@/helper/cn'

interface ArticleSourcesProps {
  sources: ArticleProps['state']['sources']
}

export function ArticleSources({ sources }: ArticleSourcesProps) {
  const articleStrings = useEditorStrings().templatePlugins.article
  const linkToolRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [selectedInput, setSelectedInput] = useState<number | undefined>(
    undefined
  )

  function addNewField(index: number) {
    sources.insert(index)
    setTimeout(() => {
      const inputs = listRef.current?.querySelectorAll('a input')
      ;(inputs as NodeListOf<HTMLInputElement>)?.[index].focus()
    }, 10)
  }

  return (
    <>
      <SerloAddButton
        text={articleStrings.addSource}
        onClick={() => addNewField(sources.length)}
        className="mb-2 mt-0"
      />
      <ul ref={listRef} className="serlo-ul mb-4 mt-2 text-lg">
        {sources.map(renderEditableSource)}
      </ul>
    </>
  )

  function renderEditableSource(
    source: ArticleSourcesProps['sources'][number],
    index: number
  ) {
    return (
      <li key={index} className="group flex">
        <div className="relative flex-grow">
          <a className={cn(source.href.value ? 'serlo-link' : '')}>
            <input
              className="serlo-input-font-reset rounded-md px-1 focus:outline"
              value={source.title.value}
              placeholder={articleStrings.sourceText}
              onChange={(e) => source.title.set(e.target.value)}
              onFocus={() => setSelectedInput(index)}
              onBlur={(e) => {
                // do not close popover if next focus is inside of popover
                if (linkToolRef.current?.contains(e.relatedTarget)) return
                setSelectedInput(undefined)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addNewField(index + 1)
              }}
            />
          </a>
          {selectedInput === index ? renderLinkTool() : null}
        </div>
        <div>
          {index === 0 ? null : (
            <button
              onClick={() => sources.move(index, index - 1)}
              className={buttonClass + ' relative'}
            >
              <EditorTooltip text={articleStrings.moveUpLabel} />
              <FaIcon icon={faCircleArrowUp} />
            </button>
          )}
          <button onClick={() => sources.remove(index)} className={buttonClass}>
            <EditorTooltip text={articleStrings.removeLabel} />
            <FaIcon icon={faTrashAlt} />
          </button>
        </div>
      </li>
    )
  }

  function renderLinkTool() {
    if (selectedInput === undefined) return null
    const source = sources[selectedInput]

    return (
      <div
        ref={linkToolRef}
        className="absolute left-3 top-8 z-[95] whitespace-nowrap"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-[460px] rounded bg-white text-start not-italic shadow-menu"
          style={{ width: `420px` }}
        >
          {source.href.value.length ? (
            <LinkOverlayWithHref
              value={source.href.value}
              removeLink={() => source.href.set('')}
              quickbarData={null}
            />
          ) : (
            <LinkOverlayEditMode
              isSerloLinkSearchActive={false}
              setHref={(href) => source.href.set(href)}
              value=""
              removeLink={() => setSelectedInput(undefined)}
              shouldFocus={false}
              quickbarData={null}
            />
          )}
        </div>
      </div>
    )
  }
}
