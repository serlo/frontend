export const extractLinks = (arr: unknown[], links: number[]) => {
  if (!arr) return []
  // TODO: needs type declaration
  arr.forEach((obj: any) => {
    if (obj.type === 'a') {
      if (!/^\/[\d]+$/.test(obj.href)) return
      const id = parseInt(obj.href.substring(1))
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
  return arr.map((obj) => parseInt(obj.url.substring(1)))
}
