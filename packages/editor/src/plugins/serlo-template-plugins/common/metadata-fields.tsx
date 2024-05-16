import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { EntityStateProps } from './common'
import { SettingsTextarea } from './settings-textarea'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function MetadataFields({
  metaTitle,
  metaDescription,
}: {
  metaTitle?: EntityStateProps['state']['meta_title']
  metaDescription?: EntityStateProps['state']['meta_description']
}) {
  const entityStrings = useEditorStrings().templatePlugins.entity

  return (
    <div className="mx-side mb-3 mt-12">
      {renderField(entityStrings.seoTitle, metaTitle)}
      {renderField(entityStrings.seoDesc, metaDescription)}
    </div>
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
