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
type Repository = Pick<GraphQL.AbstractRepository, 'id' | 'alias' | 'instance'>
export interface Entity extends Repository {
  license: License
}
export interface EntityWithTaxonomyTerms extends Entity {
  taxonomyTerms: TaxonomyTerms
}

// A page, navigation.data is the secondary menu.

const onPage = `
  ... on Page {
    id
    alias
    instance
    currentRevision {
      id
      title
      content
    }
    navigation {
      data
      ${path}
    }
  }
`

export interface Page extends Repository {
  __typename: 'Page'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.PageRevision, 'title' | 'content' | 'id'>
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

export interface Article extends EntityWithTaxonomyTerms {
  __typename: 'Article'
  currentRevision?: GraphQL.Maybe<
    Pick<
      GraphQL.ArticleRevision,
      'title' | 'content' | 'metaTitle' | 'metaDescription'
    >
  >
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

export interface Video extends EntityWithTaxonomyTerms {
  __typename: 'Video'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.VideoRevision, 'title' | 'url' | 'content'>
  >
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

export interface Applet extends EntityWithTaxonomyTerms {
  __typename: 'Applet'
  currentRevision?: GraphQL.Maybe<
    Pick<
      GraphQL.AppletRevision,
      'title' | 'content' | 'url' | 'metaTitle' | 'metaDescription'
    >
  >
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
      id
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
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.CoursePageRevision, 'content' | 'title'>
  >
  course: {
    id: number
    currentRevision?: GraphQL.Maybe<Pick<GraphQL.CourseRevision, 'title'>>
    pages: {
      alias?: string
      id: number
      currentRevision?: Pick<GraphQL.CoursePageRevision, 'title'>
    }[]
    taxonomyTerms: TaxonomyTerms
  }
}

// We treat a grouped exercise just as a normal exercise.

const bareExercise = `
  id
  currentRevision {
    content
  }
  solution {
    id
    currentRevision {
      content
    }
    ${license}
  }
  ${license}
`

export interface BareExercise {
  id: number
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.AbstractExerciseRevision, 'content'>
  >
  solution?: {
    id: number
    currentRevision?: GraphQL.Maybe<Pick<GraphQL.SolutionRevision, 'content'>>
    license: License
  }
  license: License
}

const onExercise = `
  ... on AbstractExercise {
    alias
    instance
    ${bareExercise}
  }
  ... on Exercise {
    ${taxonomyTerms}
  }
`

export interface Exercise extends EntityWithTaxonomyTerms, BareExercise {
  __typename: 'Exercise'
  taxonomyTerms: TaxonomyTerms
}
export interface GroupedExercise extends Entity, BareExercise {
  __typename: 'GroupedExercise'
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

export interface BareExerciseGroup extends Entity {
  __typename: 'ExerciseGroup'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.ExerciseGroupRevision, 'content'>
  >
  exercises: BareExercise[]
}

export type ExerciseGroup = BareExerciseGroup & EntityWithTaxonomyTerms

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

export interface Event extends Repository {
  __typename: 'Event'
  currentRevision?: GraphQL.Maybe<Pick<GraphQL.EventRevision, 'content'>>
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

export interface Course extends Repository {
  __typename: 'Course'
  pages: {
    alias?: string
  }[]
}

export type TaxonomyTermType = GraphQL.TaxonomyTermType

const onX = (type: TaxonomyTermChildOnX['__typename']) => `
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

export interface TaxonomyTermChildExerciseGroup
  extends BareExerciseGroup,
    TaxonomyTermChild {
  __typename: 'ExerciseGroup'
}

export interface TaxonomyTermChildTaxonomyTerm
  extends TaxonomyTermChild,
    Pick<
      GraphQL.TaxonomyTerm,
      'type' | 'name' | 'alias' | 'id' | 'description'
    > {
  __typename: 'TaxonomyTerm'
  children: TaxonomyTermChildrenLevel2[]
}

export interface SubTaxonomyTermChildTaxonomyTerm
  extends TaxonomyTermChild,
    Pick<GraphQL.TaxonomyTerm, 'type' | 'alias' | 'id' | 'name'> {
  __typename: 'TaxonomyTerm'
  children?: undefined
}

export interface TaxonomyTerm
  extends Repository,
    Pick<GraphQL.TaxonomyTerm, 'type' | 'name' | 'description'> {
  __typename: 'TaxonomyTerm'
  navigation?: GraphQL.Maybe<Pick<GraphQL.Navigation, 'data' | 'path'>>
  children: TaxonomyTermChildrenLevel1[]
}

export type TaxonomyTermChildrenLevel1 =
  | TaxonomyTermChildOnX
  | TaxonomyTermChildExercise
  | TaxonomyTermChildExerciseGroup
  | TaxonomyTermChildTaxonomyTerm

export type TaxonomyTermChildrenLevel2 =
  | TaxonomyTermChildOnX
  | SubTaxonomyTermChildTaxonomyTerm

export const dataQuery = `
  query uuid($id: Int, $alias: AliasInput) {
    uuid(id: $id, alias: $alias) {
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
