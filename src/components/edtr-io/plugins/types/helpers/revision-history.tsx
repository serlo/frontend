import { PluginToolbarButton } from '@edtr-io/core'
import { Icon, faCheck } from '@edtr-io/ui'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { gql } from 'graphql-request'
import moment from 'moment'
import { PropsWithChildren, useState } from 'react'

import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
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
        {renderTable()}
      </ModalWithCloseButton>
      <style jsx global>{`
        .ReactModalPortal .ReactModal__Content {
          @apply w-[900px] max-w-[90vw] max-h-[80vh];
          @apply translate-y-0 top-8 overflow-y-scroll;
        }
      `}</style>
    </div>
  )

  function renderTable() {
    return (
      <table className="serlo-table relative">
        <thead>
          <tr>
            <th>#</th>
            <th>{editorStrings.edtrIo.current}</th>
            <th>{editorStrings.edtrIo.changes}</th>
            <th>{editorStrings.edtrIo.author}</th>
            <th>{editorStrings.edtrIo.createdAt}</th>
            {/* <style jsx>{`
              th {
                @apply sticky top-0 bg-white p-1;
              }
            `}</style> */}
          </tr>
        </thead>
        <tbody>
          {revisions.map(({ id, trashed, date, changes, author }) => {
            const isCurrentlyAccepted = props.currentRevision === id
            const isCurrentlyOpen = false //TODO!
            const selected = false // TODO!

            console.log(trashed)
            console.log(isCurrentlyOpen)

            const dateTime = moment.utc(date).local()
            return (
              <tr
                className={clsx(
                  selected ? 'border-3 border-brand' : 'cursor-pointer'
                )}
                onClick={() => {
                  // don't select the current selected
                  if (selected) return null
                  fetchRevisionData()
                }}
                key={id}
              >
                <td className="serlo-td">{id}</td>
                <td className="serlo-td">
                  {isCurrentlyAccepted ? <Icon icon={faCheck} /> : null}
                </td>
                <td className="serlo-td">{changes}</td>
                <td className="serlo-td">{author.username}</td>
                <td className="serlo-td" title={dateTime.format('LL, LTS')}>
                  {dateTime.fromNow()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

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
