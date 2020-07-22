import { render } from '../../external/legacy_render'
import { convertEdtrIoState } from '../schema/convert-edtr-io-state'
import { convertLegacyState } from '../schema/convert-legacy-state'
import {
  QueryResponse,
  Page,
  Article,
  Video,
  Applet,
  ExerciseGroup,
  BareExercise,
  CoursePage,
  TaxonomyTerm,
  TaxonomyTermChild,
  TaxonomyTermChildOnX,
  TaxonomyTermChildTaxonomyTerm,
  TaxonomyTermChildExercise,
  TaxonomyTermChildExerciseGroup,
  Event,
  ExerciseMaybeGrouped,
  Exercise,
  SubTaxonomyTermChildTaxonomyTerm,
} from './query'
import { ExerciseProps } from '@/components/content/exercise'
import { FrontendContentNode, LicenseData } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/query'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'

/* Made all the types exlicit here, let's see if that was usefull :) */

export type EntityTypeData =
  | PageEntity
  | ArticleEntity
  | AppletEntity
  | VideoEntity
  | ExerciseEntity
  | ExerciseGroupEntity
  | CoursePageEntity
  | TaxonomyTermEntity
  | EventEntity
  | null

export type EntityTypeWithTitle =
  | PageEntity
  | ArticleEntity
  | AppletEntity
  | VideoEntity
  | CoursePageEntity

export type EntityTypeWithValue =
  | PageEntity
  | ArticleEntity
  | AppletEntity
  | VideoEntity
  | ExerciseEntity
  | ExerciseGroupEntity
  | CoursePageEntity
  | EventEntity

export function createData(uuid: QueryResponse): EntityTypeData {
  if (uuid.__typename === 'Page' && uuid.currentRevision) {
    return createPage(uuid)
  }
  if (uuid.__typename === 'Article' && uuid.currentRevision) {
    return createArticle(uuid)
  }
  if (uuid.__typename === 'Applet' && uuid.currentRevision) {
    return createApplet(uuid)
  }
  if (uuid.__typename === 'Video' && uuid.currentRevision) {
    return createVideo(uuid)
  }
  if (
    (uuid.__typename === 'Exercise' || uuid.__typename === 'GroupedExercise') &&
    uuid.currentRevision
  ) {
    return createExercise(uuid as ExerciseMaybeGrouped)
  }
  if (uuid.__typename === 'ExerciseGroup' && uuid.currentRevision) {
    return createExerciseGroup(uuid)
  }
  if (uuid.__typename === 'CoursePage' && uuid.currentRevision) {
    return createCoursePage(uuid)
  }
  if (uuid.__typename === 'TaxonomyTerm') {
    return createTaxonomyTerm(uuid)
  }
  if (uuid.__typename === 'Event') {
    return createEvent(uuid)
  }

  //TODO: Better way to make sure this triggers 404?
  //fallback
  return null
}

/*TODO: currently we return partially if there is no currentRevision, would it be better not to return at all? */

interface PageEntity {
  title?: string
  value: FrontendContentNode
  id: number
}

function createPage(uuid: Page): PageEntity {
  return {
    title: uuid.currentRevision?.title,
    value: convertState(uuid.currentRevision?.content),
    id: uuid.id,
  }
}

interface ArticleEntity {
  title?: string
  value: FrontendContentNode
  id: number
  metaTitle?: string
  metaDescription?: string
}

function createArticle(uuid: Article): ArticleEntity {
  return {
    title: uuid.currentRevision?.title,
    value: convertState(uuid.currentRevision?.content),
    metaTitle: uuid.currentRevision?.metaTitle,
    metaDescription: uuid.currentRevision?.metaDescription,
    id: uuid.id,
  }
}

interface VideoEntity {
  title: string | undefined
  value: {
    children: (
      | FrontendContentNode
      | {
          type: 'video'
          src: string
        }
    )[]
  }
}

function createVideo(uuid: Video): VideoEntity {
  const children = convertState(uuid.currentRevision?.content).children
  const spread = children === undefined ? [] : children

  return {
    title: uuid.currentRevision?.title,
    value: {
      children: [
        {
          type: 'video',
          src: uuid.currentRevision?.url!,
        },
        ...spread,
      ],
    },
  }
}

export interface ExerciseEntity {
  value: {
    children: {
      type: 'exercise'
      grouped: boolean
      positionOnPage?: number
      task: FrontendContentNode
      taskLicense: LicenseData
      solution: FrontendContentNode
      solutionLicense?: LicenseData
    }[]
  }
}

