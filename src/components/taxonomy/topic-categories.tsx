import { TopicCategory } from './topic-category'
import { TaxonomyData, TaxonomySubTerm, TopicCategoryTypes } from '@/data-types'

const allCategories = [
  'articles',
  'exercises',
  'videos',
  'applets',
  'courses',
  'folders',
  'events',
  'unrevised',
] as TopicCategoryTypes[]

export interface TopicCategoriesProps {
  data: TaxonomySubTerm | TaxonomyData
  categories?: TopicCategoryTypes[]
  subid?: number
  full?: boolean
}

export function TopicCategories({
  data,
  categories,
  subid,
  full,
}: TopicCategoriesProps) {
  return (
    <div className="flex flex-col mx-side mt-4" style={{ flex: '1 1 55%' }}>
      {renderCategories()}
    </div>
  )
  function renderCategories() {
    return (categories ?? allCategories).map((category) => {
      if (!(category in data)) return null
      const links = (data as TaxonomySubTerm)[category]
      if (!links || typeof links == 'boolean') return null
      return (
        <TopicCategory
          key={category}
          category={category}
          links={links}
          id={subid}
          full={full}
        />
      )
    })
  }
}
