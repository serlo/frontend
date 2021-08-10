import { convertState } from './convert-state'
import { createExercise, createExerciseGroup } from './create-exercises'
import {
  TaxonomyTerm,
  TaxonomyTermChild,
  TaxonomyTermChildOnX,
  TaxonomyTermChildrenLevel2,
  TaxonomyTermChildrenLevel1,
} from './query-types'
import {
  TaxonomyData,
  FrontendExerciseNode,
  FrontendExerciseGroupNode,
  TaxonomyLink,
  TaxonomySubTerm,
} from '@/data-types'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'

export function buildTaxonomyData(uuid: TaxonomyTerm): TaxonomyData {
  const children = uuid.children.nodes.filter(isActive)

  return {
    description: uuid.description ? convertState(uuid.description) : undefined,
    title: uuid.name,
    id: uuid.id,
    alias: uuid.alias ?? undefined,
    taxonomyType: uuid.type,

    articles: collectType(children, 'Article'),
    exercises: collectTopicFolders(children),
    videos: collectType(children, 'Video'),
    applets: collectType(children, 'Applet'),
    courses: collectType(children, 'Course'),
    events: collectType(children, 'Event'),

    exercisesContent: collectExercises(children),
    subterms: collectNestedTaxonomyTerms(children), // nested taxonomy terms
  }
}

function isActive(child: TaxonomyTermChild) {
  return child.trashed === false && child.__typename !== 'UnsupportedUuid'
}

function collectExercises(children: TaxonomyTermChildrenLevel1[]) {
  let index = 0
  const result: (FrontendExerciseNode | FrontendExerciseGroupNode)[] = []
  children.forEach((child) => {
    if (child.__typename === 'Exercise') {
      result.push(createExercise(child, index++))
    }
    if (child.__typename === 'ExerciseGroup') {
      if (children.length === 1) result.push(createExerciseGroup(child))
      else result.push(createExerciseGroup(child, index++))
    }
  })
  return result
}

function collectType(
  children: (TaxonomyTermChildrenLevel1 | TaxonomyTermChildrenLevel2)[],
  typename: TaxonomyTermChildOnX['__typename']
) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (child.__typename === typename && child.alias) {
      const title =
        child.currentRevision?.title ?? child.revisions?.nodes?.[0]?.title
      if (title) {
        result.push({
          title,
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

function collectTopicFolders(
  children: (TaxonomyTermChildrenLevel1 | TaxonomyTermChildrenLevel2)[]
) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (
      child.__typename === 'TaxonomyTerm' &&
      (child.type === 'topicFolder' || child.type === 'curriculumTopicFolder')
    )
      result.push({
        title: child.name,
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
      child.__typename === 'TaxonomyTerm' &&
      child.type !== 'topicFolder' &&
      child.type !== 'curriculumTopicFolder'
    ) {
      const subChildren = child.children.nodes.filter(isActive)
      result.push({
        id: child.id,
        title: child.name,
        url: getAlias(child),
        description: child.description
          ? convertState(child.description)
          : undefined,
        articles: collectType(subChildren, 'Article'),
        exercises: collectTopicFolders(subChildren),
        videos: collectType(subChildren, 'Video'),
        applets: collectType(subChildren, 'Applet'),
        courses: collectType(subChildren, 'Course'),
        events: collectType(subChildren, 'Event'),
        folders: collectSubfolders(subChildren),
      })
    }
  })
  return result
}

function collectSubfolders(children: TaxonomyTermChildrenLevel2[]) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (
      child.__typename === 'TaxonomyTerm' &&
      child.type !== 'topicFolder' &&
      child.type !== 'curriculumTopicFolder'
    )
      result.push({ title: child.name, url: getAlias(child) })
  })
  return result
}
