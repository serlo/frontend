import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faHouseLaptop, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../fa-icon'
import { Link } from '@/components/content/link'
import { FooterIcon, FooterNavigation } from '@/data-types'
import { cn } from '@/helper/cn'

const iconMapping: Record<FooterIcon, IconDefinition> = {
  newsletter: faEnvelope,
  github: faGithubSquare,
  job: faHouseLaptop,
}

interface FooterNavProps {
  data: FooterNavigation
}

export function FooterNav({ data }: FooterNavProps) {
  return (
    <div className="bg-brand-100 pb-10 pt-2">
      <nav>
        <div className="flex flex-wrap">
          {data.map((category, index) => (
            <div
              key={index}
              className="mt-4 w-full px-side pt-0.25 sm:w-1/2 md:w-1/4"
            >
              <h3 className="mb-2 mt-4 font-bold text-almost-black">
                {category.title}
              </h3>
              <ul className="list-none">
                {category.children.map((link, childindex) => (
                  <li
                    key={index + childindex}
                    className={cn(`
                      inline-block after:ml-1 after:mr-1.5
                      after:text-gray-600 after:content-['•'] last-of-type:after:content-none
                      sm:block sm:after:content-none
                    `)}
                  >
                    <Link
                      href={link.url}
                      noExternalIcon
                      className={cn(`
                        inline-block border-transparent py-2
                        leading-tight text-gray-600 hover:border-black hover:text-black hover:no-underline 
                        sm:border-b-2 sm:py-0
                      `)}
                    >
                      {link.icon && <FaIcon icon={iconMapping[link.icon]} />}{' '}
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
