import request from 'graphql-request'
import { Descendant } from 'slate'

import { idsQuery } from './ids-query'
import { endpoint } from '@/api/endpoint'
import { hasSpecialUrlChars } from '@/helper/urls/check-special-url-chars'
import { getChildrenOfSerializedDocument } from '@/serlo-editor/static-renderer/helper/get-children-of-serialized-document'
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

    getChildrenOfSerializedDocument(doc).forEach(walk)

    // TODO: this does not seem to run, investigate
    // @ts-expect-error allow solutions
    if (doc.plugin === EditorPluginType.Solution) {
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
