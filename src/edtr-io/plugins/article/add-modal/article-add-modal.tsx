import clsx from 'clsx'
import { useState } from 'react'

import { ArticleProps } from '..'
import { ArticleRelatedExercises } from './article-related-exercises'
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
  const [topicFolderId, setTopicFolderId] = useState<undefined | number>(
    undefined
  )

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
      className={clsx()}
    >
      <h3 className="serlo-h3 mt-5 mb-4">{articleStrings.addModal.title}</h3>
      <div className="mx-side">
        <p>
          After reading the article, what could help out learners next?
          <br />
          Here you can add some <b>Exercises</b> or link to a single{' '}
          <b>Exercise Folder.</b>
          <br />
          Or you can suggest <b>Articles</b>, <b>Courses</b> or <b>Videos</b> to
          follow up with.
        </p>
        <p className="mt-4">
          You can either paste an Serlo ID or URL or choose content from the
          parent folder below.
        </p>
        <ArticleRelatedMagicInput
          addEntry={addEntry}
          showTopicFolderPreview={(id: number) => setTopicFolderId(id)}
        />
        <ArticleRelatedTaxonomy
          checkDuplicates={checkDuplicates}
          addEntry={addEntry}
          showTopicFolderPreview={(id: number) => setTopicFolderId(id)}
        />
        {topicFolderId ? (
          <ArticleRelatedExercises
            topicFolderId={topicFolderId}
            addEntry={addEntry}
          />
        ) : null}
      </div>
    </ModalWithCloseButton>
  )
}
