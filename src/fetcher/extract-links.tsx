// TODO: needs type declaration
export const extractLinks = (arr: any, links: any) => {
  if (!arr) return []
  // TODO: needs type declaration
  arr.forEach((obj: any) => {
    if (obj.type === 'a') {
      if (!/^\/[\d]+$/.test(obj.href)) return
      const id = parseInt(obj.href.substring(1))
      if (links.includes(id) === false) links.push(id)
    }
    if (obj.children?.length > 0) extractLinks(obj.children, links)
  })
  return links
}
