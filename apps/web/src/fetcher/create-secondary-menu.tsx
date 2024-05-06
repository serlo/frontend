import { taxonomyParentsToRootToBreadcrumbsData } from './create-breadcrumbs'
import { MainUuidType } from './query-types'
import { SecondaryMenuData, UuidType } from '@/data-types'
import { Instance, TaxonomyTermType } from '@/fetcher/graphql-types/operations'
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

      const breadcrumbs = taxonomyParentsToRootToBreadcrumbsData(
        uuid,
        instance,
        true
      )

      if (!breadcrumbs) return undefined

      return findMenuByRootId(breadcrumbs[0]?.id ?? undefined)
    }

    if (uuid.__typename === UuidType.Page) {
      //special case: hide menu on page de.serlo.org/community
      if (uuid.id === 19882) return undefined

      const byRootId = landingPageByAlias(decodeURIComponent(uuid.alias))
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

  function landingPageByAlias(alias?: string) {
    return alias
      ? secondaryMenus.find((menu) => menu.landingUrl === alias)
      : undefined
  }
}
