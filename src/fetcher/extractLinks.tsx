export const extractLinks = (arr, links) => {
  if (!arr) return []
  arr.forEach((obj) => {
    if (obj.type === 'a') {
      if (!/^\/[\d]+$/.test(obj.href)) return
      const id = parseInt(obj.href.substring(1))
      if (links.includes(id) === false) links.push(id)
    }
    if (obj.children?.length > 0) extractLinks(obj.children, links)
  })
  return links
}
