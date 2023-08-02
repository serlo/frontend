import { LayoutPluginState } from '.'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorPluginProps, StateTypeReturnType } from '@/serlo-editor/plugin'
import {
  store,
  DocumentState,
  runReplaceDocumentSaga,
  selectSerializedDocument,
  useAppDispatch,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import { RowsPlugin } from '@/serlo-editor-integration/types/legacy-editor-to-editor-types'

export const LayoutRenderer: React.FunctionComponent<
  EditorPluginProps<LayoutPluginState> & {
    insert?: (options?: DocumentState) => void
    remove?: () => void
  }
> = (props) => {
  const dispatch = useAppDispatch()

  const editorStrings = useEditorStrings()

  return (
    <>
      {props.editable ? (
        <div className="border border-gray-400 bg-[#f2dede] p-1 text-center text-[#a94442]">
          {editorStrings.plugins.layout.toDragConvert}
          <div className="flex flex-row">
            <button
              className="serlo-button-editor-secondary"
              onClick={convertToRow}
            >
              {editorStrings.plugins.layout.oneColumnLayout}
            </button>
            {canConvertToMultimedia() ? (
              <button
                className="serlo-button-editor-secondary"
                onClick={convertToMultimedia}
              >
                {editorStrings.plugins.layout.multimediaTitle}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="flex flex-row flex-wrap items-start">
        {props.state.map((item, index) => {
          return (
            <div
              key={index}
              style={{ width: `${(item.width.value / 12) * 100}%` }}
              className="[@media(max-width:480px)]:!w-full"
            >
              {item.child.render()}
            </div>
          )
        })}
      </div>
    </>
  )

  function convertToRow() {
    const documents: DocumentState[] = []

    props.state.forEach((item) => {
      const element = selectSerializedDocument(store.getState(), item.child.id)

      if (!element) return
      if (element.plugin === EditorPluginType.Rows) {
        ;(element as RowsPlugin).state.forEach((rowsItem) => {
          documents.push(rowsItem)
        })
      } else {
        documents.push(element)
      }
    })

    dispatch(
      runReplaceDocumentSaga({
        id: props.id,
        pluginType: EditorPluginType.Rows,
        state: documents,
      })
    )
  }

  function canConvertToMultimedia() {
    const columns = props.state
    return (
      columns.length === 2 &&
      (isMultimediaColumn(columns[0]) || isMultimediaColumn(columns[1]))
    )
  }

  function convertToMultimedia() {
    if (!canConvertToMultimedia()) return
    const columns = props.state
    if (isMultimediaColumn(columns[0])) {
      replaceWithMultimedia({
        explanationColumn: columns[1],
        multimediaColumn: columns[0],
      })
    } else {
      replaceWithMultimedia({
        explanationColumn: columns[0],
        multimediaColumn: columns[1],
      })
    }

    function replaceWithMultimedia({
      explanationColumn,
      multimediaColumn,
    }: {
      explanationColumn: Column
      multimediaColumn: Column
    }) {
      const explanation = selectSerializedDocument(
        store.getState(),
        explanationColumn.child.id
      )
      const multimedia = selectSerializedDocument(
        store.getState(),
        multimediaColumn.child.id
      )
      if (!explanation || !multimedia) return
      dispatch(
        runReplaceDocumentSaga({
          id: props.id,
          pluginType: EditorPluginType.Multimedia,
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
    const columnDocument = selectSerializedDocument(
      store.getState(),
      column.child.id
    )
    if (!columnDocument || !(columnDocument.state instanceof Array))
      return false

    const children: string[] = columnDocument.state.map(
      (child: DocumentState) => child.plugin
    )
    return children.length === 1 && isMultimediaPlugin(children[0])
  }

  function isMultimediaPlugin(plugin: string) {
    return (
      plugin === EditorPluginType.Image ||
      plugin === EditorPluginType.Geogebra ||
      plugin === EditorPluginType.Video
    )
  }
}

type Column = StateTypeReturnType<LayoutPluginState>[number]
