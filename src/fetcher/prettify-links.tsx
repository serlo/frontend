import { request } from 'graphql-request'

import { idsQuery } from './query-ids'
import { endpoint } from '@/api/endpoint'
import { RequestPageData } from '@/data-types'
import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'
import { hasSpecialUrlChars } from '@/helper/urls/check-special-url-chars'

export async function prettifyLinks(pageData: RequestPageData) {
  const ids: number[] = []
  const callbacks: { id: number; callback: (alias: string) => void }[] = []

  if (pageData.kind === 'single-entity' || pageData.kind === 'taxonomy') {
    if (pageData.secondaryMenuData) {
      pageData.secondaryMenuData.forEach((entry) => {
        if (entry.id && !entry.url) {
          ids.push(entry.id)
          callbacks.push({
            id: entry.id,
            callback: (alias) => {
              entry.url = alias
            },
          })
        }
      })
    }
  }

  if (pageData.kind === 'single-entity' && pageData.entityData.content) {
    walk(pageData.entityData.content)
  }

  if (pageData.kind === 'taxonomy') {
    walk(pageData.taxonomyData.exercisesContent)
  }

  function walk(nodes: FrontendContentNode[] | undefined) {
    if (!nodes) return
    nodes.forEach((node) => {
      if (
        node.type === FrontendNodeType.A ||
        node.type === FrontendNodeType.Image
      ) {
        const href = node.href
        if (href) {
          const id = getId(href)
          if (id) {
            // hit
            ids.push(id)
            callbacks.push({
              id,
              callback: (alias) => {
                node.href = alias
              },
            })
          }
        }
      }
      // recursion
      if (node.children) {
        walk(node.children)
      }
      if (node.type === FrontendNodeType.Exercise) {
        if (node.solution.content) {
          const prereq = node.solution.content.prerequisite
          if (prereq) {
            const id =
              typeof prereq.id === 'string' ? parseInt(prereq.id) : prereq.id
            prereq.href = `/${prereq.id ?? ''}` //fallback
            if (id && Number.isInteger(id) && id < Math.pow(2, 31)) {
              ids.push(id)
              callbacks.push({
                id,
                callback: (alias) => {
                  prereq.href = alias
                },
              })
            }
          }
          walk(node.solution.content.steps)
          walk(node.solution.content.strategy)
        }
        if (node.task.content) {
          walk(node.task.content.content)
        }
      }
      if (node.type === FrontendNodeType.Article) {
        walk(node.introduction)
        walk(node.content)
      }
    })
  }

  const prettyLinks =
    ids.length < 1
      ? undefined
      : await request<{
          [key: string]: {
            alias: string
            instance: string
          }
        }>(endpoint, idsQuery([...new Set(ids)]))

  callbacks.forEach((x) => {
    if (prettyLinks === undefined) return

    const prettyLink = prettyLinks[`uuid${x.id}`]?.alias

    const alias =
      !prettyLink || hasSpecialUrlChars(prettyLink) ? `/${x.id}` : prettyLink

    x.callback(alias)
  })
}

function getId(href: string): number | undefined {
  if (!/^(\/)?[\d]+$/.test(href)) return undefined
  const testString = href.replace('/', '')
  const testNumber = parseInt(testString)
  return testNumber < Math.pow(2, 31) ? testNumber : undefined
}
