import { request } from 'graphql-request'

import { idsQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { PageData, FrontendContentNode } from '@/data-types'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'

export async function prettifyLinks(pageData: PageData) {
  const ids: number[] = []
  const callbacks: { id: number; callback: (alias: string) => void }[] = []

  if (pageData.kind === 'single-entity' || pageData.kind === 'taxonomy') {
    if (pageData.secondaryNavigationData) {
      pageData.secondaryNavigationData.forEach((entry) => {
        if (entry.url) {
          if (isId(entry.url)) {
            const id = getId(entry.url)
            ids.push(id)
            callbacks.push({
              id,
              callback: (alias) => {
                entry.url = alias
              },
            })
          }
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
      if (node.type === 'a' || node.type === 'img') {
        const href = node.href
        if (href) {
          if (isId(href)) {
            // hit
            const id = getId(href)
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
      if (node.type === 'exercise') {
        if (node.solution.legacy) {
          walk(node.solution.legacy)
        }
        if (node.task.legacy) {
          walk(node.task.legacy)
        }
        if (node.solution.edtrState) {
          const prereq = node.solution.edtrState.prerequisite
          if (prereq) {
            const id =
              typeof prereq.id === 'string' ? parseInt(prereq.id) : prereq.id
            prereq.href = `/${prereq.id}` //fallback
            if (id && Number.isInteger(id)) {
              ids.push(id)
              callbacks.push({
                id,
                callback: (alias) => {
                  prereq.href = alias
                },
              })
            }
          }
          walk(node.solution.edtrState.steps)
          walk(node.solution.edtrState.strategy)
        }
        if (node.task.edtrState) {
          walk(node.task.edtrState.content)
        }
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

  //console.log('prettylinks', prettyLinks)

  callbacks.forEach((x) => {
    if (prettyLinks === undefined) return

    const prettyLink = prettyLinks[`uuid${x.id}`]?.alias

    const alias =
      !prettyLink || hasSpecialUrlChars(prettyLink) ? `/${x.id}` : prettyLink

    x.callback(alias)
  })
}

function isId(href: string): boolean {
  return /^\/[\d]{1,7}$/.test(href)
}

function getId(href: string): number {
  return parseInt(href.substring(1))
}
