import {
  TaxonomyTerm,
  TaxonomyTermChild,
  TaxonomyTermChildExercise,
  BareExercise,
} from './query'
import {
  TaxonomyData,
  FrontendContentNode,
  FrontendExerciseNode,
} from '@/data-types'
import { convertState } from './fetch-page-data'

export function buildTaxonomyData(uuid: TaxonomyTerm): TaxonomyData {
  const children = uuid.children?.filter(isActive)

  return {
    description: convertState(uuid.description),
    title: uuid.name,
    id: uuid.id,

    /*links: {
      articles: collectType(children, 'Article'),
      exercises: collectTopicFolders(children),
      videos: collectType(children, 'Video'),
      applets: collectType(children, 'Applet'),
      courses: collectType(children, 'Course'),
    },*/
    exercisesContent: collectExercises(children),
    //children: collectNestedTaxonomyTerms(children), // nested taxonomy terms
  }
}

function isActive(child: TaxonomyTermChild) {
  return child.trashed === false && child.__typename !== 'UnsupportedUuid'
}

function collectExercises(children: TaxonomyTerm['children']) {
  const exercises: FrontendContentNode[][] = []

  children
    .filter((child) => {
      if (
        child.__typename !== 'Exercise' &&
        child.__typename !== 'ExerciseGroup'
      )
        return false
      if (child.currentRevision) {
        return true
      }
    })
    .map((child, index: number) => {
      if (child.__typename === 'Exercise') {
        exercises.push(createExercise(child, index))
      }
      if (child.__typename === 'ExerciseGroup') {
        return createExerciseGroup((child as unknown) as ExerciseGroup, index)
          .value
      }
    })
  return exercises
}

function createExercise(
  uuid: BareExercise,
  index?: number
): FrontendContentNode[] {
  return [
    {
      type: 'exercise',
      grouped: false,
      positionOnPage: index,
      task: convertState(uuid.currentRevision?.content),
      taskLicense: uuid.license,
      solution: convertState(uuid.solution?.currentRevision?.content),
      solutionLicense: uuid.solution?.license,
    },
  ]
}
