import { Instance, TaxonomyTermType } from '@serlo/api'

import { MainUuidType } from './query-types'
import { SecondaryMenuData, UuidType } from '@/data-types'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

export function createSecondaryMenu(
  uuid: MainUuidType,
  instance: Instance
): SecondaryMenuData['entries'] | undefined {
  if (
    uuid.__typename !== UuidType.Page &&
    uuid.__typename !== UuidType.TaxonomyTerm
  )
    return undefined

  const { secondaryMenus } = getInstanceDataByLang(instance)

  return getMenu()?.entries.map((entry) => {
    return {
      ...entry,
      active: entry.id === uuid.id ? true : undefined,
    }
  })

  function getMenu() {
    if (!secondaryMenus) return undefined

    if (uuid.__typename === UuidType.TaxonomyTerm) {
      if (uuid.type === TaxonomyTermType.ExerciseFolder) return undefined

      return findMenuByRootId(uuid.navigation?.path.nodes[0].id ?? undefined)
    }

    if (uuid.__typename === UuidType.Page) {
      const byRootId = findMenuByRootId(uuid.id)
      if (byRootId) return byRootId

      return secondaryMenus.find((menu) =>
        menu.entries.some((entry) => entry.id === uuid.id)
      )
    }
  }

  function findMenuByRootId(rootId?: number) {
    return rootId
      ? secondaryMenus.find((menu) => menu.rootId === rootId)
      : undefined
  }
}
