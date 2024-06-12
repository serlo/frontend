import { faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { EntityStateProps } from './common'
import { SettingsTextarea } from './settings-textarea'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function MetadataFieldsModal({
  metaTitle,
  metaDescription,
}: {
  metaTitle?: EntityStateProps['state']['meta_title']
  metaDescription?: EntityStateProps['state']['meta_description']
}) {
  const entityStrings = useEditorStrings().templatePlugins.entity
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowSettingsModal(true)}
        className="serlo-button-editor-secondary mr-2 text-base"
      >
        Metadata <FaIcon icon={faPencilAlt} />
      </button>

      <ModalWithCloseButton
        isOpen={showSettingsModal}
        setIsOpen={setShowSettingsModal}
        className="top-8 max-w-xl translate-y-0 sm:top-1/3"
      >
        <div className="mx-side mb-3 mt-12">
          {renderField(entityStrings.seoTitle, metaTitle)}
          {renderField(entityStrings.seoDesc, metaDescription)}
        </div>
      </ModalWithCloseButton>
    </>
  )

  function renderField(
    title: string,
    field?: EntityStateProps['state']['meta_title']
  ) {
    if (field === undefined) return null
    return (
      <>
        {field.defined ? (
          <SettingsTextarea autoFocus label={title} state={field} />
        ) : (
          <button
            className="serlo-button-editor-primary mb-3"
            onClick={() => field.create()}
          >
            <FaIcon icon={faPlusCircle} /> {title}
          </button>
        )}
      </>
    )
  }
}
