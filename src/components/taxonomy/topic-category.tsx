import { faTools } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { FaIcon } from '../fa-icon'
import { useAuthentication } from '@/auth/use-authentication'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
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
  const loggedInData = useLoggedInData()
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

  return (
    <ul
      key={category}
      className={clsx('mt-5 first:mt-0', full && 'mb-6 mt-0 mobile:mt-2')}
    >
      <h4 className="mb-4 text-lg font-bold text-gray-900">
        {strings.categories[category]}{' '}
        <FaIcon icon={categoryIconMapping[category]} />
      </h4>

      {links.map(renderLink)}
    </ul>
  )

  function renderLink(link: TaxonomyLink) {
    if (link.unrevised && !mounted) return null
    if (link.unrevised && mounted && !auth) return null

    return (
      <li className="mb-3 block leading-cozy" key={link.url + '_' + link.title}>
        <Link
          className={clsx(
            link.unrevised ? 'opacity-60' : undefined,
            'text-[1.2rem]'
          )}
          href={link.url}
        >
          {link.title}
          {link.unrevised && (
            <span title={loggedInData?.strings.revisions.unrevisedTaxNote}>
              <FaIcon icon={faTools} className="ml-1 text-base" />
            </span>
          )}
        </Link>
      </li>
    )
  }
}
