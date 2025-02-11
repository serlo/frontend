import {
  EditorPluginType,
  TemplatePluginType,
  type AnyEditorDocument,
  type Entity,
  type Uuid,
  type StorageFormat,
} from '@editor/package'
import { createEmptyDocument } from '@editor/package/storage-format'
import * as R from 'ramda'

import { UuidType } from '@/data-types'
import type { MainUuidType } from '@/fetcher/query-types'
import { triggerSentry } from '@/helper/trigger-sentry'

const entityTypes = [
  UuidType.Applet,
  UuidType.Article,
  UuidType.Course,
  UuidType.Event,
  UuidType.Exercise,
  UuidType.ExerciseGroup,
  UuidType.Page,
  UuidType.Video,
] as const
type EntityType = (typeof entityTypes)[number]

/** Converts graphql query response to static editor document */
export function convertEditorResponseToState(
  uuid: MainUuidType
): DeserializedStaticResult {
  const stack: { id: number; type: string }[] = []

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

  const idAndLicense = {
    id,
    licenseId,
  }

  const entityFields = {
    ...idAndLicense,
    revision,
    changes: '',
    title,
    meta_title,
    meta_description,
  }

  try {
    if (UuidType.TaxonomyTerm === uuid.__typename) {
      return convertTaxonomy(uuid.__typename, uuid)
    }
    if (entityTypes.includes(uuid.__typename as EntityType))
      return convertAbstractEntity(
        uuid.__typename as EntityType,
        uuid as Extract<MainUuidType, { __typename: 'Article' }>
      )

    // Users and Revisions are not handled here

    return { error: 'type-unsupported' }
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
    entityType: EntityType,
    uuid: Extract<MainUuidType, { __typename: string }>
  ): StorageFormat {
    stack.push({ id: uuid.id, type: entityType })

    const { editorMetadata, templateContent } = unwrapEditorContent(
      entityType,
      content
    )

    if (uuid.__typename === UuidType.Video) {
      return {
        ...editorMetadata,
        document: {
          plugin: TemplatePluginType.Video,
          state: {
            ...entityFields,
            content: url ? url : templateContent,
            description: templateContent,
            ...(url ? { url } : {}),
          },
        },
      }
    }

    return {
      ...editorMetadata,
      document: {
        // simpler than other typehacks, not really Article
        plugin: TemplatePluginType[uuid.__typename as 'Article'],
        state: {
          ...entityFields,
          content: templateContent,
          ...(url ? { url } : {}),
        },
      },
    }
  }

  function convertTaxonomy(
    entityType: MainUuidType['__typename'],
    uuid: Extract<MainUuidType, { __typename: 'TaxonomyTerm' }>
  ): StorageFormat {
    stack.push({ id: uuid.id, type: entityType })

    const { editorMetadata } = unwrapEditorContent(entityType)

    return {
      ...editorMetadata,
      document: {
        plugin: TemplatePluginType.Taxonomy,
        state: {
          id: uuid.id,
          parent: uuid.parent?.id ?? 0,
          position: uuid.weight,
          term: {
            name: uuid.name,
          },
          description: serializeStaticDocument(
            parseStaticString(uuid.description ?? '')
          ),
        },
      },
    }
  }
}

function unwrapEditorContent(
  entityType: MainUuidType['__typename'],
  content?: string
) {
  const convertedContent = parseEditorData(content)

  const editorMetadata = convertedContent
    ? R.omit(['document'], convertedContent)
    : R.omit(['document'], createEmptyDocument('serlo-org'))

  const editorContent = convertedContent?.document as
    | AnyEditorDocument
    | undefined

  let templateContent
  if (
    entityType !== 'Article' ||
    editorContent?.plugin === EditorPluginType.Article
  ) {
    templateContent = serializeStaticDocument(editorContent)
  } else {
    // currently still needed. See https://serlo.slack.com/archives/CEB781NCU/p1695977868948869
    templateContent = serializeStaticDocument({
      plugin: EditorPluginType.Article,
      state: {
        introduction: { plugin: EditorPluginType.ArticleIntroduction },
        content: editorContent,
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

  return { editorMetadata, templateContent }
}

export function convertUserByDescription(description?: string | null) {
  return {
    ...createEmptyDocument('serlo-org'),
    document: {
      plugin: TemplatePluginType.User,
      state: {
        description: serializeStaticDocument(
          parseStaticString(description ?? '')
        ),
      },
    },
  }
}

export interface AbstractSerializedState extends Entity {
  __typename?: UuidType[number]
  title?: string
  content: SerializedStaticState
  reasoning?: SerializedStaticState
  description: SerializedStaticState
  meta_title?: string
  meta_description?: string
  url?: string
  cohesive?: string
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

export interface UserSerializedState extends Uuid {
  __typename?: UuidType.User
  description: SerializedStaticState
}

export type ConvertResponseError =
  | { error: 'type-unsupported' }
  | { error: 'failure' }

type SerializedStaticState = string | undefined
type DeserializedStaticResult = StorageFormat | ConvertResponseError

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

function parseEditorData(
  content: SerializedStaticState
): StorageFormat | undefined {
  if (!content) return undefined
  try {
    return JSON.parse(content) as StorageFormat
  } catch {
    // No valid JSON, so we return nothing
    return undefined
  }
}
