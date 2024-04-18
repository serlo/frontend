import { Instance } from './graphql-types/operations'
import { MainUuidType } from './query-types'
import { mathExamsTaxIds, schoolTaxonomies } from '@/data/de/math-exams-data'
import { BreadcrumbsData, UuidType } from '@/data-types'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

type TaxonomyTermNodes = Extract<
  MainUuidType,
  { __typename: 'Article' }
>['taxonomyTerms']['nodes']

export function createBreadcrumbs(uuid: MainUuidType, instance: Instance) {
  if (uuid.__typename === UuidType.TaxonomyTerm) {
    return compat(taxonomyParentsToRootToBreadcrumbsData(uuid, instance))
  }

  if (uuid.__typename === UuidType.CoursePage) {
    return compat(buildFromTaxTerms(uuid.course?.taxonomyTerms.nodes, instance))
  }

  if (
    uuid.__typename === UuidType.Article ||
    uuid.__typename === UuidType.Video ||
    uuid.__typename === UuidType.Applet ||
    uuid.__typename === UuidType.Exercise ||
    uuid.__typename === UuidType.ExerciseGroup ||
    uuid.__typename === UuidType.Course
  ) {
    return compat(buildFromTaxTerms(uuid.taxonomyTerms.nodes, instance))
  }

  return undefined
}

export function taxonomyParentsToRootToBreadcrumbsData(
  term: TaxonomyTermNodes[0] | undefined,
  instance: Instance,
  includeFirstParent?: boolean
): BreadcrumbsData | undefined {
  if (term === undefined) return undefined

  const { secondaryMenus } = getInstanceDataByLang(instance)

  if (!term.path) return undefined

  let breadcrumbs = term.path.map((entry) => {
    return {
      label: entry!.title,
      url: entry!.alias,
      id: entry!.id,
    }
  })

  if (includeFirstParent || !term.path.length) {
    breadcrumbs.push({
      label: term.title,
      url: term.alias,
      id: term.id,
    })
  }

  if (!breadcrumbs?.length) return undefined

  // get the subject from the secondary menu data so we link to the correct landing pages
  const subject = secondaryMenus.find(
    (menu) => menu.rootId === breadcrumbs[0]?.id ?? term.id
  )

  if (subject) {
    breadcrumbs[0].label = subject.rootName ?? breadcrumbs[0].label
    breadcrumbs[0].url = subject.landingUrl ?? breadcrumbs[0].url

    const breadcrumbIdsNoRoot = breadcrumbs.map((item) => item.id).slice(1)

    // if there are other entries that exists in breadcrumbs and secondaryMenu
    // we use that to shorten the breadcrumbs
    // example: https://de.serlo.org/mathe/16299/klasse-11
    const secondaryMenuEntry = subject?.entries.find((entry) =>
      breadcrumbIdsNoRoot.includes(entry.id ?? 0)
    )

    if (secondaryMenuEntry) {
      const matchingBreadcrumbIndex = breadcrumbs.findIndex(
        (item) => item.id === secondaryMenuEntry.id
      )
      const matchingBreadcrumbItem = breadcrumbs[matchingBreadcrumbIndex]
      breadcrumbs = [
        breadcrumbs[0],
        {
          ...matchingBreadcrumbItem,
          label: secondaryMenuEntry.title,
        },
        ...breadcrumbs.slice(matchingBreadcrumbIndex + 1),
      ]
    }
  }

  return breadcrumbs
}

function buildFromTaxTerms(
  nodes: TaxonomyTermNodes | undefined,
  instance: Instance
) {
  if (!nodes) return undefined

  // we select first shortest taxonomy path as main taxonomy and show it in breadcrumbs
  // this happens directly on taxonomy parents and is not taking short-cuircuits into account
  nodes.sort((a, b) => a.path.length - b.path.length)
  return taxonomyParentsToRootToBreadcrumbsData(nodes[0], instance, true)
}

function compat(breadcrumbs?: BreadcrumbsData) {
  if (!breadcrumbs || !breadcrumbs.length) return undefined

  // identify final exam taxonomies or their children
  const isOrInExamsFolder = !!breadcrumbs.find(
    ({ id }) => id && mathExamsTaxIds.includes(id)
  )

  // compat: remove empty entries
  breadcrumbs = breadcrumbs.filter(({ url, label }) => url && label)

  // compat: exam breadcrumbs remove "Deutschland" Taxonomie and maybe school type
  if (isOrInExamsFolder) {
    const exclude =
      breadcrumbs.length > 4 ? [...schoolTaxonomies, 16030] : [16030]
    return breadcrumbs.filter(({ id }) => id && !exclude.includes(id))
  }

  const shortened: BreadcrumbsData = []
  breadcrumbs.map((entry, i, arr) => {
    const maxItems = 4
    const overflow = arr.length > maxItems
    const itemsToRemove = arr.length - maxItems
    const ellipsesItem = overflow && i === 2

    if (overflow && i > 2 && i < 1 + itemsToRemove) return
    // special case
    if (arr.length - itemsToRemove > 4 && i === 1) return
    if (ellipsesItem) {
      shortened.push({ label: '', ellipsis: true })
    } else {
      shortened.push(entry)
    }
  })

  return shortened
}
