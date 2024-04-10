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
  const title = uuid.title ?? ''
  const content = uuid.content
  const date = uuid.date ?? ''
  const id = uuid.id
  const metaTitle = Object.hasOwn(uuid, 'metaTitle') ? uuid.metaTitle : ''
  const metaDescription = Object.hasOwn(uuid, 'metaDescription')
    ? uuid.metaDescription
    : ''

  if (uuid.__typename === UuidRevType.Applet) {
    uuid.__typename
    return {
      __typename: UuidType.Applet,
      title,
      currentRevision: {
        id,
        url: uuid.url,
        title,
        content,
        metaTitle,
        metaDescription,
        date,
      },
      ...repositoryFields,
      taxonomyTerms: uuid.repository.taxonomyTerms,
      revisions: uuid.repository.revisions,
      date,
    }
  }

  if (uuid.__typename === UuidRevType.Article) {
    uuid.__typename
    return {
      __typename: UuidType.Article,
      date,
      title,
      currentRevision: {
        id,
        content,
        title,
        metaTitle,
        metaDescription,
        date,
      },
      taxonomyTerms: uuid.repository.taxonomyTerms,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
    }
  }

  if (uuid.__typename === UuidRevType.Course) {
    return {
      __typename: UuidType.Course,
      ...repositoryFields,
      title,
      pages: uuid.repository.pages,
      taxonomyTerms: uuid.repository.taxonomyTerms,
      revisions: uuid.repository.revisions,
      date: uuid.date,
    }
  }

  if (uuid.__typename === UuidRevType.CoursePage) {
    uuid.__typename
    return {
      __typename: UuidType.CoursePage,
      title,
      currentRevision: {
        id,
        alias: uuid.alias,
        title,
        content,
        date,
      },
      ...repositoryFields,
      revisions: uuid.repository.revisions,
      course: uuid.repository.course,
      date,
    }
  }

  if (uuid.__typename === UuidRevType.Event) {
    return {
      __typename: UuidType.Event,
      title,
      currentRevision: {
        id,
        title,
        date,
        content,
      },
      ...repositoryFields,
      date: uuid.date,
      taxonomyTerms: uuid.repository.taxonomyTerms,
      revisions: uuid.repository.revisions,
    }
  }

  if (uuid.__typename === UuidRevType.Exercise) {
    return {
      __typename: UuidType.Exercise,
      title,
      currentRevision: {
        content,
        date,
        id: -1,
      },
      taxonomyTerms: uuid.repository.taxonomyTerms,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
      date,
    }
  }

  if (uuid.__typename === UuidRevType.ExerciseGroup) {
    return {
      __typename: UuidType.ExerciseGroup,
      title,
      currentRevision: {
        id,
        content,
        title,
        cohesive: uuid.cohesive,
        date,
      },
      taxonomyTerms: uuid.repository.taxonomyTerms,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
      date,
    }
  }

  // probably not needed
  if (uuid.__typename === UuidRevType.Page) {
    return {
      __typename: UuidType.Page,
      title,
      currentRevision: {
        id,
        title,
        date,
        content,
      },
      ...repositoryFields,
    }
  }

  if (uuid.__typename === UuidRevType.Video) {
    return {
      __typename: UuidType.Video,
      title,
      currentRevision: {
        id,
        url: uuid.url,
        title,
        date,
        content,
      },
      taxonomyTerms: uuid.repository.taxonomyTerms,
      date: uuid.date,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
    }
  }

  return null
}
