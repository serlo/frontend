import { Editor as SerloEditor } from '../../../external/edtr-io/editor'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function Editor({ state }: any) {
  const loggedInData = useLoggedInData()

  if (!loggedInData) return <p>loading ...</p>

  return (
    <SerloEditor
      getCsrfToken={() => 'stub'}
      mayCheckout
      onSave={() => {
        alert('not implemented')
        return new Promise((res) => {
          res(undefined)
        })
      }}
      type="article"
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      initialState={state}
    />
  )
}
