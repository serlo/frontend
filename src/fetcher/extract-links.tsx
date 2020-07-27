import { ExerciseProps } from '@/components/content/exercise'
import { FrontendContentNode } from '@/data-types'

function getId(url: string): number | undefined {
  //e.g. /1565
  if (/^\/[\d]+$/.test(url)) return parseInt(url.substring(1))

  // https://de.serlo.org/1565
  if (/de\.serlo\.org\/[\d]+$/.test(url)) {
    return parseInt(url.split('de.serlo.org/')[1])
  }

  return undefined
}

export function walkIdNodes(
  content: FrontendContentNode[] | undefined,
  callback: (node: FrontendContentNode, id: number) => void
) {
  if (content === undefined) return
  content.forEach((obj) => {
    if (obj.type === 'a' || obj.type === 'img') {
      // We know that href might exists
      const href = (obj as { href?: string }).href
      if (href) {
        if (/^\/[\d]+$/.test(href)) {
          // hit
          const id = parseInt(href.substring(1))
          callback(obj, id)
        }
      }
    }
    // recursion
    if (obj.children) {
      walkIdNodes(obj.children, callback)
    }
    if (obj.type === 'exercise') {
      // domain knowledge
      const exercise = obj as ExerciseProps
      if (exercise.solution?.children) {
        walkIdNodes(exercise.solution.children, callback)
      }
      if (exercise.task.children) {
        walkIdNodes(exercise.task.children, callback)
      }
    }
  })
}

export const extractLinks = (
  arr: FrontendContentNode[] | undefined,
  links: number[]
) => {
  if (!arr) return []

  arr.forEach((obj) => {
    if (obj.type === 'a' || obj.type === 'img') {
      if (obj.href === undefined) return
      const id = getId(obj.href)
      if (id === undefined) return
      if (links.includes(id) === false) links.push(id)
    }
    if (obj.children !== undefined && obj.children.length > 0)
      extractLinks(obj.children, links)

    if (obj.type === 'exercise') {
      const exercise = obj as ExerciseProps
      if (exercise.solution.children.length > 0)
        extractLinks(exercise.solution.children, links)
      if (exercise.task.children.length > 0)
        extractLinks(exercise.task.children, links)
    }
  })
  return links
}

interface MenuData {
  title: string
  url: string
}

export const extractLinksFromNav = (arr: MenuData[]) => {
  if (arr === undefined || arr.length === 0) return []
  return arr.reduce(function (res: number[], obj) {
    const id = getId(obj.url)
    if (id) res.push(id)
    return res
  }, [])
}
