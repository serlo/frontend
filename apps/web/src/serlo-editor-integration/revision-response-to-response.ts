import { UuidRevType, UuidType } from '@/data-types'
import { RevisionUuidQuery } from '@/fetcher/graphql-types/operations'
import { MainUuidType } from '@/fetcher/query-types'

export function revisionResponseToResponse(
  uuid: RevisionUuidQuery['uuid']
): MainUuidType | null {
  if (!uuid) return null

  if (!Object.hasOwn(uuid, 'repository')) return null

  const { license, trashed, instance, id, alias } = uuid.repository
  const repositoryFields = {
    license,
    trashed,
    id,
    instance,
    alias,
  }

  const title = Object.hasOwn(uuid, 'title') ? uuid.title : ''
  const content = uuid.content
  const metaTitle = Object.hasOwn(uuid, 'metaTitle') ? uuid.metaTitle : ''
  const metaDescription = Object.hasOwn(uuid, 'metaDescription')
    ? uuid.metaDescription
    : ''
  const date = '' // just to make type happy, not used

  if (uuid.__typename === UuidRevType.Applet) {
    uuid.__typename
    return {
      __typename: UuidType.Applet,
      currentRevision: {
        id: uuid.id,
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
      currentRevision: {
        id: uuid.id,
        title,
        content,
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
    uuid.__typename
    return {
      __typename: UuidType.Course,
      ...repositoryFields,
      pages: uuid.repository.pages,
      taxonomyTerms: uuid.repository.taxonomyTerms,
    }
  }

  if (uuid.__typename === UuidRevType.CoursePage) {
    uuid.__typename
    return {
      __typename: UuidType.CoursePage,
      currentRevision: {
        id: uuid.id,
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
    uuid.__typename
    return {
      __typename: UuidType.Event,
      currentRevision: {
        id: uuid.id,
        title,
        content,
      },
      ...repositoryFields,
      taxonomyTerms: uuid.repository.taxonomyTerms,
    }
  }

  if (uuid.__typename === UuidRevType.Exercise) {
    uuid.__typename
    return {
      __typename: UuidType.Exercise,
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
    uuid.__typename
    return {
      __typename: UuidType.ExerciseGroup,
      currentRevision: {
        id: uuid.id,
        content,
        cohesive: uuid.cohesive,
        date,
      },
      exercises: uuid.repository.exercises,
      taxonomyTerms: uuid.repository.taxonomyTerms,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
      date,
    }
  }

  // probably not needed
  if (uuid.__typename === UuidRevType.Page) {
    uuid.__typename
    return {
      __typename: UuidType.Page,
      currentRevision: {
        id: uuid.id,
        title,
        content,
      },
      ...repositoryFields,
    }
  }

  if (uuid.__typename === UuidRevType.Video) {
    uuid.__typename
    return {
      __typename: UuidType.Video,
      currentRevision: {
        id: uuid.id,
        url: uuid.url,
        title,
        content,
      },
      taxonomyTerms: uuid.repository.taxonomyTerms,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
    }
  }

  return null
}
