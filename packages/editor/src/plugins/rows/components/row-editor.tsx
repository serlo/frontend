import { StateTypeReturnType } from '@editor/plugin'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { selectIsFocused, useAppSelector } from '@editor/store'
import { type MouseEvent, useRef, Component, type ReactNode } from 'react'

import { AddRowButtonFloating } from './add-row-button-floating'
import type { RowsPluginConfig, RowsPluginState } from '..'
import { EditorRowRenderer } from '../editor-renderer'

interface RowEditorProps {
  config: RowsPluginConfig
  index: number
  rows: StateTypeReturnType<RowsPluginState>
  row: StateTypeReturnType<RowsPluginState>[0]
  hideAddButton: boolean
  onAddButtonClick: (insertIndex: number) => void
  isRootRow?: boolean
}

// TODO: Move this to an appropriate place
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: unknown) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error', error, info)
  }

  componentDidUpdate({ children }: { children: ReactNode }): void {
    if (children !== this.props.children) this.setState({ error: null })
  }

  render() {
    if (this.state.error !== null) {
      // You can render any custom fallback UI
      return (
        <div className="m-side mt-12 rounded-2xl bg-editor-primary-50 p-side md:-mt-9">
          <b>
            Leider wurde ein fehlerhafter Inhalt generiert. Die Fehlermeldung
            lautet:
          </b>{' '}
          {this.state.error.message}
        </div>
      )
    }

    return this.props.children
  }
}

export function RowEditor({
  config,
  index,
  row,
  rows,
  hideAddButton,
  onAddButtonClick,
  isRootRow,
}: RowEditorProps) {
  const focused = useAppSelector((state) => selectIsFocused(state, row.id))
  const plugins = editorPlugins.getAllWithData()
  const dropContainer = useRef<HTMLDivElement>(null)

  function handleAddPluginButtonClick(e: MouseEvent, insertIndex: number) {
    e.preventDefault()
    onAddButtonClick(insertIndex)
  }

  return (
    <ErrorBoundary>
      <div
        key={row.id}
        ref={dropContainer}
        // bigger drop zone with padding hack
        className="rows-child relative -ml-12 pl-12"
      >
        {isRootRow && index === 0 && (
          <AddRowButtonFloating
            focused={focused}
            onClick={(e) => handleAddPluginButtonClick(e, index)}
          />
        )}
        <EditorRowRenderer
          config={config}
          row={row}
          rows={rows}
          index={index}
          plugins={plugins}
          dropContainer={dropContainer}
        />
        {hideAddButton ? null : (
          <AddRowButtonFloating
            focused={focused}
            onClick={(e) => handleAddPluginButtonClick(e, index + 1)}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}
