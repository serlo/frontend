import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { InlineInput } from '@editor/plugin/helpers/inline-input'
import { InlineSettings } from '@editor/plugin/helpers/inline-settings'
import { InlineSettingsInput } from '@editor/plugin/helpers/inline-settings-input'
import { SerloAddButton } from '@editor/plugin/helpers/serlo-editor-button'
import {
  faCircleArrowUp,
  faTrashAlt,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { ArticleProps } from '..'
import { buttonClass } from '../const/button-class'

interface ArticleSourcesProps {
  sources: ArticleProps['state']['sources']
}

export function ArticleSources({ sources }: ArticleSourcesProps) {
  const articleStrings = useEditorStrings().templatePlugins.article

  // generating new unique ids when sources are added or removed
  // or the order changes. Not the nicest solution, but fixes the bugs for now
  // the whole sources-feature will hopefully be improved (data stucture, UX and code) at some point
  const [sortUpdated, setSortUpdated] = useState(0)
  const sourcesWrappedWithId = useMemo(() => {
    return sources.map((source) => ({ id: uuidv4(), source }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources.length, sortUpdated])

  return (
    <>
      <SerloAddButton
        text={articleStrings.addSource}
        onClick={() => sources.insert(sources.length)}
        className="mb-2 mt-0"
      />
      <ul className="serlo-ul mb-4 mt-2 text-lg">
        {sourcesWrappedWithId.map(renderEditableSource)}
      </ul>
    </>
  )

  function renderEditableSource(
    {
      id,
      source,
    }: { source: ArticleSourcesProps['sources'][number]; id: string },
    index: number
  ) {
    return (
      <li key={id} className="group flex">
        <div className="flex-grow">
          <span>
            <span className="hidden group-focus-within:inline">
              <InlineSettings position="below">
                <InlineSettingsInput
                  value={source.href.value}
                  placeholder={articleStrings.sourceUrl}
                  onChange={({ target }) => {
                    source.href.set(target.value)
                  }}
                />
                <a
                  target="_blank"
                  href={source.href.value}
                  rel="noopener noreferrer"
                  className="inline-block p-1"
                >
                  <span className="ml-[10px]" title={articleStrings.openInTab}>
                    <FaIcon icon={faUpRightFromSquare} />
                  </span>
                </a>
              </InlineSettings>
            </span>
            <a>
              <InlineInput
                value={source.title.value}
                onChange={(value) => source.title.set(value)}
                placeholder={articleStrings.sourceText}
              />
            </a>
          </span>
        </div>
        <div>
          {index === 0 ? null : (
            <button
              onClick={() => {
                sources.move(index, index - 1)
                setSortUpdated(sortUpdated + 1)
              }}
              className={buttonClass + ' relative'}
            >
              <EditorTooltip text={articleStrings.moveUpLabel} />
              <FaIcon icon={faCircleArrowUp} />
            </button>
          )}
          <button onClick={() => sources.remove(index)} className={buttonClass}>
            <EditorTooltip text={articleStrings.removeLabel} />
            <FaIcon icon={faTrashAlt} />
            {index}
          </button>
        </div>
      </li>
    )
  }
}
