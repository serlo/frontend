import { gql } from 'graphql-request'

export const sharedRevisionFragments = gql`
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

  fragment exerciseGroupRevision on ExerciseGroupRevision {
    content
  }

  fragment eventRevision on EventRevision {
    content
  }
`
