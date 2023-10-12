import { MainUuidType } from './query-types'
import {
  EditorExerciseDocument,
  EditorRowsDocument,
  EditorSolutionDocument,
  EditorTemplateGroupedExerciseDocument,
} from '@/serlo-editor-integration/types/editor-plugins'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

type BareExercise = Omit<
  Extract<MainUuidType, { __typename: 'Exercise' | 'GroupedExercise' }>,
  'exerciseGroup' | '__typename' | 'instance'
>

export function staticCreateExercise(
  uuid: BareExercise
  // index?: number
):
  | []
  | [EditorExerciseDocument]
  | [EditorExerciseDocument, EditorSolutionDocument] {
  if (!uuid.currentRevision?.content) return []

  // compat: shuffle interactive answers with shuffleArray

  // positionOnPage: index,
  // href: uuid.alias, ??

  const exerciseWithContext = {
    ...(JSON.parse(uuid.currentRevision?.content) as EditorExerciseDocument),
    serloContext: {
      uuid: uuid.id,
      revisionId: uuid.currentRevision.id,
      trashed: uuid.trashed,
      grouped: false,
      unrevisedRevisions: uuid.revisions?.totalCount,
      license: uuid.license && !uuid.license.default ? uuid.license : undefined,
    },
  }
  const solutionRaw = uuid.solution?.currentRevision?.content
  const solution = solutionRaw
    ? (JSON.parse(solutionRaw) as EditorSolutionDocument)
    : undefined

  const solutionContext = solution
    ? {
        uuid: uuid.solution?.id,
        exerciseId: uuid.id,
        trashed: uuid.solution?.trashed,
        unrevisedRevisions: solution.serloContext?.unrevisedRevisions,
        license:
          uuid.solution?.license && !uuid.solution?.license.default
            ? uuid.solution?.license
            : undefined,
      }
    : undefined

  return solution
    ? [exerciseWithContext, { ...solution, serloContext: solutionContext }]
    : [exerciseWithContext]
}

export function createStaticExerciseGroup(
  uuid: Omit<
    Extract<MainUuidType, { __typename: 'ExerciseGroup' }>,
    'date' | 'taxonomyTerms'
  >
  // pageIndex?: number
): [EditorTemplateGroupedExerciseDocument] | [] {
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

  //   positionOnPage: pageIndex,
  //   license: createInlineLicense(uuid.license),
  //   href: uuid.alias,

  if (!uuid.currentRevision?.content) return []

  return [
    {
      plugin: TemplatePluginType.TextExerciseGroup,
      state: {
        // @ts-expect-error not sure why string is expected here
        content: JSON.parse(uuid.currentRevision.content) as EditorRowsDocument,
        // solutions are not really part of the state at this point, but cleaner this way
        exercisesWithSolutions: uuid.exercises.map(staticCreateExercise),
      },
      serloContext: {
        uuid: uuid.id,
        trashed: uuid.trashed,
        unrevisedRevisions: uuid.revisions.totalCount,
      },
    },
  ]
}
