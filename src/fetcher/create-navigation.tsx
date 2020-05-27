// TODO: needs type declaration
export function createNavigation(uuid: any) {
  if (uuid.navigation?.data) {
    try {
      const data = JSON.parse(uuid.navigation.data)
      // TODO: needs type declaration
      return data.children.flatMap((child: any) => {
        if (child.children) {
          return child.children.map(convertEntry)
        }
        return convertEntry(child)
      })
    } catch (e) {
      // ignore
    }
  }
}

// TODO: needs type declaration
function convertEntry(entry: any) {
  return {
    title: entry.label,
    url: ((entry.url as string) ?? '/') + (entry.id as string),
  }
}
