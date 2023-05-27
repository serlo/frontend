import { convertTable } from './convert-table'
import { SerloEditor } from '@/edtr-io/serlo-editor'
import { renderNested } from '@/schema/article-renderer'
import { convert } from '@/schema/convert-edtr-io-state'
import { EdtrPluginTable } from '@/schema/edtr-io-types'

export const MutationPreview = ({
  tablesState,
}: {
  tablesState: EdtrPluginTable[]
}) => {
  const convertedTables = tablesState.map(convertTable)

  return (
    <>
      {tablesState.map((table, i) => {
        // table.state.split('\n').forEach((line) => {
        //   console.log(line)
        // })
        return (
          <div key={JSON.stringify(table)}>
            <div className="mt-12 flex border-4 py-6">
              <b className="absolute -mt-14 left-side">Legacy Table</b>
              <div className="flex-1">
                {renderNested(convert(table), [''], [''])}
              </div>
              <b className="absolute -mt-14 right-side">Converted (Frontend)</b>
              <div className="flex-1">
                {renderNested(convert(convertedTables[i]), [''], [''])}
              </div>
            </div>
          </div>
        )
      })}
      <div className="m-side max-w-3xl edtr-io serlo-editor-hacks">
        <b className="">Editor Preview</b>
        <div className="controls-portal sticky top-0 z-[94] bg-white" />
        <SerloEditor
          entityNeedsReview
          onSave={async () => {
            return new Promise((resolve) => {
              resolve()
            })
          }}
          type="article"
          initialState={{
            plugin: 'rows',
            state: convertedTables,
          }}
        />
      </div>
    </>
  )
}
