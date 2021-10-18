import { StateType, StateTypeSerializedType } from '@edtr-io/plugin'
import { InputExercisePluginState } from '@edtr-io/plugin-input-exercise'
import { ScMcExercisePluginState } from '@edtr-io/plugin-sc-mc-exercise'
import {
  convert,
  isEdtr,
  Edtr,
  Legacy,
  RowsPlugin,
  OtherPlugin,
  Splish,
} from '@serlo/legacy-editor-to-editor'
import * as R from 'ramda'

import { EditorProps } from './editor'
import { appletTypeState } from './plugins/types/applet'
import { articleTypeState } from './plugins/types/article'
import { Entity, License, Uuid } from './plugins/types/common'
import { courseTypeState } from './plugins/types/course'
import { coursePageTypeState } from './plugins/types/course-page'
import { eventTypeState } from './plugins/types/event'
import { mathPuzzleTypeState } from './plugins/types/math-puzzle'
import { pageTypeState } from './plugins/types/page'
import { taxonomyTypeState } from './plugins/types/taxonomy'
import { textExerciseTypeState } from './plugins/types/text-exercise'
import { textExerciseGroupTypeState } from './plugins/types/text-exercise-group'
import { textSolutionTypeState } from './plugins/types/text-solution'
import { userTypeState } from './plugins/types/user'
import { videoTypeState } from './plugins/types/video'

const empty: RowsPlugin = { plugin: 'rows', state: [] }

