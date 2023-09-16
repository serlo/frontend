import { convertStateStringToFrontendNode } from './convert-state-string-to-frontend-node'
import { createInlineLicense } from './create-inline-license'
import { RevisionUuidQuery } from './graphql-types/operations'
import { MainUuidType } from './query-types'
import { UuidType } from '@/data-types'
import {
  FrontendExerciseNode,
  TaskEditorState,
  FrontendExerciseGroupNode,
  FrontendSolutionNode,
  FrontendNodeType,
  EditorPluginInputExercise,
  BareSolution,
} from '@/frontend-node-types'
import { hasVisibleContent } from '@/helper/has-visible-content'
import { shuffleArray } from '@/helper/shuffle-array'
import { convert, ConvertNode } from '@/schema/convert-edtr-io-state'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorH5PPlugin,
  EditorInputExercisePlugin,
  EditorScMcExercisePlugin,
} from '@/serlo-editor-integration/types/editor-plugins'

type BareExercise = Omit<
  Extract<MainUuidType, { __typename: 'Exercise' | 'GroupedExercise' }>,
  'exerciseGroup' | '__typename' | 'instance'
>

export function createExercise(
  uuid: BareExercise,
  index?: number
): FrontendExerciseNode {
  return {
    type: FrontendNodeType.Exercise,
    grouped: false,
    positionOnPage: index,
    trashed: uuid.trashed,
    task: {
      edtrState: createTaskData(uuid.currentRevision?.content),
      license: createInlineLicense(uuid.license),
    },
    solution: createSolutionData(uuid.solution),
    context: {
      id: uuid.id,
      solutionId: uuid.solution?.id,
      revisionId: uuid.currentRevision?.id ?? -1,
    },
    href: uuid.alias,
    unrevisedRevisions: uuid.revisions?.totalCount,
  }
}

export interface TaskEditorStateInput {
  content: ConvertNode // edtr-io plugin "exercise"
  interactive?:
    | EditorScMcExercisePlugin
    | EditorInputExercisePlugin
    | EditorH5PPlugin
}

function createTaskData(raw?: string): TaskEditorState | undefined {
  if (!raw || !raw.startsWith('{')) return undefined

  const taskState = (JSON.parse(raw) as { state: TaskEditorStateInput }).state

  if (!taskState.content) return undefined

  const content = convert(taskState.content)

  if (taskState.interactive?.plugin === EditorPluginType.ScMcExercise) {
    const answers = shuffleArray(
      taskState.interactive.state.answers.map((answer, i) => {
        return {
          ...answer,
          content: convert(answer.content),
          feedback: convert(answer.feedback),
          originalIndex: i,
        }
      })
    )
    return {
      content,
      interactive: {
        plugin: EditorPluginType.ScMcExercise,
        state: {
          ...taskState.interactive.state,
          answers,
        },
      },
    }
  }
  if (taskState.interactive?.plugin === EditorPluginType.InputExercise) {
    const answers = taskState.interactive.state.answers.map((answer) => {
      return { ...answer, feedback: convert(answer.feedback) }
    })
    return {
      content,
      interactive: {
        plugin: EditorPluginType.InputExercise,
        state: {
          ...taskState.interactive.state,
          type: taskState.interactive.state
            .type as EditorPluginInputExercise['state']['type'],
          answers,
        },
      },
    }
  }
  if (taskState.interactive?.plugin === EditorPluginType.H5p) {
    return { content, interactive: taskState.interactive }
  }
  return { content }
}

export interface SolutionEditorStateInput {
  prerequisite?: {
    id?: number
    href?: string
    title: string
  }
  strategy: ConvertNode
  steps: ConvertNode
}

function createSolutionData(
  solution: BareExercise['solution'] | undefined
): BareSolution {
  const raw = solution?.currentRevision?.content

  if (!raw || !raw.startsWith('{'))
    return { edtrState: { strategy: [], steps: [] }, trashed: true }
  const solutionState = (
    JSON.parse(raw) as { plugin: ''; state: SolutionEditorStateInput }
  ).state

  const strategy = convert(solutionState.strategy)

  return {
    edtrState: {
      ...solutionState,
      // compat: (probably quite fragile) if strategy is empty, we ignore it
      strategy: hasVisibleContent(strategy) ? strategy : [],
      steps: convert(solutionState.steps),
    },
    trashed: solution?.trashed ? true : false,
    license: (solution && createInlineLicense(solution.license)) ?? undefined,
  }
}

export function createSolution(
  uuid: Extract<
    NonNullable<RevisionUuidQuery['uuid']>,
    { __typename: 'SolutionRevision' }
  >
): FrontendSolutionNode {
  return {
    type: FrontendNodeType.Solution,
    solution: createSolutionData({
      __typename: UuidType.Solution,
      license: uuid.repository.license,
      id: uuid.id,
      trashed: uuid.trashed,
      currentRevision: uuid.repository.currentRevision,
    }),
    context: {
      id: uuid.id,
    },
    href: uuid.repository.alias,
  }
}

export function createExerciseGroup(
  uuid: Omit<
    Extract<MainUuidType, { __typename: 'ExerciseGroup' }>,
    'date' | 'taxonomyTerms'
  >,
  pageIndex?: number
): FrontendExerciseGroupNode {
  const children: FrontendExerciseNode[] = []
  let groupIndex = 0
  if (uuid.exercises?.length > 0) {
    uuid.exercises.forEach((exercise) => {
      if (!exercise.currentRevision) return
      if (exercise.trashed) return
      const exerciseNode = createExercise(exercise)
      exerciseNode.grouped = true
      exerciseNode.positionInGroup = groupIndex++
      exerciseNode.positionOnPage = pageIndex // compat: page index also to grouped exercise for id generation
      exerciseNode.context.parent = uuid.id
      exerciseNode.context.revisionId = uuid.currentRevision?.id ?? -1
      children.push(exerciseNode)
    })
  }

  return {
    type: FrontendNodeType.ExerciseGroup,
    content: convertStateStringToFrontendNode(uuid.currentRevision?.content),
    positionOnPage: pageIndex,
    license: createInlineLicense(uuid.license),
    children,
    context: {
      id: uuid.id,
    },
    href: uuid.alias,
    unrevisedRevisions: uuid.revisions?.totalCount,
  }
}
