import { Component, useCallback, useContext } from 'react'

import { SubDocumentEditor } from './editor'
import { SubDocumentRenderer } from './renderer'
import { undo, useAppDispatch } from '../../store'
import type { PluginProps } from '../../types/internal__plugin-state'
import { EditableContext } from '../contexts'

/**
 * Renders a subset of the whole document tree starting from `props.id` including all children.
 *
 * `props.id` needs to specify an item within the `documents` array in the redux store.
 *
 * @param props.id - The id of the item within `documents` that should be rendered
 * @param props.pluginProps.config - Optional overwrites for plugin configuration
 * @param props - {@link SubDocumentProps}
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
