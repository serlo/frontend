import { FaIcon } from '@editor/editor-ui/fa-icon'
import {
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
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  return (
    <ModalWithCloseButton
      isOpen={open}
      setIsOpen={setOpen}
      title=""
      className="top-1/4 max-h-full w-[600px] -translate-x-1/2 translate-y-0 overflow-y-auto pb-20"
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

        <div className="mb-20 mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {renderLicenseCards()}
        </div>
      </div>
    </ModalWithCloseButton>
  )

  function handleLicenseClick() {
    showToastNotice('Danke! Inhalt als OER veröffentlicht 🎉', 'success')
    setOpen(false)
  }

  function renderLicenseCards() {
    return (
      <>
        <Card
          className="flex cursor-pointer flex-col justify-between bg-sky-50"
          onClick={handleLicenseClick}
        >
          <CardHeader className="flex flex-row items-center gap-2">
            <CardTitle className="text-lg">
              <FaIcon icon={faCreativeCommonsZero} /> CC-0
            </CardTitle>
          </CardHeader>
        </Card>
        <Card
          className="flex cursor-pointer flex-col justify-between bg-sky-50"
          onClick={handleLicenseClick}
        >
          <CardHeader className="flex flex-row items-center gap-2">
            <CardTitle className="text-lg">
              <FaIcon icon={faCreativeCommonsPd} /> Public Domain Mark
            </CardTitle>
          </CardHeader>
        </Card>
        <Card
          className="flex cursor-pointer flex-col justify-between bg-sky-50"
          onClick={handleLicenseClick}
        >
          <CardHeader className="flex flex-row items-center gap-2">
            <CardTitle className="text-lg">
              <FaIcon icon={faCreativeCommonsBy} /> CC-BY 4.0
            </CardTitle>
          </CardHeader>
        </Card>
        <Card
          className="flex cursor-pointer flex-col justify-between bg-sky-50"
          onClick={handleLicenseClick}
        >
          <CardHeader className="flex flex-row items-center gap-2">
            <CardTitle className="text-lg">
              <FaIcon icon={faCreativeCommonsSa} /> CC-BY-SA 4.0
            </CardTitle>
          </CardHeader>
        </Card>
      </>
    )
  }
}
