import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { EditableContext, SubDocument } from '@/serlo-editor-repo/core'
import { EditorPlugin } from '@/serlo-editor-repo/plugin'
import { runInitRootSaga, store } from '@/serlo-editor-repo/store'

export function Renderer<K extends string = string>({
  plugins,
  documentState,
}: RendererProps<K>) {
  useEffect(() => {
    store.dispatch(runInitRootSaga({ initialState: documentState, plugins }))
  }, [plugins, documentState])

  return (
    <Provider store={store}>
      <EditableContext.Provider value={false}>
        <SubDocument id="root" />
      </EditableContext.Provider>
    </Provider>
  )
}

export interface RendererProps<K extends string = string> {
  plugins: Record<K, EditorPlugin>
  documentState: {
    plugin: K
    state?: unknown
  }
}
