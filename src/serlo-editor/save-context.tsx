import { createContext, useCallback, useContext, useEffect } from 'react'

import { SerloEditorProps } from '../serlo-editor-integration/serlo-editor'

// Do we have a constant or a type for all possible plugins?
type PluginName = string

interface PluginError {
  message: string
  plugin: PluginName
}

export type PluginErrors = Record<string, PluginError>

export type DeleteError = (pluginId: string) => void

export type SetError = (
  pluginId: string,
  errorMessage: string,
  plugin: PluginName
) => void

export const SaveContext = createContext<{
  errors: PluginErrors
  deleteError: DeleteError
  setError: SetError
  onSave: SerloEditorProps['onSave']
  userCanSkipReview: boolean
  entityNeedsReview: boolean
}>({
  errors: {},
  deleteError: () => void undefined,
  setError: () => void undefined,
  onSave: () => Promise.reject(),
  userCanSkipReview: false,
  entityNeedsReview: true,
})

export const useSaveContext = () => useContext(SaveContext)

/**
 * If a plugin has an error, this hook will sync it to the save context. This
 * can be useful when you want to prevent the author from saving when there are
 * still errors. The save dialog will still appear and the errorMessages should
 * get listed, so that the author can fix them.
 *
 * TODO using this in the h5p Plugin (the only plugin I tested it in, still
 * causes really weird problems from upstream, the provider). Whenever we set an
 * error, causing the whole editor to rerender the Redux store is updated with
 * stale state and the error is immediately overwritten and the state basically
 * reverted to until before the error.
 */
export const usePluginError = ({
  id,
  plugin,
}: {
  id: string
  plugin: PluginName
}): [string, (errorMessage: string) => void] => {
  const {
    errors,
    deleteError,
    setError: setErrorOfSaveProvider,
  } = useSaveContext()

  const pluginError = errors[id]

  useEffect(() => {
    // No error exists. Nothing to be done until the plugin writes a new
    // PluginError into context
    if (!pluginError) {
      return
    }

    // Delete any potential existing errors when the component that consumes
    // this hook unmounts
    return () => {
      deleteError(id)
    }
  }, [id, deleteError, setErrorOfSaveProvider, pluginError])

  const setError = useCallback(
    (errorMessage: string) => {
      if (!errorMessage) {
        deleteError(id)
        return
      }

      setErrorOfSaveProvider(id, errorMessage, plugin)
    },
    [id, plugin, setErrorOfSaveProvider, deleteError]
  )

  return [pluginError?.message ?? '', setError]
}
