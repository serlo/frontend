import { FrontendContentNode } from '@/data-types'

function getId(url: string): number | false {
  //e.g. /1565
  if (/^\/[\d]+$/.test(url)) return parseInt(url.substring(1))

  // https://de.serlo.org/1565
  if (/de\.serlo\.org\/[\d]+$/.test(url)) {
    return parseInt(url.split('de.serlo.org/')[1])
  }

  return false
}

export function walkIdNodes(
  content: FrontendContentNode[],
  callback: (node: FrontendContentNode, id: number) => void
) {
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
      const exercise = obj as any
      if (exercise.solution?.children) {
        walkIdNodes(exercise.solution.children, callback)
      }
      if (exercise.task.children) {
        walkIdNodes(exercise.task.children, callback)
      }
    }
  })
}

export const extractLinks = (arr: unknown[], links: number[]) => {
  if (!arr) return []
  // TODO: needs type declaration
  arr.forEach((obj: any) => {
    if (obj.type === 'a' || obj.type === 'img') {
      const id = getId(obj.href)
      if (!id) return
      if (links.includes(id) === false) links.push(id)
    }
    if (obj.children?.length > 0) extractLinks(obj.children, links)

    if (obj.type === 'exercise') {
      if (obj.solution.children.length > 0)
        extractLinks(obj.solution.children, links)
      if (obj.task.children.length > 0) extractLinks(obj.task.children, links)
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
