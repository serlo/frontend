import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UuidUrlInput } from '@serlo/frontend/src/components/author/uuid-url-input'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useLoggedInData } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useEntityId } from '@serlo/frontend/src/contexts/uuids-context'
import { UuidType, type UuidWithRevType } from '@serlo/frontend/src/data-types'
import { TaxonomyTermType } from '@serlo/frontend/src/fetcher/graphql-types/operations'

import { SerloAddButton } from '../../../plugin/helpers/serlo-editor-button'

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
        UuidType.TaxonomyTerm,
      ]}
      supportedTaxonomyTypes={[TaxonomyTermType.ExerciseFolder]}
      unsupportedIds={entityId ? [entityId] : []}
    />
  )

  function renderButtons(typename: UuidWithRevType, id: number, title: string) {
    return (
      <>
        {typename === UuidType.TaxonomyTerm ? (
          <button
            className="serlo-button-editor-secondary mr-2 text-base leading-browser"
            onClick={() => {
              showExerciseFolderPreview(id)
              document.getElementById('exerciseFolderScroll')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
            title="Preview"
          >
            <FaIcon icon={faSearch} />
          </button>
        ) : null}
        <SerloAddButton text="" onClick={() => addEntry(id, typename, title)} />
      </>
    )
  }
}
