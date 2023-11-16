export interface SentryGlobal {
  Sentry?: {
    addBreadcrumb: (arg0: {
      type?: string
      category?: string
      message?: string
      level?: string
      timestamp?: string
      data?: unknown
    }) => void
    captureException: (arg0: Error) => void
    Severity?: {
      Info: string
    }
    init: (arg0: { environment: string; release: string }) => void
    forceLoad: () => void
  }
}

interface TriggerSentryData {
  message?: string
  code?: number
  data?: unknown
}

export function triggerSentry({
  message = 'without message',
  code = 0,
  data,
}: TriggerSentryData) {
  // eslint-disable-next-line no-console
  console.error(message)
  if (
    typeof window !== 'undefined' &&
    process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined
  ) {
    const windowWithSentry = window as unknown as Window & SentryGlobal
    windowWithSentry.Sentry?.addBreadcrumb({
      category: 'error message',
      message,
      data,
      level: windowWithSentry.Sentry?.Severity?.Info || 'info',
    })
    windowWithSentry.Sentry?.captureException(new Error(`${code}: ${message}`))
  }
}
