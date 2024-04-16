import type { StateType, StateTypeStaticType } from '@editor/plugin'
import type { AppletTypePluginState } from '@editor/plugins/serlo-template-plugins/applet'
import type { ArticleTypePluginState } from '@editor/plugins/serlo-template-plugins/article'
import {
  type Entity,
  type Uuid,
} from '@editor/plugins/serlo-template-plugins/common/common'
import type { CourseTypePluginState } from '@editor/plugins/serlo-template-plugins/course/course'
import type { CoursePageTypePluginState } from '@editor/plugins/serlo-template-plugins/course/course-page'
import type { EventTypePluginState } from '@editor/plugins/serlo-template-plugins/event'
import type { TextExerciseGroupTypePluginState } from '@editor/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
import type { PageTypePluginState } from '@editor/plugins/serlo-template-plugins/page'
import type { TaxonomyTypePluginState } from '@editor/plugins/serlo-template-plugins/taxonomy'
import type { TextExerciseTypePluginState } from '@editor/plugins/serlo-template-plugins/text-exercise'
import type { UserTypePluginState } from '@editor/plugins/serlo-template-plugins/user'
import type { VideoTypePluginState } from '@editor/plugins/serlo-template-plugins/video'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

import { UuidType } from '@/data-types'
import type { User, MainUuidType } from '@/fetcher/query-types'
import { triggerSentry } from '@/helper/trigger-sentry'

/** Converts graphql query response to static editor document */
export function convertEditorResponseToState(
  uuid: MainUuidType
): DeserializedStaticResult {
  const stack: { id: number; type: string }[] = []

  const config: Record<
    string,
    {
      convert: (
        entityType: MainUuidType['__typename'],
        state: any
      ) => StaticDocument<StateType>
    }
  > = {
    Applet: { convert: convertAbstractEntity },
    Article: { convert: convertAbstractEntity },
    Course: { convert: convertCourse },
    CoursePage: { convert: convertCoursePage },
    Event: { convert: convertAbstractEntity },
    Page: { convert: convertPage },
    Exercise: { convert: convertAbstractEntity },
    ExerciseGroup: { convert: convertAbstractEntity },
    User: { convert: convertUser },
    Video: { convert: convertAbstractEntity },
    TaxonomyTerm: { convert: convertTaxonomy },
  }

  const licenseId = Object.hasOwn(uuid, 'licenseId')
    ? uuid.licenseId
    : undefined

  const { id, title } = uuid

  const currentRev =
    'currentRevision' in uuid ? uuid.currentRevision : undefined
  const content =
    currentRev && 'content' in currentRev ? currentRev.content : ''
  const meta_title =
    (currentRev && Object.hasOwn(currentRev, 'metaTitle')
      ? currentRev.metaTitle
      : '') ?? ''
  const meta_description =
    (currentRev && Object.hasOwn(currentRev, 'metaDescription')
      ? currentRev.metaDescription
      : '') ?? ''
  const url =
    (currentRev && Object.hasOwn(currentRev, 'url') ? currentRev.url : '') ?? ''
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
    return convert(uuid.__typename, uuid)
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

  function convertAbstractEntity(
    entityType: MainUuidType['__typename'],
    uuid: Extract<MainUuidType, { __typename: typeof entityType }>
  ):
    | StaticDocument<ArticleTypePluginState>
    | StaticDocument<AppletTypePluginState>
    | StaticDocument<EventTypePluginState>
    | StaticDocument<TextExerciseTypePluginState>
    | StaticDocument<TextExerciseGroupTypePluginState>
    | StaticDocument<VideoTypePluginState> {
    stack.push({ id: uuid.id, type: entityType })
    return {
      plugin: TemplatePluginType.Article,
      state: {
        ...entityFields,
        revision,
        changes: '',
        title,
        content: getContent(),
        ...(url ? { url } : {}),
        ...(meta_title ? { meta_title } : {}),
        ...(meta_description ? { meta_description } : {}),
      },
    }

    function getContent() {
      if (entityType !== 'Article')
        return serializeStaticDocument(parseStaticString(content))

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
    entityType: MainUuidType['__typename'],
    uuid: Extract<MainUuidType, { __typename: 'Course' }>
  ): StaticDocument<CourseTypePluginState> {
    stack.push({ id: uuid.id, type: entityType })
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
            return convertCoursePage('CoursePage', {
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
    entityType: MainUuidType['__typename'],
    uuid: Pick<
      Extract<MainUuidType, { __typename: 'CoursePage' }>,
      'id' | 'currentRevision'
    >
  ): StaticDocument<CoursePageTypePluginState> {
    stack.push({ id: uuid.id, type: entityType })
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

  function convertPage(
    entityType: MainUuidType['__typename'],
    uuid: Extract<MainUuidType, { __typename: 'Page' }>
  ): StaticDocument<PageTypePluginState> {
    stack.push({ id: uuid.id, type: entityType })
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
    entityType: MainUuidType['__typename'],
    uuid: Extract<MainUuidType, { __typename: 'TaxonomyTerm' }>
  ): StaticDocument<TaxonomyTypePluginState> {
    stack.push({ id: uuid.id, type: entityType })
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

  function convertUser(
    entityType: MainUuidType['__typename'],
    uuid: User
  ): StaticDocument<UserTypePluginState> {
    stack.push({ id: uuid.id, type: entityType })
    return convertUserByDescription(uuid.description)
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
