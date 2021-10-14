import { AuthorizationPayload } from '@serlo/authorization'
import request from 'graphql-request'
import { GetServerSideProps } from 'next'

import { endpoint } from '@/api/endpoint'
import {
  EntitySerializedStates,
  ArticleSerializedState,
  AppletSerializedState,
  CourseSerializedState,
  CoursePageSerializedState,
  EventSerializedState,
  PageSerializedState,
  TaxonomySerializedState,
  TextExerciseSerializedState,
  UserSerializedState,
  TextExerciseGroupSerializedState,
  VideoSerializedState,
  TextSolutionSerializedState,
} from '@/components/edtr-io/deserialize'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { AddRevision, AddRevisionProps } from '@/components/pages/add-revision'
import { dataQuery } from '@/fetcher/query'
import {
  Instance,
  QueryResponse,
  QueryResponseNoRevision,
} from '@/fetcher/query-types'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<AddRevisionProps>((props) => (
  <FrontendClientBase noContainers loadLoggedInData>
    {props.initialState ? <AddRevision {...props} /> : 'whoops'}
  </FrontendClientBase>
))

// @ts-expect-error TODO: find the right types that edtr is expecting
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

  return {
    props: {
      initialState: responseToState(uuid as QueryResponseNoRevision),
      type: uuid.__typename.toLowerCase(), // TODO: check expected format
    },
  }
}

function responseToState(
  uuid: QueryResponseNoRevision
):
  | EntitySerializedStates
  | PageSerializedState
  | TaxonomySerializedState
  | UserSerializedState
  | null {
  if (!uuid) return null
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
  const title = currentRev && 'title' in currentRev ? currentRev.title : ''
  const content =
    currentRev && 'content' in currentRev ? currentRev.content : ''
  const meta_title =
    currentRev && hasOwnPropertyTs(currentRev, 'meta_title')
      ? currentRev.meta_title
      : ''
  const meta_description =
    currentRev && hasOwnPropertyTs(currentRev, 'meta_description')
      ? currentRev.meta_description
      : ''

  const reasoning = '' // TODO: query

  const entityFields = {
    id,
    license,
  }

  if (uuid.__typename === 'Applet') {
    return {
      ...entityFields,
      title,
      content,
      reasoning,
      meta_title,
      meta_description,
      url: uuid.currentRevision?.url,
    } as AppletSerializedState
  }

  if (uuid.__typename === 'Article') {
    return {
      ...entityFields,
      title,
      content,
      reasoning,
      meta_title,
      meta_description,
    } as ArticleSerializedState
  }

  if (uuid.__typename === 'Course') {
    const coursePages = uuid.pages.map((page) => {
      return {
        id: id, // TODO: get page id
        license,
        title: page.currentRevision?.title,
        icon: 'explanation',
        content: '', // TODO: check, do we need content here?
      } as CoursePageSerializedState
    })

    return {
      ...entityFields,
      title,
      description: '',
      reasoning,
      meta_description,
      'course-page': coursePages,
    } as CourseSerializedState
  }

  if (uuid.__typename === 'CoursePage') {
    return {
      ...entityFields,
      title,
      content,
      icon: 'explanation', // TODO: ?
    } as CoursePageSerializedState
  }

  if (uuid.__typename === 'Event') {
    return {
      ...entityFields,
      title,
      content,
      meta_title,
      meta_description,
    } as EventSerializedState
  }

  // Do we need to support Math Puzzle in any way?

  if (uuid.__typename === 'Exercise' || uuid.__typename === 'GroupedExercise') {
    // // TODO: build solution
    // const solutionFields = create…

    return {
      ...entityFields,
      content,
      // ... solutionFields
    } as TextExerciseSerializedState

    /*
    'text-solution': { content: uuid.solution?.currentRevision?.content },
      'single-choice-right-answer': {
        content: uuid.solution?.currentRevision?.content, 
        feedback: 'SerializedLegacyEditorState', // TODO
      },
  'single-choice-wrong-answer': [{
    content: 'SerializedLegacyEditorState'
    feedback: 'SerializedLegacyEditorState'
  }],
  'multiple-choice-right-answer': [{ content: 'SerializedLegacyEditorState' }]
  'multiple-choice-wrong-answer': [{
    content: 'SerializedLegacyEditorState'
    feedback: 'SerializedLegacyEditorState'
  }],
  'input-expression-equal-match-challenge': 'InputType',
  'input-number-exact-match-challenge': 'InputType',
  'input-string-normalized-match-challenge': 'InputType'
   /*
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
  */
  }

  if (uuid.__typename === 'ExerciseGroup') {
    const exercises = uuid.exercises.map((ex) => {
      // TODO: build exercises with shared function
      // as TextExerciseSerializedState
      return ex as unknown as TextExerciseSerializedState
    })

    return {
      ...entityFields,
      content,
      cohesive: '', // TODO: query
      'grouped-text-exercise': exercises,
    } as TextExerciseGroupSerializedState
  }

  if (uuid.__typename === 'Solution') {
    return {
      ...entityFields,
      content,
    } as TextSolutionSerializedState
  }

  if (uuid.__typename === 'Video') {
    return {
      ...entityFields,
      title,
      description: content,
      content: uuid.currentRevision?.url,
      reasoning,
    } as VideoSerializedState
  }

  if (uuid.__typename === 'Page') {
    return {
      title,
      content,
    } as PageSerializedState
  }

  if (uuid.__typename === 'User') {
    return {
      description: uuid.description,
    } as UserSerializedState
  }

  if (uuid.__typename === 'TaxonomyTerm') {
    return {
      term: {
        name: uuid.name,
      },
      description: uuid.description,
      taxonomy: 0, // TODO:
      parent: 0, // TODO:
      position: 0, // TODO:
    } as TaxonomySerializedState
  }

  return null
}
