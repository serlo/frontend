export function createNavigation(uuid) {
  if (uuid.navigation?.data) {
    try {
      const data = JSON.parse(uuid.navigation.data)
      return data.children.map(child => {
        return {
          title: child.label,
          url: '/' + child.id
        }
      })
    } catch (e) {}
  }
}
