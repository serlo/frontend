import Cookies from 'js-cookie'

import { editorStyles } from '../pages/add-revision'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { convertUserByDescription } from '@/edtr-io/editor-response-to-state'
import { SerloEditor } from '@/edtr-io/serlo-editor'
import { useUserSetDescriptionMutation } from '@/helper/mutations'

export interface ProfileDescriptionEditorProps {
  rawDescription?: string | null
}

export function ProfileDescriptionEditor({
  rawDescription,
}: ProfileDescriptionEditorProps) {
  const loggedInData = useLoggedInData()

  const setDescription = useUserSetDescriptionMutation()

  if (!loggedInData) return null
  // const editorStrings = loggedInData.strings.editor

  return <>{renderEditor()}</>

  function renderEditor() {
    const initialState = convertUserByDescription(rawDescription).initialState

    return (
      <>
        <div className="controls-portal sticky top-0 z-[99] bg-white" />
        <div className="edtr-io">
          <SerloEditor
            getCsrfToken={() => {
              const cookies = typeof window === 'undefined' ? {} : Cookies.get()
              return cookies['CSRF']
            }}
            needsReview={false}
            // onSave={onSave}
            onSave={async (data) => {
              const success = await setDescription({
                description: (data as { description: string }).description,
              })
              return new Promise((resolve, reject) => {
                if (success) {
                  resolve()
                  // window.location.reload()
                  // eslint-disable-next-line no-console
                  console.log('should have worked')
                } else {
                  // eslint-disable-next-line no-console
                  console.log(success)
                  // eslint-disable-next-line no-console
                  console.log(data)
                  reject()
                }
              })
            }}
            type="User"
            initialState={initialState}
          />
          <style jsx global>
            {`
              ${editorStyles}
            `}
          </style>
        </div>
      </>
    )
  }
}
