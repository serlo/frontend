import { faGripVertical, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { flatten, values } from 'ramda'
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd'

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
  const articleStrings = useEditorStrings().article

  const allItems = flatten(values(data))
  if (!editable && allItems.length === 0) return null

  return (
    <>
      <h2>{articleStrings.stillWantMore}</h2>
      <p className="mb-4">{articleStrings.moreOnTopic}:</p>
      {categories.map((type) => {
        return (
          <div className="mb-2" key={type}>
            {renderRelatedContentSection(type)}
          </div>
        )
      })}
    </>
  )

  function renderRelatedContentSection(category: typeof categories[number]) {
    if (data[category].length === 0) return null

    if (!editable) {
      return (
        <>
          {renderHeader()}
          {data[category].map((item, index) => {
            return (
              <div key={index}>
                <a href={`/${item.id.value}`}>{item.title.value}</a>
              </div>
            )
          })}
        </>
      )
    }

    return (
      <>
        {renderHeader()}
        <DragDropContext
          onDragEnd={(result) => {
            const { source, destination } = result
            if (!destination) return
            data[category].move(source.index, destination.index)
          }}
        >
          <Droppable droppableId="default">
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {renderDraggables()}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
      </>
    )

    function renderHeader() {
      return (
        <div className="mb-1">
          <FaIcon icon={categoryIconMapping[category]} />{' '}
          {getTranslatedType(strings, category)}
        </div>
      )
    }

    function renderDraggables() {
      return data[category].map((item, index) => {
        return (
          <Draggable
            key={index}
            draggableId={`${category}-${index}`}
            index={index}
          >
            {(provided) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className="flex"
                >
                  <a
                    href={`/${item.id.value}`}
                    className="flex-grow"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title.value}
                  </a>
                  {renderButtons(index, category, provided.dragHandleProps)}
                </div>
              )
            }}
          </Draggable>
        )
      })
    }
  }

  function renderButtons(
    index: number,
    category: typeof categories[number],
    dragHandleProps?: DraggableProvidedDragHandleProps
  ) {
    return (
      <>
        <button
          className={`${buttonClass} serlo-tooltip-trigger`}
          onClick={() => data[category].remove(index)}
        >
          <EditorTooltip text={articleStrings.removeLabel} />
          <FaIcon icon={faTrashAlt} aria-hidden="true" />
        </button>
        <button
          {...dragHandleProps}
          className={`${buttonClass} serlo-tooltip-trigger`}
        >
          <EditorTooltip text={articleStrings.dragLabel} />
          <FaIcon icon={faGripVertical} aria-hidden="true" />
        </button>
      </>
    )
  }
}
