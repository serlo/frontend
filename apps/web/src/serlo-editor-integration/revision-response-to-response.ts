import { UuidRevType, UuidType } from '@/data-types'
import { RevisionUuidQuery } from '@/fetcher/graphql-types/operations'
import { MainUuidType } from '@/fetcher/query-types'

export function revisionResponseToResponse(
  uuid: RevisionUuidQuery['uuid']
): MainUuidType | null {
  if (!uuid) return null

  if (!Object.hasOwn(uuid, 'repository')) return null

  const {
    licenseId,
    trashed,
    instance,
    id: repositoryId,
    alias,
  } = uuid.repository
  const repositoryFields = {
    licenseId,
    trashed,
    id: repositoryId,
    instance,
    alias,
  }
  const { id, content } = uuid
  const title = uuid.title ?? ''
  const date = uuid.date ?? ''

  const abstractRevisionData = {
    id,
    alias,
    title,
    date,
    content,
  }

  // TODO: integrate into Entity below
  if (uuid.__typename === UuidRevType.Page) {
    return {
      __typename: UuidType.Page,
      date: uuid.date,
      title,
      revisions: uuid.repository.revisions,
      taxonomyTerms: uuid.repository.taxonomyTerms,
      currentRevision: abstractRevisionData,
      ...repositoryFields,
    }
  }

  const abstractEntityRevisionData = {
    ...abstractRevisionData,
    url: uuid.url ?? '',
    metaTitle: uuid.metaTitle ?? '',
    metaDescription: uuid.metaDescription ?? '',
  }

  if (
    uuid.__typename === UuidRevType.Applet ||
    uuid.__typename === UuidRevType.Article ||
    uuid.__typename === UuidRevType.Course ||
    uuid.__typename === UuidRevType.Event ||
    uuid.__typename === UuidRevType.Video ||
    uuid.__typename === UuidRevType.ExerciseGroup ||
    uuid.__typename === UuidRevType.Exercise
  ) {
    return {
      // @ts-expect-error to save unnecessary code
      __typename: uuid.__typename.replace('Revision', '') as UuidType,
      date,
      title,
      currentRevision: abstractEntityRevisionData,
      ...repositoryFields,
      taxonomyTerms: uuid.repository.taxonomyTerms,
      revisions: uuid.repository.revisions,
    }
  }

  return null
}
