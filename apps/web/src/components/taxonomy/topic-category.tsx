import { cn } from '@serlo/tailwind/helper/cn'
import { useEffect, useState } from 'react'

import { TopicCategoryLink } from './topic-category-link'
import { FaIcon } from '../fa-icon'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import {
  TaxonomyLink,
  TopicCategoryCustomType,
  TopicCategoryType,
} from '@/data-types'
import { categoryIconMapping } from '@/helper/icon-by-entity-type'

export interface TopicCategoryProps {
  links: TaxonomyLink[]
  full?: boolean
  category: TopicCategoryType | TopicCategoryCustomType
  id?: number
}

export function TopicCategory({ links, full, category }: TopicCategoryProps) {
  const [mounted, setMounted] = useState(false)
  const { strings } = useInstanceData()
  const auth = useAuthentication()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (
    links.length === 0 ||
    (!auth && links.filter((link) => !link.unrevised).length === 0)
  )
    return null

  if (!mounted) return null

  const filteredLinks = links.filter((link) => {
    if (link.unrevised && !mounted) return false
    if (link.unrevised && mounted && !auth) return false
    return true
  })

  return (
    <ul
      key={category}
      className={cn('mt-5 first:mt-0', full && 'mb-6 mt-0 mobile:mt-2')}
    >
      <h4 className="mb-2.5 text-lg font-bold text-gray-900">
        {strings.categories[category]}{' '}
        <FaIcon icon={categoryIconMapping[category]} />
      </h4>

      {filteredLinks.map((link) => (
        <TopicCategoryLink key={link.id} link={link} />
      ))}
    </ul>
  )
}
