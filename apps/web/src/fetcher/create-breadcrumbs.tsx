import { Instance } from './graphql-types/operations'
import { MainUuidType } from './query-types'
import {
  mathExamsTaxonomies,
  schoolTaxonomies,
} from '@/data/de/math-exams-taxonomies'
import { BreadcrumbsData, UuidType } from '@/data-types'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

type TaxonomyTermNodes = Extract<
  MainUuidType,
  { __typename: 'Article' }
>['taxonomyTerms']['nodes']

export function taxonomyParentsToRootToBreadcrumbsData(
  term: TaxonomyTermNodes[0] | undefined,
  instance: Instance,
  includeFirstParent?: boolean
): BreadcrumbsData | undefined {
  if (term === undefined) return undefined

  const { secondaryMenus } = getInstanceDataByLang(instance)

  const breadcrumbs = term.path.map((entry) => {
    return {
      label: entry!.title,
      url: entry!.alias,
      id: entry!.id,
    }
  })

  if (includeFirstParent) {
    breadcrumbs.push({
      label: term.title,
      url: term.alias,
      id: term.id,
    })
  }

  const subject = secondaryMenus.find(
    (menu) => menu.rootId === breadcrumbs[0].id
  )

  if (subject) {
    breadcrumbs[0].label = subject.rootName ?? breadcrumbs[0].label
    breadcrumbs[0].url = subject.landingUrl ?? breadcrumbs[0].url
  }

  return breadcrumbs

  // TODO: check if we still need this
  //     // check if this breadcrumb is already part of secondary menu
  //     const matching2 = secondaryMenus.filter((menu) =>
  //       menu.entries.some((entry) => entry.id === current.id)
  //     )
  //     if (matching2.length > 0) {
  //       const metaMenuEntry = matching2[0].entries.filter(
  //         (menu) => menu.id === current.id
  //       )[0]
  //       breadcrumbs.unshift({
  //         label: metaMenuEntry.title,
  //         url: current.alias,
  //         id: current.id,
  //       })
  //       breadcrumbs.unshift({
  //         label: matching2[0].rootName ?? getSubjectName(current),
  //         url: matching2[0].landingUrl,
  //         id: matching2[0].rootId,
  //       })
  //       …
}

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
      ({ id }) => id && mathExamsTaxonomies.includes(id)
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
}
