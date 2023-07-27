import { useUserSetDescriptionMutation } from '@/mutations/use-user-set-description-mutation'
import { convertUserByDescription } from '@/serlo-editor-integration/editor-response-to-state'
import { SerloEditor } from '@/serlo-editor-integration/serlo-editor'

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
    return new Promise((resolve: (value: void) => void, reject) => {
      if (success) resolve()
      else {
        // eslint-disable-next-line no-console
        console.error(success)
        // eslint-disable-next-line no-console
        console.error(data)
        reject()
      }
    })
  }

  const initialState = convertUserByDescription(rawDescription).initialState

  return (
    <>
      <div className="controls-portal sticky top-0 z-[100] bg-white" />
      <div className="edtr-io serlo-editor-hacks">
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
