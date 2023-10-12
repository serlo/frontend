import { MainUuidQuery, TaxonomyTermType } from './graphql-types/operations'
import {
  createStaticExerciseGroup,
  staticCreateExerciseAndSolution,
} from './static-create-exercises'
import {
  TaxonomyData,
  TaxonomyLink,
  TaxonomySubTerm,
  UuidType,
} from '@/data-types'
import { hasSpecialUrlChars } from '@/helper/urls/check-special-url-chars'
import {
  EditorExerciseDocument,
  EditorRowsDocument,
  EditorSolutionDocument,
  EditorTemplateGroupedExerciseDocument,
} from '@/serlo-editor-integration/types/editor-plugins'

type TaxonomyTerm = Extract<
  MainUuidQuery['uuid'],
  { __typename: 'TaxonomyTerm' }
>

type TaxonomyTermChildrenLevel1 = TaxonomyTerm['children']['nodes'][0]

type TaxonomyTermChildrenLevel2 = Extract<
  TaxonomyTerm['children']['nodes'][0],
  { __typename: 'TaxonomyTerm' }
>['children']['nodes'][0]

export function staticBuildTaxonomyData(uuid: TaxonomyTerm): TaxonomyData {
  const children = uuid.children.nodes.filter(isActive)

  const description = uuid.description
    ? (JSON.parse(uuid.description) as EditorRowsDocument)
    : undefined

  return {
    description,
    title: uuid.name,
    id: uuid.id,
    alias: uuid.alias,
    taxonomyType: uuid.type,
    trashed: uuid.trashed,

    articles: collectType(children, UuidType.Article),
    exercises: collectExerciseFolders(children),
    videos: collectType(children, UuidType.Video),
    applets: collectType(children, UuidType.Applet),
    courses: collectType(children, UuidType.Course),
    events: collectType(children, UuidType.Event),

    //@ts-expect-error static
    exercisesContent: collectExercises(children),
    subterms: collectNestedTaxonomyTerms(children), // nested taxonomy terms
  }
}

function isActive(child: TaxonomyTermChildrenLevel1) {
  return child.trashed === false // && child.__typename !== 'UnsupportedUuid' <---- this has no effect
}

function isActive_for_subchildren(child: TaxonomyTermChildrenLevel2) {
  return child.trashed === false // && child.__typename !== 'UnsupportedUuid' <---- this has no effect
}

function collectExercises(children: TaxonomyTermChildrenLevel1[]) {
  const result: (
    | EditorExerciseDocument
    | EditorSolutionDocument
    | EditorTemplateGroupedExerciseDocument
  )[] = []
  children.forEach((child) => {
    if (child.__typename === UuidType.Exercise && child.currentRevision) {
      const exerciseWithSolution = staticCreateExerciseAndSolution({
        ...child,
        revisions: { totalCount: 0 },
      })
      if (exerciseWithSolution) {
        result.push(exerciseWithSolution.exercise)
        if (exerciseWithSolution.solution)
          result.push(exerciseWithSolution.solution)
      }
    }
    if (child.__typename === UuidType.ExerciseGroup && child.currentRevision) {
      const group = createStaticExerciseGroup(child)
      if (group) result.push(group)
    }
  })

  return result
}

function collectType(
  children: (TaxonomyTermChildrenLevel1 | TaxonomyTermChildrenLevel2)[],
  typename:
    | UuidType.Applet
    | UuidType.Article
    | UuidType.Video
    | UuidType.Course
    | UuidType.Event
) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (child.__typename === typename && child.alias) {
      const title =
        child.currentRevision?.title ?? child.revisions?.nodes?.[0]?.title
      if (title) {
        result.push({
          title,
          id: child.id,
          url: getAlias(child),
          unrevised: !child.currentRevision,
        })
      }
    }
  })
  return result
}

function getAlias(child: { alias?: string | null; id: number }) {
  if (!child.alias || hasSpecialUrlChars(child.alias)) return `/${child.id}`
  else return child.alias
}

function collectExerciseFolders(
  children: (TaxonomyTermChildrenLevel1 | TaxonomyTermChildrenLevel2)[]
) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (
      child.__typename === UuidType.TaxonomyTerm &&
      child.type === TaxonomyTermType.ExerciseFolder
    )
      result.push({
        title: child.name,
        id: child.id,
        url: getAlias(child),
      })
  })
  return result
}

function collectNestedTaxonomyTerms(
  children: TaxonomyTermChildrenLevel1[]
): TaxonomySubTerm[] {
  const result: TaxonomySubTerm[] = []
  children.forEach((child) => {
    if (
      child.__typename === UuidType.TaxonomyTerm &&
      child.type !== TaxonomyTermType.ExerciseFolder
    ) {
      const subChildren = child.children.nodes.filter(isActive_for_subchildren)
      result.push({
        id: child.id,
        title: child.name,
        url: getAlias(child),
        description: child.description
          ? (JSON.parse(child.description) as EditorRowsDocument)
          : undefined,
        articles: collectType(subChildren, UuidType.Article),
        exercises: collectExerciseFolders(subChildren),
        videos: collectType(subChildren, UuidType.Video),
        applets: collectType(subChildren, UuidType.Applet),
        courses: collectType(subChildren, UuidType.Course),
        events: collectType(subChildren, UuidType.Event),
        folders: collectSubfolders(subChildren),
        type: child.type,
      })
    }
  })
  return result
}

function collectSubfolders(children: TaxonomyTermChildrenLevel2[]) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (
      child.__typename === UuidType.TaxonomyTerm &&
      child.type !== TaxonomyTermType.ExerciseFolder
    )
      result.push({ title: child.name, url: getAlias(child), id: child.id })
  })
  return result
}
