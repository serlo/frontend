import { EditorPluginType } from './types/editor-plugin-type'
import type { AnyEditorDocument } from './types/editor-plugins'
import { TemplatePluginType } from './types/template-plugin-type'
import type { AppletTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/applet'
import type { ArticleTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/article'
import {
  type Entity,
  type License,
  type Uuid,
} from '../serlo-editor/plugins/serlo-template-plugins/common/common'
import type { CourseTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/course/course'
import type { CoursePageTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/course/course-page'
import type { EventTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/event'
import type { TextExerciseGroupTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
import type { PageTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/page'
import type { TaxonomyTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/taxonomy'
import type { TextExerciseTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/text-exercise'
import type { TextSolutionTypeState } from '../serlo-editor/plugins/serlo-template-plugins/text-solution'
import type { UserTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/user'
import type { VideoTypePluginState } from '../serlo-editor/plugins/serlo-template-plugins/video'
import { UuidType, UuidRevType } from '@/data-types'
import type { User, MainUuidType } from '@/fetcher/query-types'
import { triggerSentry } from '@/helper/trigger-sentry'
import type { StateType, StateTypeStaticType } from '@/serlo-editor/plugin'

/** Converts graphql query response to deserialized editor state **/
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
          shortTitle: uuid.license.shortTitle,
          url: uuid.license.url,
          agreement: uuid.license.agreement,
        }
      : undefined
  const { id } = uuid

  const currentRev =
    'currentRevision' in uuid ? uuid.currentRevision : undefined
  const title = currentRev && 'title' in currentRev ? currentRev.title : ''
  const content =
    currentRev && 'content' in currentRev ? currentRev.content : ''
  const meta_title =
    currentRev && Object.hasOwn(currentRev, 'metaTitle')
      ? currentRev.metaTitle
      : ''
  const meta_description =
    currentRev && Object.hasOwn(currentRev, 'metaDescription')
      ? currentRev.metaDescription
      : ''
  const revision =
    currentRev && Object.hasOwn(currentRev, 'id') ? currentRev.id : 0

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
    console.error(e)

    triggerSentry({
      message: `error while converting: ${JSON.stringify(stack)}`,
    })

    return {
      error: 'failure',
    }
  }

  function convertApplet(
    uuid: Extract<MainUuidType, { __typename: 'Applet' }>
  ): DeserializedState<AppletTypePluginState> {
    stack.push({ id: uuid.id, type: 'applet' })
    return {
      initialState: {
        plugin: TemplatePluginType.Applet,
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          url: uuid.currentRevision?.url || '',
          content: serializeEditorState(parseSerializedStatic(content)),
          meta_title,
          meta_description,
        },
      },
    }
  }

  function convertArticle(
    uuid: Extract<MainUuidType, { __typename: 'Article' }>
  ): DeserializedState<ArticleTypePluginState> {
    stack.push({ id: uuid.id, type: 'article' })
    return {
      initialState: {
        plugin: TemplatePluginType.Article,
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
    }

    function getContent() {
      const convertedContent = parseSerializedStatic(content)

      if (convertedContent?.plugin === EditorPluginType.Article) {
        return serializeEditorState(convertedContent)
      }
      // currently still needed. See https://serlo.slack.com/archives/CEB781NCU/p1695977868948869
      return serializeEditorState({
        plugin: EditorPluginType.Article,
        state: {
          introduction: { plugin: EditorPluginType.ArticleIntroduction },
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
  ): DeserializedState<CourseTypePluginState> {
    stack.push({ id: uuid.id, type: 'course' })
    return {
      initialState: {
        plugin: TemplatePluginType.Course,
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          description: serializeEditorState(parseSerializedStatic(content)),
          meta_description,
          'course-page': (uuid.pages || [])
            .filter((page) => page.currentRevision !== null)
            .map((page) => {
              return convertCoursePage({
                ...page,
                currentRevision: {
                  id: page.id,
                  alias: page.alias,
                  title: page.currentRevision?.title ?? '',
                  content: page.currentRevision?.content ?? '',
                  date: '', // not used
                },
              }).initialState.state
            }),
        },
      },
    }
  }

  function convertCoursePage(
    uuid: Pick<
      Extract<MainUuidType, { __typename: 'CoursePage' }>,
      'id' | 'currentRevision'
    >
  ): DeserializedState<CoursePageTypePluginState> {
    stack.push({ id: uuid.id, type: 'course-page' })
    return {
      initialState: {
        plugin: TemplatePluginType.CoursePage,
        state: {
          id: uuid.id,
          license: license!, // there could be cases where this is not correct
          revision,
          changes: '',
          icon: 'explanation',
          title: uuid.currentRevision?.title || '',
          content: serializeEditorState(
            parseSerializedStatic(uuid.currentRevision?.content || '')
          ),
        },
      },
    }
  }

  function convertEvent(
    uuid: Extract<MainUuidType, { __typename: 'Event' }>
  ): DeserializedState<EventTypePluginState> {
    stack.push({ id: uuid.id, type: 'event' })
    return {
      initialState: {
        plugin: TemplatePluginType.Event,
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          content: serializeEditorState(parseSerializedStatic(content)),
          meta_title,
          meta_description,
        },
      },
    }
  }

  function convertPage(
    uuid: Extract<MainUuidType, { __typename: 'Page' }>
  ): DeserializedState<PageTypePluginState> {
    stack.push({ id: uuid.id, type: 'page' })
    return {
      initialState: {
        plugin: TemplatePluginType.Page,
        state: {
          ...entityFields,
          title,
          content: serializeEditorState(parseSerializedStatic(content)),
        },
      },
    }
  }

  function convertTaxonomy(
    uuid: Extract<MainUuidType, { __typename: 'TaxonomyTerm' }>
  ): DeserializedState<TaxonomyTypePluginState> {
    stack.push({ id: uuid.id, type: 'taxonomy' })
    return {
      initialState: {
        plugin: TemplatePluginType.Taxonomy,
        state: {
          id: uuid.id,
          parent: uuid.parent?.id ?? 0,
          position: uuid.weight,
          taxonomy: uuid.taxonomyId,
          term: {
            name: uuid.name,
          },
          description: serializeEditorState(
            parseSerializedStatic(uuid.description ?? '')
          ),
        },
      },
    }
  }

  function convertTextExercise(
    uuid: Extract<MainUuidType, { __typename: 'Exercise' }>
  ): DeserializedState<TextExerciseTypePluginState> {
    stack.push({ id: uuid.id, type: 'text-exercise' })

    return {
      initialState: {
        plugin: TemplatePluginType.TextExercise,
        state: {
          id: uuid.id,
          license: license!,
          changes: '',
          revision,
          'text-solution':
            uuid.solution && !uuid.solution.trashed
              ? convertTextSolution({
                  ...uuid.solution,
                  alias: uuid.alias,
                  __typename: UuidType.Solution,
                  instance: uuid.instance,
                  exercise: uuid,
                }).initialState.state
              : '',
          content:
            serializeEditorState(
              parseSerializedStatic(uuid.currentRevision?.content)
            ) ?? '',
        },
      },
    }
  }

  function convertTextExerciseGroup(
    uuid: Extract<MainUuidType, { __typename: 'ExerciseGroup' }>
  ): DeserializedState<TextExerciseGroupTypePluginState> {
    stack.push({ id: uuid.id, type: 'text-exercise-group' })

    const exercises = uuid.exercises
      .filter((exercise) => exercise.trashed === false)
      .map((exercise) => {
        return convertTextExercise({
          ...exercise,
          __typename: UuidType.Exercise,
          taxonomyTerms: { nodes: [] },
          revisions: {
            __typename: 'ExerciseRevisionConnection',
            totalCount: -1,
          },
          currentRevision: {
            ...exercise.currentRevision,
            __typename: UuidRevType.Exercise,
            content: exercise.currentRevision?.content ?? '',
            date: '',
            id: -1,
          },
        }).initialState.state
      })

    return {
      initialState: {
        plugin: TemplatePluginType.TextExerciseGroup,
        state: {
          ...entityFields,
          changes: '',
          revision,
          content: serializeEditorState(parseSerializedStatic(content)),
          cohesive: uuid.currentRevision?.cohesive ?? false,
          'grouped-text-exercise': exercises,
        },
      },
    }
  }

  function convertTextSolution(
    uuid: Extract<MainUuidType, { __typename: 'Solution' }>
  ): DeserializedState<TextSolutionTypeState> {
    stack.push({ id: uuid.id, type: 'text-solution' })

    const solutionContent = uuid.currentRevision?.content ?? ''
    return {
      initialState: {
        plugin: TemplatePluginType.TextSolution,
        state: {
          id: uuid.id,
          license: license!,
          revision,
          changes: '',
          content: getContent(),
        },
      },
    }

    function getContent() {
      const convertdContent = parseSerializedStatic(solutionContent)
      if (convertdContent !== undefined) {
        return serializeEditorState(convertdContent)
      }

      return serializeEditorState({
        plugin: EditorPluginType.Solution,
        state: {
          prerequisite: undefined,
          strategy: { plugin: EditorPluginType.Text },
          steps: convertdContent,
        },
      })
    }
  }

  function convertUser(uuid: User): DeserializedState<UserTypePluginState> {
    stack.push({ id: uuid.id, type: 'user' })
    return convertUserByDescription(uuid.description)
  }

  function convertVideo(
    uuid: Extract<MainUuidType, { __typename: 'Video' }>
  ): DeserializedState<VideoTypePluginState> {
    stack.push({ id: uuid.id, type: EditorPluginType.Video })
    return {
      initialState: {
        plugin: TemplatePluginType.Video,
        state: {
          ...entityFields,
          changes: '',
          title,
          revision,
          description: serializeEditorState(parseSerializedStatic(content)),
          content: uuid.currentRevision?.url ?? '',
        },
      },
    }
  }
}

export function convertUserByDescription(description?: string | null) {
  return {
    initialState: {
      plugin: TemplatePluginType.User,
      state: {
        description: serializeEditorState(
          parseSerializedStatic(description ?? '')
        ),
      },
    },
  }
}

export interface AppletSerializedState extends Entity {
  __typename?: UuidType.Applet
  title?: string
  url?: string
  content: SerializedStaticState
  reasoning?: SerializedStaticState
  meta_title?: string
  meta_description?: string
}

export interface ArticleSerializedState extends Entity {
  __typename?: UuidType.Article
  title?: string
  content: SerializedStaticState
  reasoning?: SerializedStaticState
  meta_title?: string
  meta_description?: string
}

export interface CourseSerializedState extends Entity {
  __typename?: UuidType.Course
  title?: string
  description: SerializedStaticState
  content?: SerializedStaticState // just to simplify types, will not be set
  reasoning?: SerializedStaticState
  meta_description?: string
  'course-page'?: CoursePageSerializedState[]
}

export interface CoursePageSerializedState extends Entity {
  __typename?: UuidType.CoursePage
  title?: string
  icon?: 'explanation' | 'play' | 'question'
  content: SerializedStaticState
}

export interface EventSerializedState extends Entity {
  __typename?: UuidType.Event
  title?: string
  content: SerializedStaticState
  meta_title?: string
  meta_description?: string
}

export interface PageSerializedState extends Uuid, License {
  __typename?: UuidType.Page
  title?: string
  content: SerializedStaticState
}

export interface TaxonomySerializedState extends Uuid {
  __typename?: UuidType.TaxonomyTerm
  term: {
    name: string
  }
  description: SerializedStaticState
  taxonomy: number
  parent: number
  position: number
}

export interface TextExerciseSerializedState extends Entity {
  __typename?: UuidType.Exercise
  content: SerializedStaticState
  'text-solution'?: TextSolutionSerializedState
  'single-choice-right-answer'?: {
    content: SerializedStaticState
    feedback: SerializedStaticState
  }
  'single-choice-wrong-answer'?: {
    content: SerializedStaticState
    feedback: SerializedStaticState
  }[]
  'multiple-choice-right-answer'?: { content: SerializedStaticState }[]
  'multiple-choice-wrong-answer'?: {
    content: SerializedStaticState
    feedback: SerializedStaticState
  }[]
  'input-expression-equal-match-challenge'?: InputType
  'input-number-exact-match-challenge'?: InputType
  'input-string-normalized-match-challenge': InputType
}

interface InputType {
  solution: string
  feedback: SerializedStaticState
  'input-expression-equal-match-challenge'?: InputType[]
  'input-number-exact-match-challenge'?: InputType[]
  'input-string-normalized-match-challenge'?: InputType[]
}

export interface TextExerciseGroupSerializedState extends Entity {
  __typename?: UuidType.ExerciseGroup
  cohesive?: string
  content: SerializedStaticState
  'grouped-text-exercise'?: TextExerciseSerializedState[]
}

export interface TextSolutionSerializedState extends Entity {
  __typename?: UuidType.Solution
  content: SerializedStaticState
}

export interface UserSerializedState extends Uuid {
  __typename?: UuidType.User
  description: SerializedStaticState
}

export interface VideoSerializedState extends Entity {
  __typename?: UuidType.Video
  title?: string
  description: SerializedStaticState
  content?: string
  reasoning?: SerializedStaticState
}

export interface DeserializedState<T extends StateType> {
  initialState: {
    plugin: string
    state?: StateTypeStaticType<T>
    id?: string
  }
}

export function isError(result: DeserializeResult): result is DeserializeError {
  return !!(result as DeserializeError).error
}

/** actually serialized editor state */
type SerializedStaticState = string | undefined
type DeserializeResult = DeserializeSuccess | DeserializeError
type DeserializeSuccess = DeserializedState<StateType<unknown>>
export type DeserializeError =
  | { error: 'type-unsupported' }
  | { error: 'failure' }

function serializeEditorState(content?: AnyEditorDocument): string {
  if (typeof content === 'string') return content
  return JSON.stringify(
    content ?? {
      plugin: EditorPluginType.Rows,
      state: [{ plugin: EditorPluginType.Text, state: undefined }],
    }
  )
}

function parseSerializedStatic(
  content: SerializedStaticState
): AnyEditorDocument | undefined {
  if (!content) return undefined
  try {
    return JSON.parse(content) as AnyEditorDocument
  } catch {
    // No valid JSON, so we return nothing
    return undefined
  }
}
