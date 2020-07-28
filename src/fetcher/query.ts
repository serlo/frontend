// Keep this file in sync with the graphQL schema.
// Maybe automate this one day.

export type Instance = 'de' | 'en' | 'fr' | 'es' | 'ta' | 'hi'

// A license has some more attributes, but we are fine with these

const license = `
  license {
    id
    url
    title
  }
`

export interface License {
  id: number
  url: string
  title: string
}

// This is one breadcrumb path.

const path = `
  path {
    label
    url
  }
`

export type Path = {
  label: string
  url?: string
}[]

// Entities can belong to multiple taxonomy terms, so we load all possible paths.

const taxonomyTerms = `
  taxonomyTerms {
    navigation {
      ${path}
    }
  }
`

export type TaxonomyTerms = {
  navigation: {
    path: Path
  }
}[]

// Basic information about any entity.

interface Entity {
  id: number
  alias?: string
  instance: string
}

// A page, navigation.data is the secondary menu.

const onPage = `
  ... on Page {
    id
    alias
    instance
    currentRevision {
      title
      content
    }
    navigation {
      data
      ${path}
    }
  }
`

export interface Page extends Entity {
  __typename: 'Page'
  currentRevision?: {
    title: string
    content: string
  }
  navigation?: {
    data: string
    path: Path
  }
}

const onArticle = `
  ... on Article {
    id
    alias
    instance
    currentRevision {
      title
      content
      metaTitle
      metaDescription
    }
    ${taxonomyTerms}
    ${license}
  }
`

export interface Article extends Entity {
  __typename: 'Article'
  currentRevision?: {
    title: string
    content: string
    metaTitle: string
    metaDescription: string
  }
  taxonomyTerms: TaxonomyTerms
  license: License
}

const onVideo = `
  ... on Video {
    id
    alias
    instance
    currentRevision {
      title
      url
      content
    }
    ${taxonomyTerms}
    ${license}
  }
`

export interface Video extends Entity {
  __typename: 'Video'
  currentRevision?: {
    title: string
    url: string
    content: string
  }
  taxonomyTerms: TaxonomyTerms
  license: License
}

const onApplet = `
  ... on Applet {
    id
    alias
    instance
    currentRevision {
      title
      content
      url
      metaTitle
      metaDescription
    }
    ${taxonomyTerms}
    ${license}
  }
`

export interface Applet extends Entity {
  __typename: 'Applet'
  currentRevision?: {
    title: string
    content: string
    url: string
    metaTitle: string
    metaDescription: string
  }
  taxonomyTerms: TaxonomyTerms
  license: License
}

const onCoursePage = `
  ... on CoursePage {
    id
    alias
    instance
    currentRevision {
      content
      title
    }
    course {
      currentRevision {
        title
      }
      pages {
        alias
        id
        currentRevision {
          title
        }
      }
      ${taxonomyTerms}
    }
    ${license}
  }
`

export interface CoursePage extends Entity {
  __typename: 'CoursePage'
  currentRevision?: {
    content: string
    title: string
  }
  course: {
    currentRevision?: {
      title: string
    }
    pages: {
      alias?: string
      id: number
      currentRevision?: {
        title: string
      }
    }[]
    taxonomyTerms: TaxonomyTerms
  }
  license: License
}

// We treat a grouped exercise just as a normal exercise.

const bareExercise = `
  currentRevision {
    content
  }
  solution {
    currentRevision {
      content
    }
    ${license}
  }
  ${license}
`

export interface BareExercise {
  currentRevision?: {
    content: string
  }
  solution?: {
    currentRevision?: {
      content: string
    }
    license: License
  }
  license: License
}

const onExercise = `
  ... on Exercise {
    id
    alias
    instance
    ${bareExercise}
    ${taxonomyTerms}
  }

  ... on GroupedExercise {
    id
    alias
    instance
    ${bareExercise}
  }
`

export interface Exercise extends Entity, BareExercise {
  __typename: 'Exercise'
  taxonomyTerms: TaxonomyTerms
  license: License
}
export interface GroupedExercise extends Entity, BareExercise {
  __typename: 'GroupedExercise'
  license: License
}

export interface ExerciseMaybeGrouped extends Entity, BareExercise {
  __typename: 'Exercise' | 'GroupedExercise'
  taxonomyTerms: TaxonomyTerms
  license: License
}

const onExerciseGroup = `
  ... on ExerciseGroup {
    id
    alias
    instance
    currentRevision {
      content
    }
    exercises {
      ${bareExercise}
    }
    ${taxonomyTerms}
    ${license}
  }
`
export interface ExerciseGroup extends Entity {
  __typename: 'ExerciseGroup'
  currentRevision?: {
    content: string
  }
  exercises: BareExercise[]
  taxonomyTerms: TaxonomyTerms
  license: License
}

// Events are only used in injections, no support for full page view

const onEvent = `
  ... on Event {
    currentRevision {
      content
    }
  }
`

