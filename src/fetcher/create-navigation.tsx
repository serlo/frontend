import { Instance } from '@serlo/api'

import { MainUuidType } from './query-types'
import { SecondaryNavigationData } from '@/data-types'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

export function createNavigation(
  uuid: MainUuidType,
  instance: Instance
): SecondaryNavigationData | undefined {
  if (uuid.__typename !== 'Page' && uuid.__typename !== 'TaxonomyTerm')
    return undefined

  const instanceData = getInstanceDataByLang(instance)

  return getData()?.map((entry) => {
    return {
      ...entry,
      active: entry.id === uuid.id ? true : undefined,
      url: buildUrl(entry.url, entry.id),
    }
  })

  function buildUrl(url?: string, id?: number): string {
    if (url) return url
    if (id) return `/${id}`
    return ''
  }

  function getData() {
    const { taxonomyMenus } = instanceData

    const taxonomyMenuKeys = Object.keys(taxonomyMenus)

    if (uuid.__typename === 'Page') {
      const { pageMenus, taxonomyMenus } = instanceData
      if (!pageMenus) return undefined

      //is entry in page menu?
      const pageMenu = pageMenus.find((menuArray) => {
        return menuArray.some((entry) => entry.id === uuid.id)
      })
      if (pageMenu) return pageMenu

      //is root node in tax menu?
      if (taxonomyMenuKeys.includes(uuid.id.toString())) {
        return taxonomyMenus[uuid.id] ?? undefined
      }

      //in entry in tax menu?
      const taxonomyKey = taxonomyMenuKeys.find((key) => {
        return taxonomyMenus[key]?.some((entry) => entry.id === uuid.id)
      })
      if (taxonomyKey) return taxonomyMenus[taxonomyKey]!
    }

    if (uuid.__typename === 'TaxonomyTerm') {
      if (uuid.type === 'topicFolder' || uuid.type === 'curriculumTopicFolder')
        return undefined

      const rootId = uuid.navigation?.path.nodes[0].id
      if (!rootId) return undefined
      if (taxonomyMenuKeys.includes(rootId.toString())) {
        return taxonomyMenus[rootId] ?? undefined
      }
      return undefined
    }
  }
}
