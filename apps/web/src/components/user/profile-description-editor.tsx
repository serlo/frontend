import { revalidatePath } from '@/mutations/helper/revalidate-path'
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
    if (!success) {
      // eslint-disable-next-line no-console
      console.error(success, data)
      return false
    }
    return revalidatePath(`/user/profile/${username}`)
  }

  const initialState = convertUserByDescription(rawDescription)

  return (
    <>
      <div className="[&>div.relative]:mt-12">
        <SerloEditor
          entityNeedsReview={false}
          onSave={onSave}
          initialState={initialState}
        />
      </div>
    </>
  )
}
