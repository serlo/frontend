import { Component, useCallback, useContext } from 'react'

import { undo, useAppDispatch } from '../../store'
import { PluginProps } from '../../types/internal__plugin-state'
import { EditableContext } from '../contexts'
import { SubDocumentEditor } from './editor'
import { SubDocumentRenderer } from './renderer'

/**
 * Renders a document inside another document
 *
 * @param props - The {@link SubDocumentProps}
 */
export const SubDocument = (props: SubDocumentProps) => {
  const editable = useContext(EditableContext)
  const dispatch = useAppDispatch()
  const undoMemo = useCallback(() => {
    void dispatch(undo())
  }, [dispatch])

  const Component = editable ? SubDocumentEditor : SubDocumentRenderer
  return (
    <ErrorBoundary undo={undoMemo}>
      <Component {...props} />
    </ErrorBoundary>
  )
}
// this uses ErrorBoundary functionality that is only available in class components since react 17
class ErrorBoundary extends Component<{
  undo: () => void
  children: React.ReactNode
}> {
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
    console.error(error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="my-12 rounded-2xl bg-orange-200 p-4 font-bold">
          Leider ist ein Fehler aufgetreten.
          <button
            onClick={() => {
              this.props.undo()
              this.setState({ hasError: false })
            }}
            className="serlo-button-blue mt-3 block"
          >
            Letzte Änderung rückgänging machen
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export interface SubDocumentProps {
  id: string
  pluginProps?: PluginProps
}