function createExercise(
  uuid: ExerciseMaybeGrouped,
  index?: number
): ExerciseEntity {
  return {
    value: {
      children: [
        {
          type: 'exercise',
          grouped: false,
          positionOnPage: index,
          task: convertState(uuid.currentRevision?.content),
          taskLicense: uuid.license,
          solution: convertState(uuid.solution?.currentRevision?.content),
          solutionLicense: uuid.solution?.license,
        },
      ],
    },
  }
}

interface AppletEntity {
  value: {
    children: [{ type: 'geogebra'; id?: string }, ...FrontendContentNode[]]
  }
  title?: string
  metaTitle?: string
  metaDescription?: string
}
function createApplet(uuid: Applet): AppletEntity {
  const children = convertState(uuid.currentRevision?.content).children
  const spread = children === undefined ? [] : children
  return {
    value: {
      children: [
        {
          type: 'geogebra',
          id: uuid.currentRevision?.url,
        },
        ...spread,
      ],
    },
    title: uuid.currentRevision?.title,
    metaTitle: uuid.currentRevision?.metaTitle,
    metaDescription: uuid.currentRevision?.metaDescription,
  }
}

export interface ExerciseGroupEntity {
  value: {
    children: {
      type: 'exercise' | 'exercise-group'
      content: FrontendContentNode[] | undefined
      positionOnPage: number | undefined
      license: LicenseData
      children: ExerciseProps[]
    }[]
  }
}

function createExerciseGroup(
  uuid: ExerciseGroup,
  pageIndex?: number
): ExerciseGroupEntity {
  const children: ExerciseProps[] = []
  if (uuid.exercises?.length > 0) {
    uuid.exercises.forEach(function (
      exercise: BareExercise,
      groupIndex: number
    ) {
      if (!exercise.currentRevision) return
      children.push({
        type: 'exercise',
        grouped: true,
        positionInGroup: groupIndex,
        positionOnPage: undefined,
        task: convertState(
          exercise.currentRevision.content
        ) as ExerciseProps['task'],
        taskLicense: exercise.license,
        solution: convertState(
          exercise.solution?.currentRevision?.content
        ) as ExerciseProps['solution'],
        solutionLicense: exercise.solution
          ?.license as ExerciseProps['solutionLicense'],
      })
    })
    // for (const exercise of uuid.exercises) {

    // }
  }
  return {
    value: {
      children: [
        {
          type: 'exercise-group',
          content: convertState(uuid.currentRevision?.content).children,
          positionOnPage: pageIndex,
          license: uuid.license,
          children,
        },
      ],
    },
  }
}

interface CoursePageEntity {
  value: FrontendContentNode
  title?: string
  pages: {
    alias?: string
    id: number
    currentRevision?: {
      title: string
    }
  }[]
  courseTitle?: string
}

function createCoursePage(uuid: CoursePage): CoursePageEntity {
  return {
    value: convertState(uuid.currentRevision?.content),
    title: uuid.currentRevision?.title,
    pages: uuid.course?.pages?.filter((page) => page.currentRevision !== null),
    courseTitle: uuid.course?.currentRevision?.title,
  }
}

interface EventEntity {
  value: FrontendContentNode
}

function createEvent(uuid: Event): EventEntity {
  return {
    value: convertState(uuid.currentRevision?.content),
  }
}

type LinkArray = ({ title: string; url: string } | undefined)[]

export interface TaxonomyTermEntity {
  description?: FrontendContentNode
  title?: string
  type: TaxonomyTermType
  purpose: 0
  links: {
    articles: LinkArray
    exercises: LinkArray
    videos: LinkArray
    applets: LinkArray
    courses: LinkArray
  }
  exercises: CollectExercises
  children: CollectNestedTaxonomyTerms
}

function createTaxonomyTerm(uuid: TaxonomyTerm): TaxonomyTermEntity {
  const children = uuid.children?.filter(isActive)

  return {
    description: buildDescription(uuid.description),
    title: uuid.name,
    type: uuid.type,
    purpose: 0, //TopicPurposes.detail,
    links: {
      articles: collectType(children, 'Article'),
      exercises: collectTopicFolders(children),
      videos: collectType(children, 'Video'),
      applets: collectType(children, 'Applet'),
      courses: collectType(children, 'Course'),
    },
    exercises: collectExercises(children),
    children: collectNestedTaxonomyTerms(children), // nested taxonomy terms
  }
}

function convertState(raw: string | undefined): FrontendContentNode {
  if (raw === undefined) return {}

  if (raw?.startsWith('[')) {
    // legacy
    const legacyHTML = render(raw)
    return convertLegacyState(legacyHTML)
  } else if (raw?.startsWith('{')) {
    // edtrio
    return convertEdtrIoState(JSON.parse(raw))
  } else {
    // raw as text
    return { children: [{ type: 'p', children: [{ text: raw ?? {} }] }] }
  }
}

