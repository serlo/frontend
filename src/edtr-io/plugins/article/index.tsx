import {
  child,
  EditorPlugin,
  EditorPluginProps,
  list,
  object,
  string,
} from '@edtr-io/plugin'
import { styled } from '@edtr-io/ui'
import * as React from 'react'

import { SemanticSection } from '../helpers/semantic-section'
import { ArticleExercises } from './article-exercises'
import { ArticleRelatedContent } from './article-related-content'
import { ArticleSources } from './article-sources'

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

export const OpenInNewTab = styled.span({ margin: '0 0 0 10px' })

export const BasePluginToolbarButton = styled.button({
  background: 'none',
  border: 'none',
})

export const MinWidthIcon = styled.div({
  width: '24px',
})

export const PluginToolbarButtonIcon = styled.div({
  height: '24px',
  width: '24px',
  opacity: 0.8,
  cursor: 'pointer',
  color: 'rgba(51, 51, 51, 0.95)',

  '&:hover': {
    color: '#469bff',
  },
})

export const spoilerTheme = {
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
    <>
      <SemanticSection editable={editable}>
        {introduction.render()}
      </SemanticSection>
      <SemanticSection editable={editable}>{content.render()}</SemanticSection>
      <SemanticSection editable={editable}>
        <ArticleExercises
          exercises={exercises}
          exerciseFolder={exerciseFolder}
          editable={editable}
          isFocused={isFocused}
          setFocusedInlineSetting={setFocusedInlineSetting}
        />
      </SemanticSection>
      <SemanticSection editable={editable}>
        <ArticleRelatedContent data={relatedContent} editable={editable} />
      </SemanticSection>
      <SemanticSection editable={editable}>
        <ArticleSources
          sources={sources}
          editable={editable}
          isFocused={isFocused}
          setFocusedInlineSetting={setFocusedInlineSetting}
        />
      </SemanticSection>
    </>
  )
}
