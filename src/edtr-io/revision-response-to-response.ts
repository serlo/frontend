import {
  QueryResponseRevision,
  QueryResponseNoRevision,
} from '@/fetcher/query-types'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'

export function revisionResponseToResponse(
  uuid: QueryResponseRevision
): QueryResponseNoRevision | null {
  const { license, trashed, instance, id } = uuid.repository
  const repositoryFields = {
    license,
    trashed,
    id,
    instance,
  }

  const title = hasOwnPropertyTs(uuid, 'title') ? uuid.title : ''
  const content = uuid.content
  const metaTitle = hasOwnPropertyTs(uuid, 'metaTitle') ? uuid.metaTitle : ''
  const metaDescription = hasOwnPropertyTs(uuid, 'metaDescription')
    ? uuid.metaDescription
    : ''
  const taxonomyTerms = { nodes: [{}] } //needed?

  if (uuid.__typename === 'AppletRevision') {
    uuid.__typename
    return {
      __typename: 'Applet',
      currentRevision: {
        id: uuid.id,
        url: uuid.url,
        title,
        content,
        metaTitle,
        metaDescription,
      },
      ...repositoryFields,
      taxonomyTerms,
      revisions: uuid.repository.revisions,
    }
  }

  if (uuid.__typename === 'ArticleRevision') {
    uuid.__typename
    return {
      __typename: 'Article',
      currentRevision: {
        id: uuid.id,
        title,
        content,
        metaTitle,
        metaDescription,
      },
      taxonomyTerms,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
    }
  }

  if (uuid.__typename === 'CourseRevision') {
    uuid.__typename
    return {
      __typename: 'Course',
      currentRevision: {
        id: uuid.id,
        title,
      },
      ...repositoryFields,
      revisions: uuid.repository.revisions,
      pages: uuid.repository.pages,
    }
  }

  if (uuid.__typename === 'CoursePageRevision') {
    uuid.__typename
    return {
      __typename: 'CoursePage',
      currentRevision: {
        id: uuid.id,
        title,
        content,
      },
      ...repositoryFields,
      revisions: uuid.repository.revisions,
      course: uuid.repository.course,
    }
  }

  if (uuid.__typename === 'EventRevision') {
    uuid.__typename
    return {
      __typename: 'Event',
      currentRevision: {
        id: uuid.id,
        title,
        content,
      },
      ...repositoryFields,
    }
  }

  if (uuid.__typename === 'ExerciseRevision') {
    uuid.__typename
    return {
      __typename: 'Exercise',
      currentRevision: {
        id: uuid.id,
        content,
      },
      taxonomyTerms,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
    }
  }

  if (uuid.__typename === 'ExerciseGroupRevision') {
    uuid.__typename
    return {
      __typename: 'ExerciseGroup',
      currentRevision: {
        id: uuid.id,
        content,
        cohesive: uuid.cohesive,
      },
      exercises: uuid.repository.exercises,
      taxonomyTerms,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
    }
  }

  if (uuid.__typename === 'GroupedExerciseRevision') {
    uuid.__typename
    return {
      __typename: 'GroupedExercise',
      currentRevision: {
        id: uuid.id,
        content,
      },
      exerciseGroup: uuid.repository.exerciseGroup,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
    }
  }

  // probably not needed
  if (uuid.__typename === 'PageRevision') {
    uuid.__typename
    return {
      __typename: 'Page',
      currentRevision: {
        id: uuid.id,
        title,
        content,
      },
      ...repositoryFields,
    }
  }

  if (uuid.__typename === 'SolutionRevision') {
    uuid.__typename
    return {
      __typename: 'Solution',
      currentRevision: {
        id: uuid.id,
        content,
      },
      exercise: uuid.repository.exercise,
      ...repositoryFields,
    }
  }

  if (uuid.__typename === 'VideoRevision') {
    uuid.__typename
    return {
      __typename: 'Video',
      currentRevision: {
        id: uuid.id,
        url: uuid.url,
        title,
        content,
      },
      taxonomyTerms,
      ...repositoryFields,
      revisions: uuid.repository.revisions,
    }
  }

  return null
}
