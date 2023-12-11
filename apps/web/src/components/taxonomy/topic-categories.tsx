import { TopicCategory } from './topic-category'
import {
  TaxonomyData,
  TaxonomySubTerm,
  TopicCategoryCustomType,
  TopicCategoryType,
} from '@/data-types'

const allCategories = [
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
    <div className="mx-side mt-4 flex flex-[1_1_55%] flex-col">
      {renderCategories()}
    </div>
  )
  function renderCategories() {
    return (categories ?? allCategories).map((category) => {
      if (!(category in data)) return null
      const links = (data as TaxonomySubTerm)[category]
      if (!links || typeof links === 'boolean') return null
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
