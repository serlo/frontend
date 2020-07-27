import { QueryResponse } from './query'
import { HeaderLink } from '@/data-types'

interface NavigationData {
  label: string
  id: number
  url?: string
  children?: NavigationData[]
}

export function createNavigation(uuid: QueryResponse) {
  if (uuid.__typename !== 'Page' && uuid.__typename !== 'TaxonomyTerm')
    return undefined

  if (uuid.navigation?.data) {
    try {
      const data = JSON.parse(uuid.navigation.data) as NavigationData
      return data.children?.flatMap((child) => {
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

function convertEntry(entry: NavigationData): HeaderLink {
  return {
    title: entry.label,
    url: getUrl(),
  }

  function getUrl(): string {
    if (entry.url) {
      return entry.url
    }

    if (entry.id) {
      return `/${entry.id}`
    }

    return '#'
  }
}
