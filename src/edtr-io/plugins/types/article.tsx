import { ChangeEvent } from 'react'
import { EditorPlugin, EditorPluginProps, string } from 'test-edtr-io/plugin'

import { editorContent, entity, HeaderInput, entityType } from './common/common'
import { RevisionHistoryLoader } from './helpers/revision-history-loader'
import { Settings } from './helpers/settings'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const articleTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent('article'),
    meta_title: string(),
    meta_description: string(),
  },
  {}
)

export const articleTypePlugin: EditorPlugin<typeof articleTypeState> = {
  Component: ArticleTypeEditor,
  state: articleTypeState,
  config: {},
}

function ArticleTypeEditor(props: EditorPluginProps<typeof articleTypeState>) {
  const { title, content, meta_title, meta_description } = props.state

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const articleStrings = loggedInData.strings.editor.article

  return (
    <>
      <div className="page-header">
        {props.renderIntoToolbar(
          <RevisionHistoryLoader
            id={props.state.id.value}
            currentRevision={props.state.revision.value}
            onSwitchRevision={props.state.replaceOwnState}
          />
        )}
        {props.renderIntoSettings(
          <Settings>
            <Settings.Textarea
              label={articleStrings.seoTitle}
              state={meta_title}
            />
            <Settings.Textarea
              label={articleStrings.seoDesc}
              state={meta_description}
            />
          </Settings>
        )}
        <h1>
          {props.editable ? (
            <HeaderInput
              placeholder={articleStrings.title}
              value={title.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                title.set(e.target.value)
              }}
            />
          ) : (
            <span itemProp="name">{title.value}</span>
          )}
        </h1>
      </div>
      <div itemProp="articleBody">{content.render()}</div>
      <ToolbarMain showSubscriptionOptions {...props.state} />
    </>
  )
}
