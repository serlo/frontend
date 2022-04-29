// eslint-disable-next-line import/no-internal-modules
import { AddButton } from '@edtr-io/editor-ui/internal'
import { edtrDragHandle, EdtrIcon, faExternalLinkAlt, Icon } from '@edtr-io/ui'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons/faPlayCircle'
import * as R from 'ramda'
import { Fragment } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import {
  ArticleProps,
  BasePluginToolbarButton,
  OpenInNewTab,
  PluginToolbarButtonIcon,
} from '.'
import { InlineInput } from '../helpers/inline-input'
import { InlineSettings } from '../helpers/inline-settings'
import { InlineSettingsInput } from '../helpers/inline-settings-input'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

interface ArticleRelatedContentProps {
  data: ArticleProps['state']['relatedContent']
  editable: boolean
  isFocused: (arg1: string, arg2?: number) => boolean | null
  setFocusedInlineSetting: React.Dispatch<
    React.SetStateAction<{
      id: string
      index?: number | undefined
    } | null>
  >
}

export function ArticleRelatedContent({
  data,
  editable,
  isFocused,
  setFocusedInlineSetting,
}: ArticleRelatedContentProps) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  const header = (
    <>
      <h2>{editorStrings.article.stillWantMore}</h2>
      <p>{editorStrings.article.moreOnTopic}:</p>
    </>
  )

  const types: {
    section: 'articles' | 'courses' | 'videos'
    label: string
    addLabel: string
    idPlaceholder: string
    openLinkInNewTabPlaceholder: string
    dragLabel: string
    icon: React.ReactNode
  }[] = [
    {
      icon: <Icon icon={faNewspaper} fixedWidth />,
      section: 'articles',
      label: editorStrings.article.articles,
      addLabel: editorStrings.article.addArticle,
      idPlaceholder: editorStrings.article.idArticle,
      openLinkInNewTabPlaceholder: editorStrings.article.openArticleTab,
      dragLabel: editorStrings.article.dragTheArticle,
    },
    {
      icon: <Icon icon={faGraduationCap} fixedWidth />,
      section: 'courses',
      label: editorStrings.article.courses,
      addLabel: editorStrings.article.addCourse,
      idPlaceholder: editorStrings.article.idCourse,
      openLinkInNewTabPlaceholder: editorStrings.article.openArticleTab,
      dragLabel: editorStrings.article.dragTheCourse,
    },
    {
      icon: <Icon icon={faPlayCircle} fixedWidth />,
      section: 'videos',
      label: editorStrings.article.videos,
      addLabel: editorStrings.article.addVideo,
      idPlaceholder: editorStrings.article.idVideo,
      openLinkInNewTabPlaceholder: editorStrings.article.openVideoTab,
      dragLabel: editorStrings.article.dragTheVideo,
    },
  ]

  const allItems = R.flatten(R.values(data))
  if (!editable && allItems.length === 0) return null

  return (
    <>
      {header}
      {types.map((type) => {
        return (
          <Fragment key={type.section}>
            {renderRelatedContentSection(type)}
          </Fragment>
        )
      })}
    </>
  )

  function renderRelatedContentSection(type: {
    section: 'articles' | 'courses' | 'videos'
    label: string
    addLabel: string
    idPlaceholder: string
    openLinkInNewTabPlaceholder: string
    dragLabel: string
    icon: React.ReactNode
  }) {
    const header = (
      <>
        {type.icon} {type.label}
      </>
    )

    if (!editable) {
      if (data[type.section].length === 0) return null

      return (
        <>
          {header}
          {data[type.section].map((item, index) => {
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
        {header}
        <DragDropContext
          onDragEnd={(result) => {
            const { source, destination } = result
            if (!destination) return
            data[type.section].move(source.index, destination.index)
          }}
        >
          <Droppable droppableId="default">
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {data[type.section].map((item, index) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={`${type.section}-${index}`}
                        index={index}
                      >
                        {(provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                }}
                              >
                                <div
                                  style={{
                                    flexGrow: 1,
                                  }}
                                >
                                  {isFocused(type.section, index) ? (
                                    <InlineSettings
                                      onDelete={() => {
                                        data[type.section].remove(index)
                                      }}
                                      position="below"
                                    >
                                      <InlineSettingsInput
                                        value={
                                          item.id.value !== ''
                                            ? `/${item.id.value}`
                                            : ''
                                        }
                                        placeholder={type.idPlaceholder}
                                        onChange={(event) => {
                                          const newValue =
                                            event.target.value.replace(
                                              /[^0-9]/g,
                                              ''
                                            )
                                          item.id.set(newValue)
                                        }}
                                      />
                                      <a
                                        target="_blank"
                                        href={
                                          item.id.value !== ''
                                            ? `/${item.id.value}`
                                            : ''
                                        }
                                        rel="noopener noreferrer"
                                      >
                                        <OpenInNewTab
                                          title={
                                            type.openLinkInNewTabPlaceholder
                                          }
                                        >
                                          <Icon icon={faExternalLinkAlt} />
                                        </OpenInNewTab>
                                      </a>
                                    </InlineSettings>
                                  ) : null}
                                  <a>
                                    <InlineInput
                                      value={item.title.value}
                                      onFocus={() => {
                                        setFocusedInlineSetting({
                                          id: type.section,
                                          index,
                                        })
                                      }}
                                      onChange={(value) => {
                                        item.title.set(value)
                                      }}
                                      placeholder={
                                        editorStrings.article.linkTitle
                                      }
                                    />
                                  </a>
                                </div>
                                <div>
                                  <BasePluginToolbarButton
                                    // icon={<Icon icon={faTrashAlt} />}
                                    title={
                                      editorStrings.article.dragTheExercise
                                    }
                                    {...provided.dragHandleProps}
                                  >
                                    <PluginToolbarButtonIcon>
                                      <EdtrIcon icon={edtrDragHandle} />
                                    </PluginToolbarButtonIcon>
                                  </BasePluginToolbarButton>
                                </div>
                              </div>
                            </div>
                          )
                        }}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                  {editable ? (
                    <AddButton
                      onClick={() => {
                        data[type.section].insert(data[type.section].length)
                      }}
                    >
                      {type.addLabel}
                    </AddButton>
                  ) : null}
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
      </>
    )
  }
}
