import { TopicCategory } from './topic-category'
import {
  TaxonomyData,
  TaxonomySubTerm,
  TopicCategoryCustomType,
  TopicCategoryType,
} from '@/data-types'

export const allCategories = [
  ...Object.values(TopicCategoryType),
  TopicCategoryCustomType.unrevised,
] as const

export interface TopicCategoriesProps {
  data: TaxonomySubTerm | TaxonomyData
  categories?: (TopicCategoryType | TopicCategoryCustomType.unrevised)[]
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
