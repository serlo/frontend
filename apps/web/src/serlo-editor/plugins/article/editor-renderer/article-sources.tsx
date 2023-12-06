import {
  faTrashAlt,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'

import type { ArticleProps } from '..'
import { buttonClass } from '../const/button-class'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { InlineInput } from '@/serlo-editor/plugin/helpers/inline-input'
import { InlineSettings } from '@/serlo-editor/plugin/helpers/inline-settings'
import { InlineSettingsInput } from '@/serlo-editor/plugin/helpers/inline-settings-input'
import { SerloAddButton } from '@/serlo-editor/plugin/helpers/serlo-editor-button'

interface ArticleSourcesProps {
  sources: ArticleProps['state']['sources']
}

export function ArticleSources({ sources }: ArticleSourcesProps) {
  const articleStrings = useEditorStrings().templatePlugins.article

  return (
    <>
      <SerloAddButton
        text={articleStrings.addSource}
        onClick={() => sources.insert(sources.length)}
        className="mb-2 mt-0"
      />
      <ul className="serlo-ul mb-4 mt-2 text-lg">
        {sources.map(renderEditableSource)}
      </ul>
    </>
  )

  function renderEditableSource(
    source: ArticleSourcesProps['sources'][number],
    index: number
  ) {
    // key={index} results in items that can not be reordered. this is an existing bug
    // using href or title in the key breaks editing currently
    // so we probably need to add a unique id when initializing the sources?
    return (
      <li key={index} className="group flex">
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
          {/* temporarily removed due to bug */}
          {/* {index === 0 ? null : (
            <button
              onClick={() => sources.move(index, index - 1)}
              className={buttonClass}
            >
              <EditorTooltip text={articleStrings.moveUpLabel} />
              <FaIcon icon={faCircleArrowUp} />
            </button>
          )} */}
          <button onClick={() => sources.remove(index)} className={buttonClass}>
            <EditorTooltip text={articleStrings.removeLabel} />
            <FaIcon icon={faTrashAlt} />
          </button>
        </div>
      </li>
    )
  }
}
