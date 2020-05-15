export const idQuery = id => `
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

export const dataQuery = selector => `
  {
    uuid(${selector}) {
      __typename

      ... on Page {
        id
        alias
        currentRevision {
          title
          content
        }
        navigation {
          data
          path {
            label
            url
          }
        }
      }

      ... on Article {
        id
        alias
        currentRevision {
          title
          content
          metaTitle
          metaDescription
        }
        taxonomyTerms {
          navigation {
            # hide side navigation
            path {
              label
              url
            }
          }
        }
        license {
          id
          url
          title
        }
      }

      ... on Exercise {
        currentRevision {
          content
        }
        solution {
          currentRevision {
            content
          }
          license {
            id
            url
            title
          }
        }
        license {
          id
          url
          title
        }
        # don't load taxonomy because user can't navigate here
      }

      ... on GroupedExercise {
        currentRevision {
          content
        }
        solution {
          currentRevision {
            content
          }
          license {
            id
            url
            title
          }
        }
        license {
          id
          url
          title
        }
        # don't load taxonomy because user can't navigate here
      }

      ... on ExerciseGroup {
        currentRevision {
          content
        }
        exercises {
          currentRevision {
            content
          }
          solution {
            currentRevision {
              content
            }
            license {
              id
              url
              title
            }
          }
          license {
            id
            url
            title
          }
        }
        license {
          id
          url
          title
        }
        # don't load taxonomy because user can't navigate here
      }

      ... on Video {
        alias
        currentRevision {
          title
          url
          content
          # no meta available
        }
        taxonomyTerms {
          navigation {
            path {
              label
              url
            }
          }
        }
        license {
          id
          url
          title
        }
      }

      ... on Applet {
        alias
        currentRevision {
          title
          url
          metaTitle
          metaDescription
        }
        taxonomyTerms {
          navigation {
            path {
              label
              url
            }
          }
        }
        license {
          id
          url
          title
        }
      }

      ... on CoursePage {
        alias
        id
        currentRevision {
          content
          title
          # no meta available
        }
        course {
          currentRevision {
            title
          }
          pages {
            alias
            currentRevision {
              title
            }
          }
          taxonomyTerms {
            navigation {
              path {
                label
                url
              }
            }
          }
        }
        license {
          id
          url
          title
        }
      }

      ... on Course {
        # redirect to first course page
        pages {
          alias
        }
      }

      ... on Event {
        currentRevision {
          content
        }
      }

      ... on TaxonomyTerm {
        alias
        type
        name
        id
        description
        navigation {
          data
          path {
            label
            url
          }
        }
        children {
          trashed
          __typename
          ... on Article {
            alias
            currentRevision {
              title
            }
          }
          ... on Video {
            alias
            currentRevision {
              title
            }
          }
          ... on Applet {
            alias
            currentRevision {
              title
            }
          }
          ... on Course {
            alias
            currentRevision {
              title
            }
          }
          ... on Exercise {
            # exercises are shown within taxonomy
            currentRevision {
              content
            }
            solution {
              currentRevision {
                content
              }
              license {
                id
                url
                title
              }
            }
            license {
              id
              url
              title
            }
          }
          ... on ExerciseGroup {
            # exercises are shown within taxonomy
            currentRevision {
              content
            }
            exercises {
              currentRevision {
                content
              }
              solution {
                currentRevision {
                  content
                }
                license {
                  id
                  url
                  title
                }
              }
              license {
                id
                url
                title
              }
            }
            license {
              id
              url
              title
            }
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
              ... on Article {
                alias
                currentRevision {
                  title
                }
              }
              ... on Video {
                alias
                currentRevision {
                  title
                }
              }
              ... on Course {
                alias
                currentRevision {
                  title
                }
              }
              ... on Applet {
                alias
                currentRevision {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`
