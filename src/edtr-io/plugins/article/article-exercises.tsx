import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { Fragment } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { faTrashAlt, Icon } from 'test-edtr-io/ui'

import { ArticleProps } from '.'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

interface ArticleExercisesProps {
  exercises: ArticleProps['state']['exercises']
  exerciseFolder: ArticleProps['state']['exerciseFolder']
  editable: boolean
}

export function ArticleExercises({
  exercises,
  exerciseFolder,
  editable,
}: ArticleExercisesProps) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const articleStrings = loggedInData.strings.editor.article

  const folderHeader = <p>{articleStrings.moreInFolder}:</p>

  if (!editable) {
    if (exercises.length === 0 || !exerciseFolder.id.value) return null

    return (
      <>
        {exercises.map((exercise) => {
          return <Fragment key={exercise.id}>{exercise.render()}</Fragment>
        })}
        {exerciseFolder.id.value ? (
          <>
            {folderHeader}
            <a href={`/${exerciseFolder.id.value}`}>
              {exerciseFolder.title.value}
            </a>
          </>
        ) : null}
      </>
    )
  }

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result
          if (!destination) return
          exercises.move(source.index, destination.index)
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
      <div className="mt-4 mb-1">
        {exerciseFolder.title.value ? (
          <>
            {folderHeader}
            <a href={`/${exerciseFolder.id.value}`}>
              {exerciseFolder.title.value ? exerciseFolder.title.value : '…'}
            </a>
          </>
        ) : null}
      </div>
    </>
  )

  function renderDraggables() {
    const buttonClass =
      'serlo-button bg-amber-100 hover:bg-amber-300 mb-2 mr-2 w-8'

    return exercises.map((exercise, index) => {
      return (
        <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.draggableProps}>
                {exercise.render({
                  renderToolbar() {
                    return (
                      <>
                        <button
                          title={articleStrings.dragLabel}
                          {...provided.dragHandleProps}
                          className={buttonClass}
                        >
                          <Icon icon={faGripVertical} />
                        </button>
                        <button
                          title={articleStrings.removeLabel}
                          className={buttonClass}
                          onClick={() => {
                            exercises.remove(index)
                          }}
                        >
                          <Icon icon={faTrashAlt} />
                        </button>
                      </>
                    )
                  },
                })}
              </div>
            )
          }}
        </Draggable>
      )
    })
  }
}
