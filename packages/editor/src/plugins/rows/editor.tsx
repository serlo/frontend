import type { RowsProps } from '.'
import { RowsInnerEditor } from './components/rows-inner-editor'
import { PluginMenuProvider } from './contexts/plugin-menu'

export function RowsEditor(props: RowsProps) {
  const { config } = props

  return (
    <PluginMenuProvider allowedChildPlugins={config.allowedPlugins}>
      <RowsInnerEditor {...props} />
    </PluginMenuProvider>
  )
}
