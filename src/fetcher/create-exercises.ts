import { convertStateStringToFrontendNode } from './convert-state-string-to-frontend-node'
import { createInlineLicense } from './create-inline-license'
import { RevisionUuidQuery } from './graphql-types/operations'
import { MainUuidType } from './query-types'
import { UuidType } from '@/data-types'
import {
  FrontendExerciseNode,
  FrontendContentNode,
  TaskEditorState,
  SolutionEditorState,
  FrontendExerciseGroupNode,
  FrontendSolutionNode,
  FrontendNodeType,
} from '@/frontend-node-types'
import { hasVisibleContent } from '@/helper/has-visible-content'
import { shuffleArray } from '@/helper/shuffle-array'
import { convert, ConvertNode } from '@/schema/convert-edtr-io-state'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

type BareExercise = Omit<
  Extract<MainUuidType, { __typename: 'Exercise' | 'GroupedExercise' }>,
  'exerciseGroup' | '__typename' | 'instance'
>

export function createExercise(
  uuid: BareExercise,
  index?: number
): FrontendExerciseNode {
  let taskLegacy: FrontendContentNode[] | undefined = undefined
  let taskEdtrState: TaskEditorState | undefined = undefined
  const content = uuid.currentRevision?.content
  if (content) {
    if (content.startsWith('{')) {
      // special case here: we know it's a edtr-io exercise
      // and we use this knowledge to convert subentries
      const taskState = (JSON.parse(content) as { state: TaskEditorState })
        .state

      if (taskState.content) {
        taskState.content = convert(taskState.content)
        if (taskState.interactive?.plugin === EditorPluginType.ScMcExercise) {
          taskState.interactive.state.answers.forEach((answer, i: number) => {
            answer.feedback = convert(answer.feedback)
            answer.content = convert(answer.content)
            answer.originalIndex = i
          })
          taskState.interactive.state.answers = shuffleArray(
            taskState.interactive.state.answers
          )
        } else if (
          taskState.interactive?.plugin === EditorPluginType.InputExercise
        ) {
          taskState.interactive.state.answers.forEach((answer) => {
            answer.feedback = convert(answer.feedback)
          })
        }
        taskEdtrState = taskState
      } else {
        // @ts-expect-error some weird edge cases where task has no content (e.g. 117384)
        taskLegacy = convert(taskState)
      }
    } else {
      taskLegacy = convertStateStringToFrontendNode(content)
    }
  }
  return {
    type: FrontendNodeType.Exercise,
    grouped: false,
    positionOnPage: index,
    trashed: uuid.trashed,
    task: {
      legacy: taskLegacy,
      edtrState: taskEdtrState,
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

function createSolutionData(solution: BareExercise['solution']) {
  let solutionLegacy: FrontendContentNode[] | undefined = undefined
  let solutionEdtrState: SolutionEditorState | undefined = undefined
  const content = solution?.currentRevision?.content
  if (content) {
    if (content.startsWith('{')) {
      const contentJson = JSON.parse(content) as
        | { plugin: EditorPluginType.Rows }
        | { plugin: ''; state: SolutionEditorState }
      if (contentJson.plugin === EditorPluginType.Rows) {
        // half converted, like 189579
        solutionLegacy = convert(contentJson as ConvertNode)
      } else {
        // special case here: we know it's a edtr-io solution
        const solutionState = contentJson.state
        solutionState.strategy = convert(solutionState.strategy)
        // compat: (probably quite fragile) if strategy is empty, we ignore it
        if (!hasVisibleContent(solutionState.strategy)) {
          solutionState.strategy = []
        }
        solutionState.steps = convert(solutionState.steps)
        solutionEdtrState = solutionState
      }
    } else {
      solutionLegacy = convertStateStringToFrontendNode(content)
    }
  }
  return {
    legacy: solutionLegacy,
    edtrState: solutionEdtrState,
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
    /* not part of the schema anymore, obsolete? unrevisedRevisions: uuid.unrevisedRevisions, */
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
