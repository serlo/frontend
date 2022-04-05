import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'
import { Link } from '@/components/content/link'
import { FooterNavigation } from '@/data-types'

const iconMapping = {
  newsletter: faEnvelope,
  github: faGithubSquare,
}

interface FooterNavProps {
  data: FooterNavigation
}

export function FooterNav({ data }: FooterNavProps) {
  return (
    <div className="bg-brand-50 pt-2 pb-10">
      <nav>
        <div className="flex flex-wrap">
          {data.map((category, index) => (
            <div
              key={index}
              className="px-side mt-4 pt-0.25 w-full sm:w-1/2 md:w-1/3"
            >
              <h3 className="font-bold mt-4 mb-2 text-truegray-800">
                {category.title}
              </h3>
              <ul className="list-none">
                {category.children.map((link, childindex) => (
                  <li
                    key={index + childindex}
                    className={clsx(
                      "inline-block after:content-['•'] after:text-truegray-600",
                      'after:mr-1.5 after:ml-1 last-of-type:after:content-none',
                      'sm:block sm:after:content-none'
                    )}
                  >
                    <Link
                      href={link.url}
                      noExternalIcon
                      path={['footer', index, childindex]}
                      className={clsx(
                        'text-truegray-600 hover:text-black hover:no-underline',
                        'inline-block py-2 sm:py-0 leading-tight sm:border-b-2 hover:border-black border-transparent'
                      )}
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