export function deserialize({
  initialState,
  type,
  onError,
}: Pick<EditorProps, 'initialState' | 'type' | 'onError'>): DeserializeResult {
  const stack: { id: number; type: string }[] = []
  const config: Record<
    string,
    { deserialize: (state: any) => DeserializedState<StateType> }
  > = {
    applet: { deserialize: deserializeApplet },
    article: { deserialize: deserializeArticle },
    course: { deserialize: deserializeCourse },
    'course-page': { deserialize: deserializeCoursePage },
    event: { deserialize: deserializeEvent },
    'math-puzzle': { deserialize: deserializeMathPuzzle },
    page: { deserialize: deserializePage },
    'grouped-text-exercise': { deserialize: deserializeTextExercise },
    'text-exercise': { deserialize: deserializeTextExercise },
    'text-exercise-group': { deserialize: deserializeTextExerciseGroup },
    'text-solution': { deserialize: deserializeTextSolution },
    user: { deserialize: deserializeUser },
    video: { deserialize: deserializeVideo },
    taxonomy: { deserialize: deserializeTaxonomy },
  }
  try {
    if (config[type] === undefined) {
      return {
        error: 'type-unsupported',
      }
    }
    const { deserialize } = config[type]
    return succeed(deserialize(initialState))
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

  function succeed(
    deserialized: DeserializedState<StateType>
  ): DeserializeSuccess {
    return {
      success: true,
      ...deserialized,
    }
  }

  function deserializeApplet(
    state: AppletSerializedState
  ): DeserializedState<typeof appletTypeState> {
    stack.push({ id: state.id, type: 'applet' })
    return {
      initialState: {
        plugin: 'type-applet',
        state: {
          ...state,
          changes: '',
          title: state.title || '',
          url: state.url || '',
          content: serializeEditorState(
            toEdtr(deserializeEditorState(state.content))
          ),
          reasoning: '',
          meta_title: state.meta_title || '',
          meta_description: state.meta_description || '',
        },
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty),
    }
  }

  function deserializeArticle(
    state: ArticleSerializedState
  ): DeserializedState<typeof articleTypeState> {
    stack.push({ id: state.id, type: 'article' })

    return {
      initialState: {
        plugin: 'type-article',
        state: {
          ...state,
          changes: '',
          title: state.title || '',
          content: getContent(),
          reasoning: '',
          meta_title: state.meta_title || '',
          meta_description: state.meta_description || '',
        },
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty),
    }

    function getContent() {
      const deserializedContent = deserializeEditorState(state.content)

      const convertedContent = toEdtr(deserializedContent) as
        | RowsPlugin
        | OtherPlugin

      if (
        deserializedContent !== undefined &&
        isEdtr(deserializedContent) &&
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

  function deserializeCourse(
    state: CourseSerializedState
  ): DeserializedState<typeof courseTypeState> {
    stack.push({ id: state.id, type: 'course' })
    return {
      initialState: {
        plugin: 'type-course',
        state: {
          ...state,
          changes: '',
          title: state.title || '',
          description: serializeEditorState(
            toEdtr(deserializeEditorState(state.description))
          ),
          reasoning: '',
          meta_description: state.meta_description || '',
          'course-page': (state['course-page'] || []).map(
            (s) => deserializeCoursePage(s).initialState.state
          ),
        },
      },
      converted: !isEdtr(deserializeEditorState(state.description) || empty),
    }
  }

  function deserializeCoursePage(
    state: CoursePageSerializedState
  ): DeserializedState<typeof coursePageTypeState> {
    stack.push({ id: state.id, type: 'course-page' })
    return {
      initialState: {
        plugin: 'type-course-page',
        state: {
          ...state,
          changes: '',
          title: state.title || '',
          icon: state.icon || 'explanation',
          content: serializeEditorState(
            toEdtr(deserializeEditorState(state.content))
          ),
        },
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty),
    }
  }

  function deserializeEvent(
    state: EventSerializedState
  ): DeserializedState<typeof eventTypeState> {
    stack.push({ id: state.id, type: 'event' })
    return {
      initialState: {
        plugin: 'type-event',
        state: {
          ...state,
          changes: '',
          title: state.title || '',
          content: serializeEditorState(
            toEdtr(deserializeEditorState(state.content))
          ),
          meta_title: state.meta_title || '',
          meta_description: state.meta_description || '',
        },
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty),
    }
  }

  function deserializeMathPuzzle(
    state: MathPuzzleSerializedState
  ): DeserializedState<typeof mathPuzzleTypeState> {
    stack.push({ id: state.id, type: 'math-puzzle' })
    return {
      initialState: {
        plugin: 'type-math-puzzle',
        state: {
          ...state,
          changes: '',
          content: serializeEditorState(
            toEdtr(deserializeEditorState(state.content))
          ),
          source: state.source || '',
        },
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty),
    }
  }

  function deserializePage(
    state: PageSerializedState
  ): DeserializedState<typeof pageTypeState> {
    stack.push({ id: state.id, type: 'page' })
    return {
      initialState: {
        plugin: 'type-page',
        state: {
          ...state,
          title: state.title || '',
          content: serializeEditorState(
            toEdtr(deserializeEditorState(state.content))
          ),
        },
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty),
    }
  }

  function deserializeTaxonomy(
    state: TaxonomySerializedState
  ): DeserializedState<typeof taxonomyTypeState> {
    stack.push({ id: state.id, type: 'taxonomy' })
    return {
      initialState: {
        plugin: 'type-taxonomy',
        state: {
          ...state,
          term: state.term,
          description: serializeEditorState(
            toEdtr(deserializeEditorState(state.description))
          ),
        },
      },
      converted: false, // no legacy editor for taxonomies
    }
  }

  function deserializeTextExercise({
    content,
    'text-solution': textSolution,
    'single-choice-right-answer': singleChoiceRightAnswer,
    'single-choice-wrong-answer': singleChoiceWrongAnswer,
    'multiple-choice-right-answer': multipleChoiceRightAnswer,
    'multiple-choice-wrong-answer': multipleChoiceWrongAnswer,
    'input-expression-equal-match-challenge':
      inputExpressionEqualMatchChallenge,
    'input-number-exact-match-challenge': inputNumberExactMatchChallenge,
    'input-string-normalized-match-challenge':
      inputStringNormalizedMatchChallenge,
    ...state
  }: TextExerciseSerializedState): DeserializedState<
    typeof textExerciseTypeState
  > {
    stack.push({ id: state.id, type: 'text-exercise' })
    const deserialized = deserializeEditorState(content)

    const scMcExercise =
      deserialized && !isEdtr(deserialized)
        ? deserializeScMcExercise()
        : undefined

    const inputExercise =
      deserialized && !isEdtr(deserialized)
        ? deserializeInputExercise()
        : undefined

    return {
      initialState: {
        plugin: 'type-text-exercise',
        state: {
          ...state,
          changes: '',
          'text-solution': textSolution
            ? deserializeTextSolution(textSolution).initialState.state
            : '',
          content: getContent(),
        },
      },
      converted: !isEdtr(deserialized || empty),
    }

    function getContent() {
      const deserializedContent = deserializeEditorState(content)
      if (deserializedContent !== undefined && isEdtr(deserializedContent)) {
        return serializeEditorState(toEdtr(deserializedContent))
      }

      const convertedContent = toEdtr(deserializedContent) // RowsPlugin
      const interactive = scMcExercise || inputExercise

      return serializeEditorState({
        plugin: 'exercise',
        state: {
          content: {
            plugin: 'rows',
            state: convertedContent.state,
          },
          interactive,
        },
      })
    }

    function deserializeScMcExercise():
      | {
          plugin: 'scMcExercise'
          state: StateTypeSerializedType<ScMcExercisePluginState>
        }
      | undefined {
      stack.push({ id: state.id, type: 'sc-mc-exercise' })
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
                    convert(
                      deserializeEditorState(singleChoiceRightAnswer.content)
                    )
                  ),
                  isCorrect: true,
                  feedback: extractChildFromRows(
                    convert(
                      deserializeEditorState(singleChoiceRightAnswer.feedback)
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
                    convert(deserializeEditorState(answer.content))
                  ),
                  isCorrect: false,
                  feedback: extractChildFromRows(
                    convert(deserializeEditorState(answer.feedback))
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
                    convert(deserializeEditorState(answer.content))
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
                    convert(deserializeEditorState(answer.content))
                  ),
                  isCorrect: false,
                  feedback: extractChildFromRows(
                    convert(deserializeEditorState(answer.feedback))
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

    function deserializeInputExercise():
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
              convert(deserializeEditorState(exercise.feedback))
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
    }
  }

  function extractChildFromRows(plugin: RowsPlugin) {
    return plugin.state.length ? plugin.state[0] : { plugin: 'text' }
  }

  function deserializeTextExerciseGroup(
    state: TextExerciseGroupSerializedState
  ): DeserializedState<typeof textExerciseGroupTypeState> {
    stack.push({ id: state.id, type: 'text-exercise-group' })
    return {
      initialState: {
        plugin: 'type-text-exercise-group',
        state: {
          ...state,
          changes: '',
          content: serializeEditorState(
            toEdtr(deserializeEditorState(state.content))
          ),
          cohesive: state.cohesive === 'true',
          'grouped-text-exercise': (state['grouped-text-exercise'] || []).map(
            (s) => deserializeTextExercise(s).initialState.state
          ),
        },
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty),
    }
  }

  function deserializeTextSolution(
    state: TextSolutionSerializedState
  ): DeserializedState<typeof textSolutionTypeState> {
    stack.push({ id: state.id, type: 'text-solution' })

    return {
      initialState: {
        plugin: 'type-text-solution',
        state: {
          ...state,
          changes: '',
          content: getContent(),
        },
      },
      converted: !isEdtr(deserializeEditorState(state.content) || empty),
    }

    function getContent() {
      const deserializedContent = deserializeEditorState(state.content)
      if (deserializedContent !== undefined && isEdtr(deserializedContent)) {
        return serializeEditorState(toEdtr(deserializedContent))
      }

      const convertedContent = toEdtr(deserializedContent) // RowsPlugin

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

  function deserializeUser(
    state: UserSerializedState
  ): DeserializedState<typeof userTypeState> {
    stack.push({ id: state.id, type: 'user' })
    return {
      initialState: {
        plugin: 'type-user',
        state: {
          ...state,
          description: serializeEditorState(
            toEdtr(deserializeEditorState(state.description))
          ),
        },
      },
      converted: false, // no legacy-editor for users
    }
  }

  function deserializeVideo(
    state: VideoSerializedState
  ): DeserializedState<typeof videoTypeState> {
    stack.push({ id: state.id, type: 'video' })
    return {
      initialState: {
        plugin: 'type-video',
        state: {
          ...state,
          changes: '',
          title: state.title || '',
          description: serializeEditorState(
            toEdtr(deserializeEditorState(state.description))
          ),
          content: state.content || '',
          reasoning: '',
        },
      },
      converted: !isEdtr(deserializeEditorState(state.description) || empty),
    }
  }
}

export type EntitySerializedStates =
  | AppletSerializedState
  | ArticleSerializedState
  | CourseSerializedState
  | CoursePageSerializedState
  | EventSerializedState
  | MathPuzzleSerializedState
  | TextExerciseSerializedState
  | TextExerciseGroupSerializedState
  | TextSolutionSerializedState
  | VideoSerializedState

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

export interface MathPuzzleSerializedState extends Entity {
  content: SerializedEditorState
  source?: string
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
export interface DeserializeSuccess
  extends DeserializedState<StateType<unknown>> {
  success: true
}
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

function deserializeEditorState(content: SerializedLegacyEditorState): Legacy
function deserializeEditorState(content: SerializedEditorState): EditorState
function deserializeEditorState(
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
  __type: 'serialized-editor-state'
}
type SerializedLegacyEditorState = (string | undefined) & {
  __type: 'serialized-legacy-editor-state'
}
