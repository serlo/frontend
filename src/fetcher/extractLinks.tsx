export const extractLinks = (arr, links) => {
  arr.forEach(obj => {
    if (obj.type === 'a') {
      const id = parseInt(obj.href.substring(1))
      if (links.includes(id) === false) links.push(id)
    }
    if (obj.children?.length > 0) extractLinks(obj.children, links)
  })
  return links
}