export interface Event {
  __typename: 'Event'
  currentRevision?: {
    content: string
  }
}

// If a course is encoutered, the first page will get loaded

const onCourse = `
  ... on Course {
    pages {
      alias
    }
  }
`

export interface Course {
  __typename: 'Course'
  pages: {
    alias?: string
  }[]
}

// This one is a beast!

export type TaxonomyTermType =
  | 'blog'
  | 'curriculum'
  | 'curriculumTopic'
  | 'curriculumTopicFolder'
  | 'forum'
  | 'forumCategory'
  | 'locale'
  | 'root'
  | 'subject'
  | 'topic'
  | 'topicFolder'

const onX = (type: string) => `
  ... on ${type} {
    alias
    id
    currentRevision {
      title
    }
  }  
`

const onTaxonomyTerm = `
  ... on TaxonomyTerm {
    id
    alias
    instance
    type
    name
    description
    navigation {
      data
      ${path}
    }
    children {
      trashed
      __typename
      ${onX('Article')}
      ${onX('Video')}
      ${onX('Applet')}
      ${onX('Course')}
      ... on Exercise {
        ${bareExercise}
      }
      ... on ExerciseGroup {
        currentRevision {
          content
        }
        exercises {
          ${bareExercise}
        }
        ${license}
      }
      ... on TaxonomyTerm {
        type
        name
        alias
        id
        description
        children {
          trashed
          __typename
          ... on TaxonomyTerm {
            alias
            type
            name
          }
          ${onX('Article')}
          ${onX('Video')}
          ${onX('Applet')}
          ${onX('Course')}
        }
      }
    }
  }
`

export interface TaxonomyTermChild {
  __typename: string
  trashed: boolean
}

export interface TaxonomyTermChildOnX extends TaxonomyTermChild {
  id: number
  alias?: string
  __typename: 'Article' | 'Video' | 'Applet' | 'Course'
  currentRevision?: {
    title: string
  }
}

export interface TaxonomyTermChildExercise
  extends TaxonomyTermChild,
    BareExercise {
  __typename: 'Exercise'
}

export interface TaxonomyTermChildExerciseGroup extends TaxonomyTermChild {
  __typename: 'ExerciseGroup'
  currentRevision?: {
    content: string
  }
  exercises: BareExercise[]
  license: License
}

export interface TaxonomyTermChildTaxonomyTerm extends TaxonomyTermChild {
  __typename: 'TaxonomyTerm'
  type: TaxonomyTermType
  name: string
  alias?: string
  id: number
  description?: string
  children: (TaxonomyTermChildOnX | SubTaxonomyTermChildTaxonomyTerm)[]
}

export interface SubTaxonomyTermChildTaxonomyTerm extends TaxonomyTermChild {
  __typename: 'TaxonomyTerm'
  id: number
  alias?: string
  type: TaxonomyTermType
  name: string
}

export interface TaxonomyTerm extends Entity {
  __typename: 'TaxonomyTerm'
  type: TaxonomyTermType
  name: string
  description?: string
  navigation: {
    data: string
    path: Path
  }
  children: (
    | TaxonomyTermChildOnX
    | TaxonomyTermChildExercise
    | TaxonomyTermChildExerciseGroup
    | TaxonomyTermChildTaxonomyTerm
  )[]
}

export const dataQuery = (selector: string) => `
  {
    uuid(${selector}) {
      __typename

      ${onPage}

      ${onArticle}

      ${onVideo}

      ${onApplet}

      ${onCoursePage}

      ${onExercise}

      ${onExerciseGroup}

      ${onEvent}

      ${onCourse}

      ${onTaxonomyTerm}
    }
  }
`

export type QueryResponse =
  | Page
  | Article
  | Video
  | Applet
  | CoursePage
  | Exercise
  | GroupedExercise
  | ExerciseGroup
  | Event
  | Course
  | TaxonomyTerm

export type QueryResponseFetched = QueryResponse & {
  redirect?: string
  error?: string
  alias?: string
  id: number
}

export type QueryResponseWithLicense =
  | Article
  | Video
  | Applet
  | CoursePage
  | Exercise
  | GroupedExercise
  | ExerciseGroup

export type QueryResponseWithTaxonomyTerms =
  | Article
  | Video
  | Applet
  | Exercise
  | ExerciseGroup

export const idsQuery = (ids: number[]) => {
  const map = ids.map(
    (id) => `
    uuid${id}: uuid(id:${id}) {
        ... on Entity {
          alias
          instance
        }
        ... on Page {
          alias
          instance
        }
        ... on TaxonomyTerm {
          alias
          instance
        }
      }
    `
  )
  return `{${map.join()}}`
}

// Note: This query will soon be removed from the fetcher (cloudflare takes this job)
export const idQuery = (id: number) => `
  {
    uuid(id:${id}) {
      ... on Entity {
        alias
      }
      ... on Page {
        alias
      }
      ... on TaxonomyTerm {
        alias
      }
    }
  }
`
