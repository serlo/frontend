import request from 'graphql-request'
import { Descendant } from 'slate'

import { idsQuery } from './ids-query'
import { endpoint } from '@/api/endpoint'
import { hasSpecialUrlChars } from '@/helper/urls/check-special-url-chars'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorSolutionPlugin,
  SupportedEditorPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'

interface IdsQueryReturn {
  [key: string]: {
    alias: string
    instance: string
  }
}

export async function prettifyLinksInState(rootDoc?: SupportedEditorPlugin) {
  if (!rootDoc) return undefined
  const ids: number[] = []
  const callbacks: { id: number; callback: (alias: string) => void }[] = []

  walk(rootDoc)

  function walk(doc?: SupportedEditorPlugin) {
    if (!doc) return

    if (typeof doc.state === 'object' && Object.hasOwn(doc.state, 'content')) {
      walk(doc.state.content as SupportedEditorPlugin)
    }
    if (doc.plugin === EditorPluginType.Article) {
      walk(doc.state.introduction as SupportedEditorPlugin)
    }
    if (
      doc.plugin === EditorPluginType.Multimedia ||
      doc.plugin === EditorPluginType.ArticleIntroduction
    ) {
      walk(doc.state.explanation as SupportedEditorPlugin)
      walk(doc.state.multimedia as SupportedEditorPlugin)
    }
    if (doc.plugin === EditorPluginType.PageLayout) {
      walk(doc.state.column1 as SupportedEditorPlugin)
      walk(doc.state.column2 as SupportedEditorPlugin)
    }
    if (doc.plugin === EditorPluginType.Rows) {
      doc.state.forEach((row) => walk(row as SupportedEditorPlugin))
    }
    if (doc.plugin === EditorPluginType.Exercise) {
      walk(doc.state.interactive as unknown as SupportedEditorPlugin)
    }
    // TODO: this does not seem to run, investigate
    // @ts-expect-error allow solutions
    if (doc.plugin === EditorPluginType.Solution) {
      walk((doc as EditorSolutionPlugin).state.steps as SupportedEditorPlugin)
      walk(
        (doc as EditorSolutionPlugin).state.strategy as SupportedEditorPlugin
      )
      const prereq = (doc as EditorSolutionPlugin).state.prerequisite

      if (prereq && prereq.id) {
        const id = getId(prereq.id)
        // fallback
        prereq.alias = `/${id ?? ''}`
        if (id) {
          ids.push(id)
          callbacks.push({
            id,
            callback: (alias) => {
              prereq.alias = alias
            },
          })
        }
      }
    }
    if (doc.plugin === EditorPluginType.Text) {
      doc.state.forEach(walkSlateDescendant)
    }
    if (doc.plugin === EditorPluginType.Image) {
      const href = doc.state.link?.href
      const id = getId(href)
      if (id) {
        ids.push(id)
        callbacks.push({
          id,
          callback: (alias) => {
            doc.state.link!.href = alias
          },
        })
      }
    }

    // ignoring for now
    // Equations
    // SerloTable
    // ScMcExercise
    // InputExercise
  }

  function walkSlateDescendant(node: Descendant) {
    if (Object.hasOwn(node, 'type')) {
      if (node.type === 'a') {
        const id = getId(node.href)
        if (id) {
          ids.push(id)
          callbacks.push({
            id,
            callback: (alias) => {
              node.href = alias
            },
          })
        }
      }
      if (Object.hasOwn(node, 'children')) {
        node.children.map(walkSlateDescendant)
      }
    }
  }

  if (!ids.length) return rootDoc

  const uniqueIds = [...new Set(ids)]

  const prettyLinks = await request<IdsQueryReturn>(
    endpoint,
    idsQuery(uniqueIds)
  )

  if (!prettyLinks) return rootDoc

  callbacks.forEach(({ id, callback }) => {
    const prettyAlias = prettyLinks[`uuid${id}`]?.alias

    if (prettyAlias && !hasSpecialUrlChars(prettyAlias)) callback(prettyAlias)
  })

  return rootDoc
}

function getId(href?: string): number | undefined {
  if (!href) return undefined
  if (!/^(\/)?[\d]+$/.test(href)) return undefined
  const testString = href.replace('/', '')
  const testNumber = parseInt(testString)
  return testNumber < Math.pow(2, 31) ? testNumber : undefined
}
