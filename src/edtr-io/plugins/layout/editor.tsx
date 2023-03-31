import { RowsPlugin } from '@serlo/legacy-editor-to-editor'
import { useScopedStore } from 'test-edtr-io/core'
import { EditorPluginProps, StateTypeReturnType } from 'test-edtr-io/plugin'
import { styled } from 'test-edtr-io/renderer-ui'
import { DocumentState, replace, serializeDocument } from 'test-edtr-io/store'

import { layoutState } from '.'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const LayoutContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
})

const ChildContainer = styled.div<{ width: number }>(({ width }) => {
  return {
    width: `${(width / 12) * 100}%`,
    '@media (max-width: 480px)': {
      width: '100%',
    },
  }
})
const ConvertInfo = styled.div({
  padding: '5px',
  backgroundColor: '#f2dede',
  color: '#a94442',
  border: '1px solid #ebccd1',
  textAlign: 'center',
})

const ButtonContainer = styled.div({ display: 'flex', flexDirection: 'row' })

const ConvertButton = styled.button({
  borderRadius: '5px',
  margin: '5px',
  border: 'none',
  outline: 'none',
  backgroundColor: 'white',
  '&:hover': { backgroundColor: '#ebccd1' },
})

export const LayoutRenderer: React.FunctionComponent<
  EditorPluginProps<typeof layoutState> & {
    insert?: (options?: DocumentState) => void
    remove?: () => void
  }
> = (props) => {
  const store = useScopedStore()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <>
      {props.editable ? (
        <ConvertInfo>
          {editorStrings.layout.toDragConvert}
          <ButtonContainer>
            <ConvertButton onClick={convertToRow}>
              {editorStrings.layout.oneColumnLayout}
            </ConvertButton>
            {canConvertToMultimediaExplanation() ? (
              <ConvertButton onClick={convertToMultimediaExplanation}>
                {editorStrings.layout.multimediaTitle}
              </ConvertButton>
            ) : null}
          </ButtonContainer>
        </ConvertInfo>
      ) : null}
      <LayoutContainer>
        {props.state.map((item, index) => {
          return (
            <ChildContainer key={index} width={item.width.value}>
              {item.child.render()}
            </ChildContainer>
          )
        })}
      </LayoutContainer>
    </>
  )

  function convertToRow() {
    const documents: DocumentState[] = []

    props.state.forEach((item) => {
      const element = serializeDocument(item.child.id)(store.getState())

      if (!element) return
      if (element.plugin === 'rows') {
        ;(element as RowsPlugin).state.forEach((rowsItem) => {
          documents.push(rowsItem)
        })
      } else {
        documents.push(element)
      }
    })

    store.dispatch(
      replace({
        id: props.id,
        plugin: 'rows',
        state: documents,
      })
    )
  }

  function canConvertToMultimediaExplanation() {
    const columns = props.state
    return (
      columns.length === 2 &&
      (isMultimediaColumn(columns[0]) || isMultimediaColumn(columns[1]))
    )
  }

  function convertToMultimediaExplanation() {
    if (!canConvertToMultimediaExplanation()) return
    const columns = props.state
    if (isMultimediaColumn(columns[0])) {
      replaceWithMultimediaExplanation({
        explanationColumn: columns[1],
        multimediaColumn: columns[0],
      })
    } else {
      replaceWithMultimediaExplanation({
        explanationColumn: columns[0],
        multimediaColumn: columns[1],
      })
    }

    function replaceWithMultimediaExplanation({
      explanationColumn,
      multimediaColumn,
    }: {
      explanationColumn: Column
      multimediaColumn: Column
    }) {
      const explanation = serializeDocument(explanationColumn.child.id)(
        store.getState()
      )
      const multimedia = serializeDocument(multimediaColumn.child.id)(
        store.getState()
      )
      if (!explanation || !multimedia) return
      store.dispatch(
        replace({
          id: props.id,
          plugin: 'multimedia',
          state: {
            explanation,
            multimedia:
              multimedia.state instanceof Array
                ? (multimedia.state[0] as unknown)
                : undefined,
            illustrating: true,
            width: 50,
          },
        })
      )
    }
  }

  function isMultimediaColumn(column: Column) {
    const columnDocument = serializeDocument(column.child.id)(store.getState())
    if (!columnDocument || !(columnDocument.state instanceof Array))
      return false

    const children: string[] = columnDocument.state.map(
      (child: DocumentState) => child.plugin
    )
    return children.length === 1 && isMultimediaPlugin(children[0])
  }

  function isMultimediaPlugin(plugin: string) {
    return plugin === 'image' || plugin === 'geogebra' || plugin === 'video'
  }
}

type Column = StateTypeReturnType<typeof layoutState>[0]
