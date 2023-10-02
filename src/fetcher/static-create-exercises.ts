import { MainUuidType } from './query-types'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorExercisePlugin,
  EditorRowsPlugin,
  EditorSolutionPlugin,
  EditorTemplateGroupedExercise,
} from '@/serlo-editor-integration/types/editor-plugins'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

type BareExercise = Omit<
  Extract<MainUuidType, { __typename: 'Exercise' | 'GroupedExercise' }>,
  'exerciseGroup' | '__typename' | 'instance'
>

export function staticCreateExercise(
  uuid: BareExercise
  // index?: number
): [] | [EditorExercisePlugin] | [EditorExercisePlugin, EditorSolutionPlugin] {
  if (uuid.trashed) return [] // for now

  if (!uuid.currentRevision?.content) return []
  // grouped: false,
  // positionOnPage: index,
  //license: createInlineLicense(uuid.license),
  // content: createTaskData(uuid.currentRevision?.content),

  // compat: shuffle interactive answers with shuffleArray

  //solution: createSolutionData(uuid.solution),
  //  context: {
  //     id: uuid.id,
  //     solutionId: uuid.solution?.id,
  //     revisionId: uuid.currentRevision?.id ?? -1,
  //   },
  // href: uuid.alias, ??
  // unrevisedRevisions: uuid.revisions?.totalCount,

  const exercise: EditorExercisePlugin = {
    plugin: EditorPluginType.Exercise,
    state: {
      content: JSON.parse(uuid.currentRevision?.content) as EditorRowsPlugin,
      interactive: undefined,
    },
  }

  const solution = uuid.solution?.currentRevision?.content
    ? (JSON.parse(
        uuid.solution?.currentRevision?.content
      ) as EditorSolutionPlugin)
    : undefined

  return solution ? [exercise, solution] : [exercise]
}

export function createStaticExerciseGroup(
  uuid: Omit<
    Extract<MainUuidType, { __typename: 'ExerciseGroup' }>,
    'date' | 'taxonomyTerms'
  >
  // pageIndex?: number
): [EditorTemplateGroupedExercise] | [] {
  // const children: FrontendExerciseNode[] = []
  // let groupIndex = 0
  // if (uuid.exercises?.length > 0) {
  //   uuid.exercises.forEach((exercise) => {
  //     if (!exercise.currentRevision) return
  //     if (exercise.trashed) return
  //     const exerciseNode = staticCreateExercise(exercise)
  //     // exerciseNode.grouped = true
  //     exerciseNode.positionInGroup = groupIndex++
  //     exerciseNode.positionOnPage = pageIndex // compat: page index also to grouped exercise for id generation
  //     exerciseNode.context.parent = uuid.id
  //     exerciseNode.context.revisionId = uuid.currentRevision?.id ?? -1
  //     children.push(exerciseNode)
  //   })
  // }

  // return {
  //   type: FrontendNodeType.ExerciseGroup,
  //   content: convertStateStringToFrontendNode(uuid.currentRevision?.content),
  //   positionOnPage: pageIndex,
  //   license: createInlineLicense(uuid.license),
  //   children,
  //   context: {
  //     id: uuid.id,
  //   },
  //   href: uuid.alias,
  //   unrevisedRevisions: uuid.revisions?.totalCount,
  // }

  if (!uuid.currentRevision?.content) return []

  const exercisesWithSolutions = uuid.exercises.map((exercise) => {
    if (!exercise.currentRevision) return []
    const exerciseContent = JSON.parse(
      exercise.currentRevision?.content
    ) as EditorExercisePlugin
    const solutionContent = exercise.solution?.currentRevision?.content
      ? (JSON.parse(
          exercise.solution?.currentRevision?.content
        ) as EditorSolutionPlugin)
      : undefined

    return solutionContent
      ? [exerciseContent, solutionContent]
      : [exerciseContent]
  })

  return [
    {
      plugin: TemplatePluginType.TextExerciseGroup,
      state: {
        // @ts-expect-error not sure why string is expected here
        content: JSON.parse(uuid.currentRevision.content) as EditorRowsPlugin,
        // solutions are not really part of the state at this point, but cleaner this way
        // @ts-expect-error investigate
        exercisesWithSolutions: exercisesWithSolutions,
      },
    },
  ]
}
