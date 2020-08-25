import { convertState } from './fetch-page-data'
import { Solution, BareExercise, BareExerciseGroup } from './query'
import {
  FrontendExerciseNode,
  FrontendContentNode,
  TaskEdtrState,
  SolutionEdtrState,
  FrontendExerciseGroupNode,
  FrontendSolutionNode,
} from '@/data-types'
import { convert } from '@/schema/convert-edtr-io-state'

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
      if (taskState.interactive?.plugin == 'scMcExercise') {
        taskState.interactive.state.answers.forEach((answer: any) => {
          answer.feedback = convert(answer.feedback)
          answer.content = convert(answer.content)
        })
      }
      taskEdtrState = taskState
    } else {
      taskLegacy = convertState(content)
    }
  }

  return {
    type: 'exercise',
    grouped: false,
    positionOnPage: index,
    task: {
      legacy: taskLegacy,
      edtrState: taskEdtrState,
      license: uuid.license,
    },
    solution: createSolutionData(uuid.solution),
    context: {
      id: uuid.id,
      solutionId: uuid.solution?.id,
    },
    href: uuid.alias ? uuid.alias : undefined,
  }
}

function createSolutionData(solution: BareExercise['solution']) {
  let solutionLegacy: FrontendContentNode[] | undefined = undefined
  let solutionEdtrState: SolutionEdtrState | undefined = undefined
  const content = solution?.currentRevision?.content
  if (content) {
    if (content.startsWith('{')) {
      // special case here: we know it's a edtr-io solution
      // TODO import types from edtr-io
      const solutionState = JSON.parse(content).state
      solutionState.strategy = convert(solutionState.strategy)
      solutionState.steps = convert(solutionState.steps)
      solutionEdtrState = solutionState
    } else {
      solutionLegacy = convertState(content)
    }
  }
  return {
    legacy: solutionLegacy,
    edtrState: solutionEdtrState,
    license: solution?.license,
  }
}

export function createSolution(uuid: Solution): FrontendSolutionNode {
  return {
    type: 'solution',
    solution: createSolutionData(uuid),
    context: {
      id: uuid.id,
    },
    href: uuid.alias ? uuid.alias : undefined,
  }
}

export function createExerciseGroup(
  uuid: BareExerciseGroup,
  pageIndex?: number
): FrontendExerciseGroupNode {
  const children: FrontendExerciseNode[] = []
  let groupIndex = 0
  if (uuid.exercises?.length > 0) {
    uuid.exercises.forEach((exercise: BareExercise) => {
      if (!exercise.currentRevision) return
      if (exercise.trashed) return
      const exerciseNode = createExercise(exercise)
      exerciseNode.grouped = true
      exerciseNode.positionInGroup = groupIndex++
      exerciseNode.positionOnPage = pageIndex // compat: page index also to grouped exercise for id generation
      exerciseNode.context.parent = uuid.id
      children.push(exerciseNode)
    })
  }

  return {
    type: 'exercise-group',
    content: convertState(uuid.currentRevision?.content),
    positionOnPage: pageIndex,
    license: uuid.license,
    children,
    context: {
      id: uuid.id,
    },
    href: uuid.alias ? uuid.alias : undefined,
  }
}
