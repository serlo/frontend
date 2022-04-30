import { PluginToolbarButton } from '@edtr-io/core'
// eslint-disable-next-line import/no-internal-modules
import { AddButton } from '@edtr-io/editor-ui/internal'
import {
  edtrDragHandle,
  EdtrIcon,
  faExternalLinkAlt,
  faTrashAlt,
  Icon,
} from '@edtr-io/ui'
import { Fragment } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import {
  ArticleProps,
  BasePluginToolbarButton,
  MinWidthIcon,
  OpenInNewTab,
  PluginToolbarButtonIcon,
} from '.'
import { InlineInput } from '../helpers/inline-input'
import { InlineSettings } from '../helpers/inline-settings'
import { InlineSettingsInput } from '../helpers/inline-settings-input'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

interface ArticleExercisesProps {
  exercises: ArticleProps['state']['exercises']
  exerciseFolder: ArticleProps['state']['exerciseFolder']
  editable: boolean
  isFocused: (arg1: string, arg2?: number) => boolean | null
  setFocusedInlineSetting: React.Dispatch<
    React.SetStateAction<{
      id: string
      index?: number | undefined
    } | null>
  >
}

export function ArticleExercises({
  exercises,
  exerciseFolder,
  editable,
  isFocused,
  setFocusedInlineSetting,
}: ArticleExercisesProps) {
  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()
  if (!loggedInData) return null
  const articleStrings = loggedInData.strings.editor.article

  const header = <h2>{strings.categories.exercises}</h2>
  const folderHeader = <p>{articleStrings.moreInFolder}:</p>

  if (!editable) {
    if (exercises.length === 0 || !exerciseFolder.id.value) return null

    return (
      <>
        {header}
        {exercises.map((exercise) => {
          return <Fragment key={exercise.id}>{exercise.render()}</Fragment>
        })}
        {exerciseFolder.id.value ? (
          <>
            {folderHeader}
            <div>
              <a href={`/${exerciseFolder.id.value}`}>
                {exerciseFolder.title.value}
              </a>
            </div>
          </>
        ) : null}
      </>
    )
  }

  return (
    <>
      {header}
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
                {exercises.map((exercise, index) => {
                  return (
                    <Draggable
                      key={exercise.id}
                      draggableId={exercise.id}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {exercise.render({
                              renderToolbar() {
                                return (
                                  <>
                                    <div>
                                      <BasePluginToolbarButton
                                        // icon={<Icon icon={faTrashAlt} />}
                                        title={articleStrings.dragLabel}
                                        {...provided.dragHandleProps}
                                      >
                                        <PluginToolbarButtonIcon>
                                          <EdtrIcon icon={edtrDragHandle} />
                                        </PluginToolbarButtonIcon>
                                      </BasePluginToolbarButton>
                                    </div>
                                    <PluginToolbarButton
                                      icon={
                                        <MinWidthIcon>
                                          <Icon icon={faTrashAlt} />
                                        </MinWidthIcon>
                                      }
                                      label={articleStrings.removeLabel}
                                      onClick={() => {
                                        exercises.remove(index)
                                      }}
                                    />
                                  </>
                                )
                              },
                            })}
                          </div>
                        )
                      }}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
      <AddButton
        onClick={() => {
          exercises.insert(exercises.length)
        }}
      >
        {articleStrings.addOptionalExercise}
      </AddButton>
      {folderHeader}
      {isFocused('exerciseFolder') ? (
        <InlineSettings
          onDelete={() => {
            exerciseFolder.title.set('')
            exerciseFolder.id.set('')
          }}
          position="below"
        >
          <InlineSettingsInput
            value={
              exerciseFolder.id.value !== ''
                ? `/${exerciseFolder.id.value}`
                : ''
            }
            placeholder={articleStrings.exFolderId}
            onChange={(event) => {
              const newValue = event.target.value.replace(/[^0-9]/g, '')
              exerciseFolder.id.set(newValue)
            }}
          />
          <a
            target="_blank"
            href={
              exerciseFolder.id.value !== ''
                ? `/${exerciseFolder.id.value}`
                : ''
            }
            rel="noopener noreferrer"
          >
            <OpenInNewTab title={articleStrings.openInTab}>
              <Icon icon={faExternalLinkAlt} />
            </OpenInNewTab>
          </a>
        </InlineSettings>
      ) : null}
      <a>
        <InlineInput
          value={exerciseFolder.title.value}
          onFocus={() => {
            setFocusedInlineSetting({
              id: 'exerciseFolder',
            })
          }}
          onChange={(value) => {
            exerciseFolder.title.set(value)
          }}
          placeholder={articleStrings.linkTitle}
        />
      </a>
    </>
  )
}
