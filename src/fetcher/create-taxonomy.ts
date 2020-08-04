import { convertState } from './fetch-page-data'
import {
  TaxonomyTerm,
  TaxonomyTermChild,
  BareExercise,
  BareExerciseGroup,
  TaxonomyTermChildOnX,
  TaxonomyTermChildrenLevel2,
  TaxonomyTermChildrenLevel1,
} from './query'
import {
  TaxonomyData,
  FrontendContentNode,
  FrontendExerciseNode,
  TaskEdtrState,
  SolutionEdtrState,
  FrontendExerciseGroupNode,
  TaxonomyLink,
  TaxonomySubTerm,
} from '@/data-types'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'
import { convert } from '@/schema/convert-edtr-io-state'

export function buildTaxonomyData(uuid: TaxonomyTerm): TaxonomyData {
  const children = uuid.children?.filter(isActive)

  return {
    description: convertState(uuid.description),
    title: uuid.name,
    id: uuid.id,

    articles: collectType(children, 'Article'),
    exercises: collectTopicFolders(children),
    videos: collectType(children, 'Video'),
    applets: collectType(children, 'Applet'),
    courses: collectType(children, 'Course'),

    exercisesContent: collectExercises(children),
    subterms: collectNestedTaxonomyTerms(children), // nested taxonomy terms
  }
}

function isActive(child: TaxonomyTermChild) {
  return child.trashed === false && child.__typename !== 'UnsupportedUuid'
}

function collectExercises(children: TaxonomyTerm['children']) {
  let index = 0
  const result: FrontendContentNode[][] = []
  children.forEach((child) => {
    if (child.__typename === 'Exercise' && child.currentRevision) {
      result.push([createExercise(child, index++)])
    }
    if (child.__typename === 'ExerciseGroup' && child.currentRevision) {
      result.push([createExerciseGroup(child, index++)])
    }
  })
  return result
}

export function createExercise(
  uuid: BareExercise,
  index?: number
): FrontendExerciseNode {
  let taskLegacy: FrontendContentNode[] | undefined = undefined
  let taskEdtrState: TaskEdtrState | undefined = undefined
  const content = uuid.currentRevision?.content
  if (content) {
    if (content.startsWith('{')) {
      // special case here: we know it's a edtr-io exercise
      // and we use this knowledge to convert subentries
      // TODO import types from edtr-io
      const taskState = JSON.parse(content).state
      taskState.content = convert(taskState.content)
      if (taskState.interactive?.type == 'scMcExercise') {
        taskState.interactive.state.answers.forEach((answer: any) => {
          answer.feedback = convert(answer.feeedback)
          answer.content = convert(answer.content)
        })
      }
      taskEdtrState = taskState
    } else {
      taskLegacy = convertState(content)
    }
  }
  let solutionLegacy: FrontendContentNode[] | undefined = undefined
  let solutionEdtrState: SolutionEdtrState | undefined = undefined
  const solution = uuid.solution?.currentRevision?.content
  if (solution) {
    if (solution.startsWith('{')) {
      // special case here: we know it's a edtr-io solution
      // TODO import types from edtr-io
      const solutionState = JSON.parse(solution).state
      solutionState.strategy = convert(solutionState.strategy)
      solutionState.steps = convert(solutionState.steps)
      solutionEdtrState = solutionState
    } else {
      solutionLegacy = convertState(solution)
    }
  }
  return {
    type: 'exercise',
    grouped: false,
    positionOnPage: index,
    taskLegacy,
    taskEdtrState,
    solutionEdtrState,
    solutionLegacy,
    taskLicense: uuid.license,
    solutionLicense: uuid.solution?.license,
  }
}

export function createExerciseGroup(
  uuid: BareExerciseGroup,
  pageIndex?: number
): FrontendExerciseGroupNode {
  const children: FrontendExerciseNode[] = []
  if (uuid.exercises?.length > 0) {
    uuid.exercises.forEach(function (
      exercise: BareExercise,
      groupIndex: number
    ) {
      const exerciseNode = createExercise(exercise)
      exerciseNode.grouped = true
      exerciseNode.positionInGroup = groupIndex
      children.push(exerciseNode)
    })
  }
  return {
    type: 'exercise-group',
    content: convertState(uuid.currentRevision?.content),
    positionOnPage: pageIndex,
    license: uuid.license,
    children,
  }
}

function collectType(
  children: (TaxonomyTermChildrenLevel1 | TaxonomyTermChildrenLevel2)[],
  typename: TaxonomyTermChildOnX['__typename']
) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (child.__typename === typename && child.alias && child.currentRevision)
      result.push({
        title: child.currentRevision.title,
        url: getAlias(child),
      })
  })
  return result
}

function getAlias(child: { alias?: string; id: number }) {
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
  children: TaxonomyTerm['children']
): TaxonomySubTerm[] {
  const result: TaxonomySubTerm[] = []
  children.forEach((child) => {
    if (
      child.__typename === 'TaxonomyTerm' &&
      child.type !== 'topicFolder' &&
      child.type !== 'curriculumTopicFolder'
    ) {
      const subchildren = child.children?.filter(isActive)
      result.push({
        title: child.name,
        url: getAlias(child),
        description: convertState(child.description),
        articles: collectType(subchildren, 'Article'),
        exercises: collectTopicFolders(subchildren),
        videos: collectType(subchildren, 'Video'),
        applets: collectType(subchildren, 'Applet'),
        courses: collectType(subchildren, 'Course'),
        folders: collectSubfolders(subchildren),
      })
    }
  })
  return result
}

function collectSubfolders(children: TaxonomyTermChildrenLevel2[]) {
  const result: TaxonomyLink[] = []
  children.forEach((child) => {
    if (child.__typename === 'TaxonomyTerm')
      result.push({ title: child.name, url: getAlias(child) })
  })
  return result
}
