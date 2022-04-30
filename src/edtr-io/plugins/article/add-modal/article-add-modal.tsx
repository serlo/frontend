import { ArticleProps } from '..'
import { ArticleRelatedMagicInput } from './article-related-magic-input'
import { ArticleRelatedTaxonomy } from './article-related-taxonomy'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getCategoryByTypename } from '@/helper/get-category-by-typename'

interface ArticleAddModalProps {
  open: boolean
  data: ArticleProps['state']
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ArticleAddModal({
  open,
  data,
  setModalOpen,
}: ArticleAddModalProps) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const articleStrings = loggedInData.strings.editor.article

  const { exercises, exerciseFolder, relatedContent } = data

  const checkDuplicates = (id: number, typename: string) => {
    const category = getCategoryByTypename(typename)
    if (
      category === 'articles' ||
      category === 'courses' ||
      category === 'videos'
    ) {
      return checkDuplicatesRelatedContent(id, category)
    }
    return false
  }

  const checkDuplicatesRelatedContent = (
    id: number,
    category: 'articles' | 'courses' | 'videos'
  ) => {
    return relatedContent[category].some(
      (field) => field.id.value === id.toString()
    )
  }

  //TODO: add explanation text in popup modal
  //TODO: test more

  const addEntry = (id: number, typename: string, title?: string) => {
    const category = getCategoryByTypename(typename)
    if (
      category === 'articles' ||
      category === 'courses' ||
      category === 'videos'
    ) {
      if (!title || checkDuplicatesRelatedContent(id, category)) return
      relatedContent[category].insert(relatedContent[category].length, {
        id: id.toString(),
        title: title,
      })
    }

    if (typename === 'TaxonomyTerm' && title) {
      exerciseFolder.title.set(title)
      exerciseFolder.id.set(id.toString())
    }

    if (typename.includes('Exercise')) {
      //maybe also check for duplicates
      exercises.insert(exercises.length, {
        plugin: 'injection',
        state: id.toString(),
      })
    }
  }

  return (
    <ModalWithCloseButton
      isOpen={open}
      onCloseClick={() => setModalOpen(false)}
      title={articleStrings.modalTitle}
      className="!top-1/3 bottom-0 translate-y-0 max-h-full"
    >
      <div className="mx-side">
        <ArticleRelatedMagicInput addEntry={addEntry} />
        <hr />
        <ArticleRelatedTaxonomy
          checkDuplicates={checkDuplicates}
          addEntry={addEntry}
        />
      </div>
    </ModalWithCloseButton>
  )
}
