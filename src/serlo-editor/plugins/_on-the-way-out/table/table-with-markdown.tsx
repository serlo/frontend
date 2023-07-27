import { converter } from '@serlo/markdown'

import { createTablePlugin, TableConfig, TablePluginState, TableProps } from '.'
import { renderArticle } from '@/schema/article-renderer'
import { convertLegacyState } from '@/schema/convert-legacy-state'
import { EditorPlugin } from '@/serlo-editor/plugin'

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
