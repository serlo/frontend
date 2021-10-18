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
import { QueryResponse } from '@/fetcher/query-types'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'

export function editorResponseToState(
  uuid: QueryResponse
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

  const entityFields = {
    id,
    license,
  }

  if (uuid.__typename === 'Applet') {
    return {
      ...entityFields,
      title,
      content,
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
      meta_title,
      meta_description,
    } as ArticleSerializedState
  }

  if (uuid.__typename === 'Course') {
    const coursePages = uuid.pages.map((page) => {
      return {
        id: id, // TODO: get page id
        title: page.currentRevision?.title,
        icon: 'explanation',
        content: '', // TODO: check, do we need content here?
      } as CoursePageSerializedState
    })

    return {
      ...entityFields,
      title,
      description: '',
      meta_description,
      'course-page': coursePages,
    } as CourseSerializedState
  }

  if (uuid.__typename === 'CoursePage') {
    return {
      ...entityFields,
      title,
      content,
      icon: 'explanation',
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
      cohesive: undefined, // TODO: Currently not exposed in API: https://github.com/serlo/api.serlo.org/issues/489
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
      taxonomy: uuid.id, // TODO: check if that is correct
      parent: 0, // uuid.parent.id, // TODO: fetch
      position: 0, // uuid.weight, // TODO: fetch
    } as TaxonomySerializedState
  }

  // TODO: What about revisions?

  return null
}
