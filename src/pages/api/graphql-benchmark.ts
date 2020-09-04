import { request, gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

import { endpoint } from '@/api/endpoint'
import { dataQuery } from '@/fetcher/query'

const newQuery = gql`
  query uuid($id: Int, $alias: AliasInput) {
    uuid(id: $id, alias: $alias) {
      __typename
      id
      ... on AbstractRevision {
        date
        author {
          id
          username
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

export default async function benchmark(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('existing request')
  for (let i = 0; i < 50; i++) {
    console.time('request')
    await request(endpoint, dataQuery, {
      id: 19767,
    })
    console.timeEnd('request')
  }
  console.log('new request')
  for (let i = 0; i < 50; i++) {
    console.time('request')
    await request(endpoint, newQuery, {
      id: 19767,
    })
    console.timeEnd('request')
  }
  res.send('ok')
}
