import { faCircleArrowUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { ArticleProps, buttonClass } from '.'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { getTranslatedType } from '@/helper/get-translated-type'
import { categoryIconMapping } from '@/helper/icon-by-entity-type'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'

interface ArticleRelatedContentProps {
  data: ArticleProps['state']['relatedContent']
  editable: boolean
}

const categories = ['articles', 'courses', 'videos'] as const

export function ArticleRelatedContent({
  data,
  editable,
}: ArticleRelatedContentProps) {
  const { strings } = useInstanceData()
  const articleStrings = useEditorStrings().templatePlugins.article

  const allItemsEmpty =
    data.articles.length + data.courses.length + data.videos.length === 0
  if (!editable && allItemsEmpty) return null

  return (
    <>
      <h2>{articleStrings.stillWantMore}</h2>
      <p className="mb-4">{articleStrings.moreOnTopic}:</p>
      {categories.map((type) => (
        <div className="mb-2" key={type}>
          {renderRelatedContentSection(type)}
        </div>
      ))}
    </>
  )

  function renderRelatedContentSection(category: typeof categories[number]) {
    if (data[category].length === 0) return null

    return (
      <>
        <div className="mb-1">
          <FaIcon icon={categoryIconMapping[category]} />{' '}
          {getTranslatedType(strings, category)}
        </div>
        {data[category].map((item, index) => {
          return editable ? (
            <div key={item.id.value} className="flex">
              <a
                href={`/${item.id.value}`}
                className="flex-grow"
                target="_blank"
                rel="noreferrer"
              >
                {item.title.value}
              </a>
              {renderButtons(index, category)}
            </div>
          ) : (
            <div key={item.id.value}>
              <a href={`/${item.id.value}`}>{item.title.value}</a>
            </div>
          )
        })}
      </>
    )
  }

  function renderButtons(index: number, category: typeof categories[number]) {
    return (
      <>
        {index === 0 ? null : (
          <button
            onClick={() => data[category].move(index, index - 1)}
            className={buttonClass}
          >
            <EditorTooltip text={articleStrings.dragLabel} />
            <FaIcon icon={faCircleArrowUp} aria-hidden="true" />
          </button>
        )}
        <button
          onClick={() => data[category].remove(index)}
          className={buttonClass}
        >
          <EditorTooltip text={articleStrings.removeLabel} />
          <FaIcon icon={faTrashAlt} aria-hidden="true" />
        </button>
      </>
    )
  }
}
