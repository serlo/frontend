import { convertState } from './fetch-page-data'
import { Solution, BareExercise, BareExerciseGroup } from './query'
import {
  FrontendExerciseNode,
  FrontendContentNode,
  TaskEdtrState,
  SolutionEdtrState,
  FrontendExerciseGroupNode,
  FrontendSolutionNode,
  EdtrPluginScMcExercise,
} from '@/data-types'
import { convert } from '@/schema/convert-edtr-io-state'

function shuffleArray(array: EdtrPluginScMcExercise['state']['answers']) {
  //Durstenfeld shuffle https://stackoverflow.com/a/12646864 probably overkill, but hey it's all about the performance right?
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
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
      if (taskState.interactive?.plugin == 'scMcExercise') {
        taskState.interactive.state.answers.forEach((answer: any) => {
          answer.feedback = convert(answer.feedback)
          answer.content = convert(answer.content)
        })
        shuffleArray(taskState.interactive.state.answers)
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
      // compat: (probably quite fragile) if strategy is empty, we ignore it
      if (
        solutionState.strategy.length == 1 &&
        solutionState.strategy[0].type == 'p' &&
        solutionState.strategy[0].children.length === 0
      ) {
        solutionState.strategy = []
      }
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
