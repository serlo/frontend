import { request } from 'graphql-request'

import { abSubmissionsQuery } from './query-ab-testing-data'
import { AbSubmission, ExperimentQuery } from '../graphql-types/operations'
import { endpoint } from '@/api/endpoint'

// TODO: Check if we can remove this interface
interface AbSubmissionData extends Omit<AbSubmission, 'timestamp'> {
  timestamp: Date
}

export async function requestAbTestingData(
  experiment: string
): Promise<AbSubmissionData[]> {
  const variables = {
    experiment,
  }

  const response = await request<ExperimentQuery>(
    endpoint,
    abSubmissionsQuery,
    variables
  )

  return response.abSubmissions.map((submission) => ({
    ...submission,
    timestamp: new Date(submission.timestamp),
  }))
}
