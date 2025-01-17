import { FaIcon } from '@editor/editor-ui/fa-icon'
import { selectStaticDocument, useStore } from '@editor/store'
import { ROOT } from '@editor/store/root/constants'
import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsPd,
  faCreativeCommonsSa,
  faCreativeCommonsZero,
} from '@fortawesome/free-brands-svg-icons'

import type { SerloEditorProps } from '../serlo-editor'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function SaveModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg0: boolean) => void
  onSave: SerloEditorProps['onSave']
  isInTestArea?: boolean
}) {
  const store = useStore()
  // can be empty before first change
  const serializedRoot = selectStaticDocument(store.getState(), ROOT)

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  return (
    <ModalWithCloseButton
      isOpen={open}
      setIsOpen={setOpen}
      title=""
      className="top-[10%] max-h-full w-[600px] -translate-x-1/2 translate-y-0 overflow-y-auto pb-20"
    >
      <div className="mx-side">
        <p className="my-4 text-lg font-bold">
          <span className="text-xl">✅</span> Erfolgreich gespeichert!
        </p>

        <hr className="my-6" />

        <h2 className="text-2xl font-bold">Im Datenraum veröffentlichen</h2>
        <p className="mb-2 mt-2 text-lg">
          Möchtest du den Inhalt für andere Lehrkräfte freigeben?
        </p>

        <p className="mb-2 mt-4 text-lg font-bold">Wähle eine Lizenz:</p>

        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {renderLicenseCards()}
        </div>
      </div>
    </ModalWithCloseButton>
  )

  async function handleLicenseClick() {
    if (!serializedRoot) return
    const exampleSourceID = '06dca4d1-19f3-4fcc-a9d0-de39971f87bc'

    try {
      const result = await fetch('/api/datenraum/put', {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: exampleSourceID,
          title: 'serlo-put-test-3',
          description: 'test',
          serloId: 48682,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          editorState: JSON.stringify(serializedRoot.state.content),
        }),
      })

      if (!result.ok) throw new Error('Failed to put node')

      showToastNotice(
        'Danke! Inhalt im Datenraum veröffentlicht 🎉',
        'success',
        3000
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving content:', error)
      showToastNotice(
        'Saving did not work 😢 Please try again later.',
        'warning',
        3000
      )
    } finally {
      setOpen(false)
    }
  }

  function renderLicenseCards() {
    const opts = [
      { title: 'CC-0', icons: [faCreativeCommonsZero] },
      { title: 'Public Domain Mark', icons: [faCreativeCommonsPd] },
      { title: 'CC-BY 4.0', icons: [faCreativeCommons, faCreativeCommonsBy] },
      {
        title: 'CC-BY-SA 4.0',
        icons: [faCreativeCommons, faCreativeCommonsBy, faCreativeCommonsSa],
      },
    ]
    return opts.map(({ title, icons }) => {
      return (
        <Card
          key={title}
          className="cursor-pointer bg-sky-50"
          onClick={() => handleLicenseClick()}
        >
          <CardHeader>
            <CardTitle className="flex justify-between text-lg">
              <span>{title}</span>
              <span>
                {icons.map((icon, i) => (
                  <span key={i}>
                    {' '}
                    <FaIcon icon={icon} className="text-sky-300" />
                  </span>
                ))}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
      )
    })
  }
}
