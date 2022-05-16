// eslint-disable-next-line import/no-internal-modules
import { StateType, StateTypeSerializedType } from '@edtr-io/plugin'
import {
  convert,
  isEdtr,
  Edtr,
  Legacy,
  RowsPlugin,
  OtherPlugin,
  Splish,
} from '@serlo/legacy-editor-to-editor'

import { appletTypeState } from './plugins/types/applet'
import { articleTypeState } from './plugins/types/article'
import { Entity, License, Uuid } from './plugins/types/common/common'
import { courseTypeState } from './plugins/types/course'
import { coursePageTypeState } from './plugins/types/course-page'
import { eventTypeState } from './plugins/types/event'
import { pageTypeState } from './plugins/types/page'
import { taxonomyTypeState } from './plugins/types/taxonomy'
import { textExerciseTypeState } from './plugins/types/text-exercise'
import { textExerciseGroupTypeState } from './plugins/types/text-exercise-group'
import { textSolutionTypeState } from './plugins/types/text-solution'
import { userTypeState } from './plugins/types/user'
import { videoTypeState } from './plugins/types/video'
import { User, MainUuidType } from '@/fetcher/query-types'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { triggerSentry } from '@/helper/trigger-sentry'

const empty: RowsPlugin = { plugin: 'rows', state: [] }

