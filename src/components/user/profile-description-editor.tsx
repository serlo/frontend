import Cookies from 'js-cookie'

import { convertUserByDescription } from '@/edtr-io/editor-response-to-state'
import { SerloEditor } from '@/edtr-io/serlo-editor'
import { useUserSetDescriptionMutation } from '@/helper/mutations'

export interface ProfileDescriptionEditorProps {
  rawDescription?: string | null
}

export function ProfileDescriptionEditor({
  rawDescription,
}: ProfileDescriptionEditorProps) {
  const setDescription = useUserSetDescriptionMutation()

  const onSave = async (data: unknown) => {
    const success = await setDescription({
      description: (data as { description: string }).description,
    })
    return new Promise(
      (resolve: (value: void | PromiseLike<void>) => void, reject) => {
        if (success) {
          resolve()
          //feedback is handled in mutation
          // setTimeout(() => {
          //   window.location.reload()
          // }, 200)
        } else {
          // eslint-disable-next-line no-console
          console.log(success)
          // eslint-disable-next-line no-console
          console.log(data)
          reject()
        }
      }
    )
  }

  const initialState = convertUserByDescription(rawDescription).initialState

  return (
    <>
      <div className="controls-portal sticky top-0 z-[99] bg-white" />
      <div className="edtr-io serlo-editor-hacks">
        <SerloEditor
          getCsrfToken={() => {
            const cookies = typeof window === 'undefined' ? {} : Cookies.get()
            return cookies['CSRF']
          }}
          needsReview={false}
          onSave={onSave}
          type="User"
          initialState={initialState}
        />
      </div>
    </>
  )
}
