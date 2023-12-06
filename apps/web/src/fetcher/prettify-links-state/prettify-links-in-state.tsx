import request from 'graphql-request'
import { Descendant } from 'slate'

import { idsQuery } from './ids-query'
import { endpoint } from '@/api/endpoint'
import { hasSpecialUrlChars } from '@/helper/urls/check-special-url-chars'
import { getChildrenOfStaticDocument } from '@/serlo-editor/static-renderer/helper/get-children-of-static-document'
import { AnyEditorDocument } from '@/serlo-editor/types/editor-plugins'
import {
  isImageDocument,
  isSolutionDocument,
  isTextDocument,
} from '@/serlo-editor/types/plugin-type-guards'

export interface IdsQueryReturn {
  [key: string]: {
    alias: string
    instance: string
  }
}

export async function prettifyLinksInState(rootDocument?: AnyEditorDocument) {
  if (!rootDocument) return undefined
  const ids: number[] = []
  const callbacks: { id: number; callback: (alias: string) => void }[] = []

  walk(rootDocument)

  function walk(document?: AnyEditorDocument) {
    if (!document) return

    getChildrenOfStaticDocument(document).forEach(walk)

    if (isTextDocument(document)) document.state.forEach(walkSlateDescendant)

    if (isSolutionDocument(document)) {
      const prereq = document.state.prerequisite

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
    if (isImageDocument(document)) {
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