// converts query response to deserialized editor state
export function editorResponseToState(uuid: MainUuidType): DeserializeResult {
  const stack: { id: number; type: string }[] = []

  const config: Record<
    string,
    { convert: (state: any) => DeserializedState<StateType> }
  > = {
    Applet: { convert: convertApplet },
    Article: { convert: convertArticle },
    Course: { convert: convertCourse },
    CoursePage: { convert: convertCoursePage },
    Event: { convert: convertEvent },
    Page: { convert: convertPage },
    GroupedExercise: { convert: convertTextExercise },
    Exercise: { convert: convertTextExercise },
    ExerciseGroup: { convert: convertTextExerciseGroup },
    Solution: { convert: convertTextSolution },
    User: { convert: convertUser },
    Video: { convert: convertVideo },
    TaxonomyTerm: { convert: convertTaxonomy },
  }

  const license =
    'license' in uuid
      ? {
          id: uuid.license.id,
          title: uuid.license.title,
          url: uuid.license.url,
          agreement: uuid.license.agreement,
          iconHref: uuid.license.iconHref,
        }
      : undefined
  const { id } = uuid

  const currentRev =
    'currentRevision' in uuid ? uuid.currentRevision : undefined
  const title = currentRev && 'title' in currentRev ? currentRev.title : ''
  const content =
    currentRev && 'content' in currentRev ? currentRev.content : ''
  const meta_title =
    currentRev && hasOwnPropertyTs(currentRev, 'metaTitle')
      ? currentRev.metaTitle
      : ''
  const meta_description =
    currentRev && hasOwnPropertyTs(currentRev, 'metaDescription')
      ? currentRev.metaDescription
      : ''
  const revision =
    currentRev && hasOwnPropertyTs(currentRev, 'id') ? currentRev.id : 0

  const entityFields = {
    id,
    license: license!,
  }

  try {
    if (config[uuid.__typename] === undefined) {
      return {
        error: 'type-unsupported',
      }
    }
    const { convert } = config[uuid.__typename]
    return convert(uuid)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    triggerSentry({
      message: `error while converting: ${JSON.stringify(stack)}`,
    })

    return {
      error: 'failure',
    }
  }

  function convertApplet(
    uuid: Extract<MainUuidType, { __typename: 'Applet' }>
  ): DeserializedState<typeof appletTypeState> {
    stack.push({ id: uuid.id, type: 'applet' })
    return {
      initialState: {
        plugin: 'type-applet',
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          url: uuid.currentRevision?.url || '',
          content: serializeEditorState(toEdtr(convertEditorState(content))),
          meta_title,
          meta_description,
        },
      },
      converted: false, // no legacy any more
    }
  }

  function convertArticle(
    uuid: Extract<MainUuidType, { __typename: 'Article' }>
  ): DeserializedState<typeof articleTypeState> {
    stack.push({ id: uuid.id, type: 'article' })
    return {
      initialState: {
        plugin: 'type-article',
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          content: getContent(),
          meta_title,
          meta_description,
        },
      },
      converted: !isEdtr(convertEditorState(content) || empty),
    }

    function getContent() {
      const convertdContent = convertEditorState(content)

      const convertedContent = toEdtr(convertdContent) as
        | RowsPlugin
        | OtherPlugin

      if (
        convertdContent !== undefined &&
        isEdtr(convertdContent) &&
        convertedContent.plugin === 'article'
      ) {
        return serializeEditorState(convertedContent)
      }

      return serializeEditorState({
        plugin: 'article',
        state: {
          introduction: { plugin: 'articleIntroduction' },
          content: convertedContent,
          exercises: [],
          exerciseFolder: { id: '', title: '' },
          relatedContent: {
            articles: [],
            courses: [],
            videos: [],
          },
          sources: [],
        },
      })
    }
  }

  function convertCourse(
    uuid: Extract<MainUuidType, { __typename: 'Course' }>
  ): DeserializedState<typeof courseTypeState> {
    stack.push({ id: uuid.id, type: 'course' })
    return {
      initialState: {
        plugin: 'type-course',
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          description: serializeEditorState(
            toEdtr(convertEditorState(content))
          ),
          meta_description,
          'course-page': (uuid.pages || [])
            .filter((page) => page.currentRevision !== null)
            .map((page) => {
              return convertCoursePage({
                ...page,
                currentRevision: {
                  id: page.id,
                  title: page.currentRevision?.title ?? '',
                  content: page.currentRevision?.content ?? '',
                  date: '', // not used
                },
              }).initialState.state
            }),
        },
      },
      converted: !isEdtr(convertEditorState(content ?? '') || empty),
    }
  }

  function convertCoursePage(
    uuid: Pick<
      Extract<MainUuidType, { __typename: 'CoursePage' }>,
      'id' | 'currentRevision'
    >
  ): DeserializedState<typeof coursePageTypeState> {
    stack.push({ id: uuid.id, type: 'course-page' })
    return {
      initialState: {
        plugin: 'type-course-page',
        state: {
          id: uuid.id,
          license: license!, // there could be cases where this is not correct
          revision,
          changes: '',
          title: uuid.currentRevision?.title || '',
          content: serializeEditorState(
            toEdtr(convertEditorState(uuid.currentRevision?.content || ''))
          ),
        },
      },
      converted: !isEdtr(
        convertEditorState(uuid.currentRevision?.content || '') || empty
      ),
    }
  }

  function convertEvent(
    uuid: Extract<MainUuidType, { __typename: 'Event' }>
  ): DeserializedState<typeof eventTypeState> {
    stack.push({ id: uuid.id, type: 'event' })
    return {
      initialState: {
        plugin: 'type-event',
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          content: serializeEditorState(toEdtr(convertEditorState(content))),
          meta_title,
          meta_description,
        },
      },
      converted: false, // no legacy any more
    }
  }

  function convertPage(
    uuid: Extract<MainUuidType, { __typename: 'Page' }>
  ): DeserializedState<typeof pageTypeState> {
    stack.push({ id: uuid.id, type: 'page' })
    return {
      initialState: {
        plugin: 'type-page',
        state: {
          ...entityFields,
          title,
          content: serializeEditorState(toEdtr(convertEditorState(content))),
        },
      },
      converted: !isEdtr(convertEditorState(content) || empty),
    }
  }

  function convertTaxonomy(
    uuid: Extract<MainUuidType, { __typename: 'TaxonomyTerm' }>
  ): DeserializedState<typeof taxonomyTypeState> {
    stack.push({ id: uuid.id, type: 'taxonomy' })
    return {
      initialState: {
        plugin: 'type-taxonomy',
        state: {
          id: uuid.id,
          parent: uuid.parent?.id ?? 0,
          position: uuid.weight,
          taxonomy: uuid.taxonomyId,
          term: {
            name: uuid.name,
          },
          description: serializeEditorState(
            toEdtr(convertEditorState(uuid.description ?? ''))
          ),
        },
      },
      converted: false, // no legacy editor for taxonomies
    }
  }

  function convertTextExercise(
    uuid: Extract<MainUuidType, { __typename: 'Exercise' }>
  ): DeserializedState<typeof textExerciseTypeState> {
    stack.push({ id: uuid.id, type: 'text-exercise' })
    const convertd = convertEditorState(content)

    return {
      initialState: {
        plugin: 'type-text-exercise',
        state: {
          id: uuid.id,
          license: license!,
          changes: '',
          revision,
          'text-solution':
            uuid.solution && !uuid.solution.trashed
              ? convertTextSolution({
                  ...uuid.solution,
                  __typename: 'Solution',
                  instance: uuid.instance,
                  exercise: uuid,
                }).initialState.state
              : '',
          content: getContent(),
        },
      },
      converted: !isEdtr(convertd || empty),
    }

    function getContent() {
      const convertdContent = convertEditorState(
        uuid.currentRevision?.content ?? ''
      )
      if (convertdContent !== undefined && isEdtr(convertdContent)) {
        return serializeEditorState(toEdtr(convertdContent))
      }

      const convertedContent = toEdtr(convertdContent) // RowsPlugin

      return serializeEditorState({
        plugin: 'exercise',
        state: {
          content: {
            plugin: 'rows',
            state: convertedContent.state,
          },
          interactive: undefined,
        },
      })
    }
  }

  function convertTextExerciseGroup(
    uuid: Extract<MainUuidType, { __typename: 'ExerciseGroup' }>
  ): DeserializedState<typeof textExerciseGroupTypeState> {
    stack.push({ id: uuid.id, type: 'text-exercise-group' })

    const exercises = uuid.exercises
      .filter((exercise) => exercise.trashed === false)
      .map((exercise) => {
        return convertTextExercise({
          ...exercise,
          __typename: 'Exercise',
          taxonomyTerms: { nodes: [] },
          revisions: {
            __typename: 'ExerciseRevisionConnection',
            totalCount: -1,
          },
          currentRevision: {
            ...exercise.currentRevision,
            __typename: 'ExerciseRevision',
            content: exercise.currentRevision?.content ?? '',
            date: '',
          },
        }).initialState.state
      })

    return {
      initialState: {
        plugin: 'type-text-exercise-group',
        state: {
          ...entityFields,
          changes: '',
          revision,
          content: serializeEditorState(toEdtr(convertEditorState(content))),
          cohesive: uuid.currentRevision?.cohesive ?? false,
          'grouped-text-exercise': exercises,
        },
      },
      converted: !isEdtr(convertEditorState(content) || empty),
    }
  }

  function convertTextSolution(
    uuid: Extract<MainUuidType, { __typename: 'Solution' }>
  ): DeserializedState<typeof textSolutionTypeState> {
    stack.push({ id: uuid.id, type: 'text-solution' })

    const solutionContent = uuid.currentRevision?.content ?? ''
    return {
      initialState: {
        plugin: 'type-text-solution',
        state: {
          id: uuid.id,
          license: license!,
          revision,
          changes: '',
          content: getContent(),
        },
      },
      converted: !isEdtr(convertEditorState(solutionContent) || empty),
    }

    function getContent() {
      const convertdContent = convertEditorState(solutionContent)
      if (convertdContent !== undefined && isEdtr(convertdContent)) {
        return serializeEditorState(toEdtr(convertdContent))
      }

      const convertedContent = toEdtr(convertdContent) // RowsPlugin

      return serializeEditorState({
        plugin: 'solution',
        state: {
          prerequisite: undefined,
          strategy: { plugin: 'text' },
          steps: convertedContent,
        },
      })
    }
  }

  function convertUser(uuid: User): DeserializedState<typeof userTypeState> {
    stack.push({ id: uuid.id, type: 'user' })
    return convertUserByDescription(uuid.description)
  }

  function convertVideo(
    uuid: Extract<MainUuidType, { __typename: 'Video' }>
  ): DeserializedState<typeof videoTypeState> {
    stack.push({ id: uuid.id, type: 'video' })
    return {
      initialState: {
        plugin: 'type-video',
        state: {
          ...entityFields,
          changes: '',
          title,
          revision,
          description: serializeEditorState(
            toEdtr(convertEditorState(content))
          ),
          content: uuid.currentRevision?.url ?? '',
        },
      },
      converted: false, // no legacy videos any more
    }
  }
}

