import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import type { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import { useInstanceData } from '@/contexts/instance-context'
import {
  featuredContent,
  type FeaturedContentData,
} from '@/data/de/de-subject-landing-data'
import { UuidType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { shuffleArray } from '@/helper/shuffle-array'

const maxOnMobile = 4

export function SubjectLandingFeatured({
  subject,
  customContent,
}: {
  subject: deSubjectLandingSubjects
  customContent?: FeaturedContentData[]
}) {
  const { strings } = useInstanceData()

  const [content, setContent] = useState<FeaturedContentData[]>(
    (customContent ?? featuredContent[subject]).slice(0, 6)
  )

  useEffect(() => {
    setContent(
      shuffleArray(customContent ?? featuredContent[subject]).slice(0, 6)
    )
  }, [subject, customContent])

  return (
    <div
      className={cn(`
        mx-auto flex w-full
        flex-wrap items-stretch justify-around
        px-side pb-6 sm:max-w-3xl lg:max-w-max
      `)}
    >
      {content.map(renderFeaturedBox)}
    </div>
  )

  function renderFeaturedBox(data: FeaturedContentData, index: number) {
    return (
      <Link
        key={data.title}
        className={cn(
          `
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
        <div className="relative mb-2.5 mr-5 aspect-square rounded-lg bg-brand-100 transition-all group-hover:bg-white">
          {data.img ? (
            <Image
              className={cn(`
                rounded-lg object-contain object-center
                opacity-80 mix-blend-multiply
                transition-all group-hover:opacity-100
              `)}
              fill
              sizes="13rem"
              alt={data.title}
              src={data.img}
            />
          ) : (
            <div
              className={cn(`
                flex aspect-square items-center justify-center
                align-middle text-4xl text-brand-300 opacity-80 transition-all
                group-hover:opacity-100
              `)}
            >
              {renderTypeIcon(data.type)}
            </div>
          )}
        </div>
        <h4 className="mx-0 mb-10 mt-1 hyphens-auto break-normal text-xl font-bold">
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
