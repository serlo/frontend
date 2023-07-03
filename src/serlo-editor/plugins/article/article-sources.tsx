import {
  faTrashAlt,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'

import { ArticleProps } from '.'
import { InlineInput } from '../../plugin/helpers/inline-input'
import { InlineSettings } from '../../plugin/helpers/inline-settings'
import { InlineSettingsInput } from '../../plugin/helpers/inline-settings-input'
import { SerloAddButton } from '../../plugin/helpers/serlo-editor-button'
import { buttonClass } from './editor'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'

interface ArticleSourcesProps {
  sources: ArticleProps['state']['sources']
  editable: boolean
}

export function ArticleSources({ sources, editable }: ArticleSourcesProps) {
  const articleStrings = useEditorStrings().templatePlugins.article

  if (!editable && sources.length === 0) return null

  return (
    <>
      <h2>{articleStrings.sources}</h2>
      <ul>{sources.map(editable ? renderEditableSource : renderSource)}</ul>
      {editable ? (
        <SerloAddButton
          text={articleStrings.addSource}
          onClick={() => sources.insert(sources.length)}
          className="mb-4"
        />
      ) : null}
    </>
  )

  function renderSource(
    { href, title }: ArticleSourcesProps['sources'][number],
    index: number
  ) {
    return (
      <li key={index}>
        <a href={href.value}>{title.value}</a>
      </li>
    )
  }

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
