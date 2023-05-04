import { faSearch, Icon } from '@edtr-io/ui'

import { SerloAddButton } from '../../helpers/serlo-editor-button'
import { UuidUrlInput } from '@/components/author/uuid-url-input'
import { useEntityId } from '@/contexts/entity-id-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType, UuidWithRevType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'

interface ArticleRelatedMagicInputProps {
  addEntry: (id: number, typename: UuidWithRevType, title?: string) => void
  showExerciseFolderPreview: (id: number) => void
}

export function ArticleRelatedMagicInput({
  addEntry,
  showExerciseFolderPreview: showExerciseFolderPreview,
}: ArticleRelatedMagicInputProps) {
  const entityId = useEntityId()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  return (
    <UuidUrlInput
      renderButtons={renderButtons}
      supportedEntityTypes={[
        UuidType.Article,
        UuidType.Course,
        UuidType.CoursePage,
        UuidType.Video,
        UuidType.Exercise,
        UuidType.ExerciseGroup,
        UuidType.GroupedExercise,
        UuidType.TaxonomyTerm,
      ]}
      supportedTaxonomyTypes={[TaxonomyTermType.ExerciseFolder]}
      unsupportedIds={[entityId]}
    />
  )

  function renderButtons(typename: UuidWithRevType, id: number, title: string) {
    return (
      <>
        {typename === UuidType.TaxonomyTerm ? (
          <button
            className="serlo-button-editor-secondary text-base leading-browser mr-2"
            onClick={() => {
              showExerciseFolderPreview(id)
              document.getElementById('exerciseFolderScroll')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
            title="Preview"
          >
            <Icon icon={faSearch} />
          </button>
        ) : null}
        <SerloAddButton text="" onClick={() => addEntry(id, typename, title)} />
      </>
    )
  }
}
