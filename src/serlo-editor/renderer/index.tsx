// Used in https://github.com/serlo/serlo-editor-for-edusharing

import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { EditableContext, SubDocument } from '@/serlo-editor/core'
import { runInitRootSaga, store } from '@/serlo-editor/store'

export function Renderer<K extends string = string>({
  documentState,
}: RendererProps<K>) {
  useEffect(() => {
    store.dispatch(runInitRootSaga({ initialState: documentState }))
  }, [documentState])

  return (
    <Provider store={store}>
      <EditableContext.Provider value={false}>
        <SubDocument id="root" />
      </EditableContext.Provider>
    </Provider>
  )
}

export interface RendererProps<K extends string = string> {
  documentState: {
    plugin: K
    state?: unknown
  }
}
