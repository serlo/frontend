import * as React from 'react'

import { PluginProps } from '../../internal__plugin-state'
import { undo } from '../../store'
import { ScopeContext, ErrorContext, useScopedDispatch } from '../store'
import { SubDocumentEditor } from './editor'
import { SubDocumentRenderer } from './renderer'

/**
 * Renders a document inside another document
 *
 * @param props - The {@link SubDocumentProps}
 * @public
 */
export const SubDocument = (props: SubDocumentProps) => {
  const { editable } = React.useContext(ScopeContext)
  const dispatch = useScopedDispatch()
  const undoMemo = React.useCallback(() => {
    dispatch(undo())
  }, [dispatch])

  const Component = editable ? SubDocumentEditor : SubDocumentRenderer
  return (
    <ErrorBoundary undo={undoMemo}>
      <Component {...props} />
    </ErrorBoundary>
  )
}

export class ErrorBoundary extends React.Component<{
  undo: () => void
  children: React.ReactNode
}> {
  static contextType = ErrorContext

  public state = { hasError: false }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(
    error: Error,
    errorInfo: { componentStack: string }
  ) {
    if (typeof this.context === 'function') {
      this.context(error, errorInfo)
    }
    // eslint-disable-next-line no-console
    console.log(error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 my-12 rounded-2xl font-bold bg-orange-200">
          Leider ist ein Fehler aufgetreten.
          <button
            onClick={() => {
              this.props.undo()
              this.setState({ hasError: false })
            }}
            className="serlo-button-blue block mt-3"
          >
            Letzte Änderung rückgänging machen
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

/** @public */
export interface SubDocumentProps {
  id: string
  pluginProps?: PluginProps
}
