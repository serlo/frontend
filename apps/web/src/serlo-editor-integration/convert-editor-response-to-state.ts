import type { StateType, StateTypeStaticType } from '@serlo/editor/src/plugin'
import type { AppletTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/applet'
import type { ArticleTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/article'
import {
  type Entity,
  type Uuid,
} from '@serlo/editor/src/plugins/serlo-template-plugins/common/common'
import type { CourseTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/course/course'
import type { CoursePageTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/course/course-page'
import type { EventTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/event'
import type { TextExerciseGroupTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
import type { PageTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/page'
import type { TaxonomyTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/taxonomy'
import type { TextExerciseTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/text-exercise'
import type { UserTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/user'
import type { VideoTypePluginState } from '@serlo/editor/src/plugins/serlo-template-plugins/video'
import { EditorPluginType } from '@serlo/editor/src/types/editor-plugin-type'
import type { AnyEditorDocument } from '@serlo/editor/src/types/editor-plugins'
import { TemplatePluginType } from '@serlo/editor/src/types/template-plugin-type'

import { UuidType, UuidRevType } from '@/data-types'
import type { User, MainUuidType } from '@/fetcher/query-types'
import { triggerSentry } from '@/helper/trigger-sentry'

/** Converts graphql query response to static editor document */
export function convertEditorResponseToState(
  uuid: MainUuidType
): DeserializedStaticResult {
  const stack: { id: number; type: string }[] = []

  const config: Record<
    string,
    { convert: (state: any) => StaticDocument<StateType> }
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
    User: { convert: convertUser },
    Video: { convert: convertVideo },
    TaxonomyTerm: { convert: convertTaxonomy },
  }

  const licenseId = Object.hasOwn(uuid, 'license') ? uuid.license.id : undefined

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
    licenseId,
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
  ): StaticDocument<AppletTypePluginState> {
    stack.push({ id: uuid.id, type: 'applet' })
    return {
      plugin: TemplatePluginType.Applet,
      state: {
        ...entityFields,
        revision,
        changes: '',
        title,
        url: uuid.currentRevision?.url || '',
        content: serializeStaticDocument(parseStaticString(content)),
        meta_title,
        meta_description,
      },
    }
  }

  function convertArticle(
    uuid: Extract<MainUuidType, { __typename: 'Article' }>
  ): StaticDocument<ArticleTypePluginState> {
    stack.push({ id: uuid.id, type: 'article' })
    return {
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
    }

    function getContent() {
      const convertedContent = parseStaticString(content)

      if (convertedContent?.plugin === EditorPluginType.Article) {
        return serializeStaticDocument(convertedContent)
      }
      // currently still needed. See https://serlo.slack.com/archives/CEB781NCU/p1695977868948869
      return serializeStaticDocument({
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
  ): StaticDocument<CourseTypePluginState> {
    stack.push({ id: uuid.id, type: 'course' })
    return {
      plugin: TemplatePluginType.Course,
      state: {
        ...entityFields,
        revision,
        changes: '',
        title,
        description: serializeStaticDocument(parseStaticString(content)),
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
            }).state
          }),
      },
    }
  }

  function convertCoursePage(
    uuid: Pick<
      Extract<MainUuidType, { __typename: 'CoursePage' }>,
      'id' | 'currentRevision'
    >
  ): StaticDocument<CoursePageTypePluginState> {
    stack.push({ id: uuid.id, type: 'course-page' })
    return {
      plugin: TemplatePluginType.CoursePage,
      state: {
        id: uuid.id,
        licenseId,
        revision,
        changes: '',
        icon: 'explanation',
        title: uuid.currentRevision?.title || '',
        content: serializeStaticDocument(
          parseStaticString(uuid.currentRevision?.content || '')
        ),
      },
    }
  }

  function convertEvent(
    uuid: Extract<MainUuidType, { __typename: 'Event' }>
  ): StaticDocument<EventTypePluginState> {
    stack.push({ id: uuid.id, type: 'event' })
    return {
      plugin: TemplatePluginType.Event,
      state: {
        ...entityFields,
        revision,
        changes: '',
        title,
        content: serializeStaticDocument(parseStaticString(content)),
        meta_title,
        meta_description,
      },
    }
  }

  function convertPage(
    uuid: Extract<MainUuidType, { __typename: 'Page' }>
  ): StaticDocument<PageTypePluginState> {
    stack.push({ id: uuid.id, type: 'page' })
    return {
      plugin: TemplatePluginType.Page,
      state: {
        ...entityFields,
        title,
        content: serializeStaticDocument(parseStaticString(content)),
      },
    }
  }

  function convertTaxonomy(
    uuid: Extract<MainUuidType, { __typename: 'TaxonomyTerm' }>
  ): StaticDocument<TaxonomyTypePluginState> {
    stack.push({ id: uuid.id, type: 'taxonomy' })
    return {
      plugin: TemplatePluginType.Taxonomy,
      state: {
        id: uuid.id,
        parent: uuid.parent?.id ?? 0,
        position: uuid.weight,
        taxonomy: uuid.taxonomyId,
        term: {
          name: uuid.name,
        },
        description: serializeStaticDocument(
          parseStaticString(uuid.description ?? '')
        ),
      },
    }
  }

  function convertTextExercise(
    uuid: Extract<MainUuidType, { __typename: 'Exercise' }>
  ): StaticDocument<TextExerciseTypePluginState> {
    stack.push({ id: uuid.id, type: 'text-exercise' })

    return {
      plugin: TemplatePluginType.TextExercise,
      state: {
        id: uuid.id,
        licenseId,
        changes: '',
        revision,
        content:
          serializeStaticDocument(
            parseStaticString(uuid.currentRevision?.content)
          ) ?? '',
      },
    }
  }

  function convertTextExerciseGroup(
    uuid: Extract<MainUuidType, { __typename: 'ExerciseGroup' }>
  ): StaticDocument<TextExerciseGroupTypePluginState> {
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
        }).state
      })

    return {
      plugin: TemplatePluginType.TextExerciseGroup,
      state: {
        ...entityFields,
        changes: '',
        revision,
        content: serializeStaticDocument(parseStaticString(content)),
        cohesive: uuid.currentRevision?.cohesive ?? false,
        'grouped-text-exercise': exercises,
      },
    }
  }

  function convertUser(uuid: User): StaticDocument<UserTypePluginState> {
    stack.push({ id: uuid.id, type: 'user' })
    return convertUserByDescription(uuid.description)
  }

  function convertVideo(
    uuid: Extract<MainUuidType, { __typename: 'Video' }>
  ): StaticDocument<VideoTypePluginState> {
    stack.push({ id: uuid.id, type: EditorPluginType.Video })
    return {
      plugin: TemplatePluginType.Video,
      state: {
        ...entityFields,
        changes: '',
        title,
        revision,
        description: serializeStaticDocument(parseStaticString(content)),
        content: uuid.currentRevision?.url ?? '',
      },
    }
  }
}

export function convertUserByDescription(description?: string | null) {
  return {
    plugin: TemplatePluginType.User,
    state: {
      description: serializeStaticDocument(
        parseStaticString(description ?? '')
      ),
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

export interface PageSerializedState extends Uuid {
  __typename?: UuidType.Page
  title?: string
  content: SerializedStaticState
  licenseId?: number
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

interface StaticDocument<T extends StateType> {
  plugin: string
  state?: StateTypeStaticType<T>
  id?: string
}

export type ConvertResponseError =
  | { error: 'type-unsupported' }
  | { error: 'failure' }

type SerializedStaticState = string | undefined
type DeserializedStaticResult =
  | StaticDocument<StateType<unknown>>
  | ConvertResponseError

export function isError(
  result: DeserializedStaticResult
): result is ConvertResponseError {
  return !!(result as ConvertResponseError).error
}

function serializeStaticDocument(content?: AnyEditorDocument): string {
  if (typeof content === 'string') return content
  return JSON.stringify(
    content ?? {
      plugin: EditorPluginType.Rows,
      state: [{ plugin: EditorPluginType.Text, state: undefined }],
    }
  )
}

function parseStaticString(
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
