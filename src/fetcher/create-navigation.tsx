import { Instance, MainUuidType } from './query-types'
import { SecondaryNavigationData } from '@/data-types'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

export function createNavigation(
  uuid: MainUuidType,
  instance: Instance
): SecondaryNavigationData | undefined {
  if (uuid.__typename !== 'Page' && uuid.__typename !== 'TaxonomyTerm')
    return undefined

  const instanceData = getInstanceDataByLang(instance)

  if (uuid.__typename === 'Page') {
    const { pageMenus } = instanceData
    if (!pageMenus) return undefined

    return pageMenus.find((menuArray) => {
      return menuArray.some((entry) => entry.id === uuid.id)
    })
  }

  if (uuid.__typename === 'TaxonomyTerm') {
    if (uuid.type === 'topicFolder' || uuid.type === 'curriculumTopicFolder')
      return undefined

    const { subjectMenus } = instanceData
    const rootId = uuid.navigation?.path.nodes[0].id
    if (!rootId) return undefined
    if (Object.keys(subjectMenus).includes(rootId.toString())) {
      return subjectMenus[rootId] ?? undefined
    }
    return undefined
  }
}
