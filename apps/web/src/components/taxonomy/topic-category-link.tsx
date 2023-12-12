import { faTools } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/tailwind/helper/cn'

import { FaIcon } from '../fa-icon'
import { Link } from '@/components/content/link'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  TaxonomyLink,
  TopicCategoryCustomType,
  TopicCategoryType,
} from '@/data-types'

export interface TopicCategoryProps {
  links: TaxonomyLink[]
  full?: boolean
  category: TopicCategoryType | TopicCategoryCustomType
  id?: number
}

export function TopicCategoryLink({ link }: { link: TaxonomyLink }) {
  const loggedInData = useLoggedInData()

  return (
    <li className="" key={link.url + '_' + link.title}>
      <Link
        className={cn(
          link.unrevised ? 'opacity-60' : undefined,
          'block py-1.5 text-lg leading-cozy'
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
