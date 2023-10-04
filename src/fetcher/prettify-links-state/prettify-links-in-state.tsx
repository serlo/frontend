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

export async function prettifyLinksInState(
  rootDocument?: SupportedEditorPlugin
) {
  if (!rootDocument) return undefined
  const ids: number[] = []
  const callbacks: { id: number; callback: (alias: string) => void }[] = []

  walk(rootDocument)

  function walk(document?: SupportedEditorPlugin) {
    if (!document) return

    getChildrenOfSerializedDocument(document).forEach(walk)

    // TODO: this does not seem to run, investigate
    // @ts-expect-error allow solutions
    if (document.plugin === EditorPluginType.Solution) {
      const prereq = (document as EditorSolutionPlugin).state.prerequisite

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
    if (document.plugin === EditorPluginType.Text) {
      document.state.forEach(walkSlateDescendant)
    }
    if (document.plugin === EditorPluginType.Image) {
      const href = document.state.link?.href
      const id = getId(href)
      if (id) {
        ids.push(id)
        callbacks.push({
          id,
          callback: (alias) => {
            document.state.link!.href = alias
          },
        })
      }
    }
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

  if (!ids.length) return rootDocument

  const uniqueIds = [...new Set(ids)]

  const prettyLinks = await request<IdsQueryReturn>(
    endpoint,
    idsQuery(uniqueIds)
  )

  if (!prettyLinks) return rootDocument

  callbacks.forEach(({ id, callback }) => {
    const prettyAlias = prettyLinks[`uuid${id}`]?.alias

    if (prettyAlias && !hasSpecialUrlChars(prettyAlias)) callback(prettyAlias)
  })

  return rootDocument
}

function getId(href?: string): number | undefined {
  if (!href) return undefined
  if (!/^(\/)?[\d]+$/.test(href)) return undefined
  const testString = href.replace('/', '')
  const testNumber = parseInt(testString)
  return testNumber < Math.pow(2, 31) ? testNumber : undefined
}
