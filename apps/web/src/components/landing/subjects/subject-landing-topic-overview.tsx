import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { faListUl } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { MaxWidthDiv } from '../../navigation/max-width-div'
import { SubTopic } from '../../taxonomy/sub-topic'
import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import type { deSubjectLandingSubjects } from '@/components/pages/subject-landing'
import { deSubjectLandingData } from '@/data/de/de-subject-landing-data'
import type { TaxonomySubTerm } from '@/data-types'
import { cn } from '@/helper/cn'
import { isPartiallyInView } from '@/helper/is-partially-in-view'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

interface SubjectLandingTopicOverviewProps {
  subterms: TaxonomySubTerm[]
  subject: deSubjectLandingSubjects
}

export function SubjectLandingTopicOverview({
  subterms,
  subject,
}: SubjectLandingTopicOverviewProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const topicContainer = useRef<HTMLDivElement>(null)
  const router = useRouter()

  editorRenderers.init(createRenderers())

  const { extraTerms, allTopicsTaxonomyId } = deSubjectLandingData[subject]

  const allTopicsEntry = {
    title: 'Alle Themen ⬈',
    description: undefined,
    href: `/${allTopicsTaxonomyId}`,
    icon: faListUl,
  }

  function onMenuClick(index: number) {
    const indexToBeSet = index === selectedIndex ? -1 : index
    setSelectedIndex(indexToBeSet)

    if (indexToBeSet > -1 && topicContainer.current) {
      if (!isPartiallyInView(topicContainer.current, 150)) {
        scroll({
          top: topicContainer.current.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <div>
      {renderMenu()}
      <div
        className="pt-3 md:ml-16 md:pt-6 [&_img]:mix-blend-multiply"
        ref={topicContainer}
      >
        <MaxWidthDiv>
          {selectedIndex > -1 ? (
            <SubTopic
              data={subterms[selectedIndex]}
              subid={subterms[selectedIndex].id}
              id={0}
            />
          ) : null}
        </MaxWidthDiv>
      </div>
      <style jsx>{`
        .placeholder:after {
          content: ' ';
          display: block;
          background: url('/_assets/img/landing/about-big-arrow.svg') no-repeat;
          transform: scaleX(-1);
          margin-top: 2.5rem;
          height: 5rem;
          max-width: 40rem;
          margin-left: -12rem;
        }
      `}</style>
    </div>
  )

  function renderMenu() {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12rem,_20rem))] justify-center [&_img]:mix-blend-multiply">
        {[...subterms, ...extraTerms, allTopicsEntry].map((term, index) => {
          const isActive = index === selectedIndex

          const firstRow = term.description?.state[0]
          const src =
            firstRow && isImageDocument(firstRow)
              ? String(firstRow.state.src)
              : undefined

          const isExtraTerm = Object.hasOwn(term, 'href')

          const buttonClass = cn(
            `
              m-2 flex min-h-[4rem] w-auto
              items-center rounded-xl p-2 text-left text-left font-bold
              text-brand shadow-menu transition-colors hover:bg-brand/5
            `,
            isActive ? 'bg-brand/10 text-black hover:bg-brand/10' : ''
          )

          if (isExtraTerm) {
            return (
              <Link
                href={term.href}
                key={term.title}
                className={cn(buttonClass, '!no-underline')}
              >
                {term.icon ? (
                  <FaIcon
                    icon={term.icon}
                    className="mr-2 h-10 w-10 rounded-lg bg-white bg-opacity-70 px-1.5 text-brand-500"
                  />
                ) : null}
                {term.title}
              </Link>
            )
          }
          return (
            <button
              key={term.title}
              className={buttonClass}
              onClick={() =>
                isExtraTerm ? router.push(term.href) : onMenuClick(index)
              }
            >
              <div className="relative mr-2 h-10 w-10 rounded-lg bg-white bg-opacity-70 px-1.5">
                {src ? (
                  src.startsWith('https://assets.serlo.org') ? (
                    <Image
                      src={src}
                      fill
                      sizes="6rem"
                      className="object-cover"
                      aria-hidden
                      alt={`Illustration: ${term.title}`}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} className="h-12 w-12 object-cover" />
                  )
                ) : null}
              </div>
              {term.title.replace(' und ', ' & ')}
            </button>
          )
        })}
      </div>
    )
  }
}
