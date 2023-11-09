import { faCircleArrowUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import type { ArticleProps } from '..'
import { buttonClass } from '../const/button-class'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'

interface ArticleRelatedContentSectionProps {
  data: ArticleProps['state']['relatedContent'][
    | 'articles'
    | 'courses'
    | 'videos']
}

export function ArticleRelatedContentSection({
  data,
}: ArticleRelatedContentSectionProps) {
  const articleStrings = useEditorStrings().templatePlugins.article

  if (!data.length) return null

  return (
    <>
      {data.map((item, index) => {
        return (
          <li key={item.id.value} className="flex">
            <a
              href={`/${item.id.value}`}
              className="flex-grow"
              target="_blank"
              rel="noreferrer"
            >
              {item.title.value}
            </a>
            {renderButtons(index)}
          </li>
        )
      })}
    </>
  )

  function renderButtons(index: number) {
    return (
      <>
        {index === 0 ? null : (
          <button
            onClick={() => data.move(index, index - 1)}
            className={buttonClass}
          >
            <EditorTooltip text={articleStrings.dragLabel} />
            <FaIcon icon={faCircleArrowUp} aria-hidden="true" />
          </button>
        )}
        <button onClick={() => data.remove(index)} className={buttonClass}>
          <EditorTooltip text={articleStrings.removeLabel} />
          <FaIcon icon={faTrashAlt} aria-hidden="true" />
        </button>
      </>
    )
  }
}
