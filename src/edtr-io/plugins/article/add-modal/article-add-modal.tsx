import clsx from 'clsx'

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
      className={clsx(
        'left-auto mr-0 translate-x-0 translate-y-0',
        'rounded-none max-w-[19rem] border-l-2 border-amber-300',
        'bg-amber-50 outline-none px-2.5 pt-2.5',
        'right-0 !w-72 !top-0 !max-h-full !bottom-0'
      )}
    >
      <h3 className="serlo-h3 mt-8 mb-4">{articleStrings.modalTitle}</h3>
      <div className="mx-side">
        <p>Infotext TODO</p>
        <ArticleRelatedMagicInput addEntry={addEntry} />
        <ArticleRelatedTaxonomy
          checkDuplicates={checkDuplicates}
          addEntry={addEntry}
        />
      </div>
    </ModalWithCloseButton>
  )
}
