import { faTools } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { FaIcon } from '../fa-icon'
import { useAuthentication } from '@/auth/use-authentication'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { TaxonomyLink, TopicCategoryTypes } from '@/data-types'
import { shouldUseNewAuth } from '@/helper/feature-auth'
import { categoryIconMapping } from '@/helper/icon-by-entity-type'

export interface TopicCategoryProps {
  links: TaxonomyLink[]
  full?: boolean
  category: TopicCategoryTypes
  id?: number
}

export function TopicCategory({
  links,
  full,
  category,
  id,
}: TopicCategoryProps) {
  const [mounted, setMounted] = useState(!shouldUseNewAuth())
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  const auth = useAuthentication()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (
    links.length === 0 ||
    (!auth.current && links.filter((link) => !link.unrevised).length === 0)
  )
    return null

  if (!mounted) return null

  return (
    <ul
      key={category}
      className={clsx('mt-5 first:mt-0', full && 'mb-6 mt-0 mobile:mt-2')}
    >
      <h4 className="text-truegray-900 text-lg mb-4 font-bold">
        {strings.categories[category]}{' '}
        <FaIcon icon={categoryIconMapping[category]} />
      </h4>

      {links.map(renderLink)}
    </ul>
  )

  function renderLink(link: TaxonomyLink, i: number) {
    if (link.unrevised && !mounted) return null
    if (link.unrevised && mounted && !auth.current) return null

    return (
      <li className="block mb-3 leading-cozy" key={link.url + '_' + link.title}>
        <Link
          className={clsx(
            link.unrevised ? 'opacity-60' : undefined,
            'text-[1.2rem]'
          )}
          href={link.url}
          path={full ? [category, i] : [id!, category, i]}
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
