// These types are auto-generated from the GraphQL schema
import * as GraphQL from '@serlo/api'
import { gql } from 'graphql-request'

// Keep this file in sync with the graphQL schema.
// Maybe automate this one day.
export type Instance = 'de' | 'en' | 'fr' | 'es' | 'ta' | 'hi'

// A license has some more attributes, but we are fine with these
export type License = Pick<GraphQL.License, 'id' | 'url' | 'title'>

// This is one breadcrumb path.
export interface Path {
  nodes: Pick<GraphQL.NavigationNode, 'label' | 'url'>[]
}

// Entities can belong to multiple taxonomy terms, so we load all possible paths.
export type TaxonomyTerms = {
  navigation?: GraphQL.Maybe<{ path: Path }>
}[]

// Basic information about any entity.
type Repository = Pick<GraphQL.AbstractRepository, 'id' | 'alias' | 'instance'>
export interface Entity extends Repository {
  license: License
}
export interface EntityWithTaxonomyTerms extends Entity {
  taxonomyTerms: { nodes: TaxonomyTerms }
}

// A page, navigation.data is the secondary menu.
export interface Page extends Repository {
  __typename: 'Page'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.PageRevision, 'title' | 'content' | 'id'>
  >
  navigation?: GraphQL.Maybe<Pick<GraphQL.Navigation, 'data' | 'path'>>
}

export interface Article extends EntityWithTaxonomyTerms {
  __typename: 'Article'
  currentRevision?: GraphQL.Maybe<
    Pick<
      GraphQL.ArticleRevision,
      'title' | 'content' | 'metaTitle' | 'metaDescription'
    >
  >
}

export interface Video extends EntityWithTaxonomyTerms {
  __typename: 'Video'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.VideoRevision, 'title' | 'url' | 'content'>
  >
}

export interface Applet extends EntityWithTaxonomyTerms {
  __typename: 'Applet'
  currentRevision?: GraphQL.Maybe<
    Pick<
      GraphQL.AppletRevision,
      'title' | 'content' | 'url' | 'metaTitle' | 'metaDescription'
    >
  >
}

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
    taxonomyTerms: { nodes: TaxonomyTerms }
  }
}

// We treat a grouped exercise just as a normal exercise.
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

export interface Exercise extends EntityWithTaxonomyTerms, BareExercise {
  __typename: 'Exercise'
}
export interface GroupedExercise extends Entity, BareExercise {
  __typename: 'GroupedExercise'
}

export interface BareExerciseGroup extends Entity {
  __typename: 'ExerciseGroup'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.ExerciseGroupRevision, 'content'>
  >
  exercises: BareExercise[]
}

export type ExerciseGroup = BareExerciseGroup & EntityWithTaxonomyTerms

// Events are only used in injections, no support for full page view
export interface Event extends Repository {
  __typename: 'Event'
  currentRevision?: GraphQL.Maybe<Pick<GraphQL.EventRevision, 'content'>>
}

// If a course is encountered, the first page will get loaded

export interface Course extends Repository {
  __typename: 'Course'
  pages: {
    alias?: string
  }[]
}

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
  children: { nodes: TaxonomyTermChildrenLevel2[] }
}

export interface SubTaxonomyTermChildTaxonomyTerm
  extends TaxonomyTermChild,
    Pick<GraphQL.TaxonomyTerm, 'type' | 'alias' | 'id' | 'name'> {
  __typename: 'TaxonomyTerm'
  children?: undefined
}

export interface TaxonomyTerm
  extends Pick<
    GraphQL.TaxonomyTerm,
    'id' | 'alias' | 'instance' | 'type' | 'name' | 'description'
  > {
  __typename: 'TaxonomyTerm'
  navigation?: GraphQL.Maybe<Pick<GraphQL.Navigation, 'data' | 'path'>>
  children: { nodes: TaxonomyTermChildrenLevel1[] }
}

export type TaxonomyTermChildrenLevel1 =
  | TaxonomyTermChildOnX
  | TaxonomyTermChildExercise
  | TaxonomyTermChildExerciseGroup
  | TaxonomyTermChildTaxonomyTerm

export type TaxonomyTermChildrenLevel2 =
  | TaxonomyTermChildOnX
  | SubTaxonomyTermChildTaxonomyTerm

export const dataQuery = gql`
  query uuid($id: Int, $alias: AliasInput) {
    uuid(id: $id, alias: $alias) {
      __typename
      id

      ... on AbstractRepository {
        alias
        instance
        ...license
      }

      ... on AbstractTaxonomyTermChild {
        ...taxonomyTerms
      }

      ... on Page {
        currentRevision {
          id
          title
          content
        }
        navigation {
          data
          ...path
        }
      }

      ... on Article {
        currentRevision {
          title
          content
          metaTitle
          metaDescription
        }
      }

      ... on Video {
        currentRevision {
          title
          url
          content
        }
      }

      ... on Applet {
        currentRevision {
          title
          content
          url
          metaTitle
          metaDescription
        }
      }

      ... on CoursePage {
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
          ...taxonomyTerms
        }
      }

      ... on AbstractExercise {
        ...exercise
      }

      ... on ExerciseGroup {
        currentRevision {
          content
        }
        exercises {
          ...exercise
        }
      }

      ... on Event {
        currentRevision {
          content
        }
      }

      ... on Course {
        pages {
          alias
        }
      }

      ... on TaxonomyTerm {
        alias
        instance
        type
        name
        description
        navigation {
          data
          ...path
        }
        children {
          nodes {
            trashed
            __typename
            ...taxonomyTermChild
            ... on Exercise {
              ...exercise
            }
            ... on ExerciseGroup {
              id
              currentRevision {
                content
              }
              exercises {
                ...exercise
              }
              ...license
            }
            ... on TaxonomyTerm {
              type
              name
              alias
              id
              description
              children {
                nodes {
                  trashed
                  __typename
                  ... on TaxonomyTerm {
                    alias
                    type
                    name
                  }
                  ...taxonomyTermChild
                }
              }
            }
          }
        }
      }
    }
  }

  fragment path on Navigation {
    path {
      nodes {
        label
        url
      }
    }
  }

  fragment taxonomyTerms on AbstractTaxonomyTermChild {
    taxonomyTerms {
      nodes {
        navigation {
          ...path
        }
      }
    }
  }

  fragment license on AbstractRepository {
    license {
      id
      url
      title
    }
  }

  fragment taxonomyTermChild on AbstractRepository {
    ... on Article {
      alias
      id
      currentRevision {
        title
      }
    }

    ... on Video {
      alias
      id
      currentRevision {
        title
      }
    }

    ... on Applet {
      alias
      id
      currentRevision {
        title
      }
    }

    ... on Course {
      alias
      id
      currentRevision {
        title
      }
    }
  }

  fragment exercise on AbstractExercise {
    id
    currentRevision {
      content
    }
    solution {
      id
      currentRevision {
        content
      }
      ...license
    }
    ...license
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
