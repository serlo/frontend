// eslint-disable-next-line import/no-internal-modules
import { StateType, StateTypeSerializedType } from '@edtr-io/plugin'
import {
  convert,
  isEdtr,
  Edtr,
  Legacy,
  RowsPlugin,
  OtherPlugin,
  Splish,
} from '@serlo/legacy-editor-to-editor'

import { appletTypeState } from './plugins/types/applet'
import { articleTypeState } from './plugins/types/article'
import { Entity, License, Uuid } from './plugins/types/common/common'
import { courseTypeState } from './plugins/types/course'
import { coursePageTypeState } from './plugins/types/course-page'
import { eventTypeState } from './plugins/types/event'
import { pageTypeState } from './plugins/types/page'
import { taxonomyTypeState } from './plugins/types/taxonomy'
import { textExerciseTypeState } from './plugins/types/text-exercise'
import { textExerciseGroupTypeState } from './plugins/types/text-exercise-group'
import { textSolutionTypeState } from './plugins/types/text-solution'
import { userTypeState } from './plugins/types/user'
import { videoTypeState } from './plugins/types/video'
import { SerloEditorProps } from './serlo-editor'
import {
  Applet,
  Article,
  Course,
  CoursePage,
  Event,
  Exercise,
  BareExercise,
  ExerciseGroup,
  Page,
  QueryResponse,
  Solution,
  TaxonomyTerm,
  User,
  Video,
} from '@/fetcher/query-types'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'

const empty: RowsPlugin = { plugin: 'rows', state: [] }

