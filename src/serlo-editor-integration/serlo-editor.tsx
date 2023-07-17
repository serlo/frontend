import { Entity, UuidType } from '@serlo/authorization'
import { ReactNode, useCallback, useState } from 'react'

import {
  debouncedStoreToLocalStorage,
  getStateFromLocalStorage,
  LocalStorageNotice,
} from './components/local-storage-notice'
import { createPlugins } from './create-plugins'
import {
  PluginErrors,
  SetError,
  DeleteError,
  SaveContext,
} from '../serlo-editor/save-context'
import { useCanDo } from '@/auth/use-can-do'
import { MathSpan } from '@/components/content/math-span'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'
import { Editor, EditorProps } from '@/serlo-editor/core'
import { OnEditorChange } from '@/serlo-editor/core/editor'

export interface SerloEditorProps {
  children?: ReactNode
  entityNeedsReview: boolean
  onSave: (data: SetEntityMutationData) => Promise<void>
  initialState: EditorProps['initialState']
  type: UuidType
}

export interface LooseEdtrData {
  [key: string]: EditorProps['initialState'] | null | undefined
}

export interface LooseEdtrDataDefined {
  [key: string]: EditorProps['initialState']
}

export function SerloEditor({
  onSave,
  entityNeedsReview,
  initialState,
  children,
  type,
}: SerloEditorProps) {
  const canDo = useCanDo()
  const userCanSkipReview = canDo(Entity.checkoutRevision)
  const [useStored, setUseStored] = useState(false)

  const { lang } = useInstanceData()

  const [errors, setErrors] = useState<PluginErrors>({})
  const loggedInData = useLoggedInData()

  const onChange = useCallback<OnEditorChange>(({ changed, getDocument }) => {
    if (!changed) return
    void debouncedStoreToLocalStorage(getDocument())
  }, [])

  const setError = useCallback<SetError>(
    (pluginId, errorMessage, plugin) =>
      setErrors((errors) => ({
        ...errors,
        [pluginId]: { message: errorMessage, plugin },
      })),
    [setErrors]
  )

  const deleteError = useCallback<DeleteError>(
    (pluginId) => {
      if (errors[pluginId]) {
        setErrors(
          ({ [pluginId]: _errorToBeDeleted, ...restOfErrors }) => restOfErrors
        )
      }
    },
    [setErrors, errors]
  )

  if (!loggedInData)
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    )

  const editorStrings = loggedInData.strings.editor

  const plugins = createPlugins({
    editorStrings,
    instance: lang,
    parentType: type,
  })

  return (
    // eslint-disable-next-line @typescript-eslint/unbound-method
    <SaveContext.Provider
      value={{
        onSave,
        errors,
        setError,
        deleteError,
        userCanSkipReview,
        entityNeedsReview,
      }}
    >
      <LocalStorageNotice useStored={useStored} setUseStored={setUseStored} />
      <MathSpan formula="" /> {/* preload formula plugin */}
      <Editor
        plugins={plugins}
        initialState={useStored ? getStateFromLocalStorage()! : initialState}
        editable
        onChange={onChange}
      >
        {children}
      </Editor>
    </SaveContext.Provider>
  )
}
