// Keep this file in sync with the graphQL schema.

import * as GraphQL from '@serlo/api'

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
  trashed: boolean
}
export interface EntityWithTaxonomyTerms extends Entity {
  taxonomyTerms: { nodes: TaxonomyTerms }
}

// A page, navigation.data is the secondary menu.
export interface Page extends Repository {
  __typename: 'Page'
  trashed?: boolean
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
  revisions: {
    totalCount: number
  }
}

export interface Video extends EntityWithTaxonomyTerms {
  __typename: 'Video'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.VideoRevision, 'title' | 'url' | 'content'>
  >
  revisions: {
    totalCount: number
  }
}

export interface Applet extends EntityWithTaxonomyTerms {
  __typename: 'Applet'
  currentRevision?: GraphQL.Maybe<
    Pick<
      GraphQL.AppletRevision,
      'title' | 'content' | 'url' | 'metaTitle' | 'metaDescription'
    >
  >
  revisions: {
    totalCount: number
  }
}

export interface CoursePage extends Entity {
  __typename: 'CoursePage'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.CoursePageRevision, 'content' | 'title'>
  >
  revisions: {
    totalCount: number
  }
  course: {
    id: number
    currentRevision?: GraphQL.Maybe<Pick<GraphQL.CourseRevision, 'title'>>
    pages: {
      alias?: string
      id: number
      currentRevision: Pick<GraphQL.CoursePageRevision, 'title' | 'trashed'>
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
  revisions?: {
    totalCount: number
  }
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
  exerciseGroup: {
    alias: string
    id: number
  }
}

export interface BareExerciseGroup extends Entity {
  __typename: 'ExerciseGroup'
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.ExerciseGroupRevision, 'content'>
  >
  revisions: {
    totalCount: number
  }
  exercises: BareExercise[]
}

export type ExerciseGroup = BareExerciseGroup & EntityWithTaxonomyTerms

// Solutions are only used in injections, no support for full page view
export interface Solution extends Repository {
  __typename: 'Solution'
  trashed: boolean
  currentRevision?: GraphQL.Maybe<Pick<GraphQL.SolutionRevision, 'content'>>
  license: License
  exercise: { id: number }
}

// Events are only used in injections, no support for full page view
export interface Event extends Repository {
  __typename: 'Event'
  trashed: boolean
  currentRevision?: GraphQL.Maybe<
    Pick<GraphQL.EventRevision, 'content' | 'title'>
  >
}

// User profiles
export interface User extends GraphQL.User {
  __typename: 'User'
  chatUrl: string | null // TODO: Remove when api is updated
  imageUrl: string // TODO: Remove when api is updated
  motivation: string | null // TODO: Remove when api is updated
}

// export interface User extends Repository, GraphQL.User {
//   __typename: 'User'
// }

// If a course is encountered, the first page will get loaded

export interface Course extends Repository {
  __typename: 'Course'
  pages: {
    alias?: string
  }[]
  currentRevision?: GraphQL.Maybe<Pick<GraphQL.CourseRevision, 'title'>>
  revisions: {
    totalCount: number
  }
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
