import { FaIcon } from '@editor/editor-ui/fa-icon'
import { selectStaticDocument, useStore } from '@editor/store'
import { ROOT } from '@editor/store/root/constants'
import { faDove } from '@fortawesome/free-solid-svg-icons'

import { AbstractSerializedState } from '../convert-editor-response-to-state'
import type { SerloEditorProps } from '../serlo-editor'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { useRouter } from 'next/router'

export function SaveModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg0: boolean) => void
  onSave: SerloEditorProps['onSave']
  isInTestArea?: boolean
}) {
  const router = useRouter()
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

        <h2 className="text-2xl font-bold">Für andere Lehrkräfte freigeben?</h2>
        <p className="mb-2 mt-2 text-lg">
          Wenn du den Inhalt im Datenraum unter der{' '}
          <a href="#" className="serlo-link">
            freien Lizenz CC-BY-SA 4.0
          </a>{' '}
          veröffentlichst, können andere Lehrkräfte ihn nutzen und
          weiterentwickeln.
        </p>

        <Card className="mt-3 flex max-w-48 cursor-pointer flex-col justify-between bg-sky-50">
          <button onClick={handleShareClick}>
            <CardHeader className="flex flex-row items-center gap-2">
              <CardTitle className="text-lg">
                <FaIcon icon={faDove} /> Teilen
              </CardTitle>
            </CardHeader>
          </button>
        </Card>
      </div>
    </ModalWithCloseButton>
  )

  async function handleShareClick() {
    if (!serializedRoot) return
    const exampleSourceID = '06dca4d1-19f3-4fcc-a9d0-de39971f87bc'

    const { title, content } = serializedRoot.state as AbstractSerializedState

    const randomId = Math.floor(Math.random() * 10000000000) + 10000000000

    try {
      const result = await fetch('/api/datenraum/put', {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: exampleSourceID,
          title: title + ' (datenraum-test)',
          description:
            'Neuer Inhalt vom Prototypen "Serlo Editor <> Datenraum".',
          serloId: randomId,
          editorState: content,
        }),
      })

      if (!result.ok) throw new Error('Failed to put node')

      window.onbeforeunload = null

      showToastNotice(
        'Danke! Dein Inhalt steht jetzt für Andere bereit  🎉',
        'success',
        2500
      )

      setTimeout(() => {
        console.log('pushing to /datenraum-demo')
        void router.push('/datenraum-demo')
      }, 2500)
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
}
