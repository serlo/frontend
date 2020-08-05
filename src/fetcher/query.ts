// These types are auto-generated from the GraphQL schema
import * as GraphQL from '@serlo/api'

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

export type License = Pick<GraphQL.License, 'id' | 'url' | 'title'>

// This is one breadcrumb path.

const path = `
  path {
    label
    url
  }
`

export type Path = Pick<GraphQL.NavigationNode, 'label' | 'url'>[]

// Entities can belong to multiple taxonomy terms, so we load all possible paths.

const taxonomyTerms = `
  taxonomyTerms {
    navigation {
      ${path}
    }
  }
`

export type TaxonomyTerms = {
  navigation?: GraphQL.Maybe<{ path: Path }>
}[]

// Basic information about any entity.
type Entity = Pick<GraphQL.AbstractRepository, 'id' | 'alias' | 'instance'>

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
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.PageRevision, 'title' | 'content'>
  >
  navigation?: GraphQL.Maybe<Pick<GraphQL.Navigation, 'data' | 'path'>>
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

// TODO:
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

// TODO:
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

// TODO:
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

// TODO:
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

// TODO:
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

// TODO: Can be simplified now
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

// TODO:
export interface Exercise extends Entity, BareExercise {
  __typename: 'Exercise'
  taxonomyTerms: TaxonomyTerms
  license: License
}
// TODO:
export interface GroupedExercise extends Entity, BareExercise {
  __typename: 'GroupedExercise'
  license: License
}
// TODO:
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

// TODO:
export interface BareExerciseGroup {
  __typename: 'ExerciseGroup'
  currentRevision?: {
    content: string
  }
  exercises: BareExercise[]
  license: License
}

// TODO:
export interface ExerciseGroup extends BareExerciseGroup, Entity {
  taxonomyTerms: TaxonomyTerms
}

// Events are only used in injections, no support for full page view

const onEvent = `
  ... on Event {
    id
    alias
    instance
    currentRevision {
      content
    }
  }
`

// TODO:
export interface Event extends Entity {
  __typename: 'Event'
  currentRevision?: {
    content: string
  }
}

// If a course is encountered, the first page will get loaded

const onCourse = `
  ... on Course {
    id
    alias
    instance
    pages {
      alias
    }
  }
`

// TODO:
export interface Course extends Entity {
  __typename: 'Course'
  pages: {
    alias?: string
  }[]
}

// This one is a beast!

// TODO:
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


// TODO:
// I don't like this. We can probably simplify that
// Also: we should specify the allowed types since not every type has a title
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

// TODO:
export interface TaxonomyTermChild {
  __typename: string
  trashed: boolean
}

// TODO:
export interface TaxonomyTermChildOnX extends TaxonomyTermChild {
  id: number
  alias?: string
  __typename: 'Article' | 'Video' | 'Applet' | 'Course'
  currentRevision?: {
    title: string
  }
}

// TODO:
export interface TaxonomyTermChildExercise
  extends TaxonomyTermChild,
    BareExercise {
  __typename: 'Exercise'
}

// TODO:
export interface TaxonomyTermChildExerciseGroup
  extends BareExerciseGroup,
    TaxonomyTermChild {
  __typename: 'ExerciseGroup'
}

// TODO:
export interface TaxonomyTermChildTaxonomyTerm extends TaxonomyTermChild {
  __typename: 'TaxonomyTerm'
  type: TaxonomyTermType
  name: string
  alias?: string
  id: number
  description?: string
  children: TaxonomyTermChildrenLevel2[]
}

// TODO:
export interface SubTaxonomyTermChildTaxonomyTerm extends TaxonomyTermChild {
  __typename: 'TaxonomyTerm'
  id: number
  alias?: string
  type: TaxonomyTermType
  name: string
  children?: undefined
}

// TODO:
export interface TaxonomyTerm extends Entity {
  __typename: 'TaxonomyTerm'
  type: TaxonomyTermType
  name: string
  description?: string
  navigation?: GraphQL.Maybe<Pick<GraphQL.Navigation, 'data' | 'path'>>
  children: TaxonomyTermChildrenLevel1[]
}

// TODO:
export type TaxonomyTermChildrenLevel1 =
  | TaxonomyTermChildOnX
  | TaxonomyTermChildExercise
  | TaxonomyTermChildExerciseGroup
  | TaxonomyTermChildTaxonomyTerm

// TODO:
export type TaxonomyTermChildrenLevel2 =
  | TaxonomyTermChildOnX
  | SubTaxonomyTermChildTaxonomyTerm

// TODO: Simplify that, especially use variables
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

// TODO:
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

// TODO:
export type QueryResponseWithLicense =
  | Article
  | Video
  | Applet
  | CoursePage
  | Exercise
  | GroupedExercise
  | ExerciseGroup

// TODO:
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
        ... on AbstractEntity {
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
  // TODO: this looks weird tbh
  return `{${map.join()}}`
}

// Note: This query will soon be removed from the fetcher (cloudflare takes this job)
export const idQuery = (id: number) => `
  {
    uuid(id:${id}) {
      ... on AbstractEntity {
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
