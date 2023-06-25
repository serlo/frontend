import {
  faGripVertical,
  faTrashAlt,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { ArticleProps, buttonClass } from '.'
import { InlineInput } from '../../plugin/helpers/inline-input'
import { InlineSettings } from '../../plugin/helpers/inline-settings'
import { InlineSettingsInput } from '../../plugin/helpers/inline-settings-input'
import { SerloAddButton } from '../../plugin/helpers/serlo-editor-button'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface ArticleSourcesProps {
  sources: ArticleProps['state']['sources']
  editable: boolean
}

export function ArticleSources({ sources, editable }: ArticleSourcesProps) {
  const articleStrings = useEditorStrings().templatePlugins.article

  if (!editable) {
    if (sources.length === 0) return null

    return (
      <>
        <h2>{articleStrings.sources}</h2>
        <ul>
          {sources.map((source, index) => {
            return (
              <li key={index}>
                <a href={source.href.value}>{source.title.value}</a>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  return (
    <>
      <h2>{articleStrings.sources}</h2>
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) return
          sources.move(source.index, destination.index)
        }}
      >
        <Droppable droppableId="default">
          {(provided) => {
            return (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="!ml-1"
              >
                {renderDraggables()}
                {provided.placeholder}
              </ul>
            )
          }}
        </Droppable>
      </DragDropContext>
      {editable ? (
        <SerloAddButton
          text={articleStrings.addSource}
          onClick={() => {
            sources.insert(sources.length)
          }}
          className="mb-4"
        />
      ) : null}
    </>
  )

  function renderDraggables() {
    return sources.map((source, index) => {
      return (
        <Draggable key={index} draggableId={`${index}`} index={index}>
          {(provided) => {
            return (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                className="group flex"
              >
                <div className="flex-grow">
                  <span>
                    <span className="hidden group-focus-within:inline">
                      <InlineSettings position="below">
                        <InlineSettingsInput
                          value={source.href.value}
                          placeholder={articleStrings.sourceUrl}
                          onChange={(event) => {
                            source.href.set(event.target.value)
                          }}
                        />
                        <a
                          target="_blank"
                          href={source.href.value}
                          rel="noopener noreferrer"
                          className="inline-block p-1"
                        >
                          <span
                            className="ml-[10px]"
                            title={articleStrings.openInTab}
                          >
                            <FaIcon icon={faUpRightFromSquare} />
                          </span>
                        </a>
                      </InlineSettings>
                    </span>
                    <a>
                      <InlineInput
                        value={source.title.value}
                        onChange={(value) => {
                          source.title.set(value)
                        }}
                        placeholder={articleStrings.sourceText}
                      />
                    </a>
                  </span>
                </div>
                <div>
                  <button
                    title={articleStrings.removeLabel}
                    className={buttonClass}
                    onClick={() => sources.remove(index)}
                  >
                    <FaIcon icon={faTrashAlt} />
                  </button>
                  <button
                    title={articleStrings.dragLabel}
                    {...provided.dragHandleProps}
                    className={buttonClass}
                  >
                    <FaIcon icon={faGripVertical} />
                  </button>
                </div>
              </li>
            )
          }}
        </Draggable>
      )
    })
  }
}
