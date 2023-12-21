import { isProduction } from './is-production'

export interface QuickbarStatsSubmissionData {
  path: string
  query: string
  target: string
  isSubject: boolean
}

export function quickbarStatsSubmission(
  data: QuickbarStatsSubmissionData,
  cb?: () => void
) {
  if (!isProduction) {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  void (async () => {
    await fetch('/api/frontend/quickbar-stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
  })().finally(() => cb && cb())
}
