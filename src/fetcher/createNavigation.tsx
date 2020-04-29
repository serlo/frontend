export function createNavigation(uuid) {
  if (uuid.navigation?.data) {
    try {
      const data = JSON.parse(uuid.navigation.data)
      return data.children.flatMap(child => {
        if (child.children) {
          return child.children.map(convertEntry)
        }
        return convertEntry(child)
      })
    } catch (e) {}
  }
}

function convertEntry(entry) {
  return {
    title: entry.label,
    url: entry.url ?? '/' + entry.id
  }
}
