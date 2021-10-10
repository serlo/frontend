/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { AddButton } from '@edtr-io/editor-ui/internal'
import {
  child,
  EditorPlugin,
  EditorPluginProps,
  list,
  object,
  string,
} from '@edtr-io/plugin'
import * as R from 'ramda'
import * as React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { SemanticSection } from './helpers/semantic-section'
import { PluginToolbarButton } from '@edtr-io/core'
import {
  edtrDragHandle,
  EdtrIcon,
  faExternalLinkAlt,
  faTrashAlt,
  Icon,
  styled,
} from '@edtr-io/ui'
import { InlineSettings } from './helpers/inline-settings'
import { InlineSettingsInput } from './helpers/inline-settings-input'
import { InlineInput } from './helpers/inline-input'
import { ExpandableBox } from '@edtr-io/renderer-ui'
import { ThemeProvider } from 'styled-components'
import { useI18n } from '@serlo/i18n'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons/faPlayCircle'

const relatedContentItemState = object({ id: string(), title: string() })

const articleState = object({
  introduction: child({ plugin: 'articleIntroduction' }),
  content: child({ plugin: 'rows' }),
  exercises: list(child({ plugin: 'injection' })),
  exerciseFolder: relatedContentItemState,
  relatedContent: object({
    articles: list(relatedContentItemState),
    courses: list(relatedContentItemState),
    videos: list(relatedContentItemState),
  }),
  sources: list(
    object({
      href: string(),
      title: string(),
    })
  ),
})

export type ArticlePluginState = typeof articleState
export type ArticleProps = EditorPluginProps<ArticlePluginState>

export const articlePlugin: EditorPlugin<ArticlePluginState> = {
  Component: ArticleEditor,
  state: articleState,
  config: {},
}

const OpenInNewTab = styled.span({ margin: '0 0 0 10px' })

const BasePluginToolbarButton = styled.button({
  background: 'none',
  border: 'none',
})

const MinWidthIcon = styled.div({
  width: '24px',
})

const PluginToolbarButtonIcon = styled.div({
  height: '24px',
  width: '24px',
  opacity: 0.8,
  cursor: 'pointer',
  color: 'rgba(51, 51, 51, 0.95)',

  '&:hover': {
    color: '#469bff',
  },
})

const spoilerTheme = {
  rendererUi: {
    expandableBox: {
      toggleBackgroundColor: '#f5f5f5',
      toggleColor: '#333',
      containerBorderColor: '#f5f5f5',
    },
  },
}

