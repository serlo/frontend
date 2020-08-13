import { QueryResponse } from './query'
import { SecondaryNavigationData, SecondaryNavigationEntry } from '@/data-types'

interface NavigationData {
  label: string
  id?: number
  url?: string
  children?: NavigationData[]
}

export function createNavigation(
  uuid: QueryResponse
): SecondaryNavigationData | undefined {
  if (uuid.__typename !== 'Page' && uuid.__typename !== 'TaxonomyTerm')
    return undefined

  if (
    uuid.__typename === 'TaxonomyTerm' &&
    (uuid.type === 'topicFolder' || uuid.type === 'curriculumTopicFolder')
  ) {
    return undefined
  }

  if (uuid.navigation?.data) {
    const data = uuid.navigation?.data as NavigationData
    return data.children?.flatMap((child) => {
      if (child.children) {
        return child.children.map(convertEntry)
      }
      return convertEntry(child)
    })
  }

  function convertEntry(entry: NavigationData): SecondaryNavigationEntry {
    return {
      title: entry.label,
      url: getUrl(),
      active: entry.id === uuid.id,
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
}
