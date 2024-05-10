import { useUserSetDescriptionMutation } from '@/mutations/use-user-set-description-mutation'
import { convertUserByDescription } from '@/serlo-editor-integration/convert-editor-response-to-state'
import { SerloEditor } from '@/serlo-editor-integration/serlo-editor'

export interface ProfileDescriptionEditorProps {
  username: string
  rawDescription?: string | null
}

export function ProfileDescriptionEditor({
  username,
  rawDescription,
}: ProfileDescriptionEditorProps) {
  const setDescription = useUserSetDescriptionMutation()

  const onSave = async (data: unknown) => {
    const success = await setDescription({
      description: (data as { description: string }).description,
    })
    return new Promise((resolve: (value: void) => void, reject) => {
      if (success) {
        // call revalidation api route to update description
        void fetch(`/api/frontend/revalidate-user?username=${username}`)
          .then(() => resolve())
          .catch(() => {
            // eslint-disable-next-line no-console
            console.error('problem revalidating', data)
            reject()
          })
      } else {
        // eslint-disable-next-line no-console
        console.error(success, data)
        reject()
      }
    })
  }

  const initialState = convertUserByDescription(rawDescription)

  return (
    <>
      <div className="controls-portal sticky top-0 z-[100] bg-white md:bg-transparent" />
      <div className="serlo-editor-hacks [&>div.relative]:mt-12">
        <SerloEditor
          entityNeedsReview={false}
          onSave={onSave}
          type="User"
          initialState={initialState}
        />
      </div>
    </>
  )
}
