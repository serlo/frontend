import { Instance } from '@serlo/api'

import { MainUuidType } from './query-types'
import { SecondaryNavigationData } from '@/data-types'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

export function createSideMenu(
  uuid: MainUuidType,
  instance: Instance
): SecondaryNavigationData | undefined {
  if (uuid.__typename !== 'Page' && uuid.__typename !== 'TaxonomyTerm')
    return undefined

  const { sideMenus } = getInstanceDataByLang(instance)

  return getMenu()?.entries.map((entry) => {
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

  function getMenu() {
    if (!sideMenus) return undefined

    if (uuid.__typename === 'TaxonomyTerm') {
      if (uuid.type === 'topicFolder' || uuid.type === 'curriculumTopicFolder')
        return undefined

      return findMenuByRootId(uuid.navigation?.path.nodes[0].id ?? undefined)
    }

    if (uuid.__typename === 'Page') {
      const byRootId = findMenuByRootId(uuid.id)
      if (byRootId) return byRootId

      return sideMenus.find((menu) =>
        menu.entries.some((entry) => entry.id === uuid.id)
      )
    }
  }

  function findMenuByRootId(rootId?: number) {
    return rootId ? sideMenus.find((menu) => menu.rootId === rootId) : undefined
  }
}
