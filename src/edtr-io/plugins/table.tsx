import { EditorPlugin, StringStateType } from '@edtr-io/plugin'
import {
  createTablePlugin,
  TableConfig,
  TableProps,
} from '@edtr-io/plugin-table'
import { converter } from '@serlo/markdown'

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

export const tablePlugin: EditorPlugin<StringStateType, TableConfig> = {
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
