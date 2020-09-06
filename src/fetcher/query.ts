// These types are auto-generated from the GraphQL schema
import * as GraphQL from '@serlo/api'
import { gql } from 'graphql-request'

// Keep this file in sync with the graphQL schema.
// Maybe automate this one day.
export type Instance = 'de' | 'en' | 'fr' | 'es' | 'ta' | 'hi'

// A license has some more attributes, but we are fine with these
export type License = Pick<GraphQL.License, 'id' | 'url' | 'title' | 'default'>

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
export interface BareExercise extends Entity {
  trashed: boolean
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
export interface GroupedExercise extends BareExercise {
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

// Solutions are only used in injections, no support for full page view
export interface Solution extends Repository {
  __typename: 'Solution'
  trashed: boolean
  currentRevision?: GraphQL.Maybe<Pick<GraphQL.SolutionRevision, 'content'>>
  license: License
}

// Events are only used in injections, no support for full page view
export interface Event extends Repository {
  __typename: 'Event'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.EventRevision, 'content' | 'title'>
  >
}

// User profiles
// export interface User extends Repository {
//   __typename: 'User'

// }

export interface User extends Repository, GraphQL.User {
  __typename: 'User'
}

// If a course is encountered, the first page will get loaded

export interface Course extends Repository {
  __typename: 'Course'
  pages: {
    alias?: string
  }[]
  currentRevision?: GraphQL.Maybe<Pick<GraphQL.CourseRevision, 'title'>>
}

export interface TaxonomyTermChild {
  __typename: string
  trashed: boolean
}

export interface TaxonomyTermChildOnX extends TaxonomyTermChild {
  id: number
  alias?: string
  __typename: 'Article' | 'Video' | 'Applet' | 'Course' | 'Event'
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

// Revision types inherit all the GraphQL fields

export type QueryResponseRevision =
  | AppletRevision
  | ArticleRevision
  | CourseRevision
  | CoursePageRevision
  | EventRevision
  | ExerciseRevision
  | ExerciseGroupRevision
  | GroupedExerciseRevision
  | PageRevision
  | SolutionRevision
  | VideoRevision

export interface AppletRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.AppletRevision {
  __typename: 'AppletRevision'
}
export interface ArticleRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.ArticleRevision {
  __typename: 'ArticleRevision'
}
export interface CourseRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.CourseRevision {
  __typename: 'CourseRevision'
}
export interface CoursePageRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.CoursePageRevision {
  __typename: 'CoursePageRevision'
}
export interface EventRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.EventRevision {
  __typename: 'EventRevision'
}
export interface ExerciseRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.ExerciseRevision {
  __typename: 'ExerciseRevision'
}
export interface ExerciseGroupRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.ExerciseGroupRevision {
  __typename: 'ExerciseGroupRevision'
}
export interface GroupedExerciseRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.GroupedExerciseRevision {
  __typename: 'GroupedExerciseRevision'
}
export interface PageRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.PageRevision {
  __typename: 'PageRevision'
}
export interface SolutionRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.SolutionRevision {
  __typename: 'SolutionRevision'
}
export interface VideoRevision
  extends EntityWithTaxonomyTerms,
    GraphQL.VideoRevision {
  __typename: 'VideoRevision'
}

//TODO: Split files into query and types

// query

export const dataQuery = gql`
  query uuid($id: Int, $alias: AliasInput) {
    uuid(id: $id, alias: $alias) {
      __typename
      id

      ... on AbstractRevision {
        date
        author {
          id
          username
          activeAuthor
          activeDonor
          activeReviewer
        }
        ... on ArticleRevision {
          ...articleRevision
          changes
          repository {
            id
            currentRevision {
              id
              ...articleRevision
            }
          }
        }
        ... on PageRevision {
          ...pageRevision
          repository {
            id
            currentRevision {
              ...pageRevision
            }
          }
        }
        ... on AppletRevision {
          ...appletRevision
          changes
          repository {
            id
            currentRevision {
              ...appletRevision
            }
          }
        }
        ... on CourseRevision {
          ...courseRevision
          changes
          repository {
            id
            currentRevision {
              ...courseRevision
            }
          }
        }
        ... on CoursePageRevision {
          ...coursePageRevision
          changes
          repository {
            id
            currentRevision {
              ...coursePageRevision
            }
          }
        }
        ... on EventRevision {
          ...eventRevision
          changes
          repository {
            id
            currentRevision {
              ...eventRevision
            }
          }
        }
        ... on ExerciseRevision {
          content
          changes
          repository {
            id
            currentRevision {
              content
            }
          }
        }
        ... on GroupedExerciseRevision {
          content
          changes
          repository {
            id
            currentRevision {
              content
            }
          }
        }
        ... on ExerciseGroupRevision {
          ...exerciseGroupRevision
          changes
          repository {
            id
            currentRevision {
              ...exerciseGroupRevision
            }
          }
        }
        ... on SolutionRevision {
          content
          changes
          repository {
            id
            currentRevision {
              content
            }
          }
        }
        ... on VideoRevision {
          ...videoRevision
          changes
          repository {
            id
            currentRevision {
              ...videoRevision
            }
          }
        }
      }

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
          ...pageRevision
        }
        navigation {
          data
          ...path
        }
      }

      ... on Article {
        currentRevision {
          ...articleRevision
        }
      }

      ... on User {
        username
        trashed
        date
        lastLogin
        description
        activeReviewer
        activeAuthor
        activeDonor
      }

      ... on Video {
        currentRevision {
          ...videoRevision
        }
      }

      ... on Applet {
        currentRevision {
          ...appletRevision
        }
      }

      ... on CoursePage {
        currentRevision {
          ...coursePageRevision
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
          ...exerciseGroupRevision
        }
        exercises {
          ...exercise
        }
      }

      ... on Solution {
        ...solution
      }

      ... on Event {
        currentRevision {
          ...eventRevision
        }
      }

      ... on Course {
        pages {
          alias
        }
        currentRevision {
          title
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
              alias
              instance
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
                    id
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
      default
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

    ... on Event {
      alias
      id
      currentRevision {
        title
      }
    }
  }

  fragment articleRevision on ArticleRevision {
    title
    content
    metaTitle
    metaDescription
  }

  fragment pageRevision on PageRevision {
    id
    title
    content
  }

  fragment videoRevision on VideoRevision {
    title
    url
    content
  }

  fragment appletRevision on AppletRevision {
    title
    content
    url
    metaTitle
    metaDescription
  }

  fragment coursePageRevision on CoursePageRevision {
    content
    title
  }

  fragment courseRevision on CourseRevision {
    content
    title
    metaDescription
  }

  fragment exerciseGroupRevision on ExerciseGroupRevision {
    content
  }

  fragment eventRevision on EventRevision {
    content
  }

  fragment exercise on AbstractExercise {
    id
    alias
    instance
    trashed
    currentRevision {
      content
    }
    solution {
      ...solution
    }
    ...license
  }

  fragment solution on Solution {
    id
    currentRevision {
      content
    }
    ...license
  }
`

export type QueryResponseNoRevision =
  | Page
  | Article
  | Video
  | Applet
  | CoursePage
  | Exercise
  | GroupedExercise
  | ExerciseGroup
  | Solution
  | Event
  | Course
  | TaxonomyTerm
  | User

export type QueryResponse = QueryResponseNoRevision | QueryResponseRevision

export const idsQuery = (ids: number[]) => {
  const map = ids.map(
    (id) => gql` 
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
export const idQuery = (id: number) => gql`
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

export const licenseDetailsQuery = (id: number) => `
  query {
    license(id: ${id}) {
      title
      content
      iconHref
    }
  }
`
