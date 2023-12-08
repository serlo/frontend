import React, { Component, ErrorInfo, ReactNode } from 'react'

import { isProduction } from './is-production'

interface Props {
  children: ReactNode
  somethingWentWrongString: string
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h1>{this.props.somethingWentWrongString}</h1>
          {!isProduction && (
            <details className="whitespace-pre-wrap">
              {this.state.error ? this.state.error.toString() : null}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
