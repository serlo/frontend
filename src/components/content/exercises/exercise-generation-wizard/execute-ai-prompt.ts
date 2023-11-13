// execute-ai-prompt.tsx
import { useState, useCallback, useEffect, useRef } from 'react'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { useAuthentication } from '@/auth/use-authentication'
import { submitEvent } from '@/helper/submit-event'

export enum ExecutePromptStatus {
  Loading,
  Success,
  Error,
}

type UnknownRecord = Record<string, unknown>

interface GraphQLResponse<T extends UnknownRecord = UnknownRecord> {
  ai: {
    executePrompt: {
      success: boolean
      // We now expect to always receive an object as return value
      record: T
    }
  }
}

interface UseExecuteAIPromptProps {
  prompt: string

  submitEventPrefix: string
}

interface UseExecuteAIPromptReturn<T extends UnknownRecord> {
  data: T | null
  status: ExecutePromptStatus
  setStatus: (status: ExecutePromptStatus) => void
  errorMessage: string | null
  setErrorMessage: (errorMessage: string | null) => void
  regenerate: () => void
}

export function useExecuteAIPrompt<T extends UnknownRecord>({
  prompt,
  submitEventPrefix,
}: UseExecuteAIPromptProps): UseExecuteAIPromptReturn<T> {
  const auth = useAuthentication()
  const [data, setData] = useState<T | null>(null)
  const [status, setStatus] = useState(ExecutePromptStatus.Loading)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Needed for React StrictMode to not run the prompt twice
  const isExecutingPrompt = useRef(false)

  const abortControllerRef = useRef<AbortController | null>(null)
  const [numberOfRegenerations, setNumberOfRegenerations] = useState(0)

  const executePrompt = useCallback(async () => {
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    const signal = abortController.signal

    try {
      isExecutingPrompt.current = true
      setStatus(ExecutePromptStatus.Loading)

      const graphQlFetch = createAuthAwareGraphqlFetch<GraphQLResponse<T>>(auth)

      if (signal?.aborted) {
        return
      }

      const query = `
        query ($prompt: String!) {
          ai {
            executePrompt(prompt: $prompt) {
              success
              record
            }
          }
        }
      `
      const variables = { prompt }
      submitEvent(`${submitEventPrefix}-fetch-${numberOfRegenerations}`)
      const response = await graphQlFetch(
        JSON.stringify({ query, variables }),
        signal
      )

      if (response?.ai?.executePrompt?.success) {
        setData(response?.ai.executePrompt.record)
        setStatus(ExecutePromptStatus.Success)
      } else {
        setStatus(ExecutePromptStatus.Error)
        setErrorMessage('Unknown failure when executing prompt!')
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Fetch was successfully aborted!')
        setStatus(ExecutePromptStatus.Error)
        submitEvent(`${submitEventPrefix}-aborted`)

        return
      }

      if (
        error instanceof SyntaxError &&
        error.message.includes("Unexpected token '<'")
      ) {
        // This indicates that the error message is HTML content which most
        // likely is a server (api) error
        setErrorMessage(
          'A parsing error occurred due to receiving unexpected content.\n\nPlease try again later.'
        )
        setStatus(ExecutePromptStatus.Error)
        submitEvent(`${submitEventPrefix}-failure`)
        return
      }

      if (
        error instanceof Error &&
        'response' in error &&
        error['response'] instanceof Response
      ) {
        const response: Response = error['response']

        if (response.status === 500) {
          setErrorMessage('Server error occurred. Please try again later.')
        } else {
          setErrorMessage(`Error: Received status code ${response.status}`)
        }
        setStatus(ExecutePromptStatus.Error)
        submitEvent(`${submitEventPrefix}-failure`)
        return
      }

      console.error('Failed to execute prompt:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error!')
      submitEvent(`${submitEventPrefix}-failure`)
      setStatus(ExecutePromptStatus.Error)
    } finally {
      isExecutingPrompt.current = false
    }
  }, [prompt, auth, submitEventPrefix, numberOfRegenerations])

  useEffect(() => {
    if (isExecutingPrompt.current) {
      return
    }

    const abortController = abortControllerRef?.current
    executePrompt()
      .then(() => void null)
      .catch(() => void null)

    return () => {
      abortController?.abort()
    }
  }, [executePrompt])

  const regenerate = useCallback(() => {
    if (!isExecutingPrompt.current) {
      setNumberOfRegenerations((prev) => prev + 1)
    }
  }, [])

  return { data, status, setStatus, errorMessage, setErrorMessage, regenerate }
}
