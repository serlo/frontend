import { AuthorizationPayload } from '@serlo/authorization'
import request from 'graphql-request'
import { GetServerSideProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { AddRevision, AddRevisionProps } from '@/components/pages/add-revision'
import { dataQuery } from '@/fetcher/query'
import {
  Instance,
  QueryResponse,
  QueryResponseNoRevision,
} from '@/fetcher/query-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<AddRevisionProps>((props) => (
  <FrontendClientBase noContainers loadLoggedInData>
    <AddRevision {...props} />
  </FrontendClientBase>
))

export const getServerSideProps: GetServerSideProps<AddRevisionProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)

  const { uuid } = await request<{
    uuid: QueryResponse
    authorization: AuthorizationPayload
  }>(endpoint, dataQuery, {
    alias: { instance: context.locale! as Instance, path: `/${id}` },
  })
  const types = [
    'Applet',
    'Article',
    'Course',
    'CoursePage',
    'Event',
    'Exercise',
    'ExerciseGroup',
    'GroupedExercise',
    'Video',
    'Solution',
  ]
  if (!uuid || !types.includes(uuid.__typename))
    return { kind: 'error', errorData: { code: 404 } }

  // TODO: Handle user, taxonomy

  return {
    props: createInitialState(uuid as QueryResponseNoRevision),
  }
}

function createInitialState(uuid: QueryResponseNoRevision) {
  const license =
    'license' in uuid
      ? {
          agreement: uuid.license.title, // TODO: get agreement
          iconHref: 'https://i.creativecommons.org/l/by-sa/4.0/88x31.png', // TODO: get or create icon
          id: uuid.license.id,
          title: uuid.license.title,
          url: uuid.license.url,
        }
      : undefined
  const { id } = uuid

  const currentRev =
    'currentRevision' in uuid ? uuid.currentRevision : undefined
  const title =
    currentRev && 'title' in currentRev ? currentRev.title : undefined
  const content =
    currentRev && 'content' in currentRev ? currentRev.content : undefined

  if (uuid.__typename === 'Page') {
    return {
      id,
      license,
      title,
      content,
    }
  }

  if (uuid.__typename === 'Course') {
    const coursePages = uuid.pages.map((page) => {
      return {
        id: id, // TODO: get page id
        license,
        changes: '',
        title: page.currentRevision?.title,
        icon: 'explanation',
        content: '', // TODO: check, do we need content here?
      }
    })

    return {
      id,
      license,
      title,
      changes: '',
      reasoning: '',
      'course-page': coursePages,
    }
  }

  if (uuid.__typename === 'User' || uuid.__typename === 'TaxonomyTerm') {
    // TODO: handle
    return null
  }

  const sharedFields = {
    id,
    license,
    title,
    content,
    changes: '',
    reasoning: '',
  }

  if (uuid.__typename === 'Article') {
    return {
      ...sharedFields,
      meta_title: uuid.currentRevision?.metaTitle,
      meta_description: uuid.currentRevision?.metaDescription,
    }
  }

  if (uuid.__typename === 'Applet') {
    return {
      ...sharedFields,
      url: uuid.currentRevision?.url,
      meta_title: uuid.currentRevision?.metaTitle,
      meta_description: uuid.currentRevision?.metaDescription,
    }
  }

  if (uuid.__typename === 'CoursePage') {
    return {
      ...sharedFields,
      icon: 'explanation',
    }
  }

  if (uuid.__typename === 'Event') {
    return {
      ...sharedFields,
      title: uuid.currentRevision?.title,
      meta_description: '',
    }
  }

  if (uuid.__typename === 'Exercise') {
    return {
      id,
      license,
      changes: '',
      content,
      'text-solution': {
        id: uuid.solution?.id,
        license: uuid.solution?.license,
        content: uuid.solution?.currentRevision?.content,
      },
    }
  }

  if (uuid.__typename === 'ExerciseGroup') {
    const exercises = uuid.exercises.map((ex) => {
      // TODO:
      return ex
    })

    return {
      id,
      license,
      changes: '',
      content,
      'grouped-text-exercise': exercises,
    }
  }

  if (uuid.__typename === 'Video') {
    return {
      ...sharedFields,
      description: uuid.currentRevision?.content, // not sure about this one
      content: uuid.currentRevision?.url, // not sure about this one
    }
  }

  /*return {
    title: entityData.title,
    meta_title: uuid.currentRevision?.content
    meta_description: metaData?.metaDescription,
    icon: entityData.typename === 'CoursePage' ? 'explanation' : undefined,
  }*/
}