function ArticleEditor(props: ArticleProps) {
  const { editable, state } = props
  const {
    introduction,
    content,
    exercises,
    exerciseFolder,
    relatedContent,
    sources,
  } = state

  const i18n = useI18n()
  const [focusedInlineSetting, setFocusedInlineSetting] = React.useState<{
    id: string
    index?: number
  } | null>(null)

  function isFocused(id: string, index?: number) {
    return (
      focusedInlineSetting &&
      focusedInlineSetting.id === id &&
      (focusedInlineSetting.index === undefined ||
        focusedInlineSetting.index === index)
    )
  }

  return (
    <React.Fragment>
      <SemanticSection editable={editable}>
        {introduction.render()}
      </SemanticSection>
      <SemanticSection editable={editable}>{content.render()}</SemanticSection>
      <SemanticSection editable={editable}>{renderExercises()}</SemanticSection>
      <SemanticSection editable={editable}>
        {renderRelatedContent()}
      </SemanticSection>
      <SemanticSection editable={editable}>{renderSources()}</SemanticSection>
    </React.Fragment>
  )

  function renderExercises() {
    const header = <h2>{i18n.t('article::Exercises')}</h2>
    const folderHeader = (
      <p>
        {i18n.t('article::You can find more exercises in the following folder')}
        :
      </p>
    )

    if (!editable) {
      if (exercises.length === 0 || !exerciseFolder.id.value) return null

      return (
        <>
          {header}
          {exercises.map((exercise) => {
            return (
              <React.Fragment key={exercise.id}>
                {exercise.render()}
              </React.Fragment>
            )
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
            {(provided: any) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {exercises.map((exercise, index) => {
                    return (
                      <Draggable
                        key={exercise.id}
                        draggableId={exercise.id}
                        index={index}
                      >
                        {(provided: any) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              {exercise.render({
                                renderToolbar() {
                                  return (
                                    <React.Fragment>
                                      <div>
                                        <BasePluginToolbarButton
                                          icon={<Icon icon={faTrashAlt} />}
                                          title={i18n.t(
                                            'article::Drag the exercise'
                                          )}
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
                                        label={i18n.t(
                                          'article::Remove exercise'
                                        )}
                                        onClick={() => {
                                          exercises.remove(index)
                                        }}
                                      />
                                    </React.Fragment>
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
          {i18n.t('article::Add optional exercise')}
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
              placeholder={i18n.t(
                'article::ID of an exercise folder, e.g. 30560'
              )}
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
              <OpenInNewTab
                title={i18n.t(
                  'article::Open the exercise folder in a new tab:'
                )}
              >
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
            placeholder={i18n.t('article::Title of the link')}
          />
        </a>
      </>
    )
  }

  function renderRelatedContent() {
    const header = (
      <React.Fragment>
        <h2>{i18n.t('article::Still want more?')}</h2>
        <p>
          {i18n.t('article::You can find more content on this topic here')}:
        </p>
      </React.Fragment>
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
        label: i18n.t('article::Articles'),
        addLabel: i18n.t('article::Add article'),
        idPlaceholder: i18n.t('article::ID of an article, e.g. 1855'),
        openLinkInNewTabPlaceholder: i18n.t(
          'article::Open the article in a new tab:'
        ),
        dragLabel: i18n.t('article::Drag the article'),
      },
      {
        icon: <Icon icon={faGraduationCap} fixedWidth />,
        section: 'courses',
        label: i18n.t('article::Courses'),
        addLabel: i18n.t('article::Add course'),
        idPlaceholder: i18n.t('article::ID of a course, e.g. 51979'),
        openLinkInNewTabPlaceholder: i18n.t(
          'article::Open the course in a new tab:'
        ),
        dragLabel: i18n.t('article::Drag the course'),
      },
      {
        icon: <Icon icon={faPlayCircle} fixedWidth />,
        section: 'videos',
        label: i18n.t('article::Videos'),
        addLabel: i18n.t('article::Add video'),
        idPlaceholder: i18n.t('article::ID of a video, e.g. 40744'),
        openLinkInNewTabPlaceholder: i18n.t(
          'article::Open the video in a new tab:'
        ),
        dragLabel: i18n.t('article::Drag the video'),
      },
    ]

    const allItems = R.flatten(R.values(relatedContent))
    if (!editable && allItems.length === 0) return null

    return (
      <React.Fragment>
        {header}
        {types.map((type) => {
          return (
            <React.Fragment key={type.section}>
              {renderRelatedContentSection(type)}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }

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
      if (relatedContent[type.section].length === 0) return null

      return (
        <>
          {header}
          {relatedContent[type.section].map((item, index) => {
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
            relatedContent[type.section].move(source.index, destination.index)
          }}
        >
          <Droppable droppableId="default">
            {(provided: any) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {relatedContent[type.section].map((item, index) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={`${type.section}-${index}`}
                        index={index}
                      >
                        {(provided: any) => {
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
                                        relatedContent[type.section].remove(
                                          index
                                        )
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
                                          const newValue = event.target.value.replace(
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
                                      placeholder={i18n.t(
                                        'article::Title of the link'
                                      )}
                                    />
                                  </a>
                                </div>
                                <div>
                                  <BasePluginToolbarButton
                                    icon={<Icon icon={faTrashAlt} />}
                                    title={i18n.t('article::Drag the exercise')}
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
                        relatedContent[type.section].insert(
                          relatedContent[type.section].length
                        )
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

  function renderSources() {
    if (!editable) {
      if (sources.length === 0) return null

      return (
        <ThemeProvider theme={spoilerTheme}>
          <ExpandableBox
            renderTitle={() => i18n.t('article::Sources')}
            editable={editable}
            alwaysVisible
          >
            <ul>
              {sources.map((source, index) => {
                return (
                  <li key={index}>
                    <a href={source.href.value}>{source.title.value}</a>
                  </li>
                )
              })}
            </ul>
          </ExpandableBox>
        </ThemeProvider>
      )
    }

    return (
      <ThemeProvider theme={spoilerTheme}>
        <ExpandableBox
          renderTitle={() => i18n.t('article::Sources')}
          editable={editable}
          alwaysVisible
        >
          <DragDropContext
            onDragEnd={(result) => {
              const { source, destination } = result
              if (!destination) return
              sources.move(source.index, destination.index)
            }}
          >
            <Droppable droppableId="default">
              {(provided: any) => {
                return (
                  <ul ref={provided.innerRef} {...provided.droppableProps}>
                    {sources.map((source, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={`${index}`}
                          index={index}
                        >
                          {(provided: any) => {
                            return (
                              <li
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
                                    <span>
                                      {isFocused('source', index) ? (
                                        <InlineSettings
                                          onDelete={() => {
                                            sources.remove(index)
                                          }}
                                          position="below"
                                        >
                                          <InlineSettingsInput
                                            value={source.href.value}
                                            placeholder={i18n.t(
                                              'article::URL of the link'
                                            )}
                                            onChange={(event) => {
                                              source.href.set(
                                                event.target.value
                                              )
                                            }}
                                          />
                                          <a
                                            target="_blank"
                                            href={source.href.value}
                                            rel="noopener noreferrer"
                                          >
                                            <OpenInNewTab
                                              title={i18n.t(
                                                'article::Open the link in a new tab:'
                                              )}
                                            >
                                              <Icon icon={faExternalLinkAlt} />
                                            </OpenInNewTab>
                                          </a>
                                        </InlineSettings>
                                      ) : null}
                                      <a>
                                        <InlineInput
                                          value={source.title.value}
                                          onFocus={() => {
                                            setFocusedInlineSetting({
                                              id: 'source',
                                              index,
                                            })
                                          }}
                                          onChange={(value) => {
                                            source.title.set(value)
                                          }}
                                          placeholder={i18n.t(
                                            'article::Title of the link'
                                          )}
                                        />
                                      </a>
                                    </span>
                                  </div>
                                  <div>
                                    <BasePluginToolbarButton
                                      icon={<Icon icon={faTrashAlt} />}
                                      title={i18n.t('article::Drag the source')}
                                      {...provided.dragHandleProps}
                                    >
                                      <PluginToolbarButtonIcon>
                                        <EdtrIcon icon={edtrDragHandle} />
                                      </PluginToolbarButtonIcon>
                                    </BasePluginToolbarButton>
                                  </div>
                                </div>
                              </li>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </ul>
                )
              }}
            </Droppable>
          </DragDropContext>
          {editable ? (
            <AddButton
              onClick={() => {
                sources.insert(sources.length)
              }}
            >
              {i18n.t('article::Add source')}
            </AddButton>
          ) : null}
        </ExpandableBox>
      </ThemeProvider>
    )
  }
}
