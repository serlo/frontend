import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import {
  featuredContent,
  FeaturedContentData,
} from '@/data/de/de-subject-landing-data'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { shuffleArray } from '@/helper/shuffle-array'

const maxOnMobile = 4

export function SubjectLandingFeatured({
  subject,
}: {
  subject: deSubjectLandingSubjects
}) {
  const { strings } = useInstanceData()

  const [content, setContent] = useState<FeaturedContentData[]>(
    featuredContent[subject].slice(0, 6)
  )

  useEffect(() => {
    setContent(shuffleArray(featuredContent[subject]).slice(0, 6))
  }, [subject])

  return (
    <div
      className={clsx(
        'flex items-stretch justify-around',
        'px-side pb-6 flex-wrap',
        'w-full mx-auto sm:max-w-3xl lg:max-w-max '
      )}
    >
      {content.map(renderFeaturedBox)}
    </div>
  )

  function renderFeaturedBox(data: FeaturedContentData, index: number) {
    return (
      <Link
        key={data.title}
        className={clsx(
          'text-brand hover:no-underline box-border',
          'p-2.5 leading-cozy',
          'rounded hover:shadow-menu hover:text-almost-black',
          'mb-4 mx-2 w-36 mobile:w-52 lg:w-44 group xl:w-48 transition-all text-left',
          'relative',
          index >= maxOnMobile ? 'hidden mobile:block' : ''
        )}
        href={data.url}
      >
        <div className="mb-2.5 mr-5 bg-brand-100 group-hover:bg-white rounded-lg transition-all">
          {data.img ? (
            <img
              className={clsx(
                'object-contain object-center',
                'mix-blend-multiply opacity-80 transition-all',
                'group-hover:opacity-100',
                'aspect-square rounded-lg'
              )}
              alt={data.title}
              src={data.img}
            />
          ) : (
            <div
              className={clsx(
                'opacity-80 transition-all group-hover:opacity-100 aspect-square',
                'flex align-middle items-center justify-center text-4xl',
                'text-brand-300'
              )}
            >
              {renderTypeIcon(data.type)}
            </div>
          )}
        </div>
        <h4 className="font-bold text-xl mx-0 mt-1 mb-10 break-normal special-hyphens-auto">
          {data.title}
        </h4>
        <span className="block mt-1 font-sm text-brand-400 absolute bottom-2">
          {renderTypeIcon(data.type)} {getTranslatedType(strings, data.type)}
        </span>
      </Link>
    )
  }

  function renderTypeIcon(type: UuidType | TaxonomyTermType) {
    const icon = getIconByTypename(type)
    return <FaIcon icon={icon} />
  }
}