export function convertUserByDescription(description?: string | null) {
  return {
    initialState: {
      plugin: 'type-user',
      state: {
        description: serializeEditorState(
          toEdtr(convertEditorState(description ?? ''))
        ),
      },
    },
    converted: false, // no legacy-editor for users
  }
}

export interface AppletSerializedState extends Entity {
  __typename?: 'Applet'
  title?: string
  url?: string
  content: SerializedEditorState
  reasoning?: SerializedEditorState
  meta_title?: string
  meta_description?: string
}

export interface ArticleSerializedState extends Entity {
  __typename?: 'Article'
  title?: string
  content: SerializedEditorState
  reasoning?: SerializedEditorState
  meta_title?: string
  meta_description?: string
}

export interface CourseSerializedState extends Entity {
  __typename?: 'Course'
  title?: string
  description: SerializedEditorState
  content?: SerializedEditorState // just to simplify types, will not be set
  reasoning?: SerializedEditorState
  meta_description?: string
  'course-page'?: CoursePageSerializedState[]
}

export interface CoursePageSerializedState extends Entity {
  __typename?: 'CoursePage'
  title?: string
  icon?: 'explanation' | 'play' | 'question'
  content: SerializedEditorState
}

export interface EventSerializedState extends Entity {
  __typename?: 'Event'
  title?: string
  content: SerializedEditorState
  meta_title?: string
  meta_description?: string
}

