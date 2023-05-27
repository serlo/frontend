import { QueryEntry } from './_collect-data'
import { UuidType } from '@/data-types'

// TODO: probably refactor …

const allowedTypes = [
  UuidType.Article,
  UuidType.CoursePage,
  UuidType.Page,
  UuidType.TaxonomyTerm,
]

export function parseEntry(entry: QueryEntry) {
  if (!entry) return

  const { __typename: type, trashed, id, title, alias } = entry

  if (trashed || !allowedTypes.includes(type as UuidType) || !title) return

  const path = getPath(entry)
  if (!path) return

  return {
    id,
    title,
    path: path.path,
    type,
    subject: path.subject,
    alias,
  }
}

function getPath(entry: QueryEntry) {
  if (!entry) return false
  const { __typename, title } = entry

  const fromTaxTerms =
    __typename === 'Article'
      ? buildFromTaxTerms(entry.taxonomyTerms.nodes)
      : __typename === 'CoursePage'
      ? buildFromTaxTerms(entry.course.taxonomyTerms.nodes)
      : __typename === 'Page' || __typename === 'TaxonomyTerm'
      ? buildFromTaxTerms([{ navigation: entry.navigation }])
      : null

  if (!fromTaxTerms) {
    console.error('no title or path')
    console.error(entry)
    return false
  }

  const rawPath = fromTaxTerms.map(({ label }) => label.trim())

  if (entry.__typename === 'CoursePage' && entry.course) {
    rawPath.push(entry.course.title.trim())
  }

  // duplicate?
  const path = rawPath.filter((x) => x !== 'Themen' && x !== 'Alle Themen')

  const outpath: string[] = []
  for (let i = path.length - 1; i >= 0; i--) {
    if (
      path[i] === title ||
      title.includes(path[i]) ||
      outpath.some((p) => p.includes(path[i])) ||
      (i > 1 && path[i - 1] === path[i])
    )
      continue

    const cur = title + outpath.join('')
    if (cur.length >= 35 && (outpath.length > 0 || i < path.length - 3)) break
    if (
      (path[i] + cur).length <= 60 ||
      (outpath.length === 0 && (path[i] + cur).length <= 66)
    ) {
      outpath.unshift(path[i])
    }
    return { path: outpath, subject: path[0] }
  }
}

type QueryEntryArticle = Extract<QueryEntry, { __typename: 'Article' }>

function buildFromTaxTerms(
  taxonomyPaths: QueryEntryArticle['taxonomyTerms']['nodes']
) {
  if (taxonomyPaths === undefined) return undefined
  let breadcrumbs
  let backup

  for (const child of taxonomyPaths) {
    if (!child.navigation) continue
    const path = child.navigation.path.nodes
    if (!breadcrumbs || breadcrumbs.length > path.length) {
      // compat: some paths are short-circuited, ignore them
      if (
        path.some((x) => x.label === 'Mathematik') &&
        !path.some((x) => x.label === 'Alle Themen')
      ) {
        if (!backup || backup.length > path.length) {
          backup = path
        }
        continue
      }
      breadcrumbs = path
    }
  }

  return breadcrumbs || backup
}
