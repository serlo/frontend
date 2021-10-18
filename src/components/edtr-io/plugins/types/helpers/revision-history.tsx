import { PluginToolbarButton } from '@edtr-io/core'
import { Icon, faCheck, styled } from '@edtr-io/ui'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { PropsWithChildren, useState, useEffect } from 'react'

import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const StyledTR = styled.tr<{ selected: boolean }>((props) => {
  return props.selected
    ? {
        border: '3px solid rgb(0,100,0)',
      }
    : {
        cursor: 'pointer',
      }
})

interface RevisionData {
  id: number
  timestamp: string
  author: string
  changes: string
  active: boolean
}

export function RevisionHistory<T>(
  props: PropsWithChildren<{
    id: number
    currentRevision: number
    onSwitchRevision: (data: T) => void
  }>
) {
  const [availableRevisions] = useState<RevisionData[]>([])
  const [showRevisions, setShowRevisions] = useState(false)
  useEffect(() => {
    if (props.id !== 0) {
      /*fetch(`https://de.serlo.org/entity/repository/get-revisions/${props.id}`)
        .then((response) => response.json())
        .then((data: RevisionData[]) => {
          setAvailableRevisions(data)
        })*/
    }
  }, [props.id])

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <div>
      <span
        onClick={() => {
          setShowRevisions(true) //TODO: for debug only
          if (availableRevisions.length) {
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
    </div>
  )

  function renderTable() {
    return (
      <table className="serlo-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{editorStrings.edtrIo.current}</th>
            <th>{editorStrings.edtrIo.changes}</th>
            <th>{editorStrings.edtrIo.author}</th>
            <th>{editorStrings.edtrIo.createdAt}</th>
          </tr>
        </thead>
        <tbody>
          {availableRevisions.map((revisionData) => {
            const selected = props.currentRevision
              ? props.currentRevision === revisionData.id
              : revisionData.active

            const dateTime = moment.utc(revisionData.timestamp).local()
            return (
              <StyledTR
                selected={selected}
                onClick={() => {
                  // don't select the current selected
                  if (selected) return
                  // TODO: Build fetch
                  alert('not implemented yet')
                  /*void fetch(
                        `/entity/repository/get-revision-data/${props.id}/${revisionData.id}`
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
                }}
                key={revisionData.id}
              >
                <td>{revisionData.id}</td>
                <td>{revisionData.active ? <Icon icon={faCheck} /> : null}</td>
                <th>{revisionData.changes}</th>
                <td>{revisionData.author}</td>
                <td title={dateTime.format('LL, LTS')}>{dateTime.fromNow()}</td>
              </StyledTR>
            )
          })}
        </tbody>
      </table>
    )
  }
}