// converts query response to deserialized editor state
export function editorResponseToState(
  uuid: QueryResponse,
  onError?: SerloEditorProps['onError']
): DeserializeResult {
  const stack: { id: number; type: string }[] = []

  const config: Record<
    string,
    { convert: (state: any) => DeserializedState<StateType> }
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
    Solution: { convert: convertTextSolution },
    User: { convert: convertUser },
    Video: { convert: convertVideo },
    TaxonomyTerm: { convert: convertTaxonomy },
  }

  const license =
    'license' in uuid
      ? {
          id: uuid.license.id,
          title: uuid.license.title,
          url: uuid.license.url,
          agreement: uuid.license.agreement,
          iconHref: uuid.license.iconHref,
        }
      : undefined
  const { id } = uuid

  const currentRev =
    'currentRevision' in uuid ? uuid.currentRevision : undefined
  const title = currentRev && 'title' in currentRev ? currentRev.title : ''
  const content =
    currentRev && 'content' in currentRev ? currentRev.content : ''
  const meta_title =
    currentRev && hasOwnPropertyTs(currentRev, 'metaTitle')
      ? (currentRev.metaTitle as string)
      : ''
  const meta_description =
    currentRev && hasOwnPropertyTs(currentRev, 'metaDescription')
      ? (currentRev.metaDescription as string)
      : ''
  const revision =
    currentRev && hasOwnPropertyTs(currentRev, 'id') ? currentRev.id : 0

  const entityFields = {
    id,
    license: license!,
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
    const error = e as Error
    if (typeof onError === 'function') {
      onError(error, {
        stack: JSON.stringify(stack),
      })
    }
    return {
      error: 'failure',
    }
  }

  function convertApplet(
    uuid: Applet
  ): DeserializedState<typeof appletTypeState> {
    stack.push({ id: uuid.id, type: 'applet' })
    return {
      initialState: {
        plugin: 'type-applet',
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          url: uuid.currentRevision?.url || '',
          content: serializeEditorState(toEdtr(convertEditorState(content))),
          meta_title,
          meta_description,
        },
      },
      converted: false, // no legacy any more
    }
  }

  function convertArticle(
    uuid: Article
  ): DeserializedState<typeof articleTypeState> {
    stack.push({ id: uuid.id, type: 'article' })
    return {
      initialState: {
        plugin: 'type-article',
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          content: getContent(),
          meta_title,
          meta_description,
        },
      },
      converted: !isEdtr(convertEditorState(content) || empty),
    }

    function getContent() {
      const convertdContent = convertEditorState(content)

      const convertedContent = toEdtr(convertdContent) as
        | RowsPlugin
        | OtherPlugin

      if (
        convertdContent !== undefined &&
        isEdtr(convertdContent) &&
        convertedContent.plugin === 'article'
      ) {
        return serializeEditorState(convertedContent)
      }

      return serializeEditorState({
        plugin: 'article',
        state: {
          introduction: { plugin: 'articleIntroduction' },
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
    uuid: Course
  ): DeserializedState<typeof courseTypeState> {
    stack.push({ id: uuid.id, type: 'course' })
    return {
      initialState: {
        plugin: 'type-course',
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          description: serializeEditorState(
            toEdtr(convertEditorState(content))
          ),
          meta_description,
          'course-page': (uuid.pages || [])
            .filter((page) => page.currentRevision !== null)
            .map((page) => {
              return convertCoursePage({
                ...page,
                currentRevision: {
                  id: page.id,
                  title: page.currentRevision?.title ?? '',
                  content: page.currentRevision?.content ?? '',
                },
              }).initialState.state
            }),
        },
      },
      converted: !isEdtr(convertEditorState(content ?? '') || empty),
    }
  }

  function convertCoursePage(
    uuid: Pick<CoursePage, 'id' | 'currentRevision'>
  ): DeserializedState<typeof coursePageTypeState> {
    stack.push({ id: uuid.id, type: 'course-page' })
    return {
      initialState: {
        plugin: 'type-course-page',
        state: {
          id: uuid.id,
          license: license!, // TODO: check if it's okay to use the course license here
          revision,
          changes: '',
          title: uuid.currentRevision?.title || '',
          icon: 'explanation',
          // TODO: check if we actually need content here
          content: serializeEditorState(
            toEdtr(convertEditorState(uuid.currentRevision?.content || ''))
          ),
        },
      },
      converted: !isEdtr(
        convertEditorState(uuid.currentRevision?.content || '') || empty
      ),
    }
  }

  function convertEvent(uuid: Event): DeserializedState<typeof eventTypeState> {
    stack.push({ id: uuid.id, type: 'event' })
    return {
      initialState: {
        plugin: 'type-event',
        state: {
          ...entityFields,
          revision,
          changes: '',
          title,
          content: serializeEditorState(toEdtr(convertEditorState(content))),
          meta_title,
          meta_description,
        },
      },
      converted: false, // no legacy any more
    }
  }

  function convertPage(uuid: Page): DeserializedState<typeof pageTypeState> {
    stack.push({ id: uuid.id, type: 'page' })
    return {
      initialState: {
        plugin: 'type-page',
        state: {
          ...entityFields,
          title,
          content: serializeEditorState(toEdtr(convertEditorState(content))),
        },
      },
      converted: !isEdtr(convertEditorState(content) || empty),
    }
  }

  function convertTaxonomy(
    uuid: TaxonomyTerm
  ): DeserializedState<typeof taxonomyTypeState> {
    stack.push({ id: uuid.id, type: 'taxonomy' })
    return {
      initialState: {
        plugin: 'type-taxonomy',
        state: {
          id: uuid.id,
          parent: uuid.parent.id,
          position: uuid.weight,
          taxonomy: uuid.id, // TODO: this or id is probably not the right value
          term: {
            name: uuid.name,
          },
          description: serializeEditorState(
            toEdtr(convertEditorState(uuid.description ?? ''))
          ),
        },
      },
      converted: false, // no legacy editor for taxonomies
    }
  }

  //TODO: !

  function convertTextExercise(
    uuid: Exercise | BareExercise
  ): DeserializedState<typeof textExerciseTypeState> {
    // const {
    //   'text-solution': textSolution,
    //   'single-choice-right-answer': singleChoiceRightAnswer,
    //   'single-choice-wrong-answer': singleChoiceWrongAnswer,
    //   'multiple-choice-right-answer': multipleChoiceRightAnswer,
    //   'multiple-choice-wrong-answer': multipleChoiceWrongAnswer,
    //   'input-expression-equal-match-challenge':
    //     inputExpressionEqualMatchChallenge,
    //   'input-number-exact-match-challenge': inputNumberExactMatchChallenge,
    //   'input-string-normalized-match-challenge':
    //     inputStringNormalizedMatchChallenge,
    // } = uuid

    stack.push({ id: uuid.id, type: 'text-exercise' })
    const convertd = convertEditorState(content)

    // const scMcExercise =
    //   convertd && !isEdtr(convertd) ? convertScMcExercise() : undefined

    // const inputExercise =
    //   convertd && !isEdtr(convertd) ? convertInputExercise() : undefined

    return {
      initialState: {
        plugin: 'type-text-exercise',
        state: {
          id: uuid.id,
          license: license!,
          changes: '',
          revision,
          'text-solution': uuid.solution
            ? convertTextSolution(uuid.solution).initialState.state
            : '',
          content: getContent(),
        },
      },
      converted: !isEdtr(convertd || empty),
    }

    function getContent() {
      const convertdContent = convertEditorState(
        uuid.currentRevision?.content ?? ''
      )
      if (convertdContent !== undefined && isEdtr(convertdContent)) {
        return serializeEditorState(toEdtr(convertdContent))
      }

      const convertedContent = toEdtr(convertdContent) // RowsPlugin
      //const interactive = scMcExercise || inputExercise

      return serializeEditorState({
        plugin: 'exercise',
        state: {
          content: {
            plugin: 'rows',
            state: convertedContent.state,
          },
          interactive: undefined,
        },
      })
    }

    // TODO: fix unconverted exercises
    /*
    function convertScMcExercise():
      | {
          plugin: 'scMcExercise'
          state: StateTypeSerializedType<ScMcExercisePluginState>
        }
      | undefined {
      stack.push({ id: uuid.id, type: 'sc-mc-exercise' })
      if (
        singleChoiceWrongAnswer ||
        singleChoiceRightAnswer ||
        multipleChoiceWrongAnswer ||
        multipleChoiceRightAnswer
      ) {
        const convertedSCRightAnswers =
          singleChoiceRightAnswer && singleChoiceRightAnswer.content
            ? [
                {
                  content: extractChildFromRows(
                    convert(convertEditorState(singleChoiceRightAnswer.content))
                  ),
                  isCorrect: true,
                  feedback: extractChildFromRows(
                    convert(
                      convertEditorState(singleChoiceRightAnswer.feedback)
                    )
                  ),
                },
              ]
            : []

        const convertedSCWrongAnswers = singleChoiceWrongAnswer
          ? singleChoiceWrongAnswer
              .filter((answer) => {
                return answer.content
              })
              .map((answer) => {
                return {
                  content: extractChildFromRows(
                    convert(convertEditorState(answer.content))
                  ),
                  isCorrect: false,
                  feedback: extractChildFromRows(
                    convert(convertEditorState(answer.feedback))
                  ),
                }
              })
          : []

        const convertedMCRightAnswers = multipleChoiceRightAnswer
          ? multipleChoiceRightAnswer
              .filter((answer) => {
                return answer.content
              })
              .map((answer) => {
                return {
                  content: extractChildFromRows(
                    convert(convertEditorState(answer.content))
                  ),
                  isCorrect: true,
                  feedback: {
                    plugin: 'text',
                  },
                }
              })
          : []

        const convertedMCWrongAnswers = multipleChoiceWrongAnswer
          ? multipleChoiceWrongAnswer
              .filter((answer) => {
                return answer.content
              })
              .map((answer) => {
                return {
                  content: extractChildFromRows(
                    convert(convertEditorState(answer.content))
                  ),
                  isCorrect: false,
                  feedback: extractChildFromRows(
                    convert(convertEditorState(answer.feedback))
                  ),
                }
              })
          : []
        const isSingleChoice = !(
          convertedMCRightAnswers.length || convertedMCWrongAnswers.length
        )
        return {
          plugin: 'scMcExercise',
          state: {
            isSingleChoice: isSingleChoice,
            answers: [
              ...(isSingleChoice ? convertedSCRightAnswers : []),
              ...(isSingleChoice ? convertedSCWrongAnswers : []),
              ...(!isSingleChoice ? convertedMCRightAnswers : []),
              ...(!isSingleChoice ? convertedMCWrongAnswers : []),
            ],
          },
        }
      }
    }

    function convertInputExercise():
      | {
          plugin: 'inputExercise'
          state: StateTypeSerializedType<InputExercisePluginState>
        }
      | undefined {
      if (
        inputStringNormalizedMatchChallenge ||
        inputNumberExactMatchChallenge ||
        inputExpressionEqualMatchChallenge
      ) {
        const type = inputStringNormalizedMatchChallenge
          ? 'input-string-normalized-match-challenge'
          : inputNumberExactMatchChallenge
          ? 'input-number-exact-match-challenge'
          : 'input-expression-equal-match-challenge'

        const inputExercises = filterDefined([
          inputStringNormalizedMatchChallenge,
          inputNumberExactMatchChallenge,
          inputExpressionEqualMatchChallenge,
        ])

        return {
          plugin: 'inputExercise',
          state: {
            type,
            answers: extractInputAnswers(inputExercises, true),
            unit: '',
          },
        }
      }

      function extractInputAnswers(
        inputExercises: InputType[],
        isCorrect: boolean
      ): {
        value: string
        isCorrect: boolean
        feedback: { plugin: string; state?: unknown }
      }[] {
        if (inputExercises.length === 0) return []

        const answers = inputExercises.map((exercise) => {
          return {
            value: exercise.solution,
            feedback: extractChildFromRows(
              convert(convertEditorState(exercise.feedback))
            ),
            isCorrect,
          }
        })

        const children = R.flatten(
          inputExercises.map((exercise) => {
            return filterDefined([
              exercise['input-string-normalized-match-challenge'],
              exercise['input-number-exact-match-challenge'],
              exercise['input-expression-equal-match-challenge'],
            ])
          })
        )

        return R.concat(answers, extractInputAnswers(children, false))
      }

      function filterDefined<T>(array: (T | undefined)[]): T[] {
        return array.filter((el) => typeof el !== 'undefined') as T[]
      }
    }*/
  }

  // function extractChildFromRows(plugin: RowsPlugin) {
  //   return plugin.state.length ? plugin.state[0] : { plugin: 'text' }
  // }

  function convertTextExerciseGroup(
    uuid: ExerciseGroup
  ): DeserializedState<typeof textExerciseGroupTypeState> {
    stack.push({ id: uuid.id, type: 'text-exercise-group' })

    const exercises = uuid.exercises.map((exercise) => {
      return convertTextExercise(exercise).initialState.state
    })

    return {
      initialState: {
        plugin: 'type-text-exercise-group',
        state: {
          ...entityFields,
          changes: '',
          revision,
          content: serializeEditorState(toEdtr(convertEditorState(content))),
          cohesive: uuid.currentRevision?.cohesive ?? false,
          'grouped-text-exercise': exercises,
        },
      },
      converted: !isEdtr(convertEditorState(content) || empty),
    }
  }

  function convertTextSolution(
    uuid: Pick<Solution, 'id' | 'currentRevision'>
  ): DeserializedState<typeof textSolutionTypeState> {
    stack.push({ id: uuid.id, type: 'text-solution' })

    const solutionContent = uuid.currentRevision?.content ?? ''
    return {
      initialState: {
        plugin: 'type-text-solution',
        state: {
          id: uuid.id,
          license: license!,
          revision,
          changes: '',
          content: getContent(),
        },
      },
      converted: !isEdtr(convertEditorState(solutionContent) || empty),
    }

    function getContent() {
      const convertdContent = convertEditorState(solutionContent)
      if (convertdContent !== undefined && isEdtr(convertdContent)) {
        return serializeEditorState(toEdtr(convertdContent))
      }

      const convertedContent = toEdtr(convertdContent) // RowsPlugin

      return serializeEditorState({
        plugin: 'solution',
        state: {
          prerequisite: undefined,
          strategy: { plugin: 'text' },
          steps: convertedContent,
        },
      })
    }
  }

  function convertUser(uuid: User): DeserializedState<typeof userTypeState> {
    stack.push({ id: uuid.id, type: 'user' })
    return {
      initialState: {
        plugin: 'type-user',
        state: {
          description: serializeEditorState(
            toEdtr(convertEditorState(uuid.description ?? ''))
          ),
        },
      },
      converted: false, // no legacy-editor for users
    }
  }

  function convertVideo(uuid: Video): DeserializedState<typeof videoTypeState> {
    stack.push({ id: uuid.id, type: 'video' })
    return {
      initialState: {
        plugin: 'type-video',
        state: {
          ...entityFields,
          changes: '',
          title,
          revision,
          description: serializeEditorState(
            toEdtr(convertEditorState(content))
          ),
          content: uuid.currentRevision?.url ?? '',
        },
      },
      converted: false, // no legacy videos any more
    }
  }
}

export interface AppletSerializedState extends Entity {
  title?: string
  url?: string
  content: SerializedEditorState
  reasoning?: SerializedEditorState
  meta_title?: string
  meta_description?: string
}

export interface ArticleSerializedState extends Entity {
  title?: string
  content: SerializedEditorState
  reasoning?: SerializedEditorState
  meta_title?: string
  meta_description?: string
}

export interface CourseSerializedState extends Entity {
  title?: string
  description: SerializedEditorState
  reasoning?: SerializedEditorState
  meta_description?: string
  'course-page'?: CoursePageSerializedState[]
}

export interface CoursePageSerializedState extends Entity {
  title?: string
  icon?: 'explanation' | 'play' | 'question'
  content: SerializedEditorState
}

export interface EventSerializedState extends Entity {
  title?: string
  content: SerializedEditorState
  meta_title?: string
  meta_description?: string
}

export interface PageSerializedState extends Uuid, License {
  title?: string
  content: SerializedEditorState
}

export interface TaxonomySerializedState extends Uuid {
  term: {
    name: string
  }
  description: SerializedEditorState
  taxonomy: number
  parent: number
  position: number
}

export interface TextExerciseSerializedState extends Entity {
  content: SerializedEditorState
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
}

interface InputType {
  solution: string
  feedback: SerializedLegacyEditorState
  'input-expression-equal-match-challenge'?: InputType[]
  'input-number-exact-match-challenge'?: InputType[]
  'input-string-normalized-match-challenge'?: InputType[]
}

export interface TextExerciseGroupSerializedState extends Entity {
  cohesive?: string
  content: SerializedEditorState
  'grouped-text-exercise'?: TextExerciseSerializedState[]
}

export interface TextSolutionSerializedState extends Entity {
  content: SerializedEditorState
}

export interface UserSerializedState extends Uuid {
  description: SerializedEditorState
}

export interface VideoSerializedState extends Entity {
  title?: string
  description: SerializedEditorState
  content?: string
  reasoning?: SerializedEditorState
}

export interface DeserializedState<T extends StateType> {
  initialState: {
    plugin: string
    state?: StateTypeSerializedType<T>
  }
  converted: boolean
}

export function isError(result: DeserializeResult): result is DeserializeError {
  return !!(result as DeserializeError).error
}

export type DeserializeResult = DeserializeSuccess | DeserializeError
export type DeserializeSuccess = DeserializedState<StateType<unknown>>
export type DeserializeError =
  | { error: 'type-unsupported' }
  | { error: 'failure' }

function toEdtr(content: EditorState): Edtr {
  if (!content)
    return { plugin: 'rows', state: [{ plugin: 'text', state: undefined }] }
  if (isEdtr(content)) return content
  return convert(content)
}

function serializeEditorState(content: Legacy): SerializedLegacyEditorState
function serializeEditorState(content: EditorState): SerializedEditorState
function serializeEditorState(
  content: EditorState
): SerializedEditorState | SerializedLegacyEditorState | string | undefined {
  if (typeof content === 'string') return content as SerializedLegacyEditorState
  return content ? JSON.stringify(content) : undefined
}

function convertEditorState(content: SerializedLegacyEditorState): Legacy
function convertEditorState(content: SerializedEditorState): EditorState
function convertEditorState(
  content: SerializedLegacyEditorState | SerializedEditorState
): EditorState | string | undefined {
  try {
    return content ? (JSON.parse(content) as EditorState) : undefined
  } catch {
    // No valid JSON, so this is interpreted as Markdown
    return content as Legacy
  }
}

type EditorState = Legacy | Splish | Edtr | undefined

// Fake `__type` property is just here to let TypeScript distinguish between the types
type SerializedEditorState = (string | undefined) & {
  __type?: 'serialized-editor-state'
}
type SerializedLegacyEditorState = (string | undefined) & {
  __type?: 'serialized-legacy-editor-state'
}