export interface PageSerializedState extends Uuid, License {
  __typename?: 'Page'
  title?: string
  content: SerializedEditorState
}

export interface TaxonomySerializedState extends Uuid {
  __typename?: 'Taxonomy'
  term: {
    name: string
  }
  description: SerializedEditorState
  taxonomy: number
  parent: number
  position: number
}

export interface TextExerciseSerializedState extends Entity {
  __typename?: 'Exercise'
  content: SerializedEditorState
  'text-solution'?: TextSolutionSerializedState
  'single-choice-right-answer'?: {
    content: SerializedLegacyEditorState
    feedback: SerializedLegacyEditorState
  }
  'single-choice-wrong-answer'?: {
    content: SerializedLegacyEditorState
    feedback: SerializedLegacyEditorState
  }[]
  'multiple-choice-right-answer'?: { content: SerializedLegacyEditorState }[]
  'multiple-choice-wrong-answer'?: {
    content: SerializedLegacyEditorState
    feedback: SerializedLegacyEditorState
  }[]
  'input-expression-equal-match-challenge'?: InputType
  'input-number-exact-match-challenge'?: InputType
  'input-string-normalized-match-challenge': InputType
}

interface InputType {
  solution: string
  feedback: SerializedLegacyEditorState
  'input-expression-equal-match-challenge'?: InputType[]
  'input-number-exact-match-challenge'?: InputType[]
  'input-string-normalized-match-challenge'?: InputType[]
}

export interface TextExerciseGroupSerializedState extends Entity {
  __typename?: 'ExerciseGroup'
  cohesive?: string
  content: SerializedEditorState
  'grouped-text-exercise'?: TextExerciseSerializedState[]
}

export interface TextSolutionSerializedState extends Entity {
  __typename?: 'Solution'
  content: SerializedEditorState
}

export interface UserSerializedState extends Uuid {
  __typename?: 'User'
  description: SerializedEditorState
}

export interface VideoSerializedState extends Entity {
  __typename?: 'Video'
  title?: string
  description: SerializedEditorState
  content?: string
  reasoning?: SerializedEditorState
}

export interface DeserializedState<T extends StateType> {
  initialState: {
    plugin: string
    state?: StateTypeSerializedType<T>
  }
  converted: boolean
}

export function isError(result: DeserializeResult): result is DeserializeError {
  return !!(result as DeserializeError).error
}

export type DeserializeResult = DeserializeSuccess | DeserializeError
export type DeserializeSuccess = DeserializedState<StateType<unknown>>
export type DeserializeError =
  | { error: 'type-unsupported' }
  | { error: 'failure' }

function toEdtr(content: EditorState): Edtr {
  if (!content)
    return { plugin: 'rows', state: [{ plugin: 'text', state: undefined }] }
  if (isEdtr(content)) return content

  // fixes https://github.com/serlo/frontend/issues/1563
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const sanitized = JSON.parse(JSON.stringify(content).replace(/```/g, ''))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return convert(sanitized)
}

function serializeEditorState(content: Legacy): SerializedLegacyEditorState
function serializeEditorState(content: EditorState): SerializedEditorState
function serializeEditorState(
  content: EditorState
): SerializedEditorState | SerializedLegacyEditorState | string | undefined {
  if (typeof content === 'string') return content as SerializedLegacyEditorState
  return content ? JSON.stringify(content) : undefined
}

function convertEditorState(content: SerializedLegacyEditorState): Legacy
function convertEditorState(content: SerializedEditorState): EditorState
function convertEditorState(
  content: SerializedLegacyEditorState | SerializedEditorState
): EditorState | string | undefined {
  try {
    return content ? (JSON.parse(content) as EditorState) : undefined
  } catch {
    // No valid JSON, so this is interpreted as Markdown
    return content as Legacy
  }
}

type EditorState = Legacy | Splish | Edtr | undefined

// Fake `__type` property is just here to let TypeScript distinguish between the types
type SerializedEditorState = (string | undefined) & {
  __type?: 'serialized-editor-state'
}
type SerializedLegacyEditorState = (string | undefined) & {
  __type?: 'serialized-legacy-editor-state'
}