function isActive(child: TaxonomyTermChild) {
  return child.trashed === false && child.__typename !== 'UnsupportedUuid'
}

function buildDescription(description?: string) {
  const state = description ? convertState(description) : undefined
  if (state) {
    if (
      state.children?.length !== 1 ||
      state.children[0].children?.length !== 1 ||
      state.children[0].children[0].text !== '' ||
      state.children[0].children[0].type !== 'p'
    ) {
      return state
    }
  }
}

type CollectTypeChild =
  | SubTaxonomyTermChildTaxonomyTerm
  | TaxonomyTermChildTaxonomyTerm
  | TaxonomyTermChildOnX
  | TaxonomyTermChildExercise
  | TaxonomyTermChildExerciseGroup

function collectType(
  children: CollectTypeChild[],
  typename: TaxonomyTermChildOnX['__typename']
) {
  return children
    .filter(
      (child) =>
        child.__typename === typename && child.alias && child.currentRevision
    )
    .map((child) => {
      //redundant but makes TS happy:
      if (child.__typename === typename && child.alias && child.currentRevision)
        return {
          title: child.currentRevision.title,
          url: getAlias(child),
        }
    })
}

function collectTopicFolders(
  children: (
    | SubTaxonomyTermChildTaxonomyTerm
    | TaxonomyTermChildTaxonomyTerm
    | TaxonomyTermChildOnX
    | TaxonomyTermChildExercise
    | TaxonomyTermChildExerciseGroup
  )[]
) {
  return children
    .filter(
      (child) =>
        child.__typename === 'TaxonomyTerm' && child.type.includes('opicFolder')
    )
    .map((child) => {
      if (child.__typename === 'TaxonomyTerm')
        return {
          title: child.name,
          url: getAlias(child),
        }
    })
}

type CollectExercises = (
  | ExerciseEntity['value']
  | ExerciseGroupEntity['value']
  | undefined
)[]

function collectExercises(
  children: TaxonomyTerm['children']
): CollectExercises {
  return children
    .filter((child) => {
      if (
        child.__typename !== 'Exercise' &&
        child.__typename !== 'ExerciseGroup'
      )
        return false
      if (child.currentRevision) {
        return true
      }
    })
    .map((child, index: number) => {
      if (child.__typename === 'Exercise') {
        return createExercise((child as unknown) as Exercise, index).value
      }
      if (child.__typename === 'ExerciseGroup') {
        return createExerciseGroup((child as unknown) as ExerciseGroup, index)
          .value
      }
    })
}

interface _CollectNestedTaxonomyTerms {
  title: string
  url: string
  description?: FrontendContentNode
  purpose: 1
  links: {
    articles: LinkArray
    exercises: LinkArray
    videos: LinkArray
    applets: LinkArray
    courses: LinkArray
    subfolders: LinkArray
  }
}

type CollectNestedTaxonomyTerms = (_CollectNestedTaxonomyTerms | null)[]

function collectNestedTaxonomyTerms(
  children: TaxonomyTerm['children']
): CollectNestedTaxonomyTerms {
  return children
    .filter(
      (child) =>
        child.__typename === 'TaxonomyTerm' &&
        !child.type.includes('opicFolder')
    )

    .map((child) => {
      //redundant but makes TS happy:
      if (child.__typename !== 'TaxonomyTerm') return null

      const subchildren = child.children?.filter(isActive)
      return {
        title: child.name,
        url: getAlias(child),
        description: buildDescription(child.description),
        purpose: 1, //TopicPurposes.overview,
        links: {
          articles: collectType(subchildren, 'Article'),
          exercises: collectTopicFolders(subchildren),
          videos: collectType(subchildren, 'Video'),
          applets: collectType(subchildren, 'Applet'),
          courses: collectType(subchildren, 'Course'),
          subfolders: collectSubfolders(subchildren),
        },
      }
    })
}

function collectSubfolders(
  children: (
    | SubTaxonomyTermChildTaxonomyTerm
    | TaxonomyTermChildTaxonomyTerm
    | TaxonomyTermChildOnX
    | TaxonomyTermChildExercise
    | TaxonomyTermChildExerciseGroup
  )[]
) {
  return children
    .filter(
      (child) =>
        child.__typename === 'TaxonomyTerm' &&
        !child.type.includes('opicFolder')
    )
    .map((child) => {
      //redundant but makes TS happy:
      if (child.__typename === 'TaxonomyTerm')
        return { title: child.name, url: getAlias(child) }
    })
}

function getAlias(
  child:
    | TaxonomyTermChildOnX
    | TaxonomyTermChildTaxonomyTerm
    | SubTaxonomyTermChildTaxonomyTerm
) {
  if (!child.alias || hasSpecialUrlChars(child.alias)) return `/${child.id}`
  else return child.alias
}
