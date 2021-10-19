import { PluginToolbarButton } from '@edtr-io/core'
import { Icon } from '@edtr-io/ui'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { gql } from 'graphql-request'
import { PropsWithChildren, useState } from 'react'

import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { RevisionHistory as SerloRevisionHistory } from '@/components/pages/revision-history'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { HistoryRevisionsData } from '@/data-types'

export function RevisionHistory<T>(
  props: PropsWithChildren<{
    id: number
    currentRevision: number
    onSwitchRevision: (data: T) => void
  }>
) {
  const [showRevisions, setShowRevisions] = useState(false)

  const revisionsResponse = useRevisionsFetch(props.id)

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  if (props.id === 0) return null

  if (!revisionsResponse.data?.uuid.revisions) {
    return <p>…</p>
  }

  const revisions = revisionsResponse.data?.uuid.revisions.nodes
  // const currentlyAccepted = revisionsResponse.data?.uuid.currentRevision.id

  const onSelectRevision = (id: number) => {
    //don't select the current selected
    const isCurrentlyLoaded = props.currentRevision === id
    if (isCurrentlyLoaded) return null
    fetchRevisionData()
  }

  return (
    <div>
      <span
        onClick={() => {
          if (revisions.length) {
            setShowRevisions(true)
          }
        }}
      >
        <PluginToolbarButton
          icon={<Icon icon={faHistory} size="lg" />}
          label={editorStrings.edtrIo.switchRevision}
        />
      </span>

      <ModalWithCloseButton
        isOpen={showRevisions}
        onCloseClick={() => {
          setShowRevisions(false)
        }}
        title={editorStrings.edtrIo.switchRevision}
      >
        {/* {renderTable()} */}
        <SerloRevisionHistory
          data={revisionsResponse.data?.uuid}
          hideEdit
          onSelectRevision={onSelectRevision}
        />
      </ModalWithCloseButton>
      <style jsx global>{`
        .ReactModalPortal .ReactModal__Content {
          @apply w-[900px] max-w-[90vw] max-h-[80vh];
          @apply translate-y-0 top-8 overflow-y-scroll;
        }
      `}</style>
    </div>
  )

  //const isCurrentlyLoaded = props.currentRevision === id
  //const isCurrentlyAccepted = currentlyAccepted === id

  // onClick={() => {
  //             // don't select the current selected
  //             if (isCurrentlyLoaded) return null
  //             fetchRevisionData()
  //           }}

  function useRevisionsFetch(id: number) {
    return useGraphqlSwr<{ uuid: HistoryRevisionsData }>({
      //misusing type here…
      query: revisionsQuery,
      variables: { id },
      config: {
        refreshInterval: 1 * 60 * 1000, //1min
      },
    })
  }

  function fetchRevisionData() {
    // TODO: Build fetch
    alert('not implemented yet')
    /*void fetch(
                        `/entity/repository/get-revision-data/${props.id}/${id}`
                      )
                        .then((response) => response.json())
                        .then((data: { state: unknown; type: string }) => {
                          const deserialized = deserialize({
                            initialState: data.state,
                            type: data.type,
                          })
                          if (isError(deserialized)) {
                            alert(deserialized.error)
                          } else {
                            props.onSwitchRevision(
                              deserialized.initialState.state as T
                            )
                            setShowRevisions(false)
                          }
                        })*/
  }
}

const revisionsQuery = gql`
  query getRevisionIds($id: Int!) {
    uuid(id: $id) {
      ... on Applet {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Article {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Course {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on CoursePage {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Event {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Exercise {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on ExerciseGroup {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on GroupedExercise {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Page {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            date
          }
        }
      }
      ... on Video {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Solution {
        currentRevision {
          id
        }
        solutionRevisions: revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
    }
  }

  fragment authorData on User {
    id
    username
  }
`
