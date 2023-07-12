import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import { useInstanceData } from '@/contexts/instance-context'
import {
  featuredContent,
  FeaturedContentData,
} from '@/data/de/de-subject-landing-data'
import { UuidType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { shuffleArray } from '@/helper/shuffle-array'
import { tw } from '@/helper/tw'

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
      className={tw`
        mx-auto flex w-full
        flex-wrap items-stretch justify-around
        px-side pb-6 sm:max-w-3xl lg:max-w-max
      `}
    >
      {content.map(renderFeaturedBox)}
    </div>
  )

  function renderFeaturedBox(data: FeaturedContentData, index: number) {
    return (
      <Link
        key={data.title}
        className={clsx(
          tw`
            group relative mx-2
            mb-4 box-border
            w-36 rounded p-2.5
            text-left leading-cozy text-brand transition-all 
            hover:text-almost-black hover:no-underline hover:shadow-menu
            mobile:w-52 lg:w-44 xl:w-48
          `,
          index >= maxOnMobile ? 'hidden mobile:block' : ''
        )}
        href={data.url}
      >
        <div className="mb-2.5 mr-5 rounded-lg bg-brand-100 transition-all group-hover:bg-white">
          {data.img ? (
            <img
              className={tw`
                aspect-square rounded-lg
                object-contain object-center opacity-80
                mix-blend-multiply
                transition-all group-hover:opacity-100
              `}
              alt={data.title}
              src={data.img}
            />
          ) : (
            <div
              className={tw`
                flex aspect-square items-center justify-center
                align-middle text-4xl text-brand-300 opacity-80 transition-all
                group-hover:opacity-100
              `}
            >
              {renderTypeIcon(data.type)}
            </div>
          )}
        </div>
        <h4 className="mx-0 mt-1 mb-10 break-normal text-xl font-bold special-hyphens-auto">
          {data.title}
        </h4>
        <span className="font-sm absolute bottom-2 mt-1 block text-brand-400">
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
