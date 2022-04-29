// eslint-disable-next-line import/no-internal-modules
import { AddButton } from '@edtr-io/editor-ui/internal'
import { ExpandableBox } from '@edtr-io/renderer-ui'
import {
  edtrDragHandle,
  EdtrIcon,
  faExternalLinkAlt,
  Icon,
  ThemeProvider,
} from '@edtr-io/ui'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import {
  ArticleProps,
  BasePluginToolbarButton,
  OpenInNewTab,
  PluginToolbarButtonIcon,
  spoilerTheme,
} from '.'
import { InlineInput } from '../helpers/inline-input'
import { InlineSettings } from '../helpers/inline-settings'
import { InlineSettingsInput } from '../helpers/inline-settings-input'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

interface ArticleSourcesProps {
  sources: ArticleProps['state']['sources']
  editable: boolean
  isFocused: (arg1: string, arg2?: number) => boolean | null
  setFocusedInlineSetting: React.Dispatch<
    React.SetStateAction<{
      id: string
      index?: number | undefined
    } | null>
  >
}

export function ArticleSources({
  sources,
  editable,
  isFocused,
  setFocusedInlineSetting,
}: ArticleSourcesProps) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  if (!editable) {
    if (sources.length === 0) return null

    return (
      <ThemeProvider theme={spoilerTheme}>
        <ExpandableBox
          renderTitle={() => editorStrings.article.sources}
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
        renderTitle={() => editorStrings.article.sources}
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
            {(provided) => {
              return (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {sources.map((source, index) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={`${index}`}
                        index={index}
                      >
                        {(provided) => {
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
                                          placeholder={
                                            editorStrings.article.linkUrl
                                          }
                                          onChange={(event) => {
                                            source.href.set(event.target.value)
                                          }}
                                        />
                                        <a
                                          target="_blank"
                                          href={source.href.value}
                                          rel="noopener noreferrer"
                                        >
                                          <OpenInNewTab
                                            title={
                                              editorStrings.article.openInNewTab
                                            }
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
                                        placeholder={
                                          editorStrings.article.linkTitle
                                        }
                                      />
                                    </a>
                                  </span>
                                </div>
                                <div>
                                  <BasePluginToolbarButton
                                    // icon={<Icon icon={faTrashAlt} />}
                                    title={editorStrings.article.dragTheSource}
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
            {editorStrings.article.addSource}
          </AddButton>
        ) : null}
      </ExpandableBox>
    </ThemeProvider>
  )
}
