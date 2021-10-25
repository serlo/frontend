import { EditorPlugin, EditorPluginProps, string } from '@edtr-io/plugin'
import { ChangeEvent } from 'react'

import {
  Controls,
  editorContent,
  entity,
  HeaderInput,
  entityType,
} from './common'
import { RevisionHistoryLoader } from './helpers/revision-history-loader'
import { Settings } from './helpers/settings'
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
  const editorStrings = loggedInData.strings.editor

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
              label={editorStrings.article.seoTitle}
              state={meta_title}
            />
            <Settings.Textarea
              label={editorStrings.article.seoDesc}
              state={meta_description}
            />
          </Settings>
        )}
        <h1>
          {props.editable ? (
            <HeaderInput
              placeholder={editorStrings.article.title}
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
      <Controls subscriptions {...props.state} />
    </>
  )
}
