import ReactMarkdown from 'react-markdown'
import remarkGfmPlugin from 'remark-gfm'

import { TableConfig, TablePluginConfig } from '.'

export function useTableConfig(config: TableConfig): TablePluginConfig {
  const { MarkdownRenderer = DefaultMarkdownRenderer } = config

  return {
    MarkdownRenderer,
  }
}

function DefaultMarkdownRenderer({ markdown }: { markdown: string }) {
  return <ReactMarkdown plugins={[remarkGfmPlugin]}>{markdown}</ReactMarkdown>
}
