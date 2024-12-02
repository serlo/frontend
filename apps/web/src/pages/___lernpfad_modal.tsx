import { SpoilerRenderer } from '@editor/plugins/spoiler/renderer'
import { useState } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export interface LegalData {
  contentHtml: string
  isGerman: boolean
}

export default renderedPageNoHooks(() => {
  return (
    <FrontendClientBase
      noContainers
      noHeaderFooter
      noIndex
      loadLoggedInData
      serloEntityData={{ entityId: 123 }}
    >
      <Content />
    </FrontendClientBase>
  )
})

export function Content() {
  const [showModal, setShowModal] = useState(true)

  const title = 'Writing an Opinion – step by step'
  return (
    <ModalWithCloseButton
      isOpen={showModal}
      setIsOpen={setShowModal}
      title={title}
      extraCloseButtonClassName="bg-brand-200"
      className="top-[12%] w-[47%] translate-y-0 overflow-y-auto p-5 pt-12"
      extraTitleClassName="border-none"
    >
      <p className="serlo-p">
        <ul className="serlo-ul ml-0">
          <li>
            Diesen Lernschritt kannst du <b>drei Mal</b> vor der entgültigen
            Abgabe <b>bearbeiten</b>.
          </li>
          <li>
            Du hast <b>20 Minuten</b> Zeit.
          </li>
          <li>
            Deine Lehrkraft hat <b>Rückmeldungen aktiviert</b>
          </li>
        </ul>
      </p>
      <div className="serlo-p [&>div]:border-0 [&_button]:bg-transparent [&_button]:p-0">
        <SpoilerRenderer title={<b>Deine Bewertungskriterien</b>}>
          <ul className="serlo-ul mb-0">
            <li>
              Textgestaltung und Sprachfluss (Formulierungen, Stuktur,
              Verwendung von Konnektoren, eindeutige Bezüge)
            </li>
            <li>Wortschatz und Idiomatik</li>
            <li>
              Satzbau und Grammatik (Satzmuster und damit einhergehende
              Verständlichkeit insgesamt)
            </li>
          </ul>
        </SpoilerRenderer>
      </div>
      <div className="mx-side mb-10 flex justify-end">
        <button className="serlo-button-learner-primary rounded-md p-3 text-2xl font-medium">
          Los geht&apos;s
        </button>
      </div>
    </ModalWithCloseButton>
  )
}
