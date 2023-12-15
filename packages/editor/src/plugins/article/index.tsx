import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  list,
  object,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { ArticleEditor } from './editor'

const relatedContentItemState = object({ id: string(), title: string() })

const articleState = object({
  introduction: child({ plugin: EditorPluginType.ArticleIntroduction }),
  content: child({ plugin: EditorPluginType.Rows }),
  exercises: list(child({ plugin: EditorPluginType.Injection })),
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
