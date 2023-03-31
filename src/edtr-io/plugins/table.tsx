import { converter } from '@serlo/markdown'
import { EditorPlugin } from 'test-edtr-io/plugin'
import {
  createTablePlugin,
  TableConfig,
  TablePluginState,
  TableProps,
} from 'test-edtr-io/plugin-table'

import { renderArticle } from '@/schema/article-renderer'
import { convertLegacyState } from '@/schema/convert-legacy-state'

const edtrTablePlugin = createTablePlugin({
  MarkdownRenderer,
})

function MarkdownRenderer(props: { markdown: string }) {
  const html = converter.makeHtml(props.markdown)
  const node = convertLegacyState(html)
  return <>{renderArticle(node.children)}</>
}

export const tablePlugin: EditorPlugin<TablePluginState, TableConfig> = {
  ...edtrTablePlugin,
  Component: TableEditor,
}

function TableEditor(props: TableProps) {
  return (
    <div>
      <edtrTablePlugin.Component {...props} />
    </div>
  )
}
