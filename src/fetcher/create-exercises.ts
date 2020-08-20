import { convertState } from './fetch-page-data'
import { BareExercise, BareExerciseGroup } from './query'
import {
  FrontendExerciseNode,
  FrontendContentNode,
  TaskEdtrState,
  SolutionEdtrState,
  FrontendExerciseGroupNode,
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
    context: {
      id: uuid.id,
      solutionId: uuid.solution?.id,
    },
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
