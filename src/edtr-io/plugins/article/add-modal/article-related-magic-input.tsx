import { faSearch, Icon } from '@edtr-io/ui'

import { SerloAddButton } from '../../helpers/serlo-editor-button'
import { UuidUrlInput } from '@/components/author/uuid-url-input'
import { useEntityId } from '@/contexts/entity-id-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

interface ArticleRelatedMagicInputProps {
  addEntry: (id: number, typename: string, title?: string) => void
  showTopicFolderPreview: (id: number) => void
}

export function ArticleRelatedMagicInput({
  addEntry,
  showTopicFolderPreview,
}: ArticleRelatedMagicInputProps) {
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  return (
    <UuidUrlInput
      renderButtons={renderButtons}
      supportedEntityTypes={[
        'Article',
        'Course',
        'CoursePage',
        'Video',
        'Exercise',
        'ExerciseGroup',
        'GroupedExercise',
        'TaxonomyTerm',
      ]}
      supportedTaxonomyTypes={['topicFolder']}
      unsupportedIds={[entityId]}
    />
  )

  function renderButtons(type: string, id: number, title: string) {
    return (
      <>
        {type === 'TaxonomyTerm' ? (
          <button
            className="serlo-button bg-amber-100 hover:bg-amber-300 text-base leading-browser mr-2"
            onClick={() => {
              showTopicFolderPreview(id)
              document.getElementById('topicFolderScroll')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
            title="Preview"
          >
            <Icon icon={faSearch} />
          </button>
        ) : null}
        <SerloAddButton text="" onClick={() => addEntry(id, type, title)} />
      </>
    )
  }
}
